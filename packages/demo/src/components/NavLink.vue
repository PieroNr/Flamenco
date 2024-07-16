<script setup lang="ts">
defineProps<{
    to: string
}>()
</script>

<template>
    <RouterLink class="nav-link" :to="to">
        <slot />
    </RouterLink>
</template>

<style scoped lang="scss">
.nav-link {
    text-decoration: underline;
    font-size: 1.5rem;
    text-underline-offset: 0.5em;
    color: inherit;
}
</style>
