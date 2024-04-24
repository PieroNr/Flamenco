<template>
    <div class="home-container">
        <MainGrid />
        <HandSection />
        <BlobSection />
    </div>
</template>

<script setup lang="ts">
import MainGrid from '../components/MainGrid.vue'
import HandSection from '../sections/handSection/3dHandSection.vue'
import BlobSection from '../sections/blobSection/BlobSection.vue'
</script>

<style scoped lang="scss">
.home-container {
}
</style>
