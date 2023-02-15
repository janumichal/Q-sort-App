<template>
    <Settings />
    <div class="sorting-wrapper"  :style="getTopBgColor()">
            <div class="top-panel-wrapper">
                <TopPanelVue ref="top_panel" />
            </div>
        <div class="sorting-table" :style="getBottomBgColor()">
            <SortingTableVue />
        </div>
    </div>
</template>

<script setup>
    import TopPanelVue from "../components/TopPanel.vue"
    import SortingTableVue from "../components/SortingTable.vue"
    import Settings from "../components/Settings.vue"
    import { useCardDatesetStore } from "../stores/card-dataset"
    import { ref } from 'vue'
    import json_data from "../assets/datasets/food-sort.json"

    const cd_store = useCardDatesetStore()
    const top_panel = ref(null)

    //Load dataset
    cd_store.loadDataset(json_data)

    function getBottomBgColor(){
        return {"background-color": cd_store.colors[cd_store.colors.length-1]}
    }
    function getTopBgColor(){
        return {"background-color": cd_store.colors[0]}
    }


</script>

<style lang="scss" scoped>
    
    .sorting-wrapper{
        overflow-x: auto;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-flow: column;

        .top-panel-wrapper{
            pointer-events: none;
            position: sticky;
            top: 0;
            left: 0;
            z-index: 1000;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .sorting-table{
            min-width: max-content;
            flex-grow: 1;
        }
    }


</style> 