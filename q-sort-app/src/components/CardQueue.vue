<template>
    <div class="card-selector">
        <div class="btn-back" @click="moveLeft()"></div>
        <div class="queue">
            <CardVue v-for="(item, index) in cd_store.queue.card_array" :key="index" :idx="index" :card_text="item.text" :card_id="item.cid" ></CardVue>
        </div>
        <div class="btn-forward" @click="moveRight()"></div>
    </div>

</template>


<script setup>
    import { ref, onMounted } from 'vue'
    import { useCardDatesetStore } from "../stores/card-dataset"
    import CardVue from '../components/Card.vue'
    import json_data from "../assets/datasets/food-sort.json"

    const cd_store = useCardDatesetStore()

    cd_store.loadDataset(json_data)

    // const new_card = {cid: 10, text:"lala"}
    // cd_store.addCardToQueue(new_card)

    function moveRight(){
        cd_store.changeSelectedIdx(1)
    }

    function moveLeft(){
        cd_store.changeSelectedIdx(-1)
    }


</script>




<style lang="scss" scoped>
    @use "../scss/Constants" as *;
    
    .card-selector{
        display: flex;
        height: $queue-height;
        // width: $queue-width;
        justify-content: space-evenly;
        align-items: center;
        overflow: visible;
        

        background-color: $queue-color;
        border-radius: 0px 0px $queue-border-radius $card-border-radius;


        .btn-back, .btn-forward{
            height: 100px;
            width: 50px;
            background-color: red;
        }
        .queue{
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            
        }
        
    }
</style>