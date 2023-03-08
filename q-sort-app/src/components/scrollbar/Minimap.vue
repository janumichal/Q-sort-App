<template>
    <div ref="track" class="mm-track" 
        @mousedown.left="onMouseDownTrack($event)" 
        @mousemove="onMoveThumb($event)" 
        @touchmove="onMoveThumb($event)"
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
            <div ref="tiles" class="tiles">
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
    import { ref, onMounted, onUnmounted, watch } from 'vue';
    import { useGlobalStore } from '../../stores/global';
    import { useQSortStore } from '../../stores/q-sort';
    import { useSettingsStore } from '../../stores/settings';
    import Tile from "./Tile.vue"

    const container = ref(null)

    const tiles = ref(null)

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
    const tile_count = ref()
    const thumb_top = ref()
    
    
    
    const thumb_offset = ref(0)
    const prev_thumb_pos = ref(0)
    const thumb_pos = ref(0)
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
        pressed.value = true
        thumb_offset.value = getPosFromEvent(event)
        moveThumb(event)
    }

    function onMouseUpThumb(){
        if(pressed.value){
            prev_thumb_pos.value = thumb_pos.value
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
        var event_position = getPosFromEvent(event)
        if(track_click.value){
            thumb_pos.value = (event_position - tile_count.value*tile_height.value/2) + fill_height.value
        }else{
            thumb_pos.value = prev_thumb_pos.value + event_position - thumb_offset.value
        }
        container.value.scrollTo(0, convertSctoll2pageHeight(thumb_pos.value))
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

    // ###############################################################################################################################################
    function getScroll(){
        thumb.value.style.top = Math.max(convertPage2ScrollHeight(container.value.scrollTop) - fill_height.value,0).toString() + "px"
        updateThumbHeight()
    }


    function minimapSetup(){
        if(s_store.minimap_enabled){
            display_height.value = window.innerHeight
            page_height.value = document.getElementById("table-h").offsetHeight
            track_height.value = track.value.offsetHeight
            row_height.value = document.getElementsByClassName("row")[0].offsetHeight
            fill_height.value = convertPage2ScrollHeight(document.getElementById("panel-h").offsetHeight)
            tile_height.value = document.getElementsByClassName("tile")[0].offsetHeight
            tile_count.value = display_height.value / row_height.value
            thumb_top.value = getThumbTop()
            updateThumbHeight()
        }
    }
    function getThumbTop(){
        return Math.max(convertPage2ScrollHeight(container.value.scrollTop) - fill_height.value, 0)
    }

    function getFillDecreaseTop(){
        return Math.max(fill_height.value - convertPage2ScrollHeight(container.value.scrollTop) , 0)
    }

    function updateThumbHeight(){
        thumb_top.value = getThumbTop()
        thumb_height.value = tile_count.value*tile_height.value - getFillDecreaseTop()
        thumb_height.value = Math.min(display_height.value < thumb_top.value + thumb_height.value ? display_height.value - thumb_top.value : thumb_height.value, display_height.value)
        thumb.value.style.height = thumb_height.value.toString() + "px"
    }

    function convertPage2ScrollHeight(height){
        return (height / page_height.value) * track_height.value
    }

    function convertSctoll2pageHeight(height){
        return (height / track_height.value ) * page_height.value
    }

    function disableIfOverflows(){
        if(tiles.value.scrollHeight > display_height.value){
            s_store.minimap_enabled = false
        }
    }

    function init(){
        g_store.waitForTransitions().then(() => {
            minimapSetup()
        })
    }

    watch(
        s_store,
        () => {
            init()
    })

    onMounted(() => {
        container.value = document.getElementById("container")
        minimapSetup()
        disableIfOverflows() 
        container.value.addEventListener("scroll", getScroll)
    })
    onUnmounted(() => {
        if(container.value != null){
            container.value.removeEventListener("scroll", getScroll)
        }
    })
</script>

<style lang="scss" scoped>
    @use "../../scss/Colors/Colors" as *;
    .mm-track{
        position: sticky;
        height: 100%;
        width: min(11vmin, 85px);
        min-width: 35px;
        background-color: red;
        right: 0px;
        cursor: pointer;
        border-left: solid rgba($color: #3a3a3a, $alpha: .5) 1px;
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
            min-height: fit-content;
            width: 100%;
            box-sizing: border-box;

            .panel-fill{
                width: 100%;
                height: 30px;
                background-color: $primary_bg;
                box-sizing: border-box;
            }
            .tiles{
                display: grid;
                grid-auto-rows: 1fr;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
        }
    }
</style>