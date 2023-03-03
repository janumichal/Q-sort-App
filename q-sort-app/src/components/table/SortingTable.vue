<template>
    <div class="table-wrapper">
        <Row v-for="(arr, index) in q_store.table" 
            :key="index" 
            :slot_count="arr.length" 
            :delimiter_text="q_store.getDelimiterText(index)" 
            :row_value="q_store.getRowValue(index)" 
            :idx="index" 
            :style="q_store.getColorStyle(index)" />
    </div>
</template>



<script setup>
    import Row from "./Row.vue";
    import { useQSortStore } from '../../stores/q-sort'

    const q_store = useQSortStore()
</script>



<style lang="scss" scoped>
    .table-wrapper{
        position: relative;
        min-width: max-content;
    }
</style>