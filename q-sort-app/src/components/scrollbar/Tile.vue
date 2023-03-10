<template>
    <div class="tile">
        <Indicator v-for="index in props.indicator_count"
        :key="index-1"
        :row="props.idx"
        :col="index-1" />
    </div>
</template>

<script setup>
    import Indicator from './Indicator.vue';

    const props = defineProps({
        idx: Number,
        indicator_count: Number
    })
</script>

<style lang="scss" scoped>
    .tile{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        gap: 4px;
        flex-wrap: wrap;
        padding: 4px;
    }
</style>