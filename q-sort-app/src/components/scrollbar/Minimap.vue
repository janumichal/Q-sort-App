<template>
    <div ref="track" class="mm-track" 
        @mousedown.left.self="onMouseDownTrack($event)" >
        <div ref="thumb" class="mm-thumb" 
            @mousedown.left.self="onMouseDownThumb($event)" 
            @mouseup.left.self="onMouseUpThumb()" 
            @mousemove.self="onMoveThumb($event)" 
            @mouseleave.left.self="onMouseUpThumb()">

        </div>
        <div class="wrapper">
            <div ref="panel_fill" class="panel-fill" :style="q_store.getColorStyle(0)">
            </div>
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
    import { ref, onMounted, onUnmounted, defineExpose, nextTick } from 'vue';
    import { useGlobalStore } from '../../stores/global';
    import { useQSortStore } from '../../stores/q-sort';
    import Tile from "./Tile.vue"

    const g_store = useGlobalStore()
    const q_store = useQSortStore()

    const thumb = ref()
    const track = ref()
    const panel_fill = ref()

    const page_height = ref()
    const track_height = ref()
    const display_height = ref()
    const thumb_height = ref()
    
    const track_click = ref(false)
    const thumb_offset = ref(0)
    const thumb_pos = ref(0)
    const pressed = ref(false)

    defineExpose({init})

    function onMouseDownTrack(event){
        track_click.value = true
        pressed.value = true
        moveThumb(event)
    }

    function onMouseDownThumb(event){
        track_click.value = false
        thumb_offset.value = event.clientY
        pressed.value = true
        moveThumb(event)
    }

    function onMouseUpThumb(){
        if(pressed.value){
            thumb_pos.value = thumb.value.offsetTop
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
        var offset
        var new_pos
        if(track_click.value){
            offset = thumb_height.value/2
        }else{
            offset = thumb_offset.value
        }
        new_pos = event.clientY - offset + thumb_pos.value
        setThumbPosY(new_pos)
    }

    function setThumbPosY(new_position){
        if(new_position < 0){
            new_position = 0
        }else if ((new_position + thumb_height.value) > display_height.value){
            new_position = display_height.value - thumb_height.value
        }
        changeThumbOnScroll(new_position)
        thumb.value.style.top = new_position.toString() + "px"  
    }

    function convertPage2Scroll(position){
        return (position / page_height.value) * track_height.value
    }

    function convertSctoll2page(position){
        return (position / track_height.value) * page_height.value
    }

    function changeThumbOnScroll(new_position){
        var container = document.getElementById("container")
        container.scrollTo(0, convertSctoll2page(new_position))
    }

    function getScroll(){
        var container = document.getElementById("container")
        thumb.value.style.top = convertPage2Scroll(container.scrollTop).toString() + "px"
    }

    function init(){
        g_store.waitForTransitions().then(() => {
            minimapSetup()
        })
    }

    function minimapSetup(){
        var panel = document.getElementById("panel-h")
        var table = document.getElementById("table-h")

        page_height.value = panel.offsetHeight + table.offsetHeight
        track_height.value = track.value.offsetHeight
        display_height.value = window.innerHeight

        thumb_height.value = convertPage2Scroll(display_height.value)
        thumb.value.style.height = thumb_height.value.toString() + "px"

        panel_fill.value.style.height = convertPage2Scroll(panel.offsetHeight).toString() + "px"
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
        position: sticky;
        height: 100vh;
        width: 70px;
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
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>