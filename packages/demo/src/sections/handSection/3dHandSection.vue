<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
    AmbientLight,
    Color,
    Mesh,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    DirectionalLight,
    PlaneGeometry,
    TextureLoader,
    MeshBasicMaterial,
    Vector3,
    MeshPhysicalMaterial,
    EquirectangularReflectionMapping,
    Vector2,
    Group,
} from 'three'
import Audio from '../../assets/serenade-string-e-major.mp3'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Model from '../../assets/models/hand-5.glb'
import { Pane } from 'tweakpane'
import Flamenco from '@flamencojs/flamencojs'
import Concert1 from '../../assets/img/concert-1.jpg'
import Concert2 from '../../assets/img/concert-2.jpg'
import Concert3 from '../../assets/img/concert-3.jpg'
import Concert4 from '../../assets/img/concert-4.jpg'
import Concert5 from '../../assets/img/concert-5.jpg'
import Concert6 from '../../assets/img/concert-6.jpg'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import HDR from '../../assets/img/kloofendal_48d_partly_cloudy_puresky_1k.hdr'
import NormalMap from '../../assets/img/normal.png'
import gsap from 'gsap'

const canvas = ref<HTMLCanvasElement>()

const pane = new Pane()
pane.hidden = true
const PARAMS = {
    scale: 1,
    roughness: 0.5,
    transmission: 1.08,
    thickness: 1,
    ior: 1.73,
    clearcoat: 0.68,
    clearcoatRoughness: 0.49,
    clearcoatNormalScale: 0.52,
    envMapIntensity: 0.91,
}

pane.addBinding(PARAMS, 'scale', {
    min: 0,
    max: 2,
    step: 0.01,
})
// Scene
const scene = new Scene()
scene.background = new Color('#0f0f0f')

//Create a new instance of FlamencoJS
const flamenco = new Flamenco()

//Set your music file

window.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === ' ') {
        flamenco.stop()
    }
})

const gltfLoader = new GLTFLoader()

async function loadModel() {
    const result = await gltfLoader.loadAsync(Model)
    const mesh = result.scene.children[0] as Mesh
    let minZ = Infinity
    let maxZ = -Infinity

    const geometry = mesh.geometry
    geometry.computeBoundingBox()
    minZ = Math.min(minZ, geometry.boundingBox?.min.z || 0)
    maxZ = Math.max(maxZ, geometry.boundingBox?.max.z || 0)
    mesh.scale.set(0.01, 0.01, 0.01)
    mesh.rotation.x = Math.PI
    mesh.position.y = 0.5

    const hdrEquirect = new RGBELoader().load(HDR, () => {
        hdrEquirect.mapping = EquirectangularReflectionMapping
    })

    const textureLoader = new TextureLoader()
    const normalMap = textureLoader.load(NormalMap)

    // Create a MeshToonMaterial instance
    const handMaterial = new MeshPhysicalMaterial({
        roughness: PARAMS.roughness,
        // roughnessMap: normalMap,
        transmission: PARAMS.transmission,
        thickness: PARAMS.thickness,
        envMap: hdrEquirect,
        envMapIntensity: PARAMS.envMapIntensity,
        normalMap: normalMap,
        clearcoat: PARAMS.clearcoat,
        clearcoatMap: normalMap,
        clearcoatRoughness: PARAMS.clearcoatRoughness,
        clearcoatNormalMap: normalMap,
        clearcoatNormalScale: new Vector2(
            PARAMS.clearcoatNormalScale,
            PARAMS.clearcoatNormalScale
        ),
        ior: PARAMS.ior,
    })

    // for (const paramsKey in PARAMS) {
    //     pane.addBinding(PARAMS, paramsKey, {
    //         min: 0,
    //         max: 3,
    //         step: 0.01,
    //     }).on('change', () => {
    //         handMaterial[paramsKey] = PARAMS[paramsKey]
    //         handMaterial.needsUpdate = true
    //     })
    // }

    handMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.fDisplacement = { value: 0.02 }
        shader.uniforms.fDataArray = { value: new Float32Array(128) }
        shader.uniforms.fMinZ = { value: minZ }
        shader.uniforms.fMaxZ = { value: maxZ }

        const uniforms = `
        uniform float fDisplacement;
        uniform float fDataArray[128];
        uniform float fMinZ;
        uniform float fMaxZ;
        `
        // Replace the vertex shader code
        handMaterial.userData.shader = shader
        shader.vertexShader = shader.vertexShader
            .replace(
                '#include <begin_vertex>',
                `
        #include <begin_vertex>

            int index = int((position.z - fMinZ) / (fMaxZ - fMinZ) * 128.0);
            // Clamp the index to the array bounds
            index = clamp(index, 1, 127);
            // Get the data value
            float dataValue = fDataArray[index];
            // Use the data value to displace the position
            vec3 newPosition = position + normal * dataValue * fDisplacement;
            transformed = newPosition;
    `
            )
            .replace('#include <common>', `${uniforms}\n#include <common>`)
    }

    // Now you can use handMaterial as the material for your mesh
    mesh.material = handMaterial

    flamenco.addEffect({
        kind: 'custom',
        onUpdate: ({ dataArray }) => {
            handMaterial.userData.shader.uniforms.fDataArray.value =
                new Float32Array(dataArray.map((d) => d * PARAMS.scale))
            handMaterial.needsUpdate = true
        },
    })
    const group = new Group()
    group.add(mesh)
    scene.add(group)
    group.rotation.z = Math.PI
    return group
}

function addImage({
    url,
    position,
    size = new Vector2(1, 1),
}: {
    url: string
    position: Vector3
    size: Vector2
}) {
    const texture = new TextureLoader().load(url)
    const bg = new Mesh(
        new PlaneGeometry(size.x, size.y, 1, 1),
        new MeshBasicMaterial({ map: texture })
    )
    bg.position.copy(position)
    return bg
}

function addLight() {
    const light = new DirectionalLight(0xffffff, 1)
    light.position.set(0, 2, 0)
    scene.add(light)

    const ambientLight = new AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
}

function createGrid(imgs: string[]) {
    const grid = new Group()
    const size = 1
    const spacing = 0.1
    const rows = 2
    const cols = 3
    const total = rows * cols
    const halfSize = (total * size + (total - 1) * spacing) / 2
    for (let i = 0; i < total; i++) {
        const x = (i % cols) * (size + spacing) - halfSize
        const y = Math.floor(i / cols) * (size + spacing) - halfSize
        const img = addImage({
            url: imgs[i],
            position: new Vector3(x, y, -1),
            size: new Vector2(size, size),
        })
        grid.add(img)
    }
    return grid
}

/**
 * Sizes
 */
const sizes = ref({
    width: window.innerWidth,
    height: window.innerHeight,
})

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(
    75,
    sizes.value.width / sizes.value.height,
    0.1,
    100
)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1
scene.add(camera)

const observer = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) {
            flamenco.play()
        } else {
            flamenco.stop()
        }
    },
    { threshold: [0.1, 0.9] }
)

let renderer: WebGLRenderer | null = null

async function initThree() {
    if (!canvas.value) return
    // Controls
    // const controls = new OrbitControls(camera, canvas.value)
    // controls.enableDamping = true

    renderer = new WebGLRenderer({
        canvas: canvas.value,
        antialias: true,
    })
    renderer.setSize(sizes.value.width, sizes.value.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.value.width = window.innerWidth
        sizes.value.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.value.width / sizes.value.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer?.setSize(sizes.value.width, sizes.value.height)
        renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    const hand = await loadModel()
    hand.position.x = 0.5
    const grid = createGrid([
        Concert1,
        Concert2,
        Concert3,
        Concert4,
        Concert5,
        Concert6,
    ])
    scene.add(grid)
    grid.position.y = 2.8
    grid.position.x = 2.5
    addLight()

    await flamenco.setMusic(Audio)
    observer.observe(canvas.value)
    let previousScroll = window.scrollY

    const handYSetter = gsap.quickSetter(hand.rotation, 'y')
    const gridXSetter = gsap.quickSetter(grid.position, 'x')

    window.addEventListener('scroll', () => {
        handYSetter(window.scrollY * 0.01)
        gridXSetter(grid.position.x + (window.scrollY - previousScroll) * 0.001)
        previousScroll = window.scrollY
    })

    const tick = () => {
        // Render
        renderer?.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    tick()
}

onMounted(initThree)

onBeforeUnmount(() => {
    flamenco.stop()
    renderer?.dispose()
    scene.traverse((child) => {
        if (!(child instanceof Mesh)) return
        child.geometry.dispose()
    })
})
</script>

<template>
    <div class="hand-section">
        <div class="left">
            <h2>Change.</h2>
            <p>The way you interact</p>
        </div>
        <canvas ref="canvas" />
    </div>
    <div class="spacer"></div>
</template>

<style scoped>
.spacer {
    height: 100vh;
    width: 100vw;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hand-section {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    height: 100vh;
    color: white;
    font-size: 1.5rem;

    .left {
        z-index: 1;
        grid-area: 1/-1;
        padding-left: 10vw;
    }

    canvas {
        display: block;
        width: 100%;
        height: 100%;
        grid-area: 1/-1;
    }
}
</style>
