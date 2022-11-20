<template>
    <div class="slot-wrapper">
        <CardVue v-if="!is_empty" :text="card_text" :id="card_id" :in_queue="false"></CardVue>
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
    const is_empty = ref(true)

    const card_id = ref(null)
    const card_text = ref("")

    watch(
        cd_store.table,
        (newVal, oldVal) =>{
            var card = cd_store.getTableCard(props.row, props.col)
            if(card!= null){
                card_id.value = card.id
                card_text.value = card.text
                is_empty.value = false
            }else{
                is_empty.value = true
            }
        }
    )

    function onClickMove(){
        cd_store.moveToTable(props.row, props.col)
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
    @use "../scss/Constants" as *;

    .slot-wrapper{
        margin-top: $slot-tb-margin-size;
        margin-bottom: $slot-tb-margin-size;
        margin-inline-start: $slot-gap-size;
    }

    .slot {
        display: flex; 
        align-items: stretch;
        min-height: $slot-height; 
        min-width: $slot-width;
        margin: $card-outline-size;

        border-radius: $card-border-radius;
        outline: $card-outline-size;
        outline-style: dotted;
        outline-color: $card-outline-default-color;

        

        .slot-empty{
            min-height: 100%;
            min-width: 100%;
            border-radius: $card-border-radius;
            cursor: pointer;
        }
        .movable:hover{
            background-color: $card-color;
            background-image: url(../assets/icons/redo_black_24dp.svg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: $slot-move-icon-size;
            opacity: 65%;
        }
    
    }



</style>