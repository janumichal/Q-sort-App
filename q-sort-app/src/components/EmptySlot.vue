<template>
    <div class="slot-wrapper">
        <Card :visible="c_visible" :text="card.text" :id="card.id" :in_queue="false" />
        <div class="slot" >
            <div class="slot-empty" :class="classMovable()" @click="onClickMove()">
            </div>
        </div>
    </div>
</template>



<script setup>
    import Card from '../components/Card.vue'
    import { ref, watch } from "vue"
    import { useQSortStore } from '../stores/q-sort';

    const props = defineProps({
        row: Number,
        col: Number
    })

    const q_store = useQSortStore()
    const c_visible = ref(false)

    const card = ref({
        id: null,
        text: ""
    })

    watch(
        q_store.table,
        (new_val, old_val) =>{
            var card_id = q_store.getTableCardId(props.row, props.col)
            if(card_id!= null){
                if(c_visible.value && card.value.id != card_id){
                    c_visible.value = false
                    setTimeout(() => {
                        card.value.id = card_id
                        card.value.text = q_store.getCardText(card_id)
                        c_visible.value = true
                    }, 300)                    
                }else{
                    card.value.id = card_id
                    card.value.text = q_store.getCardText(card_id)
                    c_visible.value = true
                }
            }else{
                c_visible.value = false
            }
        }
    )

    function onClickMove(){
        q_store.moveToSlot(props.row, props.col)
    }

    function classMovable(){
        if(!q_store.isNothingSelected()){
            return "movable"
        }else{
            return ""
        }
    }

</script>



<style lang="scss" scoped>

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
        // height:  min(25vmin, 130px);
        // min-height: 80px;
        width: min(43vmin, 220px);
        aspect-ratio: 22/13;
        min-width: 138px;
        margin: 4px;

        border-radius: 6px;
        outline: max(3.5px, min(.8vmin, 4px));
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