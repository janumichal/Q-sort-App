<template>
    <div class="row">
        <EmptySlotVue v-for="index in props.slot_count" :key="index"></EmptySlotVue>
        <div class="delimiter-text">{{ props.delimiter_text }}</div>
    </div>
</template>



<script setup>
    import EmptySlotVue from '../components/EmptySlot.vue'

    const props = defineProps({
        slot_count: Number,
        delimiter_text: String 
    })

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