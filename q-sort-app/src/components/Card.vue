<template>
    <div class="q-card">
        {{ card_text }}
    </div>
</template>

<script setup>
    defineProps({
        card_text: String
    })
</script>

<style lang="scss" scoped>
    @use "../scss/Constants" as *;
    .q-card{
        background-color: $card-color;
        width: $card-width;
        height: $card-height;
        margin: $card-outline-size;

        display:flex;
        justify-content: center;
        align-items: center;
        
        border-radius: $card-border-radius;
        outline-width: $card-outline-size;
        outline-style: solid;
        outline-color: #000000;
        
        font-size: $card-font-size;
        font-family: $card-font;
        text-align: center;

        padding: 5px;
        box-sizing: border-box;  
    }
</style>