<template>
    <div class="indicator" 
        :class="filled ? 'filled' : ''">
        
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useQSortStore } from '../../stores/q-sort';
    const props = defineProps({
        row: Number,
        col: Number
    })
    const q_store = useQSortStore()
    const filled = ref(false)

    watch(
        q_store.table,
        () => {
            var card_id = q_store.getTableCardId(props.row, props.col)
            if(card_id != null){
                filled.value = true
            }else{
                filled.value = false
            }
        }
    )
</script>

<style lang="scss" scoped>
    @use "../../scss/Colors/Colors" as *;
    .indicator{
        height: 8px;
        aspect-ratio: 22/13;
        border: 2px dotted black;
        border-radius: 3px;
    }

    .filled{
        border-style: solid !important;
        background-color: $primary_card;
    }
</style>