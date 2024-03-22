<template>
    <div :style="cellStyles" class="grid-cell">
        <img
            v-if="props.cellData.contentSVG"
            class="grid-cell__svg"
            :src="props.cellData.contentSVG"
            alt="Image"
        />
<!--        <img
            v-if="props.cellData.backgroundImage"
            :style="imgStyles"
            class="grid-cell__background"
            :src="props.cellData.backgroundImage"
            alt="Image"
        />-->
        <span v-if="props.cellData.contentText">{{
            props.cellData.contentText
        }}</span>
    </div>
</template>

<script lang="ts" setup>
import type { Cell } from './types'
import { computed } from 'vue'

const props = defineProps<{ cellData: Cell }>()
const cellStyles = computed(() => {
    return {
        width: props.cellData.larger ? '100%' : props.cellData.width,
        height: props.cellData.taller ? '100%' : props.cellData.height,
        backgroundColor: props.cellData.backgroundColor,
        backgroundImage: 'url('+props.cellData.backgroundImage+')',
        backgroundPosition: props.cellData.backgroundPosition,
        backgroundSize: props.cellData.backgroundSize,
        contentSlot: props.cellData.contentSlot,
        gridColumn: props.cellData.larger
            ? 'span ' + props.cellData.larger
            : '',
        borderRadius: props.cellData.radius,
        gridRow: props.cellData.taller ? `span ${props.cellData.taller}` : null,
    }
})

const imgStyles = computed(() => {
    return {
        filter: `blur(${props.cellData.blurEffect}px)`,
        transform: props.cellData.transform,
    }
})
</script>

<style lang="scss">
.grid-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    background-repeat: no-repeat;
  filter: grayscale(1);

    &__svg {
        max-width: 100%;
        max-height: 100%;
        width: 100%;
    }

    &__background {
      width: 100%;
      height: 100%;
      object-fit: none;
      position: absolute;
    }
}

.large-column {
    grid-column: span 3;
    width: 100% !important;
}
</style>
