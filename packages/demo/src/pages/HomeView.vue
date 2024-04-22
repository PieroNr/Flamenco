<template>
    <div class="home-container">
        <LoadingScreen v-if="isLoading" />
        <MainGrid @loaded="isLoading = false" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainGrid from '../components/MainGrid.vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import { watchEffect } from 'vue'

const isLoading = ref(true)

watchEffect(() => {
    if (isLoading.value) {
        document.body.classList.add('no-scroll')
    } else {
        document.body.classList.remove('no-scroll')
        window.scrollTo(0, 0)
    }
})
</script>

<style scoped lang="scss">
.home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
}
</style>
