<template>
    <Transition name="card">
        <div v-if="props.visible" class="wrapper" @click="onClickSelect()">
            <div class="card" :class="classIsSelected(), classClickable(), classNotSelectedInQueue()">
                {{ text }}
            </div>
        </div>
    </Transition>
</template>




<script setup>
    import { ref } from 'vue'
    import { useQSortStore } from '../stores/q-sort'
    const props = defineProps({
        text: String,
        id: Number,
        idx: Number,
        in_queue: Boolean,
        visible: Boolean
    })
    const visible_cards = ref(3) 
    const q_store = useQSortStore()

    function isSelected(){
        return props.id == q_store.selected_card_id &&
         props.text == q_store.getCardText(q_store.selected_card_id)
    }



    function classIsSelected(){
        if(isSelected()){
            return "selected"
        }
        return ""
    }

    function classClickable(){
        var class_str = ""
        if(!isSelected() && (!props.in_queue || props.in_queue && props.idx == q_store.selected_idx)){
            class_str += "clickable"
            if(!q_store.isSelectedInQueue() && !props.in_queue && !q_store.isNothingSelected()){
                class_str += class_str.length == 0 ? "" : " "
                class_str += "swapable"
            }
        }
        return class_str
    }

    function classNotSelectedInQueue(){
        if(!isSelected() && props.in_queue){
            return "inqueue"
        }
        return ""
    }

    function onClickSelect(){
        if(!props.in_queue && q_store.isSelectedInQueue() || q_store.isNothingSelected() || !q_store.isSelectedInQueue() && props.in_queue && q_store.selected_idx == props.idx){
            var card_pos = q_store.getCardPos(props.id)
            q_store.setSelected(props.id, card_pos.row, card_pos.col)
        }else if(!q_store.isSelectedInQueue() && !props.in_queue){
            q_store.swapSlots(props.id)
        }
    }
        

</script>




<style lang="scss" scoped>

    $animation-duration: 0.3s;
    .card-enter-active {
        animation-name: card_appear;
        animation-duration: $animation-duration;
        animation-delay: $animation-duration;
        animation-fill-mode: both;
        animation-direction: normal;
        animation-timing-function: ease;
    }

    .card-leave-active {
        animation-name: card_appear;
        animation-duration: $animation-duration;
        animation-fill-mode: forwards;
        animation-direction: reverse;
        animation-timing-function: ease;
    }

    @keyframes card_appear {
        0%{
            opacity: 0%;
            visibility: hidden;
            transform: scale(1.5);
        }
        100%{
            opacity: 100%;
            visibility: visible;
            transform: scale(1);
        }
    }

    .wrapper{
        display: flow-root;
        transition: all .4s ease;
        position: absolute;
        // position: relative;

        z-index: 1;
        .card{
            
            background-color: #B2EDFF;
            // width: 220px;
            // height: 130px;
            width: min(43vmin, 220px);
            min-width: 138px;
            // height: min(25vmin, 130px);
            // min-height: 80px;
            aspect-ratio: 22/13;
            margin: 4px;
    
            display: flex;
            justify-content: center;
            align-items: center;
            
            border-radius: 6px;
            outline-width:max(3.5px, min(.8vmin, 4px));
            outline-style: solid;
            outline-color: #000000;
            
            // font-size: 12pt;
            font-size: max(10pt, min(3.8vmin, 12pt));
            font-family: "Maven Pro";
            text-align: center;
    
            padding: 5px;
            box-sizing: border-box;

            box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.15);
        }
        .inqueue{
            outline: none !important;
        }

        .selected{
            transform: scale(1.05);
            outline-color: #BDFF00 !important;
            font-variation-settings: "wght" 600;
        }
        .clickable {
            cursor: pointer;
        }

        .swapable:hover{
            background-color: #B2EDFF;
            background-image: url(../assets/icons/cached_black_24dp.svg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 83px;
            opacity: 65%;
        }
    }

</style>