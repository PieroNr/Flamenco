<script setup lang="ts">
import MainGridCell from '../../../../../components/MainGridCell.vue'
import { computed } from 'vue'
import { Cell } from '../../../../../components/types.ts'

const props = defineProps<{
    src: string
    size: 1 | 2
}>()

const cellData = computed<Cell>(() => {
    return {
        backgroundImage: props.src,
        width: props.size === 1 ? '100%' : '50%',
        height: props.size === 1 ? '100%' : '50%',
        backgroundColor: 'transparent',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        larger: props.size,
        taller: 1,
        radius: '0',
        noiseEffect: false,
        blurEffect: 0,
        contentText: '',
        contentSlot: '',
    }
})
</script>

<template>
    <MainGridCell :cell-data="cellData" />
</template>

<style scoped lang="scss"></style>
