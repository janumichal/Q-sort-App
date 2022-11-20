<template>
    <div class="card-selector">
        <div class="btn-wrapper">
            <img src="../assets/icons/arrow_forward_ios_white_24dp.svg" class="btn-back" :class="classDisabled(true)" @click="btnMoveLeft()">
        </div>
        <div class="queue">
            <CardVue :style="getCardQueueStyle(index)" v-for="(item, index) in cd_store.queue" :key="index" :idx="index"  :text="item.text" :id="item.id" :in_queue="true"></CardVue>
        </div>
        <div class="btn-wrapper">
            <img src="../assets/icons/arrow_forward_ios_white_24dp.svg" class="btn-forward" :class="classDisabled(false)" @click="btnMoveRight()">
        </div>
    </div>

</template>


<script setup>
    import { ref } from 'vue'
    import { useCardDatesetStore } from "../stores/card-dataset"
    import CardVue from '../components/Card.vue'

    const cd_store = useCardDatesetStore()
    const step = ref(1)

    function btnMoveRight(){
        cd_store.changeSelectedIdx(step.value)
    }

    function btnMoveLeft(){
        cd_store.changeSelectedIdx(-step.value)
    }

    function classDisabled(isFirst){
        if(isFirst){
            return cd_store.selected_idx == 0 || cd_store.queue.length == 0 ? "btn-disabled" : ""
        }else{
            return cd_store.selected_idx == (cd_store.queue.length-1) || cd_store.queue.length == 0 ? "btn-disabled" : ""
        }
    }


    function isCardLeft(index){
        if(cd_store.selected_idx < index){
            return false
        }
        if(cd_store.selected_idx > index){
            return true
        }
        return null
    }
    
    function getCardLayer(index){
        return Math.abs(index - cd_store.selected_idx)
    }
    
    function getCardQueueStyle(index){
        var layer = getCardLayer(index)
        var translateX = 0
        var scale = 0
        var num = 1
        var offset = 1.5
        var top_layer = 100
        
        if(isCardLeft(index)){
            translateX = -20
            scale = -0.2
        }else if(!isCardLeft(index)){
            num *=-1
            translateX = 20
            scale = -0.2
        }
        
        translateX = layer * translateX + (num * layer * Math.pow(layer,offset))
        scale = 1 + layer * scale
        
        return {
            "transform": "translateX("+translateX+"%) scale("+scale+")",
            "z-index": (top_layer-layer)
        }
    }


    


</script>




<style lang="scss" scoped>  
    @use "../scss/Constants" as *;

    .card-selector{
        height: $queue-height;
        width: $queue-width;
        margin: auto;
        
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        background-color: $queue-color;
        border-radius: 0px 0px $queue-border-radius $queue-border-radius;

        .btn-back{
            transform: rotate(180deg);
        } 
        .btn-back, .btn-forward{
            transition: all .1s ease;
            height: 100%;
            width: 100%;
            cursor: pointer;
            opacity: 65%;
        }
        .btn-wrapper{
            height: $button-size;
            width: $button-size;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .btn-back:hover, .btn-forward:hover{
            opacity: 100%;
        }

        .btn-back:active:not(.btn-disabled), .btn-forward:active:not(.btn-disabled){
            height: 90%;
            width: 90%;
        }

        .queue{
            position: relative;
            width: 320px;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }
    }
    .btn-disabled{
        opacity: 20% !important; 
        cursor: default !important;
    }
</style>