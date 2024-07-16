<template>
    <div ref="element" class="grid-container">
        <MainGridCell
            v-for="(cell, index) in cells"
            :key="index + Math.random()"
            :ref="(el) => (cellsOpacity[index] = el)"
            :cell-data="cell"
            class="animate-opacity"
            style="opacity: 0"
        >
            <button
                v-if="cell.prev === true"
                @click="prev(), (prevNext = !prevNext)"
            >
                <img :src="Prev" alt="arrow précédent slider flamenco" />
            </button>
            <button
                v-if="cell.next === true"
                @click="next(), (prevNext = !prevNext)"
            >
                <img :src="Next" alt="arrow suivant slider flamenco" />
            </button>
        </MainGridCell>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MainGridCell from '@/components/MainGridCell.vue'
import CONCERT1 from '@/assets/img/concert-1.jpg'
import CONCERT3 from '@/assets/img/concert-3.jpg'
import CONCERT1UP from '@/assets/img/concert-1-up.jpg'
import Prev from '@/assets/img/prev.png'
import Next from '@/assets/img/next.png'
import { SliderHome2 } from './slides/sliderHome2'
import { SliderHome1 } from './slides/sliderHome1'
import { gsap } from 'gsap'
import { Cell } from '@/components/types'
import { HoverEffect } from '@/components/enums'

const cellsOpacity: any[] = []
const slideHash = ref(Math.random())

const cells = ref<Cell[]>([])
const screenWidth = ref(window.innerWidth)
const themeColor = ref(['#fff', '#2D2D2D', '#D9D9D9'])
const fixedCellParams = ref<Cell[]>([])
const fixedCellsIndices = ref<number[]>([])
const cellSize = screenWidth.value / 8
const prevNext = ref(false)

const element = ref<HTMLDivElement | null>(null)

defineExpose({
    element,
})

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
                blurEffect: fixedCellParam.blurEffect || 0,
                noiseEffect: fixedCellParam.noiseEffect || '',
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
                radius: fixedCellParam.radius || '0',
                next: fixedCellParam.next || false,
                prev: fixedCellParam.prev || false,
                hoverEffect: fixedCellParam.hoverEffect || HoverEffect.None,
                className: fixedCellParam.className || '',
            }
        } else {
            return {
                width: cellSize + 'px',
                height: cellSize + 'px',
                backgroundColor: themeColor.value[0],
            }
        }
    })
}

// Met à jour la taille des cellules lorsque la fenêtre est redimensionnée
const handleResize = () => {
    screenWidth.value = window.innerWidth
}

function shuffle(array: any[]) {
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

const opacities = async (num: number) => {
    return new Promise<void>((resolve) => {
        const shuffledSquares = shuffle(cellsOpacity)
        let completed = 0

        shuffledSquares.forEach((square, index) => {
            gsap.to(square.$el, {
                opacity: num,
                duration: 1 / 5,
                delay: index / 30,
                onComplete: () => {
                    completed++
                    if (completed === shuffledSquares.length) {
                        resolve()
                    }
                },
            })
        })
    })
}

const updateCellsAndAnimate = async () => {
    await opacities(0)

    fixedCellsIndices.value = [
        1, 3, 7, 8, 9, 12, 13, 14, 15, 19, 20, 21, 22, 28, 29,
    ]
    SliderHome2(fixedCellParams.value, CONCERT3, themeColor.value)

    setTimeout(() => {
        if (prevNext.value) {
            cellsValue()
            console.log('cellsValue')
        } else {
            updateCellSizes()
        }
        setTimeout(() => {
            opacities(1)
        }, 100)
    }, 350)
}

const next = async () => {
    slideHash.value = Math.random()
    await updateCellsAndAnimate()
}

const prev = async () => {
    slideHash.value = Math.random()
    await updateCellsAndAnimate()
}

onMounted(() => {
    setTimeout(() => {
        opacities(1)
    }, 500)
    updateCellSizes()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
.grid-container {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    gap: 0;

    p,
    button {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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
