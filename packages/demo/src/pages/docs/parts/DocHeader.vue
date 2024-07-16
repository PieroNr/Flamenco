<script setup lang="ts">
import { Cell } from '@/components/types'
import MainGridCell from '@/components/MainGridCell.vue'
import LOGO from '@/assets/svg/logo.svg'
import { themeColors } from '@/utils/theme'
import NavLink from '@/components/NavLink.vue'
import CONCERT3 from '@/assets/img/concert-3.jpg'
import CONCERT4 from '@/assets/img/concert-4.jpg'

const homeSlotId = 'docLink'
const aboutSlotId = 'aboutLink'

const cells: Cell[] = [
    { backgroundColor: themeColors[0], contentSVG: LOGO },
    { backgroundColor: themeColors[2] },
    {
        backgroundImage: CONCERT3,
        blurEffect: 0.5,
        backgroundPosition: `center center`,
        backgroundSize: `cover`,
    },
    { backgroundColor: themeColors[0] },
    { backgroundColor: themeColors[0] },
    {
        backgroundImage: CONCERT4,
        backgroundPosition: `center center`,
        backgroundSize: `cover`,
    },
    {
        backgroundColor: themeColors[0],
        contentSlotId: homeSlotId,
    },
    {
        backgroundColor: themeColors[0],
        contentSlotId: aboutSlotId,
    },
]
</script>

<template>
    <div class="doc-header">
        <MainGridCell v-for="(cell, i) in cells" :key="i" :cell-data="cell">
            <template #default="{ slotId }">
                <NavLink v-if="slotId === homeSlotId" to="/"> home </NavLink>
                <NavLink v-else-if="slotId === aboutSlotId" to="/about">
                    about
                </NavLink>
            </template>
        </MainGridCell>
    </div>
</template>

<style scoped lang="scss">
.doc-header {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    width: 100vw;
    height: 15vh;
    margin: 0;
    padding: 0;
    gap: 0;
}
</style>
