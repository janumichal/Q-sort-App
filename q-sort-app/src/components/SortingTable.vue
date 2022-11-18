<template>
    <div>
        <SortingTableRowVue v-for="(count, index) in cd_store.table_shape" :key="index" :slot_count="count" :style="getColorClass(index)" :delimiter_text="getDelimiterTest(index)"></SortingTableRowVue>
    </div>
</template>



<script setup>
    import { ref } from "vue";
    import SortingTableRowVue from "../components/SortingTableRow.vue";
    import { useCardDatesetStore } from '../stores/card-dataset'

    const cd_store = useCardDatesetStore()
    

    function isOnPos(index, position){
        return index == position
    }

    function getColorClass(index){
        return {"background-color": cd_store.colors[index]}
    }

    function getDelimiterTest(index){
        const positive_pos = 0
        const neutral_pos = Math.round(cd_store.table_shape.length / 2) - 1
        const negative_pos = cd_store.table_shape.length - 1
        if(isOnPos(index, positive_pos)){
            return cd_store.delimiters[0].toUpperCase()
        }else if(isOnPos(index, neutral_pos)){
            return cd_store.delimiters[1].toUpperCase()
        }else if(isOnPos(index, negative_pos)){
            return cd_store.delimiters[2].toUpperCase()
        }else{
            return ""
        }

    }




</script>



<style lang="scss" scoped>
</style>