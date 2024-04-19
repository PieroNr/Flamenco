<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Audio from '../../assets/serenade-string-e-major.mp3'
import Flamenco from '@flamencojs/flamencojs'
import { HandSectionScene } from './HandSectionScene'

const canvas = ref<HTMLCanvasElement>()
// Scene

const flamenco = new Flamenco()

window.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === ' ') {
        flamenco.stop()
    }
})

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

const emit = defineEmits<{
    (event: 'loaded'): void
}>()
let scene: HandSectionScene
async function initThree() {
    if (!canvas.value) return
    scene = new HandSectionScene(canvas.value, flamenco, () => {
        console.log('loaded')
        emit('loaded')
    })

    await flamenco.setMusic(Audio)
    observer.observe(canvas.value)
}

onMounted(initThree)

onBeforeUnmount(() => {
    flamenco.stop()
    scene.destroy()
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
