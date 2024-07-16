<script setup lang="ts">
import { codeToHtml } from 'shiki/bundle/web'
import { computed, ref, useSlots, watchEffect } from 'vue'
import CopyButton from './CopyButton.vue'

const slots = useSlots()
const button = ref<typeof CopyButton>()
const props = withDefaults(
    defineProps<{
        lang?: 'ts' | 'bash'
        theme?: 'dark' | 'light'
    }>(),
    {
        lang: 'ts',
        theme: 'dark',
    }
)

const html = ref('')
const code = ref('')

const lineNumber = computed(() => {
    return code.value.split('\n').length
})

const isInitialized = computed(() => !!html.value)

function removeEmptyLine(str: string): string {
    const wordRegex = /[\w{}()[\];]*/
    const lines = str.split('\n')
    const filtered = lines.filter((line) => wordRegex.test(line))
    return filtered.join('\n')
}

function extractCode(): string {
    let children = slots.default?.()[0].children
    if (!children || typeof children !== 'string') return ''
    return removeEmptyLine(children)
}

watchEffect(async () => {
    code.value = extractCode()
    html.value = await codeToHtml(code.value, {
        lang: props.lang,
        theme: props.theme === 'dark' ? 'github-dark' : 'github-light',
    })
})

const classes = computed(() => {
    return {
        [`theme-${props.theme}`]: true,
    }
})
</script>

<template>
    <div class="code-highlighter-container" :class="classes">
        <slot name="comment" />
        <div class="code-highlighter" @click="() => button?.copyCode()">
            <div
                class="code"
                :style="
                    !isInitialized
                        ? { [`--line-number`]: lineNumber }
                        : undefined
                "
                v-html="html"
            />
            <CopyButton
                ref="button"
                :theme="theme"
                :code="code"
                class="copy-btn"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.code-highlighter-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    padding: 3rem 2rem;

    &.theme-dark {
        color: white;
        background-color: #2d2d2d;

        .code-highlighter {
            background-color: #5a5a5a;

            &:deep(.shiki) {
                background-color: #5a5a5a !important;
            }
        }
    }

    &.theme-light {
        color: black;
        background-color: #d9d9d9;

        .code-highlighter {
            background-color: #f1f0f0;

            &:deep(.shiki) {
                background-color: #f1f0f0 !important;
            }
        }
    }

    .code-highlighter {
        overflow-x: auto;
        display: block;
        width: fit-content;
        max-width: 100%;
        padding: 0.7rem 1.3rem;
        gap: 0.5rem;
        border-radius: 0.5rem;
        position: relative;
        padding-right: 2rem;
        cursor: pointer;

        :deep(.shiki) {
            margin: 0;
            font-size: 0.875rem;
            font-family: 'Fira Mono', monospace;
        }

        .copy-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            opacity: 0;
            transform: scale(0.8);
            transition:
                opacity 100ms ease-out,
                transform 200ms ease-out 100ms;
        }

        .code {
            min-height: calc(var(--line-number, 1) * 1em);
            min-width: 200px;
        }

        &:hover .copy-btn {
            opacity: 1;
            transform: scale(1.2);
        }
    }
}
</style>
