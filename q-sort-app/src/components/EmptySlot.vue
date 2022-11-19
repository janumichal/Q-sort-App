<template>
    <div class="slot-wrapper">
        <CardVue v-if="!is_empty" :class="'clickabele'" :card_text="c_text" :card_id="c_id" :in_queue="in_q"></CardVue>
        <div class="slot" >
            <div class="slot-empty" @click="addCard()">
            </div>
        </div>
    </div>
</template>



<script setup>
    import CardVue from '../components/Card.vue'
    import { ref } from "vue"
    import { useCardDatesetStore } from '../stores/card-dataset';

    const cd_store = useCardDatesetStore()
    const is_empty = ref(true)
    const c_id = ref(null)
    const c_text = ref("")
    const in_q = ref(false)

    function addCard(){
        var card = cd_store.popFromQueue()
        if(card == null){
            this.is_empty = true
        }else{
            c_id.value = card.c_id
            c_text.value = card.text
            this.is_empty = false
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

    .clickabele {
        cursor: pointer;
        z-index: 100;
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

        

        .slot-empty, .slot-full {
            min-height: 100%;
            min-width: 100%;
            border-radius: $card-border-radius;
            cursor: pointer;
        }
        .slot-empty:hover{
            background-color: $card-color;
            background-image: url(../assets/icons/redo_black_24dp.svg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: $slot-move-icon-size;
            opacity: 50%;
        }
    
        // .slot-full:hover{
        //     background-color: $card-color;
        //     background-image: url(../assets/icons/cached_black_24dp.svg);
        //     background-repeat: no-repeat;
        //     background-position: center;
        //     background-size: $slot-swap-icon-size;
        //     opacity: 50%;
        // }
    }



</style>