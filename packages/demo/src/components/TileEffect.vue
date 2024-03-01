<template>
  <div
    v-if="effect"
    :class="[
      'tile',
      {
        'double-width': effect.isDoubleWidth,
        'first-tile': effect.isFirstTile,
      },
    ]"
    :style="{ backgroundColor: effect.backgroundColor }"
  >
    <div class="content">
      <div
        v-if="effect.customContent"
        class="custom-content"
        v-html="effect.customContent"
      ></div>
      <Music
        v-if="effect.animated"
        :class="['--' + effect.name]"
        width="50"
        height="50"
      /><br />
      <code v-if="effect.animated" class="hover">{{ effect.effectCode }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Flamenco from "@flamencojs/flamencojs";
import Music from "../assets/img/music.vue";

const props = defineProps<{
  effect: {
    name: string;
    isDoubleWidth?: boolean;
    customContent?: string;
    animated?: boolean;
    backgroundColor?: string | undefined;
    isFirstTile?: boolean;
    effectCode?: string;
  };
  flamenco: Flamenco;
}>();

onMounted(() => {
  if (props.effect.animated) {
    props.flamenco.addEffect({kind: props.effect.name, selector: '.--' +props.effect.name});
  }
});
</script>

<style scoped lang="scss">
.tile {
  background-color: #ffffff;
  border-radius: 25px;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  position: relative;
  scale: 1;
  transition: scale 0.2s ease-in-out;

  .content {
    padding: 10px;
    text-align: center;
    width: calc(100% - 20px);
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: all 0.2s ease-in-out;

    .hover {
      opacity: 0;
      transition: all 0.2s ease-in-out;
    }

    &:hover {
      transition: all 0.2s ease-in-out;
      background-color: #343434;

      .hover {
        opacity: 1;
        transition: all 0.2s ease-in-out;
      }
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

  .content {
    justify-content: start;
    margin: 10px 10px 20px 10px;
    align-items: start;
  }
}

.double-width {
  grid-column: span 2;
  aspect-ratio: 2 !important;
}
</style>
