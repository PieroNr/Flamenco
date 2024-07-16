<script setup lang="ts">
import CodeHighlighter from './CodeHighlighter.vue'
import DocLine from './DocLine.vue'
import DocCell from './DocCell.vue'
import Img1 from '../../assets/img/concert-2.jpg'
</script>

# Docs

FlamencoJS is a **TypeScript** library for creating dynamic web element animations that synchronize with music. It's
designed to make your web projects come alive with rhythm, movement, and color in response to your selected music.

The library lets you implement effects created by us, or create your own. These effects are commonly written as :

<DocLine>
    <CodeHighlighter lang="bash" theme="dark">flamenco.setMusic("your/audio.mp3");
flamenco.addEffect({
    kind: "color"
});
flamenco.play();
    </CodeHighlighter>
    <DocCell :src="Img1" :size="1" />
</DocLine>

## Prerequisites

Before you start using FlamencoJS, you need to have a basic understanding of JavaScript and TypeScript. You should also
have a basic understanding of how to create a web project using a bundler like Webpack or Vite.

## Getting started

### Installation and imports

<DocLine>
    <DocCell :src="Img1" :size="1" />
    <CodeHighlighter lang="bash" theme="light">
        <template #comment>
        Install the package with npm or yarn
        </template>
npm install @flamencojs/flamencojs
    </CodeHighlighter>
</DocLine>

Then, you can import the package in your project, load the music and start adding effects and play the music. Here's an
example of how you can do it :

<DocLine>
    <CodeHighlighter>
        <template #comment>
        Import the package in your project
        </template>
import Flamenco from "@flamencojs/flamencojs"
    </CodeHighlighter>
    <DocCell :src="Img1" :size="1" />
</DocLine>

<DocLine>
    <DocCell :src="Img1" :size="1" />
    <CodeHighlighter theme="light">
        <template #comment>
        Import audio and load it with Flamenco (if you're using vite)
        </template>
import audio from "./your/audio.mp3";
    </CodeHighlighter>
</DocLine>

<DocLine>
    <CodeHighlighter>
        <template #comment>
            Init flamenco and load the audio
        </template>
import audio from "./your/audio.mp3";
const flamenco = new Flamenco();
await flamenco.setMusic(audio);
    </CodeHighlighter>
    <DocCell :src="Img1" :size="1" />
</DocLine>

<DocLine>
    <DocCell :src="Img1" :size="1" />
    <CodeHighlighter theme="light">
        <template #comment>
            Add an effect and play the music
        </template>
flamenco.addEffect({
    kind: "color"
});
flamenco.play();
    </CodeHighlighter>
</DocLine>

## Effects

FlamencoJS comes with a set of built-in effects that you can use to create animations. Here are some of the effects that
you can use :

### Color effect

The color effect changes the color of the elements on the page in response to the music. You can specify the color that
you want to change to, and the duration of the effect.

<DocLine>
    <DocCell :src="Img1" :size="1" />
    <CodeHighlighter>
flamenco.addEffect({
    kind: "color",
    color: "#ff0000",
    duration: 1000,
});
    </CodeHighlighter>
</DocLine>

### Height effect

The height effect changes the height of the elements on the page in response to the music. You can specify the height
that you want to change to, and the duration of the effect.

<DocLine>
    <DocCell :src="Img1" :size="1" />
    <CodeHighlighter theme="light">
flamenco.addEffect({
    kind: "height",
    height: 100,
    duration: 1000
});
    </CodeHighlighter>
</DocLine>

### Width effect

The width effect changes the width of the elements on the page in response to the music. You can specify the width that
you want to change to, and the duration of the effect.

<DocLine>
    <DocCell :src="Img1" :size="1" />
    <CodeHighlighter>
flamenco.addEffect({
    kind: "width",
    width: 100,
    duration: 1000
});
    </CodeHighlighter>
</DocLine>

### Background color effect

The background color effect changes the background color of the elements on the page in response to the music. You can
specify the color that you want to change to, and the duration of the effect.

<DocLine>
    <DocCell :src="Img1" :size="1" />
    <CodeHighlighter theme="light">
flamenco.addEffect({
    kind: "background-color",
    color: "#ff0000",
    duration: 1000
});
    </CodeHighlighter>
</DocLine>

## Custom effects

You can also create your own custom effects using FlamencoJS. Here's an example of how you can create a custom effect
that changes the color of the elements on the page in response to the music :

<DocLine>
    <DocCell :src="Img1" :size="1" />
    <CodeHighlighter>
flamenco.addEffect({
    kind: "custom",
    onUpdate: ({ dataArray }) => {
        const color = `rgb(${dataArray[0]}, ${dataArray[1]}, ${dataArray[2]})`;
        document.body.style.backgroundColor = color;
});
    </CodeHighlighter>
</DocLine>

### Example with ThreeJS

You can see an example of how to create a custom effect using ThreeJS in the source code of the library (
packages/demo/src/sections/)

## Integration with VueJs 3

<DocLine>
    <DocCell :src="Img1" :size="1" />
    <CodeHighlighter>
        <template #comment>
            You can create a composition function to use FlamencoJS in your VueJs 3 project
        </template>
const flamenco = ref(new Flamenco())
export function useFlamenco() {
    const init = async () => {
        if (flamenco.value.initialized) return
        await flamenco.value.setMusic(Audio)
        flamenco.value.play()
        window.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                e.preventDefault()
                flamenco.value.stop()
            }
        })
    }
    const get = () => {
        if (!flamenco.value.initialized)
            throw new Error('Flamenco not initialized')
        return flamenco
    }
    onMounted(init)
    onUnmounted(() => {
        flamenco.value.stop()
    })
    const initialized = computed(() => flamenco.value.initialized)
    return { init, get, initialized }
}
    </CodeHighlighter>
</DocLine>