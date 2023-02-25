<template>
    <div class="table-wrapper">
        <SortingTableRow v-for="(arr, index) in q_store.table" :key="index" :slot_count="arr.length" :style="getColorClass(index)" :delimiter_text="getDelimiterTest(index)" :row_value="q_store.getRowValue(index)" :row="index" />
    </div>
</template>



<script setup>
    import { ref } from "vue";
    import SortingTableRow from "./SortingTableRow.vue";
    import { useQSortStore } from '../../stores/q-sort'

    const q_store = useQSortStore()

    function getColorClass(index){
        return {"background-color": q_store.colors[index]}
    }

    function getDelimiterTest(index){
        const positive_pos = 0
        const neutral_pos = Math.round(q_store.table.length / 2) - 1
        const negative_pos = q_store.table.length - 1
        if(index == positive_pos){
            return q_store.delimiters[0].toUpperCase()
        }else if(index == neutral_pos){
            return q_store.delimiters[1].toUpperCase()
        }else if(index == negative_pos){
            return q_store.delimiters[2].toUpperCase()
        }else{
            return ""
        }
    }

</script>



<style lang="scss" scoped>
    .table-wrapper{
        position: relative;
        min-width: max-content;
    }
</style>