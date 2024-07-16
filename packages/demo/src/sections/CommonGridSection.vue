<template>
    <div
        ref="element"
        class="grid-container"
        :style="{ backgroundColor: themeColor[parseInt(props.backColorIndex)] }"
    >
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
import { defineEmits, defineProps } from 'vue'
import MainGridCell from '../components/MainGridCell.vue'
import { Cell } from '../components/types'
import NOISE from '../assets/svg/noise.svg'
import CONCERT1 from '../assets/img/concert-1.jpg'
import CONCERT2 from '../assets/img/concert-2.jpg'
import CONCERT3 from '../assets/img/concert-3.jpg'
import CONCERT4 from '../assets/img/concert-4.jpg'
import CONCERT5 from '../assets/img/concert-5.jpg'
import CONCERT6 from '../assets/img/concert-6.jpg'
import CONCERT7 from '../assets/img/concert-7.jpg'
import { HoverEffect } from '../components/enums'

const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    subText: {
        type: String,
        default: '',
    },
    backColorIndex: {
        type: String,
        default: '0',
    },
    textColorIndex: {
        type: String,
        default: '1',
    },
    keyword: {
        type: String,
        default: '',
    },
})

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
        0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 18,
    ]

    const fixedCellParams: Cell[] = [
        {
            backgroundColor: themeColor.value[parseInt(props.backColorIndex)],
        },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundColor: themeColor.value[parseInt(props.backColorIndex)],
            larger: 3,
        },
        {
            backgroundColor: themeColor.value[0],
            backgroundImage: CONCERT4,
            backgroundPosition: '40% 50%',
            backgroundSize: '300%',
            noiseEffect: NOISE,
        },
        { backgroundColor: themeColor.value[2], radius: '0 50% 0 0' },
        {
            backgroundColor: themeColor.value[parseInt(props.backColorIndex)],
            larger: 6,
            taller: 3,
            contentSlot: `<div class="grid-cell-custom" style="color: ${themeColor.value[parseInt(props.textColorIndex)]}"><p class="grid-cell-custom__text">${getTextWithKeyWord()}</p>
                        <div class="grid-cell-custom-sub"><span style="background-color: ${themeColor.value[parseInt(props.textColorIndex)]}" class="grid-cell-custom-sub__line" ref="line"></span>
                        <p class="grid-cell-custom-sub__text">${props.subText}</p></div>
                      </div>`,
        },
        { backgroundColor: themeColor.value[2], radius: '0% 0 50% 0' },
        { backgroundColor: themeColor.value[1] },
        {
            backgroundColor: themeColor.value[0],
            backgroundImage: CONCERT3,
            backgroundPosition: '40% 50%',
            backgroundSize: '300%',
            radius: '0 0 0 50%',
        },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundColor: themeColor.value[0],
            backgroundImage: CONCERT1,
            backgroundPosition: '40% 50%',
            backgroundSize: '300%',
        },
        {
            backgroundColor: themeColor.value[parseInt(props.backColorIndex)],
            larger: 3,
        },
        { backgroundColor: themeColor.value[2] },
        {
            backgroundColor: themeColor.value[1],
            backgroundImage: CONCERT2,
            backgroundPosition: '40% 50%',
            backgroundSize: '300%',
            radius: '50% 0 0 0',
        },
    ]

    cells.value = Array.from({ length: 19 }, (_, index) => {
        if (fixedCellsIndices.includes(index)) {
            const fixedCellIndex = fixedCellsIndices.indexOf(index)
            const fixedCellParam = fixedCellParams[fixedCellIndex]
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
                hoverEffect: fixedCellParam.hoverEffect || HoverEffect.None,
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
                transform: '',
            }
        }
    })
}

const getTextWithKeyWord = () => {
    //create a p tag with text and replace the keyword with a span tag with themeColor[2]
    const text = props.text
    const keyword = props.keyword
    return text.replace(
        keyword,
        `<span style="color: ${themeColor.value[2]}">${keyword}</span>`
    )
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
    width: 100vw;
    height: calc(100vh);
    margin: 0;
    padding: 0;
    gap: 0;
}
</style>
