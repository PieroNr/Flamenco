<template>
    <div :style="cellStyles" class="grid-cell">
        <img
            v-if="props.cellData.contentSVG"
            class="grid-cell__svg"
            :src="props.cellData.contentSVG"
            alt="Image"
        />
      <div
          :style="blurStyles"
          v-if="props.cellData.blurEffect"
        class="grid-cell__blur"
    </div>
  <div class="grid-cell__noise"  v-if="props.cellData.noiseEffect">
    <svg>
    <filter id="noise">
      <feTurbulence id="turbulence">
        <animate
            attributeName="baseFrequency"
            dur="50s"
            values="0.9 0.9;0.8 0.8; 0.9 0.9"
            repeatCount="indefinite"
        ></animate>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" scale="60"></feDisplacementMap>
    </filter>
  </svg></div>

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
        <div class="grid-cell__contentSlot" v-else-if="props.cellData.contentSlot" v-html="props.cellData.contentSlot"></div>
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
        background: "url("+props.cellData.backgroundImage+") no-repeat left top",
        backgroundColor: props.cellData.backgroundColor,
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

if(props.cellData.noiseEffect){
  console.log(cellStyles)
}

const blurStyles = computed(() => {
    return {
        backdropFilter: `blur(${props.cellData.blurEffect}px)`,
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
    font-family: "League Spartan", sans-serif;

  &__noise {
    position: absolute;
    top: -50px;
    left: -50px;
    width: calc(100% + 50px);
    height: calc(100% + 50px);
    background: repeating-linear-gradient(rgba(17, 17, 17, 0.16), rgba(255, 255, 255, 0.25) 50%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0.45));
    background-size: 5px 5px;
    filter: url(#noise);
  }


    &__svg {
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        z-index: 1;
    }

    &__background {
      width: 100%;
      height: 100%;
      object-fit: none;
      position: absolute;
    }

    &__blur {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 0;
    }

    &__contentSlot {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  router-link {
    text-decoration: underline;
    font-size: 1.5rem;
    text-underline-offset: 0.5em;
    color: inherit;
  }
}

.large-column {
    grid-column: span 3;
    width: 100% !important;
}
</style>
