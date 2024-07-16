<script setup lang="ts">
import LoadingScreen from '@/components/LoadingScreen.vue'
import { useFlamenco } from '@/utils/useFlamenco'
import { onMounted, ref, watchEffect } from 'vue'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

const { init } = useFlamenco()
const loader = (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 500)
    })
}
const isLoading = ref(true)

watchEffect(() => {
    if (isLoading.value) {
        window.scrollTo(0, 0)
        document.body.classList.add('no-scroll')
    } else {
        document.body.classList.remove('no-scroll')
    }
})
</script>

<template>
    <div class="container">
        <LoadingScreen :loaders="[init, loader]" @loaded="isLoading = false" />
        <router-view />
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
}
</style>
