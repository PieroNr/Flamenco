<script setup lang="ts">

import Flamenco from 'flamencojs';
import Home from './pages/Home.vue';

// const flamenco = new Flamenco();
// var isPlaying = false;
// flamenco.setMusic('sound/freeze.mp3');


// const start = () => {
//   if (isPlaying) {
//     flamenco.stop();
//     isPlaying = false;
//   } else {
//     flamenco.play();
//     isPlaying = true;
//   }
// };



</script>

<template>
  <div class="container">
    <Home />
  </div>
</template>


<style scoped lang="scss">
  .container{
    margin: 48px 128px;
  }
</style>