<template>
    <div class="card-selector">
        <div class="btn-wrapper">
            <img src="../assets/icons/arrow_forward_ios_white_24dp.svg" class="btn-back" :class="checkDisabled(true)" @click="moveLeft()">
        </div>
        <div class="queue">
            <CardVue v-for="(item, index) in cd_store.queue.card_array" :key="index" :idx="index" :card_text="item.text" :card_id="item.cid" :in_queue="true"></CardVue>
        </div>
        <div class="btn-wrapper">
            <img src="../assets/icons/arrow_forward_ios_white_24dp.svg" class="btn-forward" :class="checkDisabled(false)" @click="moveRight()">
        </div>
    </div>

</template>


<script setup>
    import { ref } from 'vue'
    import { useCardDatesetStore } from "../stores/card-dataset"
    import CardVue from '../components/Card.vue'

    const cd_store = useCardDatesetStore()
    const step = ref(1)

    function moveRight(){
        cd_store.changeSelectedIdx(step.value)
    }

    function moveLeft(){
        cd_store.changeSelectedIdx(-step.value)
    }

    function checkDisabled(isFirst){
        if(isFirst){
            return cd_store.queue.selected_idx == 0 ? "btn-disabled" : ""
        }else{
            return cd_store.queue.selected_idx == (cd_store.queue.card_array.length-1) ? "btn-disabled" : ""
        }
    }
    


</script>




<style lang="scss" scoped>  
    @use "../scss/Constants" as *;

    .card-selector{
        height: $queue-height;
        width: $queue-width;
        margin: auto;
        // overflow: visible;
        
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