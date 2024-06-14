<template>
    <div class="loading-screen">
        <div
            v-for="i in 40"
            :key="i"
            :ref="(el) => (squares[i] = el as HTMLElement)"
            class="loading-square"
        ></div>
        <p ref="loader">{{ loadingPercentage }}%</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const loadingPercentage = ref(0)
const loader = ref()
const squares: Array<HTMLElement | null> = []

const increasePercentage = () => {
    const interval = setInterval(() => {
        if (loadingPercentage.value < 100) {
            loadingPercentage.value++
        } else {
            clearInterval(interval)
            gsap.to(loader.value, {
                opacity: 0,
                duration: 1,
                delay: 0.5,
            })
            shuffle(squares).forEach((square: HTMLElement | null) => {
                gsap.to(square, {
                    opacity: 0,
                    duration: 0.01,
                    delay: Math.random(),
                })
            })
        }
    }, 20)
}

function shuffle(array: Array<HTMLElement | null>) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

onMounted(() => {
    increasePercentage()
})
</script>

<style scoped>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 3em;
    z-index: 1000;
}

.loading-square {
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 1;
    transition: opacity 1s;
    background-color: rgb(45, 45, 45);
}

p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: 'League Spartan', sans-serif;
    font-size: 2em;
    margin: 0;
    color: white;
}
</style>
