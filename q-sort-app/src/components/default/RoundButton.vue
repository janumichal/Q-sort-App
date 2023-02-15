<template>
    <div class="button-inner">
        <slot>
            <img src="../../assets/icons/close_white_24dp.svg"/>
        </slot>
    </div>
</template>

<script setup>


</script>

<style lang="scss">
    .button-inner{
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: fit-content;
        border-radius: 100px;
        padding: 3px;
        margin: 0px;
        cursor: pointer;
        background-color: rgba($color: #000000, $alpha: .1);
        transition: background-color ease-in-out 0.2s;

        img{
            $size: 27px;
            width: $size;
            height: $size;
        }
        &:hover{
            background-color: rgba($color: #000000, $alpha: .3);
        }
    }
</style>