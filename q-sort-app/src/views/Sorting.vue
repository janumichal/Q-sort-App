<template>
    <div class="sorting-wrapper" :style="getBgColor()">
        <div class="queue-wrapper">
            <CardQueueVue/>
        </div>
        <div></div>
        <SortingTableVue></SortingTableVue>
    </div>
</template>

<script setup>
    import CardQueueVue from "../components/CardQueue.vue"
    import SortingTableVue from "../components/SortingTable.vue"
    import { useCardDatesetStore } from "../stores/card-dataset"
    import json_data from "../assets/datasets/food-sort.json"

    const cd_store = useCardDatesetStore()

    cd_store.loadDataset(json_data)

    function getBgColor(){
        return {"background-color": cd_store.colors[0]}
    }
</script>

<style lang="scss" scoped>
    @use "../scss/Constants" as *;
    .queue-wrapper{
        position: sticky;
        width: 100%;
        top: 0;
        z-index: 1000;
    }
</style> 