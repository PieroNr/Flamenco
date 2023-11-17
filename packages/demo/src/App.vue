<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Flamenco from 'flamencojs';

const stop = () => {
  flamenco.stop();
};

const flamenco = new Flamenco();
flamenco.setMusic('sound/soupe.mp3');


const start = () => {
  flamenco.play();
};





</script>

<template>
  <div class="animated">
    <button @click="start">Start sound analysis</button>
    <button @click="stop">Stop  sound analysis</button>

    <div class="animated-element1"/>
    <div class="animated-element2"/>
    <div class="animated-element3"/>
    <div class="animated-element4"/>
    <div class="animated-element5"/>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;

  will-change: filter;
  transition: filter 300ms;
}
.animated-element1{
  background-color: white;
  width: 20px;
  height: 20px;
  transition: height 0.1s ease-in-out;
}
.animated-element1, .animated-element2, .animated-element3, .animated-element4, .animated-element5{
  background-color: white;
  width: 20px;
  height: 2px;
  transition: height 0.1s ease-in-out;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.animated {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  height: 100vh;
  gap: 5px;
}
</style>
