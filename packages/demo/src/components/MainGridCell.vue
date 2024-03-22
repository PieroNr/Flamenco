<template>
    <div :style="cellStyles" class="grid-cell">
        <!--        <img-->
        <!--            v-if="cellData.contentSVG"-->
        <!--            :src="cellData.contentSVG"-->
        <!--            alt="Image"-->
        <!--        />-->
        <!--        <span v-if="cellData.contentText">{{ cellData.contentText }}</span>-->
    </div>
</template>

<script lang="ts" setup>
import type { Cell } from './types'
import { computed } from 'vue'

const props = defineProps<{ cellData: Cell }>()
const cellStyles = computed(() => {
    return {
        width: props.cellData.width,
        height: props.cellData.height,
        backgroundColor: props.cellData.backgroundColor,
        noise: props.cellData.backgroundImage,
        backgroundImage: props.cellData.backgroundImage,
        contentSlot: props.cellData.contentSlot,
    }
})
</script>

<style>
.grid-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}
</style>
