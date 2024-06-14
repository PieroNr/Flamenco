<template>
    <div ref="element" class="grid-container">
        <MainGridCell
            v-for="(cell, index) in cells"
            :key="index"
            :cell-data="cell"
        >
            <img v-if="cell.contentSlot === 'image'" src="" />
            <span v-else-if="cell.contentSlot === 'text'">Contenu texte</span>
        </MainGridCell>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { defineEmits } from 'vue'
import MainGridCell from './MainGridCell.vue'
import { Cell } from './types'
import NOISE from '../assets/svg/noise.svg'
import CONCERT1 from '../assets/img/concert-1.jpg'
import CONCERT2 from '../assets/img/concert-2.jpg'
import CONCERT3 from '../assets/img/concert-3.jpg'
import CONCERT4 from '../assets/img/concert-4.jpg'
import CONCERT5 from '../assets/img/concert-5.jpg'
import CONCERT6 from '../assets/img/concert-6.jpg'
import CONCERT7 from '../assets/img/concert-7.jpg'

const element = ref<HTMLDivElement>()

defineExpose({
    element,
})

const emit = defineEmits(['loaded'])
const cells = ref<Cell[]>([])
const screenWidth = ref(window.innerWidth)
const themeColor = ref(['#fff', '#2D2D2D', '#D9D9D9'])

const updateCellSizes = () => {
    const cellSize = screenWidth.value / 8
    const fixedCellsIndices = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22,
    ]

    const fixedCellParams: Cell[] = [
        { backgroundColor: themeColor.value[0], taller: 2 },
        {
            backgroundColor: themeColor.value[1],
            radius: '0 0 50% 0',
            backgroundImage: CONCERT4,
            backgroundPosition: '20% 20%',
            backgroundSize: '200%',
            noiseEffect: NOISE,
        },
        {
            backgroundColor: themeColor.value[1],
            backgroundImage: CONCERT7,
            backgroundPosition: '40% 40%',
            backgroundSize: '200%',
        },
        { backgroundColor: themeColor.value[0], larger: 2 },
        {
            backgroundColor: themeColor.value[1],
            backgroundImage: CONCERT2,
            backgroundPosition: '40% 40%',
            backgroundSize: '200%',
            blurEffect: 2,
        },
        { backgroundColor: themeColor.value[1] },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundColor: themeColor.value[0],
            larger: 2,
            contentSlot: `<div class="grid-cell-title"><h2 class="colors grid-cell-title__text">setup.</h2></div>`,
            className: 'overflow',
        },
        { backgroundColor: themeColor.value[0], larger: 3 },
        {
            backgroundColor: themeColor.value[1],
            backgroundImage: CONCERT1,
            backgroundPosition: '40% 40%',
            backgroundSize: '200%',
            noiseEffect: NOISE,
        },
        { backgroundColor: themeColor.value[2] },
        {
            backgroundColor: themeColor.value[1],
            radius: '50% 0 0 0',
            backgroundImage: CONCERT3,
            backgroundPosition: '40% 40%',
            backgroundSize: '200%',
        },
        { backgroundColor: themeColor.value[2], larger: 3 },
        {
            backgroundColor: themeColor.value[0],
            larger: 2,
            contentSlot:
                '<router-link  to="/doc">see the documentation</router-link>',
        },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundColor: themeColor.value[1],
            radius: '0 50% 0 0',
            backgroundImage: CONCERT5,
            backgroundPosition: '60% 50%',
            backgroundSize: '500%',
        },
        { backgroundColor: themeColor.value[0], taller: 2 },
        { backgroundColor: themeColor.value[1], larger: 3 },
        {
            backgroundColor: themeColor.value[1],
            taller: 2,
            radius: '0 0 0 25%',
            backgroundImage: CONCERT6,
            backgroundPosition: '40% 40%',
            backgroundSize: '500%',
        },
        { backgroundColor: themeColor.value[0], larger: 3 },
        { backgroundColor: themeColor.value[0], larger: 3 },
        { backgroundColor: themeColor.value[0], larger: 2 },
        { backgroundColor: themeColor.value[1] },
    ]

    cells.value = Array.from({ length: 23 }, (_, index) => {
        if (fixedCellsIndices.includes(index)) {
            const fixedCellIndex = fixedCellsIndices.indexOf(index)
            const fixedCellParam = fixedCellParams[fixedCellIndex]
            return {
                width: cellSize + 'px',
                height: cellSize + 'px',
                backgroundColor: fixedCellParam.backgroundColor || 'none',
                blurEffect: fixedCellParam.blurEffect,
                noiseEffect: fixedCellParam.noiseEffect,
                backgroundImage: fixedCellParam.backgroundImage,
                taller: fixedCellParam.taller,
                larger: fixedCellParam.larger,
                backgroundPosition:
                    fixedCellParam.backgroundPosition || 'center',
                backgroundSize: fixedCellParam.backgroundSize,
                contentSlot: fixedCellParam.contentSlot || '',
                contentSVG: fixedCellParam.contentSVG || '',
                contentText: fixedCellParam.contentText || '',
                radius: fixedCellParam.radius || '0',
                hoverEffect: fixedCellParam.hoverEffect,
                className: fixedCellParam.className || '',
            }
        } else {
            const random = Math.random()
            return {
                width: cellSize + 'px',
                height: cellSize + 'px',
                backgroundColor: themeColor.value[0],
                blurEffect: random > 0.7 ? 3 : 0,
                noiseEffect: random < 0.3 ? NOISE : '',
                backgroundImage: [
                    CONCERT1,
                    CONCERT2,
                    CONCERT3,
                    CONCERT4,
                    CONCERT5,
                    CONCERT6,
                    CONCERT7,
                ][Math.floor(Math.random() * 7)],
                backgroundPosition: `${Math.floor(Math.random() * 60) + 20}% ${Math.floor(Math.random() * 60) + 20}%`,
                backgroundSize: `${Math.floor(Math.random() * 200) + 200}%`,
                radius: Math.random() < 0.3 ? getRandomRadius() : '0',
            }
        }
    })
}

const getRandomRadius = () => {
    const random = Math.random()
    if (random < 0.25) {
        return '50% 0 0 0' // Haut gauche
    } else if (random < 0.5) {
        return '0 50% 0 0' // Haut droit
    } else if (random < 0.75) {
        return '0 0 50% 0' // Bas droit
    } else {
        return '0 0 0 50%' // Bas gauche
    }
}

const handleResize = () => {
    screenWidth.value = window.innerWidth
}

onMounted(async () => {
    updateCellSizes()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(5, 1fr);
    background-color: white;
    width: 100vw;
    height: calc(100vh);
    margin: 0;
    padding: 0;
    gap: 0;
}
</style>
