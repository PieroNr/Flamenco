<template>
    <div class="home-container">
        <LoadingScreen v-if="isLoading" />
        <div>
            <MainGrid @loaded="isLoading = false" />
            <GridText text="flamenco is a Typescript library." sub-text="about to change the rythm of your life"/>
            <GridText text="flamenco is an opensource library." sub-text="take part of it"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainGrid from '../components/MainGrid.vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import { watchEffect } from 'vue'
import GridText from '../components/GridText.vue'

const isLoading = ref(true)

watchEffect(() => {
    if (isLoading.value) {
        window.scrollTo(0, 0)
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
