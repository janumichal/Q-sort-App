<template>
    <div class="row">
        <div class="row-value">{{ props.row_value }}</div>
        <EmptySlotVue v-for="index in props.slot_count" :key="index-1" @change="renewTable" :row="props.row" :col="index-1"></EmptySlotVue>
        <div class="delimiter-text">{{ props.delimiter_text }}</div>
    </div>
</template>



<script setup>
    import EmptySlotVue from '../components/EmptySlot.vue'
    import { ref } from 'vue'
    import { useCardDatesetStore } from '../stores/card-dataset'
    
    const cd_store = useCardDatesetStore()
    const props = defineProps({
        row: Number,
        slot_count: Number,
        delimiter_text: String,
        row_value: Number
    })
    const is_empty = ref(true)

    function renewTable(payload){
        is_empty.value = false
        col.value = payload.col
    }

</script>



<style lang="scss" scoped>
    
    .row{
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        // gap: 15px;
        gap: min(.8vmin, 10px);
        align-items: center;

        .row-value{
            color: #FFFFFF;
            // width: 45px;
            width: min(8vmin, 45px);
            min-width: 26px;
            font-variation-settings: 'wght' 700;
            // font-size: 20px;
            font-size: max(10pt ,min(4vmin, 15pt));
            align-self: stretch;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: brightness(.9) saturate(140%);
        }

        .delimiter-text{
            font-family: "Maven Pro";
            font-variation-settings: 'wght' 800;
            font-size: max(80px, min(25vmin, 100px));
            opacity: 30%;
            margin-left: min(3vmin, 30px);
            z-index: 0;
        }
    }
</style>