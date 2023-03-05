<template>
    <div ref="track" class="mm-track" 
        @mousedown.left="onMouseDownTrack($event)" 
        @touchstart="onMouseDownTrack($event)"
        @touchend="onMouseUpThumb()"
        @touchcancel="onMouseUpThumb()">
        <div ref="thumb" class="mm-thumb" 
            @mousedown.left="onMouseDownThumb($event)" 
            @touchstart.prevent="onMouseDownThumb($event)"
            @mouseup.left="onMouseUpThumb()" 
            @touchend="onMouseUpThumb()"
            @touchcancel="onMouseUpThumb()"
            @mousemove="onMoveThumb($event)" 
            @touchmove="onMoveThumb($event)"
            @mouseleave.left="onMouseUpThumb()">

        </div>
        <div class="wrapper">
            <!-- <div ref="panel_fill" class="panel-fill" :style="q_store.getColorStyle(0)">
            </div> -->
            <div class="tiles">
                <Tile v-for="(arr, index) in q_store.table" 
                    :key="index" 
                    :indicator_count="arr.length" 
                    :idx="index" 
                    :style="q_store.getColorStyle(index)"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, nextTick } from 'vue';
    import { useGlobalStore } from '../../stores/global';
    import { useQSortStore } from '../../stores/q-sort';
    import { useSettingsStore } from '../../stores/settings';
    import Tile from "./Tile.vue"

    const g_store = useGlobalStore()
    const q_store = useQSortStore()
    const s_store = useSettingsStore()

    const thumb = ref()
    const track = ref()
    
    const page_height = ref()
    const display_height = ref()
    const row_height = ref()

    const track_height = ref()
    const thumb_height = ref()
    const fill_height = ref()
    const tile_height = ref()
    const thumb_offset = ref(0)
    const tile_count = ref()

    const prev_scroll_pos = ref(0)
    const scroll_pos = ref(0)
    

    const track_click = ref(false)
    const pressed = ref(false)

    defineExpose({init})

    function onMouseDownTrack(event){
        event.stopPropagation();
        track_click.value = true
        pressed.value = true
        moveThumb(event)
    }

    function getPosFromEvent(event){
        var pos
        if(event.type == 'touchstart' || event.type == 'touchmove' || event.type == 'touchend'){
            var evt = (typeof event.originalEvent === 'undefined') ? event : event.originalEvent;
            var touch = evt.touches[0] || evt.changedTouches[0];
            pos = touch.pageY
        }else{
            pos = event.clientY
        }
        return pos
    }

    function onMouseDownThumb(event){
        event.stopPropagation();
        track_click.value = false
        thumb_offset.value = getPosFromEvent(event)
        pressed.value = true
        moveThumb(event)
    }

    function onMouseUpThumb(){
        if(pressed.value){
            prev_scroll_pos.value = scroll_pos.value
            pressed.value = false
            track_click.value = false
        }
    }

    function onMoveThumb(event){
        if(pressed.value){
            moveThumb(event)
        }
    }

    function moveThumb(event){
        var pos = getPosFromEvent(event)
        if(track_click.value){
            scroll_pos.value = pos - thumb_height.value/2
        }else{
            scroll_pos.value = prev_scroll_pos.value + pos - thumb_offset.value
        }
        setThumbPosY()
    }

    function setThumbPosY(){
        if(scroll_pos.value < 0){
            scroll_pos.value = 0
        }
        changeThumbOnScroll()
    }

    function changeThumbOnScroll(){
        var container = document.getElementById("container")
        container.scrollTo(0, convertSctoll2pageHeight(scroll_pos.value))
        getScroll()
    }

    function getScroll(){
        var container = document.getElementById("container")
        thumb.value.style.top = Math.max(convertPage2ScrollHeight(container.scrollTop) - fill_height.value,0).toString() + "px"
        updateThumbHeight()
    }

    function init(){
        g_store.waitForTransitions().then(() => {
            minimapSetup()
        })
    }

    function minimapSetup(){
        if(s_store.minimap_enabled){
            var panel = document.getElementById("panel-h")
            var table = document.getElementById("table-h")
            
            display_height.value = window.innerHeight
            page_height.value = table.offsetHeight
            row_height.value = document.getElementsByClassName("row")[0].offsetHeight
            
            track_height.value = track.value.offsetHeight
            fill_height.value = convertPage2ScrollHeight(panel.offsetHeight)
            tile_height.value = document.getElementsByClassName("tile")[0].offsetHeight
            tile_count.value = display_height.value / row_height.value
            updateThumbHeight()
        }
    }

    function updateThumbHeight(){
        thumb_height.value = tile_count.value*tile_height.value - Math.max(fill_height.value - convertPage2ScrollHeight(container.scrollTop), 0)
        thumb.value.style.height = thumb_height.value.toString() + "px"
    }

    function convertPage2ScrollHeight(height){
        return (height / page_height.value) * track_height.value
    }

    function convertSctoll2pageHeight(height){
        return (height / track_height.value ) * page_height.value
    }

    onMounted(() => {
        minimapSetup()
        var cont = document.getElementById("container")
        cont.addEventListener("scroll", getScroll)
    })
    onUnmounted(() => {
        var container = document.getElementById("container")
        container.removeEventListener("scroll", getScroll)
    })
</script>

<style lang="scss" scoped>
    @use "../../scss/Colors/Colors" as *;
    .mm-track{
        position: fixed;
        height: 100%;
        width: min(9vmin, 70px);
        min-width: 35px;
        background-color: red;
        right: 0px;
        cursor: pointer;
        box-sizing: border-box;
        .mm-thumb{
            width: 100%;
            background-color: transparent;
            border: solid 3px black;
            border-radius: 6px;
            position: absolute;
            cursor: move;
            box-sizing: border-box;

        }
        .wrapper{
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;

            .panel-fill{
                width: 100%;
                height: 30px;
                background-color: $primary_bg;
            }
            .tiles{
                display: grid;
                grid-auto-rows: 1fr;
                // flex-direction: column;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>