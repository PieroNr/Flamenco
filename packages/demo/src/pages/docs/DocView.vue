<script setup lang="ts">
import Docs from './DOCS.md'
import { onMounted, ref } from 'vue'
import { NavElement } from './types'
import DocMenu from './DocMenu/DocMenu.vue'

const titles = ref<NavElement[]>([])
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
})
</script>

<template>
    <div class="docs-view">
        <DocMenu :children="titles" class="menu" />
        <Docs class="docs" />
    </div>
</template>

<style scoped lang="scss">
.docs-view {
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
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }

        &:deep(h2) {
            font-size: 32px;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        &:deep(h3) {
            font-size: 24px;
            font-weight: 600;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }

        &:deep(p) {
            font-size: 16px;
            margin-top: 0.2rem;
            margin-bottom: 0.2rem;
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
