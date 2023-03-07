<template>
    <div class="card-selector">
        <div class="btn-wrapper">
            <img src="../../assets/icons/right_arrow.svg" class="btn-back" :class="classDisabled(true)" @click="btnMoveLeft()">
        </div>
        <div class="queue-wrapper">
            <div class="queue">
                <TransitionGroup name="queue" tag="CardVue" class="trans-group-cards">
                    <Card :style="getCardQueueStyle(index)" v-for="(id, index) in q_store.queue" :key="id" :idx="index"  :text="q_store.getCardText(id)" :id="id" :in_queue="true" :visible="true" />
                </TransitionGroup>
            </div>
            <Transition name="return-btn">
                <div class="return-card-wrapper" v-if="!q_store.isSelectedInQueue() && q_store.selected_card_id != null">
                    <NormalButton class="return-card" @click="q_store.returnCardToQueue()" 
                        :btn_type="ButtonTypes.NormalNoOpacity">
                        <div class="return-card-text">
                            Return
                        </div>
                        <div class="return-card-icon">
                            <img src="../../assets/icons/return_card.svg" />
                        </div>
                    </NormalButton>
                </div>
            </Transition>
        </div>
        <div class="btn-wrapper">
            <img src="../../assets/icons/right_arrow.svg" class="btn-forward" :class="classDisabled(false)" @click="btnMoveRight()">
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { useQSortStore } from "../../stores/q-sort"
    import { ButtonTypes } from '../../enums';
    import Card from '../Card.vue'
    import NormalButton from '../default/NormalButton.vue';


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
            "transform": "translateX("+translateX+"%) scale("+scale+")",
            "z-index": (top_layer-layer),
            "opacity": "0",
            "pointer-events": "none"
        }
    }


    


</script>




<style lang="scss" scoped>  
    @use "../../scss/Colors/Colors" as *;
    $animation-duration: 0.3s;

    .return-btn-enter-active{
        animation-name: show-btn;
        animation-duration: $animation-duration;
        animation-fill-mode: forwards;
        animation-direction: normal;
        animation-timing-function: ease;
    }

    .return-btn-leave-active{
        animation-name: show-btn;
        animation-duration: $animation-duration;
        animation-fill-mode: forwards;
        animation-direction: reverse;
        animation-timing-function: ease;
    }

    @keyframes show-btn {
        0%{
            opacity: 0%;

        }
        100%{
            opacity: 100%;
        }
    }

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
            // visibility: hidden;
            transform: scale(1.5);
        }
        100%{
            opacity: 100%;
            // visibility: visible;
            transform: scale(1);
        }
    }
    .card-selector{
        min-height: 123px;
        height: min(35vmin, 180px);
        aspect-ratio: 32/18;
        min-width: 320px;
        // width: min(100vmin, 450px);
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;

        background-color: $primary_bg;
        border-radius: 0px 0px 6px 6px;

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
            height: fit-content;
            width: 30px;
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
        .queue-wrapper{
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            .queue{
                grid-row-start: 1;
                grid-column-start: 1;
                position: relative;
                width: min(60vmin, 320px);
                min-width: 192px;
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
            .return-card-wrapper{
                grid-row-start: 1;
                grid-column-start: 1;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                z-index: 1000;
                pointer-events: none;
                .return-card{
                    padding: 6px 11px 6px 11px;
                    border-radius: 6px;
                    display: flex;
                    align-content: center;
                    justify-content: center;
                    gap: 5px;
                    height: fit-content;
                    transform: translateY(-30%);
                    pointer-events: all;

                    .return-card-text{
                        display: flex;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                        height: initial;
                        color: #000000;
                        font-variation-settings: "wght" 500;
                        font-size: max(13px, min(3vmin, 15px));
                        white-space: nowrap;
                    }
                    .return-card-icon{
                        display: flex;
                        align-content: center;
                        height: 100%;
                        aspect-ratio: 1/1;
                        width: max(15px, min(3vmin, 20px));


                    }
                }
            }
        }
    }
    .btn-disabled{
        opacity: 20% !important; 
        cursor: default !important;
    }
</style>