<template>
    <div class="top-panel">
        <Transition name="question">
            <div ref="question_wrapper" class="question-wrapper" v-if="question_visible">
                <div class="question-info-icon">
                    <img src="../assets/icons/info_black_24dp.svg" />
                </div>
                <div class="question">
                    {{ cd_store.question }}
                </div>
                <RoundButton @click="onClickToggleQuestion()" />
            </div>
        </Transition>
        <Transition name="question-toggle">
            <RoundButton @click="onClickToggleQuestion()" v-if="!question_visible" :style="'position: absolute; margin: 8px;'">
                <img src="../assets/icons/info_black_24dp.svg"/>
            </RoundButton>
        </Transition>
        <RoundButton :style="'margin: 8px; float: right; margin-bottom: -40px; position:relative;'">
                <img src="../assets/icons/info_black_24dp.svg"/>
        </RoundButton>
        <div>
            <CardQueue />
        </div>
    </div>
</template>

<script setup>
    import CardQueue from "./CardQueue.vue"
    import RoundButton from "./default/RoundButton.vue";
    import { useCardDatesetStore } from "../stores/card-dataset"
    import { ref } from 'vue'

    const cd_store = useCardDatesetStore()
    const question_visible = ref(true)
    defineExpose({question_visible}) //TODO delete if unused

    const question_wrapper = ref(null)

    function onClickToggleQuestion(){
        question_visible.value = !question_visible.value
    }

</script>

<style lang="scss" scoped>
    .top-panel{
        pointer-events: all;
        // min-width: 380px;
        width: min(60vmin, 380px);
        width: 100%;
        max-width: 530px;
        .question-wrapper{
            display: flex;
            $question-wrapper-padding: min(2vmin, 10px);
            width: calc(100% - 2 * $question-wrapper-padding);
            min-width: calc(320px - 2 * $question-wrapper-padding);
            padding: $question-wrapper-padding;
            max-height: 200px;
            font-size: max(13px, min(4vmin, 20px));
            font-variation-settings: 'wght' 500;
            color: #FFFFFF;
            background-color: #329DFF;
            overflow: hidden;

            gap: 10px;
            justify-content: space-around;
            align-items: center;

            .question-info-icon{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                margin: 0px;
                img{
                    width: 30px;
                }
            }
        }
        .question-toggle{
            transition: background-color .3s ease;
            display: flex;
            position: absolute;
            background-color: #329DFF;
            width: fit-content;
            height: fit-content;
            justify-content: center;
            border-radius: 20px;
            padding: 4px;
            margin: 8px;
            img{
                width: min(7vmin, 28px);
            }
        }
        .question-toggle:hover{
            cursor: pointer;
            background-color: #1d92ff;
        }
        
    }

    .question-enter-active{
        animation-name: hide-question;
        animation-direction: reverse;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease;
    }

    .question-leave-active{
        animation-name: hide-question;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease;
    }

    .question-toggle-enter-active{
        animation-name: hide-question-toggle;
        animation-direction: reverse;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease;
    }

    .question-toggle-leave-active{
        animation-name: hide-question-toggle;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease;
    }




    @keyframes hide-question {
        0%{
            visibility: visible;
        }
        100%{
            visibility: hidden;
            max-height: 0px;
            padding-top: 0px;
            padding-bottom: 0px;
        }
    }

    @keyframes hide-question-toggle {
        0%{
            visibility: visible;
            opacity: 1;
        }
        100%{
            visibility: hidden;
            transform: scale(1.1);
            opacity: 0;
        }
    }
</style>