<template>
    <div class="wrapper" :class="getQueueCardClass()">
        <div class="card">
            {{ card_text }}
        </div>
    </div>
    
</template>




<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    const props = defineProps({
        card_text: String,
        card_id: Number,
        idx: Number
    })
    const visible_cards = ref(3)
    const store = useStore()

    function getCardLayer(){
        var select_idx = store.state.queue.selection_idx
        return Math.abs(props.idx - select_idx)
    }

    function getCardPos(){
        var select_idx = store.state.queue.selection_idx
        if(select_idx < props.idx){
            return "right-card"
        }
        if(select_idx > props.idx){
            return "left-card"
        }
        return "center-card"
    }

    function isCardVisible(){
        return (Math.abs(store.state.queue.selection_idx - props.idx) < visible_cards.value)
    }

    function getQueueCardClass(){
        if(!isCardVisible()){
            return "hidden-card"
        }
        var class_string = ""
        var card_layer = getCardLayer()
        class_string += getCardPos()
        class_string += " "
        class_string += "layer" + getCardLayer().toString()
        return class_string
    }

</script>




<style lang="scss" scoped>
    @use "../scss/Constants" as *;
    .wrapper{
        display: flow-root;

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
</style>