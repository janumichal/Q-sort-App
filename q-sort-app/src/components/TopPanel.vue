<template>
    <div class="top-panel">
        <Transition name="question">
            <div class="question-wrapper" v-if="s_store.question_opened">
                <div class="question-info-icon">
                    <img src="../assets/icons/question.svg" />
                </div>
                <div class="question">
                    {{ q_store.question }}
                </div>
                <RoundButton @click="onClickToggleQuestion()" />
            </div>
        </Transition>
        <div class="queue-buttons-wrapper">
            <div class="overlayed-buttons-wrapper">
                <div>
                    <Transition name="question-toggle">
                        <RoundButton @click="onClickToggleQuestion()" v-if="!s_store.question_opened" class="interactable">
                            <img src="../assets/icons/question.svg"/>
                        </RoundButton>
                    </Transition>
                </div>
                <div>
                    <RoundButton @click="onClickOpenSettings()" class="interactable">
                        <img src="../assets/icons/settings_white_24dp.svg"/>
                    </RoundButton>
                </div>
            </div>
            <div class="card-queue-wrapper">
                <CardQueue />
            </div>
        </div>
        <div class="hide-top-panel-wrapper">
            <RoundButton @click="" class="interactable">
                <img class="drop-down" src="../assets/icons/drop_down.svg"/>
            </RoundButton>
        </div>
    </div>
</template>

<script setup>
    import CardQueue from "./CardQueue.vue"
    import RoundButton from "./default/RoundButton.vue";
    import { useQSortStore } from "../stores/q-sort"
    import { useSettingsStore } from "../stores/settings";
    import { useGlobalStore } from "../stores/global";
    import { ref } from 'vue'

    const q_store = useQSortStore()
    const s_store = useSettingsStore()
    const g_store = useGlobalStore()

    function onClickToggleQuestion(){
        s_store.question_opened = !s_store.question_opened
        s_store.updateSettings()
    }

    function onClickOpenSettings(){
        g_store.settings_visible = !g_store.settings_visible
    }

</script>

<style lang="scss" scoped>
    @use "../scss/Colors/Colors" as *;

    .top-panel{
        pointer-events: all;
        width: min(60vmin, 380px); // TODO fix this not setting
        width: 100%;
        max-width: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .hide-top-panel-wrapper{
            transform: translateY(-100%);
            width: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-end;
            padding: 10px;
            margin: 0;
            img{
                transform: rotate(180deg);
            }
            // .hide-top-panel{
            //     transition: all .2s ease-out;
            //     background-color: rgba($secondary_bg, .85);
            //     padding: 5px;
            //     width: 30px;
            //     height: 18px;
            //     display: flex;
            //     align-items: center;
            //     justify-content: center;
            //     border-radius: 6px;
            //     border: 0px;
            //     cursor: pointer;
            //     img{
            //         width: 15px;
            //         transform: rotate(180deg);
            //     }
            //     &:hover{
            //         background-color: rgba($secondary_bg, 1);
            //     }
            // }
        }


        .question-wrapper{
            display: flex;
            $question-wrapper-padding: min(2vmin, 5px);
            width: 100%;
            // min-width: calc(320px - 2 * $question-wrapper-padding);
            padding: min(2vmin, 10px);
            max-height: 200px;
            font-size: max(13px, min(4vmin, 20px));
            font-variation-settings: 'wght' 500;
            color: #FFFFFF;
            background-color: $secondary_bg;
            overflow: hidden;
            box-sizing: border-box;

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

        .queue-buttons-wrapper{
            display: grid;
            grid-template-columns: 1fr;
            width: fit-content;

            .card-queue-wrapper, .overlayed-buttons-wrapper{
                    grid-row-start: 1;
                    grid-column-start: 1;
                }
            .overlayed-buttons-wrapper{
                z-index: 9999;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: min(2vmin, 10px);
                pointer-events: none;
                .interactable{
                    pointer-events: all;
                }
            }
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
            // visibility: visible;
            opacity: 1;
        }
        100%{
            // visibility: hidden;
            transform: scale(1.1);
            opacity: 0;
        }
    }
</style>