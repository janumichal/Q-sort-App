<template>
    <div class="button-inner">
        <slot>
            <img src="../../assets/icons/close_white_24dp.svg"/>
        </slot>
    </div>
</template>

<script setup>


</script>

<style lang="scss" scoped>
    @use "../../scss/Colors" as *;
    $opacity-static: .4;
    $opacity-hover: .8;
    .button-inner{
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: fit-content;
        border-radius: 100px;
        padding: 4px;
        margin: 0px;
        cursor: pointer;
        background-color: rgba($default_btn_clr, $opacity-static);
        transition: background-color ease-in-out 0.2s;

        img{
            $size: 25px;
            width: $size;
            height: $size;
        }
        &:hover{
            background-color: rgba($default_btn_clr, $opacity-hover);
        }
    }
</style>