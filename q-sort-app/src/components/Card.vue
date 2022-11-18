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
        idx: Number,
        in_queue: Boolean
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
        return cd_store.is_queue_selected ? "center-card selected-card" : "center-card"
    }

    function isCardVisible(){
        var select_idx = cd_store.queue.selected_idx
        return (Math.abs(select_idx - props.idx) < visible_cards.value)
    }

    function getQueueCardClass(){
        if(props.in_queue){
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
        }else{
            return ""
        }
    }

</script>




<style lang="scss" scoped>
    @use "../scss/Constants" as *;
    @use "../scss/Mixins" as *;

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
            outline-color: $card-outline-default-color;
            
            font-size: $card-font-size;
            font-family: $card-font;
            text-align: center;
    
            padding: 5px;
            box-sizing: border-box;

            box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.15);
        }
    }
    
    .center-card{
        z-index: $top-layer;
    }
    
    @include generateLayers;

    .hidden-card{
        display: none;
    }
    .selected-card .card{
        transform: scale(1.05);
        outline-color: $card-outline-selected-color !important;
    }
</style>