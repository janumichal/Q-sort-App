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
        <Minimap ref="minimap" v-if="s_store.minimap_enabled" />
    </div>
</template>

<script setup>
    import TopPanel from "../components/panel/TopPanel.vue"
    import SortingTable from "../components/table/SortingTable.vue"
    import Settings from "../components/Settings.vue"
    import Minimap from "../components/scrollbar/Minimap.vue"
    import { useQSortStore } from "../stores/q-sort"
    import { useSettingsStore } from "../stores/settings"
    import { useGlobalStore } from "../stores/global"
    import json_data from "../assets/datasets/food-sort.json"
    import { ref, watch, nextTick, onMounted } from "vue"

    const q_store = useQSortStore()
    const s_store = useSettingsStore()
    const g_store = useGlobalStore()
    const minimap = ref(null)


    //Load dataset
    q_store.loadDataset(json_data)

    function getBottomBgColor(){
        return {"background-color": q_store.colors[q_store.colors.length-1]}
    }
    function getTopBgColor(){
        return {"background-color": q_store.colors[0]}
    }

    function setMarginOfPanel(){
        g_store.waitForTransitions().then(() => {
            var panel = document.getElementById("panel-h")
            var table = document.getElementById("table-h")
            table.style.marginTop = panel.offsetHeight.toString() + "px"
        })
    }

    watch(
        s_store,
        () => {
            nextTick(() => {
                var container = document.getElementById("container")
                if(s_store.minimap_enabled){
                    container.style.marginRight = minimap.value.$el.offsetWidth.toString() + "px"
                    minimap.value.init()
                }else{
                    container.style.marginRight = "0px"
                }
            })
        }
    )


    onMounted(() => {
        if(window.innerWidth < 370){ 
            s_store.minimap_enabled = false
        }
        if(s_store.minimap_enabled){
            var container = document.getElementById("container")
            container.style.marginRight = minimap.value.$el.offsetWidth.toString() + "px"
        }
    })

</script>

<style lang="scss" scoped>
    .mm-s-wrapper{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        position: relative;

        .sorting-wrapper{
            overflow: auto;
            height: 100%;
            // min-height: 100vh;
            width: 100%;
            display: flex;
            flex-flow: column;
            user-select: none;
            cursor: grab;
            position: relative;
    
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
                box-sizing: border-box;
            }
            .sorting-table{
                min-width: max-content;
                flex-grow: 1;
            }
        }
    }


</style> 