<template>
  <div v-if="effect" :class="['tile', { 'double-width': effect.isDoubleWidth, 'first-tile': effect.isFirstTile}]" :style="{ backgroundColor: effect.backgroundColor }">
    <div class="content">
      <b v-if="!effect.customContent">{{ effect.name }}</b>
      <div v-if="effect.customContent" class="custom-content" v-html="effect.customContent"></div>
      <div :class="['--'+effect.name]" :style="{ width: '50%', aspectRatio: 1, position: 'absolute', zIndex: 0, borderRadius: '20px'}"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import Flamenco from 'flamencojs';


const props = defineProps<{
  effect: {
    type: { name: string, isDoubleWidth: boolean, customContent: string, animated: boolean, backgroundColor: string | undefined, isFirstTile: boolean },
  },
  flamenco: {
    type: Flamenco,
  },

}>()

onMounted(() => {
  if (props.effect.animated) {
    console.log(props.effect.name, '.--'+props.effect.name  );
    props.flamenco.setEffect(props.effect.name, '.--'+props.effect.name);
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
