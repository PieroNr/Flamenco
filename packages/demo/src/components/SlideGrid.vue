<template>
    <div class="grid-container">
        <MainGridCell
            v-for="(cell, index) in cells"
            :key="index"
            :cell-data="cell"
        >
            <p v-if="index === 18">Color</p>
            <p v-else>{{ index }}</p>
        </MainGridCell>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MainGridCell from './MainGridCell.vue'

export default {
    components: {
        MainGridCell,
    },
    setup() {
        const cells = ref([])
        const screenWidth = ref(window.innerWidth)
        const themeColor = ref(['#fff', '#2D2D2D', '#D9D9D9'])

        const updateCellSizes = () => {
            const cellSize = screenWidth.value / 8
            const fixedCellsIndices = [
                2, 3, 4, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 23,
                24, 25, 26, 27, 29, 31, 32, 33, 34, 37,
            ]

            const fixedCellParams = [
                { backgroundColor: themeColor.value[0], contentSlot: 'logo' },
                { backgroundColor: themeColor.value[0] },
                { backgroundColor: themeColor.value[0] },
                { backgroundColor: themeColor.value[0] },
                { backgroundColor: themeColor.value[0] },
                { backgroundColor: themeColor.value[0], contentSlot: 'about' },
                { backgroundColor: themeColor.value[0] },
                {
                    backgroundColor: themeColor.value[0],
                },
                { backgroundColor: themeColor.value[0], contentSlot: 'LA' },
                { backgroundColor: themeColor.value[0], contentSlot: 'M' },
                { backgroundColor: themeColor.value[0], contentSlot: 'E' },
                {
                    backgroundColor: themeColor.value[2],
                    blur: 50,
                },
                { backgroundColor: themeColor.value[0], larger: 3 },
                {
                    backgroundImage: 'https://picsum.photos/200/300',
                    noise: 50,
                },
                { backgroundColor: themeColor.value[2] },
                { backgroundColor: themeColor.value[0] },
                { backgroundColor: themeColor.value[3] },
                { backgroundColor: themeColor.value[0], contentSlot: 'N' },
                { backgroundColor: themeColor.value[0], contentSlot: 'C' },
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
                { backgroundColor: themeColor.value[0], contentSlot: 'C' },
                { backgroundColor: themeColor.value[0] },
                { backgroundColor: themeColor.value[0] },
                { backgroundColor: themeColor.value[0], radius: '0 50% 0 0' },
                {
                    backgroundImage: 'https://picsum.photos/200/300',
                    blur: 50,
                },
                { backgroundColor: themeColor.value[0] },
                {
                    backgroundImage: 'https://picsum.photos/200/300',
                    noise: 50,
                },
                {
                    backgroundImage: 'https://picsum.photos/200/300',
                    blur: 50,
                },
                { backgroundColor: themeColor.value[0] },
            ]

            cells.value = Array.from({ length: 38 }, (_, index) => {
                let cell = {}
                if (fixedCellsIndices.includes(index)) {
                    // Trouver l'index de l'indice fixe dans fixedCellsIndices
                    const fixedCellIndex = fixedCellsIndices.indexOf(index)
                    // Utiliser cet index pour obtenir les paramètres correspondants dans fixedCellParams
                    const fixedCellParam = fixedCellParams[fixedCellIndex]
                    cell = {
                        width: cellSize + 'px',
                        height: cellSize + 'px',
                        backgroundColor:
                            fixedCellParam.backgroundColor || 'none',
                        blurEffect: fixedCellParam.blur
                            ? `blur(${fixedCellParam.blur}px)`
                            : 'none',
                        noiseEffect: fixedCellParam.noise
                            ? `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/7+o9gAAAABJRU5ErkJggg==")`
                            : 'none',
                        backgroundImage: fixedCellParam.backgroundImage,
                        contentSlot: fixedCellParam.contentSlot || '',
                        contentSVG: fixedCellParam.contentSVG || '',
                        contentText: fixedCellParam.contentText || '',
                        radius: fixedCellParam.radius || '0',
                        larger: fixedCellParam.larger,
                    }
                } else {
                    // Assigner des valeurs aléatoires pour les autres cellules
                    cell = {
                        width: cellSize + 'px',
                        height: cellSize + 'px',
                        backgroundColor: 'red',
                        blurEffect: Math.random() > 0.5 ? 'blur(5px)' : 'none',
                        noiseEffect:
                            Math.random() > 0.5
                                ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/7+o9gAAAABJRU5ErkJggg==")'
                                : 'none',
                        contentSlot:
                            Math.random() > 0.5 ? 'Random Content' : '',
                        radius: Math.random() > 0.5 ? '0' : '0',
                        size: false,
                    }
                }
                return cell
            })
        }

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

        return {
            cells,
        }
    },
}
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
