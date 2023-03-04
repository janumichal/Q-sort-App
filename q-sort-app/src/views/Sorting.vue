<template>
    <Settings />
    <div class="mm-s-wrapper">
        <div id="container" class="sorting-wrapper"  :style="getTopBgColor()" v-dragscroll="true">
            <div id="panel-h" class="top-panel-wrapper">
                <TopPanel />
            </div>
            <div id="table-h" class="sorting-table" :style="getBottomBgColor()">
                <SortingTable />
            </div>
        </div>
        <Transition>
            <Minimap v-if="s_store.minimap_enabled" ref="minimap"/>
        </Transition>
    </div>
</template>

<script setup>
    import TopPanel from "../components/panel/TopPanel.vue"
    import SortingTable from "../components/table/SortingTable.vue"
    import Settings from "../components/Settings.vue"
    import Minimap from "../components/scrollbar/Minimap.vue"
    import { useQSortStore } from "../stores/q-sort"
    import { useSettingsStore } from "../stores/settings"
    import json_data from "../assets/datasets/food-sort.json"
    import { ref, watch, nextTick } from "vue"

    const q_store = useQSortStore()
    const s_store = useSettingsStore()
    const minimap = ref()


    //Load dataset
    q_store.loadDataset(json_data)

    function getBottomBgColor(){
        return {"background-color": q_store.colors[q_store.colors.length-1]}
    }
    function getTopBgColor(){
        return {"background-color": q_store.colors[0]}
    }

    watch(
        s_store,
        () => {
            nextTick(() => {
                if(s_store.minimap_enabled){
                    minimap.value.init()
                }
            })
        }
    )

</script>

<style lang="scss" scoped>
    .mm-s-wrapper{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        .sorting-wrapper{
            overflow: auto;
            

            height: 100vh;
            width: 100%;
            display: flex;
            flex-flow: column;
            user-select: none;
            cursor: grab;
    
            // hide scrollbar
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar{
                display: none;
            }
            
    
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
                padding-top: env(safe-area-inset-top);
            }
            .sorting-table{
                min-width: max-content;
                flex-grow: 1;
            }
        }
    }


</style> 