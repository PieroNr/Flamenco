<script setup lang="ts">
defineProps<{
    anchorId: string
    active: boolean
    level: 1 | 2
}>()
</script>

<template>
    <a :href="'#' + anchorId" :class="{ active, [`level-${level}`]: true }">
        <span>
            <slot />
        </span>
    </a>
</template>

<style scoped lang="scss">
a {
    display: flex;
    align-items: center;
    color: white;
    line-height: 1;
    text-decoration: none;
    position: relative;
    margin-left: -0.4rem;

    &:hover {
        &::before {
            width: 1rem;
        }
    }

    &:before {
        position: relative;
        top: -2px;
        content: '';
        display: block;
        height: 2px;
        background-color: white;
        width: 0;
        transition: width 300ms ease-in-out;
    }

    &.active {
        font-weight: 600 !important;
        &::before {
            width: 2rem;
        }
    }

    &.level-1 {
        font-weight: bold;

        &::after {
            content: '.';
        }
    }

    &.level-2 {
        font-weight: 300;
    }

    span {
        margin-inline-start: 0.4rem;
    }
}
</style>
