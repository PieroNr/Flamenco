<template>
    <div id="smooth-wrapper">
        <div id="smooth-content">
            <div class="home-container">
                <div class="section-container">
                    <HeroSection ref="mainGrid" />
                    <HandSection ref="handSection" />
                    <CommonGridSection
                        ref="gridText1"
                        text="flamenco is a Typescript library."
                        sub-text="about to change the rythm of your life"
                        back-color-index="1"
                        text-color-index="0"
                        keyword="Typescript"
                    />
                    <SetupSection ref="setupGrid" />
                    <FeatureSliderSection ref="slider" />
                    <CommonGridSection
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeroSection from './sections/heroSection/HeroSection.vue'
import CommonGridSection from './sections/CommonGridSection.vue'
import FeatureSliderSection from './sections//slider/FeatureSliderSection.vue'
import HandSection from './sections/handSection/3dHandSection.vue'
import BlobSection from './sections/blobSection/BlobSection.vue'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SetupSection from './sections/SetupSection.vue'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const mainGrid = ref<typeof HeroSection>()
const gridText1 = ref<typeof CommonGridSection>()
const setupGrid = ref<typeof SetupSection>()
const handSection = ref<typeof HandSection>()
const gridText2 = ref<typeof CommonGridSection>()
const blobSection = ref<typeof BlobSection>()
const slider = ref<typeof FeatureSliderSection>()

onMounted(() => {
    const sections = [
        mainGrid.value?.element,
        gridText1.value?.element,
        setupGrid.value?.element,
        handSection.value?.element,
        gridText2.value?.element,
        blobSection.value?.element,
        slider.value?.element,
    ]

    gsap.to(sections, {
        yPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.section-container',
            pin: true,
            scrub: 0,
            snap: 1 / (sections.length - 1),
            end: '+=3500',
        },
    })

    ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    })
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
