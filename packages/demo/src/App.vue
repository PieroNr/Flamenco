<script setup lang="ts">
import { useFlamenco } from './utils/useFlamenco.ts'

const { initialized } = useFlamenco()
</script>

<template>
    <div v-if="initialized" class="container">
        <router-view />
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
}
</style>
