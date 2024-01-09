<template>
  <div class="home-container">
    <header>
      <h1>FlamencoJs</h1>
      <div>
        <button @click="start">Play</button>
        <button @click="flamenco.stop()">Stop</button>
      </div>
      <div class="menu">

        <button class="--active">Effects</button>
        <button>About</button>

      </div>
    </header>
    <div class="grid-container">
      <TileEffect
          v-for="effect in effects"
          :key="effect.name"
          :effect="effect"
          :flamenco="flamenco"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TileEffect from "../components/TileEffect.vue";
import {ref, StyleValue} from "vue";
import github from '../assets/img/logo_github.png';
import npm from '../assets/img/logo_npm.png';
import Flamenco from 'flamencojs';


const flamenco = new Flamenco();
var isPlaying = false;
flamenco.setMusic('sound/freeze.mp3');

const start = () => {
  if (isPlaying) {
    flamenco.stop();
    isPlaying = false;
  } else {
    flamenco.play();
    isPlaying = true;
  }
};

const effects: { name: string, isDoubleWidth: boolean, customContent: string, animated: boolean, backgroundColor: StyleValue | undefined, isFirstTile: boolean }[]
    = ref([
  { name: 'Introduction', isDoubleWidth: true,backgroundColor: '#343434',customContent:
        `<style> p,h2{color: white};p{margin-top: 20px}</style>
        <div style="width: 100%; text-align: left; margin-bottom: 20px">
            <h2>Setup</h2>
            <p>Install the package with npm or yarn</p>
            <code>npm install @flamencojs/flamencojs</code>
            <p>Import the package</p>
            <code>import Flamenco from '@flamencojs/flamencojs';</code>
            <p>Create a new instance</p>
            <code>const flamenco = new Flamenco();</code>
            <p>Set the music</p>
            <code>flamenco.setMusic('your/sound.mp3');</code>
            <p>Play the music</p>
            <code>flamenco.play();</code>
            <p>Stop the music</p>
            <code>flamenco.stop();</code>
        </div>`
    , isFirstTile: true },
  { name: 'Github', isDoubleWidth: false, backgroundColor: '#6bb0dc', customContent: `<a href="https://github.com/PieroNr/Flamenco" target="_blank"><img style="width: calc(100% - 20px); max-width: 175px" src="${github}" alt="github" /></a>` },
  { name: 'NPM', isDoubleWidth: false, backgroundColor: '#ce6462', customContent: `<a href="https://www.npmjs.com/package/@flamencojs/flamencojs" target="_blank"><img style="width: calc(100% - 20px); max-width: 175px" src="${npm}" alt="npm" /></a>` },
  { name: 'Color', isDoubleWidth: false, animated: true },
  { name: 'Width', isDoubleWidth: true,animated: true },
  { name: 'height', isDoubleWidth: false,animated: true },
  { name: 'Border', isDoubleWidth: true,animated: true },
  { name: 'Background', isDoubleWidth: false,animated: true },
]);
</script>

<style scoped lang="scss">

.home-container{

  margin: 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: calc(100% - 96px);
  max-width: 1920px;
  justify-content: center;
  align-items: center;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  width: 100%;
  max-width: 1920px;

}

header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  .menu {
    display: flex;
    border-radius: 25px;
    background-color: #ECE9E9;
    padding: 5px;
    gap: 15px;
    button {
      background-color: transparent;
      border: none;
      border-radius: 25px;
      padding: 10px 20px;
      color: black;
      font-weight: bold;
      cursor: pointer;
      &.--active {
        background-color: #ffffff;
      }
    }
  }
}


</style>
