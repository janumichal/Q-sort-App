<template>
    <div class="wrapper" :class="classHidden()" @click="onClickSelect()">
        <div class="card" :class="classSelectedClickable()">
            {{ text }}
        </div>
    </div>
    
</template>




<script setup>
    import { ref } from 'vue'
    import { useCardDatesetStore } from '../stores/card-dataset'
    const props = defineProps({
        text: String,
        id: Number,
        idx: Number,
        in_queue: Boolean
    })
    const visible_cards = ref(3) 
    const cd_store = useCardDatesetStore()
    


    function isSelected(){
        return props.id == cd_store.selected_card.id &&
         props.text == cd_store.selected_card.text
    }



    function classSelectedClickable(){
        var class_str = ""
        if(isSelected()){
            class_str += "selected"
        }else if(!props.in_queue || props.in_queue && props.idx == cd_store.selected_idx){
            class_str += "clickable"
            if(!cd_store.isSelectedInQueue() && !props.in_queue && !cd_store.isNothingSelected()){
                class_str += class_str.length == 0 ? "" : " "
                class_str += "swapable"
            }
        }
        
        return class_str
    }

    
    function classHidden(){
        var select_idx = cd_store.selected_idx
        if (Math.abs(select_idx - props.idx) < visible_cards.value || !props.in_queue){
            return ""
        }else{
            return "hidden"
        }
    }

    function onClickSelect(){
        if(!props.in_queue && cd_store.isSelectedInQueue() || cd_store.isNothingSelected() || !cd_store.isSelectedInQueue() && props.in_queue && cd_store.selected_idx == props.idx){
            var card_pos = cd_store.getCardPos(props.text, props.id)
            cd_store.setSelected({text: props.text, id: props.id}, card_pos.row, card_pos.col)
        }else if(!cd_store.isSelectedInQueue() && !props.in_queue){
            cd_store.swapSlots(props.id, props.text)
        }
    }

</script>




<style lang="scss" scoped>
    @use "../scss/Constants" as *;

    .wrapper{
        display: flow-root;
        transition: all .4s ease;
        position: absolute;
        z-index: 1;
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
        .selected{
            transform: scale(1.05);
            outline-color: $card-outline-selected-color !important;
        }
        .clickable {
            cursor: pointer;
        }

        .swapable:hover{
            background-color: $card-color;
            background-image: url(../assets/icons/cached_black_24dp.svg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: $slot-swap-icon-size;
            opacity: 65%;
        }
    }

    .hidden{
        visibility: hidden;
    }

</style>