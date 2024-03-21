<template>
  <div :style="cellStyles" class="grid-cell">
    <img v-if="cellData.contentSVG" :src="cellData.contentSVG" alt="Image" />
    <span v-if="cellData.contentText">{{ cellData.contentText }}</span>
  </div>
</template>

<script>
import {onMounted} from "vue";

export default {
  props: {
    cellData: {
      type: Object,
      required: true
    }
  },
  computed: {
    cellStyles() {
      return {
        width: this.cellData.width,
        height: this.cellData.height,
        backgroundColor: this.cellData.backgroundColor,
        blur: this.cellData.blur,
        noise: this.cellData.backgroundImage,
        backgroundImage: this.cellData.backgroundImage,
        contentSlot: this.cellData.contentSlot,
        squareCorners: this.cellData.cornerRadius
      };
    }
  }
};
</script>

<style>
.grid-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>
