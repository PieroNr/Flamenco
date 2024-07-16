<script setup lang="ts">
import Docs from './parts/content/DOCS.md'
import { onMounted, onUnmounted, ref } from 'vue'
import { NavElement } from './types'
import DocMenu from '@/pages/docs/parts/menu/DocMenu.vue'
import DocHeader from '@/pages/docs/parts/DocHeader.vue'

const titles = ref<NavElement[]>([])
const isInitialized = ref(false)
const intersectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                if (!isInitialized.value) {
                    entry.target.classList.add('initialization')
                }
            }
        })
        if (!isInitialized.value) {
            isInitialized.value = true
        }
    },
    {
        threshold: 0.7,
    }
)

onMounted(() => {
    const titleElements = document
        .querySelector('.docs')
        ?.querySelectorAll('h1,h2,h3')
    if (!titleElements) return
    let previous: NavElement | null = null
    titleElements.forEach((el) => {
        if (el.tagName === 'H2' || el.tagName === 'H1') {
            const navElement = {
                text: el.textContent || '',
                id: el.id,
                children: [],
            }
            titles.value.push(navElement)
            previous = navElement
            return
        }
        if (el.tagName === 'H3' && previous) {
            previous.children?.push({
                text: el.textContent || '',
                id: el.id,
            })
        }
    })
    const scrollElements = document.querySelectorAll<HTMLElement>(
        '.docs h1, .docs h2, .docs h3, .docs p'
    )
    scrollElements.forEach((el, i) => {
        intersectionObserver.observe(el)
        el.style.setProperty('--index', i.toString())
    })
})
onUnmounted(() => {
    intersectionObserver.disconnect()
})
</script>

<template>
    <div ref="page" class="docs-view">
        <DocHeader />
        <div class="doc-content">
            <DocMenu :children="titles" class="menu" />
            <Docs class="docs" />
        </div>
    </div>
</template>
<style>
body {
    scroll-behavior: smooth !important;
}
</style>
<style scoped lang="scss">
.doc-content {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(100px, 280px) 1fr;
    gap: 3rem;

    .docs {
        flex-grow: 1;
        justify-self: center;
        max-width: 900px;

        &:deep(h1),
        &:deep(h2),
        &:deep(h3),
        &:deep(p) {
            margin-right: auto;
            margin-left: auto;
            max-width: 700px;
            transform: translateY(5rem);
            opacity: 0;
            transition:
                transform ease-out 0.2ms,
                opacity ease-out 0.2ms;
            &.visible {
                transition:
                    transform 0.5s,
                    opacity 0.5s;
                transform: translateY(0);
                opacity: 1;
                &.initialization {
                    transition-delay: calc(var(--index, 0) * 0.1s);
                }
            }
        }

        &:deep(h1),
        &:deep(h2),
        &:deep(h3) {
            &::after {
                content: '.';
            }
        }

        &:deep(h1) {
            font-size: 128px;
            font-weight: 500;
            margin-top: 2rem;
            margin-bottom: 1.5rem;
        }

        &:deep(h2) {
            font-size: 32px;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
        }

        &:deep(h3) {
            font-size: 24px;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        &:deep(p) {
            font-size: 16px;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.4;

            & + p {
                margin-top: 1rem;
            }
        }

        &:deep(.doc-line) {
            margin-top: 2rem;
            margin-bottom: 2rem;
        }

        &:deep(.doc-line + .doc-line) {
            margin-top: 0;
        }

        &:deep(.doc-line:has(+ .doc-line)) {
            margin-bottom: 0;
        }
    }

    .menu {
        align-self: flex-start;
        position: sticky;
        top: 0;
        left: 0;
        flex-basis: 380px;
        flex-shrink: 0.5;
    }
}
</style>
