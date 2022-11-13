<template>
    <div class="wrapper" :class="getQueueCardClass()">
        <div class="card">
            {{ card_text }}
        </div>
    </div>
    
</template>




<script setup>
    import { ref } from 'vue'
    import { useCardDatesetStore } from '../stores/card-dataset'
    const props = defineProps({
        card_text: String,
        card_id: Number,
        idx: Number
    })
    const visible_cards = ref(3)
    const cd_store = useCardDatesetStore()

    function getCardLayer(){
        var select_idx = cd_store.queue.selected_idx
        return Math.abs(props.idx - select_idx)
    }

    function getCardPos(){
        var select_idx = cd_store.queue.selected_idx
        if(select_idx < props.idx){
            return "right-card"
        }
        if(select_idx > props.idx){
            return "left-card"
        }
        return "center-card"
    }

    function isCardVisible(){
        var select_idx = cd_store.queue.selected_idx
        return (Math.abs(select_idx - props.idx) < visible_cards.value)
    }

    function getQueueCardClass(){
        if(!isCardVisible()){
            return "hidden-card"
        }
        var class_string = ""
        class_string += getCardPos()
        var layer = getCardLayer()
        if(layer != 0){
            class_string += " "
            class_string += "layer" + layer.toString()
        }
        return class_string
    }

</script>




<style lang="scss" scoped>
    @use "../scss/Constants" as *;
    .wrapper{
        display: flow-root;
        transition: transform .4s ease;
        position: absolute;
        .card{
            
            background-color: $card-color;
            width: $card-width;
            height: $card-height;
            margin: $card-outline-size;
    
            display: flex;
            justify-content: center;
            align-items: center;
            
            border-radius: $card-border-radius;
            outline-width: $card-outline-size;
            outline-style: solid;
            outline-color: #000000;
            
            font-size: $card-font-size;
            font-family: $card-font;
            text-align: center;
    
            padding: 5px;
            box-sizing: border-box;  
        }
    }

    .center-card{
        z-index: 100;

        .card{
            outline-color: $card-selected-color;
        }
    }

    .right-card.layer1{
        transform: translatex(20%) scale(.8);
        z-index: 1;

    }
    .right-card.layer2 {
        transform: translatex(40%) scale(.6);
        z-index: 0;
    }
    .left-card.layer1 {
        transform: translatex(-20%) scale(.8);
        z-index: 1;
    }
    .left-card.layer2{
        transform: translatex(-40%) scale(.6);
        z-index: 0;
    }


    .hidden-card{
        display: none;
    }
</style>