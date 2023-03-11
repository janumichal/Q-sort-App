<template>
    <Settings />
    <div class="mm-s-wrapper">
        <div id="container" class="sorting-wrapper"  
            :style="getTopBgColor()" 
            v-dragscroll.pass
            @dragscrollstart="start"
            @dragscrollend="end"
            @click.capture="click">
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
    import { ref, onMounted, onBeforeMount, nextTick} from "vue"
    import { useRoute, useRouter } from "vue-router"
    
    const q_store = useQSortStore()
    const s_store = useSettingsStore()
    const g_store = useGlobalStore()
    const route = useRoute()
    const router = useRouter()
    
    let dragging = false;
    let timer = null;

    function start() {
        timer = setTimeout(() => (dragging = true), 100);
    }

    function end() {
        clearTimeout(timer);
        setTimeout(() => (dragging = false));
    }

    function click(event) {
        if (dragging) {
            event.stopPropagation();
        }   
    }


    const minimap = ref(null)
    

    // this function could fetch the dataset from server
    function getDataset(uid){
        return g_store.datasets.find(element => element.uid == uid)
    }

    function getBottomBgColor(){
        return {"background-color": q_store.colors[q_store.colors.length-1]}
    }
    function getTopBgColor(){
        return {"background-color": q_store.colors[0]}
    }

    onMounted(() => {
        var tiles = document.getElementsByClassName("tiles")[0]
        if(tiles.clientHeight < tiles.scrollHeight){ 
            s_store.minimap_enabled = false
        }
    })
    
    onBeforeMount(() => {
        //Load dataset
        q_store.loadDataset(getDataset(route.params.uid))
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
            width: 100%;
            display: flex;
            flex-flow: column;
            user-select: none;
            cursor: grab;
            position: relative;

            &:active{
                cursor: grabbing;
            }
    
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