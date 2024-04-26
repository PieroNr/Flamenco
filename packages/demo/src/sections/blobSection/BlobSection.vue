<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { BlobSectionScene } from './BlobSectionScene'
import { useFlamenco } from '../../utils/useFlamenco'

const canvas = ref<HTMLCanvasElement>()
// Scene

const flamenco = useFlamenco().get()
console.log(flamenco.value)
const emit = defineEmits<{
    (event: 'loaded'): void
}>()
let scene: BlobSectionScene
async function initThree() {
    if (!canvas.value) return
    scene = new BlobSectionScene(canvas.value, flamenco.value, () => {
        emit('loaded')
    })
}

onMounted(initThree)

onBeforeUnmount(() => {
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
</template>

<style scoped>
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
        padding-right: 10vw;
        justify-self: flex-end;
    }

    canvas {
        display: block;
        width: 100%;
        height: 100%;
        grid-area: 1/-1;
    }
}
</style>
