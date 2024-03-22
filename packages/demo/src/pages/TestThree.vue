<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    AdditiveBlending,
    AmbientLight,
    BufferGeometry,
    Clock,
    Color,
    Float32BufferAttribute,
    InstancedMesh,
    Matrix4,
    Mesh,
    MeshPhongMaterial,
    MeshStandardMaterial,
    MeshToonMaterial,
    Object3D,
    PerspectiveCamera,
    Points,
    PointsMaterial,
    Scene,
    SphereGeometry,
    Vector3,
    WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Flamenco from '@flamencojs/flamencojs'
import Audio from '../assets/serenade-string-e-major.mp3'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Model from '../assets/models/devil-horn.gltf'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'
import { Pane } from 'tweakpane'

const canvas = ref<HTMLCanvasElement>()

const pane = new Pane()
const PARAMS = {
    scale: 1,
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
    const vertices: number[] = []
    const colors: number[] = []
    console.log(mesh)
    const meshGeometry = new BufferGeometry()
    const material = new PointsMaterial({
        size: 0.005,
        vertexColors: true,
    })
    const sampler = new MeshSurfaceSampler(mesh).build()
    const points = new Points(meshGeometry, material)
    const position = new Vector3()
    const color = new Color('black')

    const particlesNumber = 5000
    let minY = 0
    let maxY = 0
    for (let i = 0; i < particlesNumber; i++) {
        sampler.sample(position)
        vertices.push(position.x, position.y, position.z)
        colors.push(color.r, color.g, color.b)
        minY = Math.min(minY, position.z)
        maxY = Math.max(maxY, position.z)
    }
    meshGeometry.setAttribute(
        'position',
        new Float32BufferAttribute(vertices, 3)
    )
    meshGeometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
    meshGeometry.computeVertexNormals()
    points.scale.set(0.01, 0.01, 0.01)
    points.rotation.set(-1.57, 0, -1.02)
    points.position.y = -0.5
    scene.add(points)
    console.log(scene)
    console.log(vertices)
    const step = (maxY - minY) / 128
    console.log(minY, maxY, step)
    const steps = Array.from({ length: 128 }, (_, i) => minY + i * step)
    flamenco.addEffect({
        kind: 'custom',
        onUpdate: ({ indexValue, dataArray }) => {
            console.log(indexValue, dataArray)
            const newVertices: number[] = [...vertices]
            steps.forEach((value, index) => {
                const localMinY = value
                const localMaxY = localMinY + step
                for (let i = 0; i < newVertices.length; i += 3) {
                    if (
                        newVertices[i + 2] >= localMinY &&
                        newVertices[i + 2] <= localMaxY
                    ) {
                        newVertices[i + 1] += dataArray[index] * 0.08
                    }
                }
            })
            const newColors: number[] = []

            meshGeometry.setAttribute(
                'position',
                new Float32BufferAttribute(newVertices, 3)
            )
            // meshGeometry.setAttribute(
            //     'color',
            //     new Float32BufferAttribute(newColors, 3)
            // )
            console.log('new', newVertices)
        },
    })

    pane.on('change', (e) => {
        points.scale.set(PARAMS.scale, PARAMS.scale, PARAMS.scale)
    })
}

function addLight() {
    const light = new AmbientLight(0xffffff, 1)
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
    loadModel()
    addLight()

    const clock = new Clock()
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
