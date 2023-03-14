<template>
    <div class="card-selector">
        <div class="btn-wrapper">
            <img 
                src="../../assets/icons/left_arrow.svg" 
                class="btn-back" :class="classDisabled(true)" 
                @click="btnMoveLeft()">
        </div>
        <div class="queue-wrapper">
            <div class="queue">
                <TransitionGroup name="queue" tag="CardVue" class="trans-group-cards"
                    @before-leave="g_store.addTransition()"
                    @after-enter="g_store.removeTransition()" appear>
                    <Card 
                        :style="getCardQueueStyle(index)" 
                        v-for="(id, index) in q_store.queue" 
                        :key="id" 
                        :idx="index"  
                        :text="q_store.getCardText(id)" 
                        :id="id" 
                        :in_queue="true" 
                        :visible="true"/>
                </TransitionGroup>
            </div>
        </div>
        <div class="btn-wrapper">
            <img 
                src="../../assets/icons/right_arrow.svg" 
                class="btn-forward" :class="classDisabled(false)" 
                @click="btnMoveRight()">
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { useQSortStore } from "../../stores/q-sort"
    import { useGlobalStore } from '../../stores/global';
    import Card from '../Card.vue'

    const g_store = useGlobalStore()
    const q_store = useQSortStore()
    const step = ref(1)

    function btnMoveRight(){
        q_store.changeSelectedIdx(step.value)
    }

    function btnMoveLeft(){
        q_store.changeSelectedIdx(-step.value)
    }

    function classDisabled(isFirst){
        if(isFirst){
            return q_store.selected_idx == 0 || q_store.queue.length == 0 ? "btn-disabled" : ""
        }else{
            return q_store.selected_idx == (q_store.queue.length-1) || q_store.queue.length == 0 ? "btn-disabled" : ""
        }
    }


    function isCardLeft(index){
        if(q_store.selected_idx < index){
            return false
        }
        if(q_store.selected_idx > index){
            return true
        }
        return null
    }
    
    function getCardLayer(index){
        return Math.abs(index - q_store.selected_idx)
    }
    
    function getCardQueueStyle(index){
        var layer = getCardLayer(index)
        var translateX = 22
        var scale = -0.25
        var num = 1.5
        var offset = 1.2
        var top_layer = 100
        
        if(isCardLeft(index)){
            translateX *= -1
        }else if(!isCardLeft(index)){
            num *=-1
        }
        
        translateX = layer * translateX + (num * layer * Math.pow(layer,offset))
        scale = 1 + layer * scale
        
        return layer < 4 ? {
            "transform": "translateX("+translateX+"%) scale("+scale+")",
            "z-index": (top_layer-layer)
        } : {
            "opacity": "0",
            "pointer-events": "none"
        }
    }


</script>




<style lang="scss" scoped>  
    @use "../../scss/Colors/Colors" as *;
    $animation-duration: 0.3s;

    .queue-enter-active{
        animation-name: card_appear;
        animation-duration: $animation-duration;
        animation-delay: $animation-duration;
        animation-fill-mode: both;
        animation-direction: normal;
        animation-timing-function: ease;
    }
    .queue-leave-active {
        animation-name: card_appear;
        animation-duration: $animation-duration;
        animation-fill-mode: forwards;
        animation-direction: reverse;
        animation-timing-function: ease;
    }

    @keyframes card_appear {
        0%{
            opacity: 0%;
            transform: scale(1.5);
        }
        100%{
            opacity: 100%;
            transform: scale(1);
        }
    }
    .card-selector{
        height: max(110px, min(32vmin, 170px));
        aspect-ratio: 32/18;
        min-width: 320px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        background-color: $primary_bg;
        border-radius: 0px 0px 6px 6px;

        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;


        .btn-wrapper{
            height: fit-content;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .btn-back, .btn-forward{
                transition: all .1s ease;
                width: max(25px,min(7.5vmin,35px));
                cursor: pointer;
                opacity: 65%;
            }

        }

        .btn-back:hover, .btn-forward:hover{
            opacity: 100%;
        }

         .btn-forward:active:not(.btn-disabled), .btn-back:active:not(.btn-disabled){
            transform: scale(.9);

        }
        .queue-wrapper{
            height: 100%;
            display: flex;
            .queue{
                position: relative;
                width: min(57vmin, 290px);
                min-width: 182px;
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                overflow: hidden;
                .trans-group-cards{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                }
            }
        }
    }
    .btn-disabled{
        opacity: 20% !important; 
        cursor: default !important;
    }
</style>