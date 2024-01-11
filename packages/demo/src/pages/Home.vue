<template>
  <div class="home-container">
    <header>
      <h1>FlamencoJs</h1>
      <div>
        <Play v-if="!isPlaying" @click="start" class="musicPlay" />
        <Stop v-if="isPlaying" @click="start" class="musicPlay" />
      </div>
      <div class="menu">
        <router-link to="/" class="--active">Effects</router-link>
        <router-link to="/about">About</router-link>
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
import { ref } from "vue";
import TileEffect from "../components/TileEffect.vue";
import github from "../assets/img/logo_github.png";
import npm from "../assets/img/logo_npm.png";
import Flamenco from "@flamencojs/flamencojs";
import Play from "../assets/img/play.vue";
import Stop from "../assets/img/stop.vue";

const flamenco = new Flamenco();
var isPlaying = ref(false);
flamenco.setMusic("sound/freeze.mp3");

const start = () => {
  if (isPlaying.value) {
    flamenco.stop();
  } else {
    flamenco.play();
  }
  isPlaying.value = !isPlaying.value;
};

const effects: {
  name: string;
  isDoubleWidth?: boolean;
  customContent?: string;
  animated?: boolean;
  backgroundColor?: string | undefined;
  isFirstTile?: boolean;
  effectCode?: string;
}[] = [
  {
    name: "Introduction",
    isDoubleWidth: true,
    backgroundColor: "#343434",
    customContent: `<style> p,h2{color: white};p{margin-top: 20px}</style>
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
        </div>`,
    isFirstTile: true,
  },
  {
    name: "Github",
    isDoubleWidth: false,
    backgroundColor: "#6bb0dc",
    customContent: `<a href="https://github.com/PieroNr/Flamenco" target="_blank"><img style="width: calc(100% - 20px); max-width: 175px" src="${github}" alt="github" /></a>`,
  },
  {
    name: "NPM",
    isDoubleWidth: false,
    backgroundColor: "#ce6462",
    customContent: `<a href="https://www.npmjs.com/package/@flamencojs/flamencojs" target="_blank"><img style="width: calc(100% - 20px); max-width: 175px" src="${npm}" alt="npm" /></a>`,
  },
  {
    name: "Color",
    isDoubleWidth: false,
    animated: true,
    effectCode: "flamenco.setEffect(Color, nameOfClass);",
  },
  {
    name: "Width",
    isDoubleWidth: true,
    animated: true,
    effectCode: "flamenco.setEffect(Width, nameOfClass);",
  },
  {
    name: "height",
    isDoubleWidth: false,
    animated: true,
    effectCode: "flamenco.setEffect(height, nameOfClass);",
  },
  {
    name: "Border",
    isDoubleWidth: true,
    animated: false,
    effectCode: "flamenco.setEffect(Border, nameOfClass);",
  },
  {
    name: "Background",
    isDoubleWidth: false,
    animated: true,
    effectCode: "flamenco.setEffect(Background, nameOfClass);",
  },
];
</script>

<style scoped lang="scss">
.home-container {
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

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  .musicPlay {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .menu {
    display: flex;
    border-radius: 25px;
    background-color: #ece9e9;
    padding: 5px;
    gap: 15px;

    a {
      text-decoration: none;
      font-size: 13px;
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
