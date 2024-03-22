<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    AmbientLight,
    BufferGeometry,
    Clock,
    Color,
    Float32BufferAttribute,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    Points,
    PointsMaterial,
    Scene,
    ShaderMaterial,
    Vector3,
    WebGLRenderer,
    UniformsLib,
    DirectionalLight,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Flamenco from '@flamencojs/flamencojs'
import Audio from '../assets/serenade-string-e-major.mp3'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Model from '../assets/models/devil-horn.gltf'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'
import { Pane } from 'tweakpane'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'

const canvas = ref<HTMLCanvasElement>()

const pane = new Pane()
const PARAMS = {
    scale: 1,
}
const clock = new Clock()

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

async function loadModel(renderer: WebGLRenderer) {
    const result = await gltfLoader.loadAsync(Model)
    const mesh = result.scene.children[0] as Mesh
    const shaderMaterial = new ShaderMaterial({
        uniforms: {
            ...UniformsLib['lights'],
            time: { value: 0 },
            displacement: { value: 0.02 },
            dataArray: { value: new Float32Array(128) },
            minZ: { value: 0 },
            maxZ: { value: 0 },
        },
        lights: true,
        vertexShader: `
        uniform float displacement;
        uniform float dataArray[128];
        uniform float minZ;
        uniform float maxZ;
        varying vec3 vNormal;

        void main() {
            vNormal = normal;
            // Calculate the index based on the z position
            int index = int((position.z - minZ) / (maxZ - minZ) * 128.0);
            // Clamp the index to the array bounds
            index = clamp(index, 1, 127);
            // Get the data value
            float dataValue = dataArray[index];
            // Use the data value to displace the position
            vec3 newPosition = position + normal * dataValue * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }

    `,
        fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 directionalLightColor[1];
        uniform vec3 directionalLightDirection[1];

        void main() {
            vec3 light = vec3(0.0);
            for(int i = 0; i < 1; i++) {
                // Calculate the diffuse lighting
                float diffuse = max(dot(vNormal, directionalLightDirection[i]), 0.0);
                // Add the contribution of this light to the total light
                light += directionalLightColor[i] * diffuse;
            }
            // Use the light to calculate the final color
            gl_FragColor = vec4(light, 1.0);
        }
    `,
    })
    mesh.material = shaderMaterial
    let minZ = Infinity
    let maxZ = -Infinity

    const geometry = mesh.geometry
    geometry.computeVertexNormals()
    geometry.computeBoundingBox()
    minZ = Math.min(minZ, geometry.boundingBox?.min.z || 0)
    maxZ = Math.max(maxZ, geometry.boundingBox?.max.z || 0)
    scene.add(mesh)
    mesh.scale.set(0.01, 0.01, 0.01)
    mesh.rotation.set(-1.57, 0, -1.02)
    mesh.position.y = -0.5
    const helper = new VertexNormalsHelper(mesh, 1, 0xff0000)
    // scene.add(helper)

    shaderMaterial.uniforms.minZ.value = minZ
    shaderMaterial.uniforms.maxZ.value = maxZ
    flamenco.addEffect({
        kind: 'custom',
        onUpdate: ({ indexValue, dataArray }) => {
            shaderMaterial.uniforms.dataArray.value = new Float32Array(
                dataArray
            )
            shaderMaterial.needsUpdate = true

            console.log(dataArray)
            // meshGeometry.setAttribute(
            //     'color',
            //     new Float32BufferAttribute(newColors, 3)
            // )
        },
    })
}

function addLight() {
    const light = new DirectionalLight(0xffffff, 1)
    light.position.set(0, 1, 0)
    scene.add(light)
    console.log(light)
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
    loadModel(renderer)
    addLight()

    let lastElapsedTime = 0

    const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - lastElapsedTime
        lastElapsedTime = elapsedTime

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
