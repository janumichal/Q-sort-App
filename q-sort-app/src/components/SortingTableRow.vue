<template>
    <div class="row">
        <EmptySlotVue v-for="index in props.slot_count" :key="index-1" @change="renewTable" :row="props.row" :col="index-1"></EmptySlotVue>
        <div class="delimiter-text">{{ props.delimiter_text }}</div>
    </div>
</template>



<script setup>
    import EmptySlotVue from '../components/EmptySlot.vue'
    import { ref } from 'vue'
 
    const props = defineProps({
        row: Number,
        slot_count: Number,
        delimiter_text: String 
    })
    const is_empty = ref(true)

    function renewTable(payload){
        is_empty.value = false
        col.value = payload.col
    }



</script>



<style lang="scss" scoped>
    @use "../scss/Constants" as *;
    
    .row{
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        gap: $slot-gap-size;
        align-items: center;
        flex-grow: 1;

        .delimiter-text{
            font-family: $card-font;
            font-variation-settings: 'wght' 800;
            font-size: 100px;
            opacity: 30%;
            margin-left: 30px;
            z-index: 0;
        }
    }
</style>