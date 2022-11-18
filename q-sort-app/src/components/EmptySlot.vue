<template>
    <div class="slot">
    </div>
</template>



<script setup>
</script>



<style lang="scss" scoped>
    @use "../scss/Constants" as *;


    .slot {
        // 2* Because the margin of card is on both sides15
        height: $slot-height + 2 * $card-outline-size; 
        width: $slot-width + 2 * $card-outline-size;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='black' stroke-width='8' stroke-dasharray='3%2c 20 ' stroke-dashoffset='50' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: $slot-border-radius;
        
        margin-top: $slot-tb-margin-size;
        margin-bottom: $slot-tb-margin-size;
        margin-inline-start: $slot-gap-size;
    }
</style>