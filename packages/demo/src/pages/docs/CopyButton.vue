<script setup lang="ts">
import DarkIcon from './copy-dark.png'
import LightIcon from './copy-light.png'
import gsap from 'gsap'
import { ref } from 'vue'

const props = defineProps<{
    theme: 'dark' | 'light'
    code: string
}>()

const img = ref<HTMLImageElement>()

async function copyCode() {
    try {
        await navigator.clipboard.writeText(props.code)
        console.log('Code copied to clipboard')
        if (!img.value) {
            throw new Error('Image not found')
        }
        const tl = gsap.timeline({
            onStart: () => {
                gsap.set(img.value, { transition: 'none' })
            },
            onComplete: () => {
                gsap.set(img.value, { clearProps: 'all' })
            },
        })
        tl.to(img.value, { rotation: 10, duration: 0.1 })
        tl.to(img.value, { rotation: -10, duration: 0.1 })
        tl.to(img.value, { rotation: 0, duration: 0.2 })
        tl.play()
    } catch ($e) {
        console.error('Failed to copy code:', $e)
    }
}

defineExpose({ copyCode })
</script>

<template>
    <img ref="img" :src="theme === 'dark' ? LightIcon : DarkIcon" />
</template>

<style scoped>
img {
    height: 18px;
}

button {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
}
</style>
