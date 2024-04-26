<template>
    <div class="home-container">
        <LoadingScreen v-if="isLoading" />
        <div>
            <MainGrid @loaded="isLoading = false" />
            <SetupGrid />
            <GridText
                text="flamenco is a Typescript library."
                sub-text="about to change the rythm of your life"
                back-color-index="1"
                text-color-index="0"
                keyword="Typescript"
            />
            <GridText
                text="flamenco is an opensource library."
                sub-text="take part of it"
                back-color-index="0"
                text-color-index="1"
                keyword="opensource"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainGrid from '../components/MainGrid.vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import { watchEffect } from 'vue'
import GridText from '../components/GridText.vue'
import SetupGrid from "../components/SetupGrid.vue";

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
import HandSection from '../sections/handSection/3dHandSection.vue'
import BlobSection from '../sections/blobSection/BlobSection.vue'
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
