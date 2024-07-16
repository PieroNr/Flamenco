<script setup lang="ts">
import DarkIcon from './copy-dark.png'
import LightIcon from './copy-light.png'
const props = defineProps<{
    theme: 'dark' | 'light'
    code: string
}>()

async function copyCode() {
    try {
        await navigator.clipboard.writeText(props.code)
        console.log('Code copied to clipboard')
    } catch ($e) {
        console.error('Failed to copy code:', $e)
    }
}
</script>

<template>
    <button type="button" @click="copyCode">
        <img :src="theme === 'dark' ? LightIcon : DarkIcon" />
    </button>
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
