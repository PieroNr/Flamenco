import Flamenco from '@flamencojs/flamencojs'
import Audio from '../assets/techno.mp3'
import { computed, onMounted, onUnmounted, ref } from 'vue'

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
