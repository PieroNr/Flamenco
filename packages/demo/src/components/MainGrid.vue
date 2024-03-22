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

const cells = ref<Cell[]>([])
const screenWidth = ref(window.innerWidth)
const themeColor = ref(['#fff', '#2D2D2D', '#D9D9D9'])

const updateCellSizes = () => {
    const cellSize = screenWidth.value / 8
    const fixedCellsIndices = [
        0, 1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23,
        25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38, 39,
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
            backgroundImage: 'url("https://picsum.photos/200/300")',
            contentSVG: './img/f_letter.svg',
            blur: 50,
        },
        { backgroundColor: themeColor.value[2], contentSlot: 'LA' },
        { backgroundColor: themeColor.value[0], contentSlot: 'M' },
        { backgroundColor: themeColor.value[1], contentSlot: 'E' },
        {
            backgroundImage: 'url("https://picsum.photos/200/300")',
            blur: 50,
        },
        { backgroundColor: themeColor.value[2], radius: '0 0 50% 0' },
        {
            backgroundImage: 'url("https://picsum.photos/200/300")',
            noise: 50,
        },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundImage: 'url("https://picsum.photos/200/300")',
            noise: 50,
        },
        { backgroundColor: themeColor.value[1], contentSlot: 'N' },
        { backgroundColor: themeColor.value[0], contentSlot: 'C' },
        {
            backgroundImage: 'url("https://picsum.photos/200/300")',
            blur: 50,
        },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundImage: 'url("https://picsum.photos/200/300")',
            noise: 50,
        },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0], contentSlot: 'C' },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[2], radius: '0 50% 0 0' },
        {
            backgroundImage: 'url("https://picsum.photos/200/300")',
            blur: 50,
        },
        { backgroundColor: themeColor.value[0] },
        {
            backgroundImage: 'url("https://picsum.photos/200/300")',
            noise: 50,
        },
        {
            backgroundImage: 'url("https://picsum.photos/200/300")',
            blur: 50,
        },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
        { backgroundColor: themeColor.value[0] },
    ]

    cells.value = Array.from({ length: 40 }, (_, index) => {
        if (fixedCellsIndices.includes(index)) {
            // Trouver l'index de l'indice fixe dans fixedCellsIndices
            const fixedCellIndex = fixedCellsIndices.indexOf(index)
            // Utiliser cet index pour obtenir les paramètres correspondants dans fixedCellParams
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
                backgroundImage: fixedCellParam.backgroundImage || 'none',
                contentSlot: fixedCellParam.contentSlot || '',
                radius: fixedCellParam.radius || '0',
            }
        } else {
            // Assigner des valeurs aléatoires pour les autres cellules
            return {
                width: cellSize + 'px',
                height: cellSize + 'px',
                backgroundColor: 'red',
                blurEffect: Math.random() > 0.5 ? 'blur(5px)' : 'none',
                noiseEffect:
                    Math.random() > 0.5
                        ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/7+o9gAAAABJRU5ErkJggg==")'
                        : 'none',
                backgroundImage: 'none',
                contentSlot: Math.random() > 0.5 ? 'Random Content' : '',
                radius: Math.random() > 0.5 ? '50%' : '0',
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
