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
import CECILE from '../assets/img/profil-cecile.png'
import ADRIEN from '../assets/img/profil-adrien.png'
import TIM from '../assets/img/profil-timothee.png'
import PIERO from '../assets/img/profil-piero.png'
import JESSY from '../assets/img/profil-jessy.png'
import { HoverEffect } from './enums'

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
    0, 1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,22,23,24,25,26,27,28, 29, 30, 31
  ]

  const fixedCellParams: Cell[] = [
    { backgroundColor: themeColor.value[0], contentSVG: LOGO },
    { backgroundColor: themeColor.value[2] },
    { backgroundColor: themeColor.value[0] },
    { backgroundColor: themeColor.value[0] },
    {
      backgroundColor: themeColor.value[0],
      contentSlot: '<a  href="/doc">docs</a>',
    },
    {
      backgroundColor: themeColor.value[0],
      contentSlot: '<a href="/about">about</a>',
    },
    { backgroundColor: themeColor.value[1] ,
      radius: '0 0 50% 0',
    },
    {
      backgroundColor: themeColor.value[0],
      larger: 3,
      contentSlot: `<div class="grid-cell-title" style="margin-left: 60px"><h2 class="grid-cell-title__text">team.</h2></div>`,
      className: 'overflow',
    },
    {
      backgroundColor: themeColor.value[1] ,
    },
    {
      backgroundColor: themeColor.value[0],
    },
    { larger: 2,
    taller: 2,
      backgroundImage: CECILE,
      backgroundSize: '100%',
    },
    {
      backgroundColor: themeColor.value[0],
    },
    { backgroundColor: themeColor.value[2]},
    {
      backgroundImage: ADRIEN,
      backgroundSize: '100%',
      larger: 2,
      taller: 2,
    },
    { backgroundColor: themeColor.value[2] },
    { backgroundColor: themeColor.value[0] },
    {
      backgroundImage: TIM,
      backgroundSize: '100%',
      larger: 2,
      taller: 2,
      radius: '0 25% 0 0',
    },
    { backgroundImage: PIERO,
      backgroundSize: '100%',
      larger: 2,
      taller: 2,
      radius: '0 0 25% 0', },
    { backgroundColor: themeColor.value[0], larger: 2 },
    {
      backgroundColor: themeColor.value[0],
    },
    { backgroundColor: themeColor.value[1] },
    { backgroundImage: JESSY,
      backgroundSize: '100%',
      larger: 2,
      taller: 2,},
    { backgroundColor: themeColor.value[0],},
    { backgroundColor: themeColor.value[2], radius: "0 0 0 50%" },
    { backgroundColor: themeColor.value[0], larger: 2 },
    { backgroundColor: themeColor.value[1], radius: '50% 0 0 0' },
    { backgroundColor: themeColor.value[0],},
    { backgroundColor: themeColor.value[0], larger: 5 },
    {
      backgroundColor: themeColor.value[2],
    },
    { backgroundColor: themeColor.value[0], larger: 2 },
    { backgroundColor: themeColor.value[0] },
    { backgroundColor: themeColor.value[0] },
    { backgroundColor: themeColor.value[0] },
    { backgroundColor: themeColor.value[0] },
    { backgroundColor: themeColor.value[0] },
    { backgroundColor: themeColor.value[1] },
    { backgroundColor: themeColor.value[0] },
  ]

  cells.value = Array.from({ length: 31 }, (_, index) => {
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
        backgroundPosition:
            fixedCellParam.backgroundPosition || 'center',
        backgroundSize: fixedCellParam.backgroundSize,
        contentSlot: fixedCellParam.contentSlot || '',
        contentSVG: fixedCellParam.contentSVG || '',
        radius: fixedCellParam.radius || '0',
        transform: '', // Add default values for the missing properties
        contentText: '',
        larger: fixedCellParam.larger,
        opacity: 1,
        className: '',
        hoverEffect: fixedCellParam.hoverEffect || HoverEffect.None,
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

onMounted(async () => {
  updateCellSizes()
  window.addEventListener('resize', handleResize)
  await new Promise((resolve) => setTimeout(resolve, 4000))
  emit('loaded') // Use emit here
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
