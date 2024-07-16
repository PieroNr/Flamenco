<script setup lang="ts">
import { codeToHtml } from 'shiki/bundle/web'
import { ref, useSlots, watchEffect } from 'vue'
import CopyButton from './CopyButton.vue'

const slots = useSlots()
const props = withDefaults(
    defineProps<{
        lang?: 'ts' | 'basb'
        theme?: 'dark' | 'light'
    }>(),
    {
        lang: 'ts',
        theme: 'dark',
    }
)

const html = ref('')
const code = ref('')

function extractCode(): string {
    let children = slots.default?.()[0].children
    if (!children || typeof children !== 'string') return ''
    return children
}

watchEffect(async () => {
    code.value = extractCode()
    html.value = await codeToHtml(code.value, {
        lang: props.lang,
        theme: props.theme === 'dark' ? 'vitesse-dark' : 'vitesse-light',
    })
})
</script>

<template>
    <div class="code-highlighter">
        <div v-html="html" />
        <CopyButton :theme="theme" :code="code" />
    </div>
</template>

<style scoped lang="scss">
.code-highlighter {
    overflow-x: auto;
    display: flex;
    align-items: center;
    background-color: #121212;
    padding: 0.7rem 1.3rem;
    gap: 0.5rem;
    border-radius: 0.5rem;

    :deep(.shiki) {
        margin: 0;
        font-size: 0.875rem;
    }
}
</style>
