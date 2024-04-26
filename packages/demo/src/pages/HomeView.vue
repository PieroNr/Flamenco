<template>
    <div class="home-container">
        <LoadingScreen v-if="isLoading" />
        <div class="section-container">
            <MainGrid ref="mainGrid" @loaded="isLoading = false" />

            <GridText
                ref="gridText1"
                text="flamenco is a Typescript library."
                sub-text="about to change the rythm of your life"
                back-color-index="1"
                text-color-index="0"
                keyword="Typescript"
            />
            <SetupGrid ref="setupGrid" />
            <hand-section ref="handSection" />

            <GridText
                ref="gridText2"
                text="flamenco is an opensource library."
                sub-text="take part of it"
                back-color-index="0"
                text-color-index="1"
                keyword="opensource"
            />
            <BlobSection ref="blobSection" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MainGrid from '../components/MainGrid.vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import { watchEffect } from 'vue'
import GridText from '../components/GridText.vue'
import SetupGrid from '../components/SetupGrid.vue'
import HandSection from '../sections/handSection/3dHandSection.vue'
import BlobSection from '../sections/blobSection/BlobSection.vue'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const isLoading = ref(true)
const mainGrid = ref<typeof MainGrid>()
const gridText1 = ref<typeof GridText>(null)
const setupGrid = ref<typeof SetupGrid>(null)
const handSection = ref<typeof HandSection>(null)
const gridText2 = ref<typeof GridText>(null)
const blobSection = ref<typeof BlobSection>(null)

onMounted(() => {
    const sections = [
        mainGrid.value.element,
        gridText1.value.element,
        setupGrid.value.element,
        handSection.value.element,
        gridText2.value.element,
        blobSection.value.element,
    ]

  gsap.to(sections, {
    yPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".section-container",
      pin: true,
      scrub: 0,
      snap: 1 / (sections.length - 1),
      end: "+=3500",
    }
  });
})

watchEffect(() => {
    if (isLoading.value) {
        window.scrollTo(0, 0)
        document.body.classList.add('no-scroll')
    } else {
        document.body.classList.remove('no-scroll')
        window.scrollTo(0, 0)
        ScrollSmoother.create({
            smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
            effects: true, // looks for data-speed and data-lag attributes on elements
            smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
        })
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
