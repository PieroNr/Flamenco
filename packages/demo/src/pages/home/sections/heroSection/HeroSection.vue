<template>
    <div ref="element" class="grid-container">
        <MainGridCell
            v-for="(cell, index) in cells"
            :key="index"
            :cell-data="{
                ...cell,
                width: cellSize + 'px',
                height: cellSize + 'px',
            }"
        >
            <template #default="{ slotId }">
                <NavLink v-if="slotId === docSlotId" to="/docs"> docs </NavLink>
                <NavLink v-else-if="slotId === aboutSlotId" to="/about">
                    about
                </NavLink>
                <PlayButton v-else-if="slotId === playSlotId" />
            </template>
        </MainGridCell>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import MainGridCell from '@/components/MainGridCell.vue'
import { Cell } from '@/components/types.ts'
import F_letter from '@/assets/svg/f_letter.svg'
import LA_letter from '@/assets/svg/la-letter.svg'
import M_letter from '@/assets/svg/m_letter.svg'
import E_letter from '@/assets/svg/e_letter.svg'
import N_letter from '@/assets/svg/n_letter.svg'
import C_letter from '@/assets/svg/c_letter.svg'
import O_letter from '@/assets/svg/o_letter.svg'
import LOGO from '@/assets/svg/logo.svg'
import CONCERT1 from '@/assets/img/concert-1.jpg'
import CONCERT2 from '@/assets/img/concert-2.jpg'
import CONCERT3 from '@/assets/img/concert-3.jpg'
import CONCERT4 from '@/assets/img/concert-4.jpg'
import CONCERT5 from '@/assets/img/concert-5.jpg'
import CONCERT6 from '@/assets/img/concert-6.jpg'
import CONCERT7 from '@/assets/img/concert-7.jpg'
import { HoverEffect } from '@/components/enums.ts'
import NavLink from '@/components/NavLink.vue'
import { themeColors } from '@/utils/theme.ts'
import PlayButton from '@/pages/home/sections/heroSection/PlayButton.vue'

const element = ref<HTMLDivElement>()

const docSlotId = 'docLink'
const aboutSlotId = 'aboutLink'
const playSlotId = 'play'

defineExpose({
    element,
})

const cells = ref<Cell[]>([])
const screenWidth = ref(window.innerWidth)

const cellSize = screenWidth.value / 8

const fixedCellParams: Cell[] = [
    { backgroundColor: themeColors[0], contentSVG: LOGO },
    { backgroundColor: themeColors[2] },
    { backgroundColor: themeColors[0] },
    { backgroundColor: themeColors[0] },
    {
        backgroundColor: themeColors[0],
        contentSlotId: docSlotId,
    },
    {
        backgroundColor: themeColors[0],
        contentSlotId: aboutSlotId,
    },
    { backgroundColor: themeColors[1] },
    {
        backgroundImage: CONCERT4,
        contentSVG: F_letter,
        noiseEffect: true,
        backgroundPosition: '60% 40%',
        backgroundSize: '450%',
        blurEffect: 3,
        hoverEffect: HoverEffect.Roll,
    },
    {
        backgroundColor: themeColors[2],
        contentSVG: LA_letter,
        hoverEffect: HoverEffect.SwipeRight,
    },
    {
        backgroundColor: themeColors[0],
        contentSVG: M_letter,
        hoverEffect: HoverEffect.Morph,
    },
    { backgroundColor: themeColors[2], contentSVG: E_letter },
    {
        backgroundImage: CONCERT4,
        backgroundPosition: '35% 50%',
        backgroundSize: '450%',
        blurEffect: 3,
    },
    { backgroundColor: themeColors[2], radius: '0 0 50% 0' },
    {
        backgroundImage: CONCERT3,
        backgroundPosition: '35% 30%',
        backgroundSize: '450%',
        noiseEffect: true,
    },
    { backgroundColor: themeColors[0] },
    { backgroundColor: themeColors[0] },
    {
        backgroundImage: CONCERT1,
        taller: 3,
        backgroundPosition: '25% 26%',
        backgroundSize: 'cover',
        noiseEffect: true,
    },
    { backgroundColor: themeColors[2], contentSVG: N_letter },
    { backgroundColor: themeColors[0], contentSVG: C_letter },
    {
        backgroundImage: CONCERT7,
        blurEffect: 3,
        backgroundPosition: '40% 50%',
        backgroundSize: '300%',
    },
    { backgroundColor: themeColors[0] },
    { backgroundColor: themeColors[0] },
    { backgroundColor: themeColors[0], contentSVG: O_letter },
    {
        backgroundColor: themeColors[0],
        taller: 2,
        larger: 2,
        contentSlotId: playSlotId,
    },
    { backgroundColor: themeColors[2], radius: '0 50% 0 0' },
    {
        backgroundImage: CONCERT5,
        backgroundPosition: '45% 50%',
        backgroundSize: '300%',
    },
    { backgroundColor: themeColors[0] },
    {
        backgroundImage: CONCERT6,
        backgroundPosition: '85% 50%',
        backgroundSize: '300%',
        radius: '0 0 0 25%',
        blurEffect: 2,
    },
]
const fixedCellsIndices = [
    0, 1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23, 25,
    27, 28, 29, 31, 32, 33, 35, 36,
]

const generateCells = () => {
    cells.value = Array.from({ length: 35 }, (_, index): Cell => {
        if (fixedCellsIndices.includes(index)) {
            const fixedCellIndex = fixedCellsIndices.indexOf(index)
            const fixedCellParam = fixedCellParams[fixedCellIndex]
            console.log(fixedCellIndex, fixedCellParam)
            return {
                backgroundColor: fixedCellParam.backgroundColor || 'none',
                blurEffect: fixedCellParam.blurEffect,
                noiseEffect: fixedCellParam.noiseEffect,
                backgroundImage: fixedCellParam.backgroundImage,
                taller: fixedCellParam.taller,
                backgroundPosition:
                    fixedCellParam.backgroundPosition || 'center',
                backgroundSize: fixedCellParam.backgroundSize,
                contentSlot: fixedCellParam.contentSlot || '',
                contentSVG: fixedCellParam.contentSVG || '',
                contentSlotId: fixedCellParam.contentSlotId || '',
                radius: fixedCellParam.radius || '0',
                transform: '', // Add default values for the missing properties
                contentText: '',
                larger: fixedCellParam.larger ?? 0,
                opacity: 1,
                className: '',
                hoverEffect: fixedCellParam.hoverEffect || HoverEffect.None,
            }
        } else {
            const random = Math.random()
            return {
                backgroundColor: themeColors[0],
                blurEffect: random > 0.7 ? 3 : 0,
                noiseEffect: random < 0.3,
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
                transform: '',
                hoverEffect: HoverEffect.None,
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

onMounted(() => {
    generateCells()
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
    height: calc(100vh);
    margin: 0;
    padding: 0;
    gap: 0;
}
</style>
