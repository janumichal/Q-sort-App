<template>
    <div class="card-selector">
        <div class="btn-back"></div>
        <div class="queue">
            <CardVue v-for="item in card_array" :card_text="item.text" :card_id="item.cid"></CardVue>
        </div>
        <div class="btn-forward"></div>
    </div>

</template>


<script setup>
    import { ref } from 'vue';
    import CardVue from '../components/Card.vue';
    import json_data from "../assets/datasets/food-sort.json"

    const card_array = ref([])
    const card_count = ref(null)
    const selected_card_id = ref(null)
    const is_selected = ref(null)

    card_array.value = json_data.cards
    card_count.value = card_array.value.length 
    selected_card_id.value = 0
    is_selected.value = true

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