import Flamenco from '@flamencojs/flamencojs'
import Audio from '../assets/techno.mp3'
import { computed, onUnmounted, ref } from 'vue'

const flamenco = ref(new Flamenco())

export function useFlamenco() {
    const init = async () => {
        if (flamenco.value.initialized) return
        await flamenco.value.setMusic(Audio)
        window.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                e.preventDefault()
                flamenco.value.stop()
            }
        })
    }

    onUnmounted(() => {
        flamenco.value.stop()
    })

    const initialized = computed(() => flamenco.value.initialized)

    return { init, flamenco, initialized }
}
