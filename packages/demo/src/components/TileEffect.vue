<template>
  <div :class="['tile', { 'double-width': isDoubleWidth, 'first-tile': isFirstTile}]" :style="{ backgroundColor: backgroundColor }">
    <div class="content">
      <b v-if="!customContent">{{ effectName }}</b>
      <div v-if="customContent" class="custom-content" v-html="customContent"></div>
      <div :class="['--'+effectName]" :style="{ width: '50%', aspectRatio: 1, position: 'absolute', zIndex: 0, borderRadius: '20px'}"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import Flamenco from 'flamencojs';


const props = defineProps<{
  effectName: {
    type: String,
    required: true
  },
  isDoubleWidth: {
    type: Boolean,
    default: false
  },
  customContent: {
    type: String,
    default: ''
  },
  animated: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: ''
  },
  isFirstTile: {
    type: Boolean,
    default: false
  },
  flamenco: {
    type: Flamenco,
    required: true
  }

}>()

onMounted(() => {
  if (props.animated) {
    console.log(props.effectName, '.--'+props.effectName  );
    props.flamenco.setEffect(props.effectName, '.--'+props.effectName);
  }
});
</script>

<style scoped lang="scss">
.tile {
  background-color: #FFFFFF;
  border-radius: 25px;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  position: relative;
  scale: 1.0;
  transition: scale 0.2s ease-in-out;

  .content {
    padding: 10px;
    text-align: center;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    b {
      font-size: 24px;
      font-weight: bold;
      z-index: 1;
    }
  }

  .custom-content {
    margin-top: 10px;
  }

  &:hover {
    scale: 1.02;
    transition: scale 0.2s ease-in-out;
  }
}



.first-tile {
  overflow-y: scroll;

  .content{
    justify-content: start;
    margin: 10px 10px 20px 10px;
    align-items: start;


  }
}

.double-width {
  grid-column: span 2;
  aspect-ratio: 2!important;
}
</style>
