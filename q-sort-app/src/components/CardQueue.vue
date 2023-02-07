<template>
    <div class="card-selector">
        <div class="btn-wrapper">
            <img src="../assets/icons/arrow_forward_ios_white_24dp.svg" class="btn-back" :class="classDisabled(true)" @click="btnMoveLeft()">
        </div>
        <div class="queue-wrapper">
            <div class="queue">
                <TransitionGroup name="queue" tag="CardVue" class="trans-group-cards">
                    <CardVue :style="getCardQueueStyle(index)" v-for="(id, index) in cd_store.queue" :key="id" :idx="index"  :text="cd_store.getCardText(id)" :id="id" :in_queue="true" :visible="true" ></CardVue>
                </TransitionGroup>
            </div>
            <Transition name="return-btn">
                <div class="return-card-wrapper" v-if="!cd_store.isSelectedInQueue() && cd_store.selected_card_id != null">
                    <div class="return-card" @click="cd_store.returnCardToQueue()">
                        <div class="return-card-text">
                            Return
                        </div>
                        <div class="return-card-icon">
                            <img src="../assets/icons/queue_white_24dp.svg" />
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <div class="btn-wrapper">
            <img src="../assets/icons/arrow_forward_ios_white_24dp.svg" class="btn-forward" :class="classDisabled(false)" @click="btnMoveRight()">
        </div>
    </div>
</template>


<script setup>
    import { ref, watch } from 'vue'
    import { useCardDatesetStore } from "../stores/card-dataset"
    import CardVue from '../components/Card.vue'

    // const visible_return_btn = ref(false)

    const cd_store = useCardDatesetStore()
    const step = ref(1)


    // watch(
    //     cd_store.isNothingSelected(),
    //     (new_, old_) =>{
    //         visible_return_btn = !cd_store.isSelectedInQueue()
    //     }
    // )

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
        var translateX = 22
        var scale = -0.2
        var num = 1.5
        var offset = 1.5
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
        // height: 180px;
        min-height: 123px;
        height: min(35vmin, 180px);
        min-width: 320px;
        aspect-ratio: 32/18;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        background-color: #39DBFF;
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
            height: 60px;
            width: 60px;
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
            .queue{
                position: relative;
                // width: 320px; // TODO DELETE
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
                
                position: absolute;
                bottom: 6px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                justify-content: center;
                z-index: 1000;
                width: max-content;
                .return-card{
                    background-color: #329DFF;
                    padding: 6px 11px 6px 11px;
                    border-radius: 6px;
                    display: flex;
                    align-content: space-between;
                    gap: 5px;

                    opacity: 80%;

                    .return-card-text{
                        display: flex;
                        align-items: center;
                        height: 100%;
                        color: #FFFFFF;
                        font-size: max(13px, min(3vmin, 15px));
                        white-space: nowrap;
                    }
                    .return-card-icon{
                        display: flex;
                        align-content: center;
                        height: 100%;
                        aspect-ratio: 1/1;
                        width: max(15px, min(3vmin, 30px));


                    }
                }
                .return-card:hover{
                    cursor: pointer;
                    background-color: #1d92ff;
                    opacity: 100%;
                }
            }
        }
    }
    .btn-disabled{
        opacity: 20% !important; 
        cursor: default !important;
    }
</style>