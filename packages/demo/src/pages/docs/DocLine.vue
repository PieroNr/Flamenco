<script setup lang="ts"></script>

<template>
    <div class="doc-line">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.doc-line {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    &:deep(.code-highlighter-container) {
        grid-column: 2/6;
    }
}
</style>
