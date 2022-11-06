<template>
    <div class="wrapper">
        <div class="card">
            {{ card_text }}
        </div>
    </div>
    
</template>




<script setup>
    const props = defineProps({
        card_text: String,
        card_id: Number
    })
</script>




<style lang="scss" scoped>
    @use "../scss/Constants" as *;
    .wrapper{
        display: flow-root;

        .card{
            background-color: $card-color;
            width: $card-width;
            height: $card-height;
            margin: $card-outline-size;
    
            display: flex;
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
    }
</style>