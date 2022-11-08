<template>
    <div class="card-selector">
        <div class="btn-back"></div>
        <div class="queue">
            <CardVue v-for="(item, index) in store.state.queue.card_array" :key="index" :idx="index" :card_text="item.text" :card_id="item.cid" ></CardVue>
        </div>
        <div class="btn-forward"></div>
    </div>

</template>


<script setup>
    import { ref, onMounted } from 'vue'
    import { useStore } from "vuex"
    import CardVue from '../components/Card.vue'
    import json_data from "../assets/datasets/food-sort.json"

    const store = useStore()

    store.commit("loadDataset", json_data)

    // const new_card = {cid: 10, text:"lala"}
    // store.commit("addCardToQueue", new_card)

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
            display: flex;
        }
        
    }
</style>