<template>
    <div class="grid-container">
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
import MainGridCell from './MainGridCell.vue'
import { Cell } from './types'
import F_letter from '../assets/svg/f_letter.svg'
import LA_letter from '../assets/svg/la-letter.svg'
import M_letter from '../assets/svg/m_letter.svg'
import E_letter from '../assets/svg/e_letter.svg'
import N_letter from '../assets/svg/n_letter.svg'
import C_letter from '../assets/svg/c_letter.svg'
import O_letter from '../assets/svg/o_letter.svg'
import CONCERT1 from '../assets/img/concert-1.jpeg'
import CONCERT2 from '../assets/img/concert-2.jpeg'
import CONCERT3 from '../assets/img/concert-3.jpeg'
import CONCERT4 from '../assets/img/concert-4.jpeg'

const cells = ref<Cell[]>([])
const screenWidth = ref(window.innerWidth)
const themeColor = ref(['#fff', '#2D2D2D', '#D9D9D9'])

const updateCellSizes = () => {
    const cellSize = screenWidth.value / 8
    const fixedCellsIndices = [
        0, 1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23,
        25, 27, 28, 29, 30, 31, 32, 33, 35 ,36, 37, 38
    ]

    const fixedCellParams = [
        { backgroundColor: themeColor.value[0], contentSlot: 'logo' },
        { backgroundColor: themeColor.value[2] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0], contentSlot: 'doc' },
        { backgroundColor: themeColor.value[0], contentSlot: 'about' },
        { backgroundColor: themeColor.value[1] },
        {
            backgroundColor: themeColor.value[0],
            contentSVG: F_letter,
        },
        { backgroundColor: themeColor.value[2], contentSVG: LA_letter },
        { backgroundColor: themeColor.value[0], contentSVG: M_letter },
        { backgroundColor: themeColor.value[2], contentSVG: E_letter },
        {
            backgroundImage: 'https://picsum.photos/200/300',
            blur: 50,
        },
        { backgroundColor: themeColor.value[2], radius: '0 0 50% 0' },
        {
            backgroundImage: 'https://picsum.photos/200/300',
            noise: 50,
        },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundImage: CONCERT1,
            taller: 3,
            backgroundPosition: '25% 26%',
            backgroundSize: 'cover',
        },
        { backgroundColor: themeColor.value[2], contentSVG: N_letter },
        { backgroundColor: themeColor.value[0], contentSVG: C_letter },
        {
            backgroundImage: 'https://picsum.photos/200/300',
            blur: 50,
        },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0], contentSVG: O_letter },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[2], radius: '0 50% 0 0' },
        {
            backgroundImage: 'https://picsum.photos/200/300',
            blur: 50,
        },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundImage: 'https://picsum.photos/200/300',
            noise: 50,
        },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
    ]

    cells.value = Array.from({ length: 38 }, (_, index) => {
        if (fixedCellsIndices.includes(index)) {
            const fixedCellIndex = fixedCellsIndices.indexOf(index)
            const fixedCellParam = fixedCellParams[fixedCellIndex]
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
                backgroundPosition: fixedCellParam.backgroundPosition || 'center',
                backgroundSize: fixedCellParam.backgroundSize,
                contentSlot: fixedCellParam.contentSlot || '',
                contentSVG: fixedCellParam.contentSVG || '',
                contentText: fixedCellParam.contentText || '',
                radius: fixedCellParam.radius || '0',
            }
        } else {
            return {
                width: cellSize + 'px',
                height: cellSize + 'px',
                backgroundColor: 'red',
                blurEffect: Math.random() > 0.5 ? 'blur(5px)' : 'none',
                noiseEffect:
                    Math.random() > 0.5
                        ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/7+o9gAAAABJRU5ErkJggg==")'
                        : 'none',
                backgroundImage: null,
                contentSlot: Math.random() > 0.5 ? 'Random Content' : '',

                contentSVG: '',
                contentText: '',
            }
        }
    })
}

// const getRandomColor = () => {
//     return themeColor.value[Math.floor(Math.random() * themeColor.value.length)]
// }

// Met à jour la taille des cellules lorsque la fenêtre est redimensionnée
const handleResize = () => {
    screenWidth.value = window.innerWidth
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
}
</style>
