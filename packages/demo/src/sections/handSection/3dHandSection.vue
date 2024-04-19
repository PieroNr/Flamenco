<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Audio from '../../assets/serenade-string-e-major.mp3'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Model from '../../assets/models/hand-5.glb'
import { Pane } from 'tweakpane'
import Flamenco from '@flamencojs/flamencojs'
import BG1 from '../../assets/img/bg_img_1.jpg'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import HDR from '../../assets/img/kloofendal_48d_partly_cloudy_puresky_1k.hdr'
import NormalMap from '../../assets/img/normal.png'

const canvas = ref<HTMLCanvasElement>()

const pane = new Pane()
const PARAMS = {
    scale: 1,
    roughness: 0.33,
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
scene.background = new Color('white')

//Create a new instance of FlamencoJS
const flamenco = new Flamenco()

//Set your music file
flamenco.setMusic(Audio).then(() => {
    //Start the music
    // flamenco.play()
    pane.addButton({ title: 'Play' }).on('click', () => {
        flamenco.play()
    })

    pane.addButton({ title: 'Stop' }).on('click', () => {
        flamenco.stop()
    })
})

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
    scene.add(mesh)
    mesh.scale.set(0.01, 0.01, 0.01)
    mesh.rotation.set(-1.57, 0, -1.02)
    mesh.position.y = -0.5

    const hdrEquirect = new RGBELoader().load(HDR, () => {
        hdrEquirect.mapping = EquirectangularReflectionMapping
    })

    const textureLoader = new TextureLoader()
    const normalMap = textureLoader.load(NormalMap)

    // Create a MeshToonMaterial instance
    const toonMaterial = new MeshPhysicalMaterial({
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

    for (const paramsKey in PARAMS) {
        pane.addBinding(PARAMS, paramsKey, {
            min: 0,
            max: 3,
            step: 0.01,
        }).on('change', () => {
            toonMaterial[paramsKey] = PARAMS[paramsKey]
            toonMaterial.needsUpdate = true
        })
    }

    toonMaterial.onBeforeCompile = (shader) => {
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
        toonMaterial.userData.shader = shader
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

    // Now you can use toonMaterial as the material for your mesh
    mesh.material = toonMaterial

    flamenco.addEffect({
        kind: 'custom',
        onUpdate: ({ dataArray }) => {
            toonMaterial.userData.shader.uniforms.fDataArray.value =
                new Float32Array(dataArray.map((d) => d * PARAMS.scale))
            toonMaterial.needsUpdate = true
        },
    })
}

function addImage({ url, position }: { url: string; position: Vector3 }) {
    const texture = new TextureLoader().load(url)
    const bg = new Mesh(
        new PlaneGeometry(2, 2, 1, 1),
        new MeshBasicMaterial({ map: texture })
    )
    bg.position.copy(position)
    scene.add(bg)
}

function addLight() {
    const light = new DirectionalLight(0xffffff, 1)
    light.position.set(0, 2, 0)
    scene.add(light)

    const ambientLight = new AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

function initThree() {
    if (!canvas.value) return
    // Controls
    const controls = new OrbitControls(camera, canvas.value)
    controls.enableDamping = true

    const renderer = new WebGLRenderer({
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
        renderer.setSize(sizes.value.width, sizes.value.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    loadModel()
    addImage({
        url: BG1,
        position: new Vector3(0, 0, -1),
    })
    addLight()

    const tick = () => {
        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    tick()
}

onMounted(initThree)
</script>

<template>
    <canvas ref="canvas" />
</template>

<style scoped></style>
