<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SoundAnalyser from 'flamencojs';

const analyser = new SoundAnalyser();
const animatedElement = ref(null);

onMounted(() => {
  analyser.audioContext.resume();
  animatedElement.value = document.querySelector('.animated-element');});


const startSoundAnalysis = async () => {
  try {
    const response = await fetch('./sound/freeze.mp3');
    const buffer = await response.arrayBuffer();
    const audioBuffer = await analyser.audioContext.decodeAudioData(buffer);

    analyser.analyzeSound(audioBuffer, (dataArray) => {
      animatedElement.value.style.height = `${dataArray[10]/2}px`;
    });
  } catch (error) {
    console.error('Erreur de chargement du fichier audio', error);
  }
};
</script>

<template>
  <div>
    <button @click="startSoundAnalysis">Start sound analysis</button>
    <a href="https://vitejs.dev" target="_blank">
      <img ref="animatedElement" src="/vite.svg" alt="Vite logo" class="animated-element"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
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
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.animated-element {
  transition: transform 300ms;
}
</style>
