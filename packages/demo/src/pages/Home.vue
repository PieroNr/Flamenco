<template>
  <div class="home-container">
    <MainGrid/>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainGrid from "../components/MainGrid.vue";

</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f0f0f0;
}

</style>
