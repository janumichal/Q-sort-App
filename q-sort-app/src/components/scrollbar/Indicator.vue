<template>
    <div class="indicator" 
        :class="filled ? 'filled' : ''">
        
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';
    import { useQSortStore } from '../../stores/q-sort';
    const props = defineProps({
        row: Number,
        col: Number
    })
    const qStore = useQSortStore()
    const filled = ref(false)

    function lookUpFilled(){
        var cardId = qStore.getTableCardId(props.row, props.col)
            if(cardId != null){
                filled.value = true
            }else{
                filled.value = false
            }
    }
    watch(
        () => qStore.table[props.row][props.col],
        () => {
            lookUpFilled()
        }
    )
    onMounted(() => {
        lookUpFilled()
    })
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
        background-color: $primary-card;
    }
</style>