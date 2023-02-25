<template>
    <div class="button" :class="getColor()">
        <slot>
            <img src="../../assets/icons/close.svg"/>
        </slot>
    </div>
</template>

<script setup>
    import { ButtonTypes } from "../../enums"
    const props = defineProps({
        btn_type:{
            type: String,
            default: ButtonTypes.Normal
        }
    })
    function getColor(){
        return "button-"+ props.btn_type
    }   
</script>

<style lang="scss" scoped>
    @use "../../scss/Colors" as *;
    
    .button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: fit-content;
        border-radius: 6px;
        padding: 5px 10px 5px 10px;
        margin: 0px;
        cursor: pointer;
        transition: background-color ease-in-out 0.2s;
    }
    $opacity-static:.4;
    $opacity-hover:.8;
    .button-normal{
        background-color: rgba($default_btn_clr, $alpha: $opacity-static);

        &:hover{
            background-color: rgba($default_btn_clr, $alpha: $opacity-hover);
        }
    }
    .button-warning{
        background-color: rgba($warning_btn_clr, $alpha: $opacity-static);

        &:hover{
            background-color: rgba($warning_btn_clr, $alpha: $opacity-hover);
        }
    }
</style>