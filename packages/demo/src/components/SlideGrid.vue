<template>
    <div class="grid-container">
        <MainGridCell
            v-for="(cell, index) in cells"
            :key="index"
            :ref="(el) => (cellsOpacity[index] = el)"
            :cellData="cell"
            class="animate-opacity"
        >
            <!-- {{ index }} -->
            <button
                v-if="cell.prev === true"
                @click="prev((prevNext = !prevNext))"
            >
                <img :src="Prev" alt="arrow prev flamenco" />
            </button>
            <button
                v-if="cell.next === true"
                @click="next((prevNext = !prevNext))"
            >
                <img :src="Next" alt="arrow prev flamenco" />
            </button>
        </MainGridCell>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MainGridCell from './MainGridCell.vue'
import CONCERT1 from '../assets/img/concert-1.jpeg'
import CONCERT3 from '../assets/img/concert-3.jpeg'
import CONCERT1UP from '../assets/img/concert-1-up.jpg'
import Prev from '../assets/img/prev.png'
import Next from '../assets/img/next.png'
import { SliderHome2 } from './slides/sliderHome2'
import { SliderHome1 } from './slides/sliderHome1'
import { gsap } from 'gsap'
const cellsOpacity = []

const cells = ref([])
const screenWidth = ref(window.innerWidth)
const themeColor = ref(['#fff', '#2D2D2D', '#D9D9D9'])
const fixedCellParams = ref([])
const fixedCellsIndices = ref([])
const cellSize = screenWidth.value / 8
const prevNext = ref(false)

const updateCellSizes = () => {
    fixedCellsIndices.value = [
        2, 3, 8, 9, 10, 13, 14, 15, 16, 19, 20, 21, 25, 26, 27,
    ]

    fixedCellParams.value = SliderHome1(
        CONCERT1,
        CONCERT3,
        CONCERT1UP,
        themeColor.value
    )
    cellsValue()
}

const cellsValue = async () => {
    cells.value = Array.from({ length: 30 }, (_, index) => {
        if (fixedCellsIndices.value.includes(index)) {
            const fixedCellIndex = fixedCellsIndices.value.indexOf(index)
            const fixedCellParam = fixedCellParams.value[fixedCellIndex]
            return {
                width: cellSize + 'px',
                height: cellSize + 'px',
                backgroundColor: fixedCellParam.backgroundColor || 'none',
                blurEffect: fixedCellParam.blur
                    ? `blur(${fixedCellParam.blur}px)`
                    : 'none',
                noiseEffect: fixedCellParam.noise
                    ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/7+o9gAAAABJRU5ErkJggg==")'
                    : 'none',
                backgroundImage: fixedCellParam.backgroundImage,
                transform: fixedCellParam.transform,
                taller: fixedCellParam.taller,
                larger: fixedCellParam.larger,
                backgroundPosition:
                    fixedCellParam.backgroundPosition || 'center',
                backgroundSize: fixedCellParam.backgroundSize,
                contentSlot: fixedCellParam.contentSlot || '',
                contentSVG: fixedCellParam.contentSVG || '',
                contentText: fixedCellParam.contentText || '',
                next: fixedCellParam.next || false,
                prev: fixedCellParam.prev || false,
                radius: fixedCellParam.radius || '0',
            }
        } else {
            return {
                width: cellSize + 'px',
                height: cellSize + 'px',
                backgroundColor: 'white',
                blurEffect: Math.random() > 0.5 ? 'blur(5px)' : 'none',
                noiseEffect:
                    Math.random() > 0.5
                        ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/7+o9gAAAABJRU5ErkJggg==")'
                        : 'none',
                backgroundImage: null,
                contentSlot: Math.random() > 0.5 ? '' : '',

                contentSVG: '',
                contentText: '',
            }
        }
    })
}

// Met à jour la taille des cellules lorsque la fenêtre est redimensionnée
const handleResize = () => {
    screenWidth.value = window.innerWidth
}

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex

    // Tant qu'il reste des éléments à mélanger...
    while (0 !== currentIndex) {
        // Choisissez un élément restant...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // Et échangez-le avec l'élément actuel.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

const opacities = async (num) => {
    return new Promise((resolve) => {
        const shuffledSquares = shuffle(cellsOpacity)
        let completed = 0
        const buttonIndices = cells.value
            .map((cell, index) => (cell.next || cell.prev ? index : -1))
            .filter((index) => index !== -1)
        shuffledSquares.forEach((square, index) => {
            completed++
            if (index !== buttonIndices[0] && index !== buttonIndices[1]) {
                console.log(index)
                gsap.to(square.$el, {
                    opacity: num,
                    duration: 1 / 10,
                    delay: index / 30,
                    onComplete: () => {
                        if (completed === shuffledSquares.length) {
                            resolve()
                        }
                    },
                })
            }
        })
    })
}

const updateCellsAndAnimate = async () => {
    // Attend que les opacités soient réduites avant de mettre à jour les cellules
    await opacities(0)

    // Met à jour les cellules avec les nouveaux paramètres
    fixedCellsIndices.value = [
        1, 3, 7, 8, 9, 12, 13, 14, 15, 19, 20, 21, 22, 28, 29,
    ]
    SliderHome2(fixedCellParams.value, CONCERT3, themeColor.value)

    setTimeout(() => {
        if (prevNext.value) {
            cellsValue()
        } else {
            updateCellSizes()
        }
        opacities(1)
    }, 350)
}

const next = async (bool) => {
    // Met à jour les cellules et effectue les animations
    await updateCellsAndAnimate(bool)
}

const prev = async (bool) => {
    await updateCellsAndAnimate(bool)
}

onMounted(() => {
    updateCellSizes()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style>
.grid-container {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    gap: 0;

    h2,
    button {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h2 {
        font-size: 7vw;
    }

    button {
        border: none;
        cursor: pointer;

        img {
            width: 25%;
        }
    }
}
</style>
