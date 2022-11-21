<template>
    <div class="sorting-wrapper" :style="getBgColor()">
            <div class="queue">
                <CardQueueVue/>
            </div>
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
    
    .sorting-wrapper{
        overflow-x: auto;
        height: 100vh;
        width: 100vw;

            .queue{
                position: sticky;
                top: 0;
                left: 0;
                z-index: 1000;
                width: 100%;
            }
    }
</style> 