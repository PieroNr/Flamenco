<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    BoxGeometry,
    Clock,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = ref<HTMLCanvasElement>()

// Scene
const scene = new Scene()

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

const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(cube)

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
