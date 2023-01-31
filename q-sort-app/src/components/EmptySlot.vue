<template>
    <div class="slot-wrapper">
        <Transition name="table-card">
            <CardVue v-if="c_visible" :text="card_text" :id="card_id" :in_queue="false"></CardVue>
        </Transition>
        <div class="slot" >
            <div class="slot-empty" :class="classMovable()" @click="onClickMove()">
            </div>
        </div>
    </div>
</template>



<script setup>
    import CardVue from '../components/Card.vue'
    import { ref, watch } from "vue"
    import { useCardDatesetStore } from '../stores/card-dataset';

    const props = defineProps({
        row: Number,
        col: Number
    })

    const cd_store = useCardDatesetStore()
    const c_visible = ref(false)

    const card_id = ref(null)
    const card_text = ref("")

    watch(
        cd_store.table,
        (newVal, oldVal) =>{
            var card = cd_store.getTableCard(props.row, props.col)
            if(card!= null){
                card_id.value = card.id
                card_text.value = card.text
                c_visible.value = true
            }else{
                c_visible.value = false
            }
        }
    )

    function onClickMove(){
        
        cd_store.moveToSlot(props.row, props.col)
    }

    function classMovable(){
        if(!cd_store.isNothingSelected()){
            return "movable"
        }else{
            return ""
        }
    }

</script>



<style lang="scss" scoped>

$animation-duration: 0.3s;
.table-card-enter-active {
    animation-name: card_appear;
    animation-duration: $animation-duration;
    animation-fill-mode: forwards;
    animation-direction: normal;
    animation-timing-function: ease;
}

.table-card-leave-active {
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

    .slot-wrapper{
        // margin-top: 20px;
        // margin-bottom: 20px;
        // margin-inline-start: 15px;
        margin-top: max(10px, min(3vmin, 20px));
        
        margin-bottom: max(10px, min(3vmin, 20px));
        margin-inline-start:max(8px, min(3vmin, 15px));
    }

    .slot {
        display: flex; 
        align-items: stretch;
        // min-height: 130px; 
        // min-width: 220px;
        height:  min(25vmin, 130px);
        min-height: 80px;
        width: min(43vmin, 220px);
        min-width: 138px;
        margin: 4px;

        border-radius: 6px;
        outline: 4px;
        outline-style: dotted;
        outline-color: #000000;

        

        .slot-empty{
            min-height: 100%;
            min-width: 100%;
            border-radius: 6px;
        }
        .movable:hover{
            background-color: #B2EDFF;
            background-image: url(../assets/icons/redo_black_24dp.svg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 62px;
            opacity: 65%;
            cursor: pointer;
        }
    
    }



</style>