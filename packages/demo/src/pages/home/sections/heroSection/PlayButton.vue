<script setup lang="ts">
import { useFlamenco } from '@/utils/useFlamenco'
import { computed } from 'vue'

const { flamenco } = useFlamenco()

const isPlaying = computed(() => flamenco.value.isPlaying)

function toggle() {
    if (flamenco.value.isPlaying) {
        flamenco.value.stop()
    } else {
        flamenco.value.play()
    }
}
</script>

<template>
    <button class="play-btn" @click="toggle">
        <template v-if="!isPlaying">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-play"
            >
                <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
            Play
        </template>
        <template v-else>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-pause"
            >
                <rect x="14" y="4" width="4" height="16" rx="1" />
                <rect x="6" y="4" width="4" height="16" rx="1" />
            </svg>
            Pause
        </template>
    </button>
</template>

<style scoped lang="scss">
.play-btn {
    font-size: 1.5rem;
    color: inherit;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid black;
    padding-bottom: 0.5em;
    cursor: pointer;

    svg {
        transform: translateY(0.2em);
    }
}
</style>
