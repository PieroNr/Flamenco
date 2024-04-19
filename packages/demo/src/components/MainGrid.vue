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
import NOISE from '../assets/svg/noise.svg'
import LOGO from '../assets/svg/logo.svg'
import CONCERT1 from '../assets/img/concert-1.jpg'
import CONCERT2 from '../assets/img/concert-2.jpg'
import CONCERT3 from '../assets/img/concert-3.jpg'
import CONCERT4 from '../assets/img/concert-4.jpg'
import CONCERT5 from '../assets/img/concert-5.jpg'
import CONCERT6 from '../assets/img/concert-6.jpg'
import CONCERT7 from '../assets/img/concert-7.jpg'

const cells = ref<Cell[]>([])
const screenWidth = ref(window.innerWidth)
const themeColor = ref(['#fff', '#2D2D2D', '#D9D9D9'])

const updateCellSizes = () => {
    const cellSize = screenWidth.value / 8
    const fixedCellsIndices = [
        0, 1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23,
        25, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38,
    ]

    const fixedCellParams = [
        { backgroundColor: themeColor.value[0], contentSVG: LOGO },
        { backgroundColor: themeColor.value[2] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundColor: themeColor.value[0],
            contentSlot: '<router-link  to="/doc">docs</router-link>',
        },
        {
            backgroundColor: themeColor.value[0],
            contentSlot: '<router-link  to="/about">about</router-link>',
        },
        { backgroundColor: themeColor.value[1] },
        {
            backgroundImage: CONCERT4,
            contentSVG: F_letter,
            noise: NOISE,
            backgroundPosition: '60% 40%',
            backgroundSize: '450%',
            blur: 3,
        },
        { backgroundColor: themeColor.value[2], contentSVG: LA_letter },
        { backgroundColor: themeColor.value[0], contentSVG: M_letter },
        { backgroundColor: themeColor.value[2], contentSVG: E_letter },
        {
            backgroundImage: CONCERT4,
            backgroundPosition: '35% 50%',
            backgroundSize: '450%',
            blur: 3,
        },
        { backgroundColor: themeColor.value[2], radius: '0 0 50% 0' },
        {
            backgroundImage: CONCERT3,
            backgroundPosition: '35% 30%',
            backgroundSize: '450%',
            noise: NOISE,
        },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundImage: CONCERT1,
            taller: 3,
            backgroundPosition: '25% 26%',
            backgroundSize: 'cover',
            noise: NOISE,
        },
        { backgroundColor: themeColor.value[2], contentSVG: N_letter },
        { backgroundColor: themeColor.value[0], contentSVG: C_letter },
        {
            backgroundImage: CONCERT7,
            blur: 3,
            backgroundPosition: '40% 50%',
            backgroundSize: '300%',
        },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0], contentSVG: O_letter },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[2], radius: '0 50% 0 0' },
        {
            backgroundImage: CONCERT5,
            backgroundPosition: '45% 50%',
            backgroundSize: '300%',
        },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundImage: CONCERT6,
            backgroundPosition: '85% 50%',
            backgroundSize: '300%',
            taller: 2,
            blur: 2,
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
                blurEffect: fixedCellParam.blur,
                noiseEffect: fixedCellParam.noise,
                backgroundImage: fixedCellParam.backgroundImage,
                transform: fixedCellParam.transform,
                taller: fixedCellParam.taller,
                backgroundPosition:
                    fixedCellParam.backgroundPosition || 'center',
                backgroundSize: fixedCellParam.backgroundSize,
                contentSlot: fixedCellParam.contentSlot || '',
                contentSVG: fixedCellParam.contentSVG || '',
                contentText: fixedCellParam.contentText || '',
                radius: fixedCellParam.radius || '0',
            }
        } else {
            const random = Math.random()
            return {
                width: cellSize + 'px',
                height: cellSize + 'px',
                backgroundColor:
                    themeColor.value[
                        Math.floor(Math.random() * themeColor.value.length)
                    ],
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
    grid-template-rows: repeat(6, 1fr);
    width: 100vw;
    height: calc(100vh + 100vh / 4);
    margin: 0;
    padding: 0;
    gap: 0;
}
</style>
