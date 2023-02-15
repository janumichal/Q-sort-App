<template>
    <Transition name="modal">
        <div class="modal-wrapper" v-if="visible">
            <div class="modal-inner">
                <div class="modal-header">
                    <RoundButton @click="onClickClose()"/>
                    <slot name="header">
                        Default Header
                    </slot>
                </div>
                <div class="modal-content">
                    <slot name="content">
                        Default Content
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
    import RoundButton from './RoundButton.vue';
    import { ref } from "vue"

    const visible = ref(false)

    function onClickClose(){
        visible.value = !visible.value
    }
</script>

<style lang="scss">
    .modal-wrapper{
        z-index: 9999;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        backdrop-filter: blur(4px);

        .modal-inner{
            width: 400px;
            height: fit-content;
            background-color: #50475c;
            display: flex;
            flex-direction: column;
            padding: 15px;
            border-radius: 6px;
            gap: 10px;
            color: #FFFFFF;
            margin-left: 10px;
            margin-right: 10px;
            .modal-header{
                font-size: 20px;
                font-variation-settings: "wght" 600;
                display: flex;
                flex-direction: row-reverse;
                justify-content: space-between;
            }
        }
    }
</style>