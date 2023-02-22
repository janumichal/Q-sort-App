<template>
    <Transition name="question-queue" @after-leave="showButton()">
        <div class="question-queue" v-if="panel_visible">
            <Transition name="question">
                <div class="question-wrapper" v-if="s_store.question_opened">
                    <div class="question-animation-wrapper">
                        <div class="question-info-icon">
                            <img src="../assets/icons/question.svg" />
                        </div>
                        <div class="question">
                            {{ q_store.question }}
                        </div>
                        <RoundButton @click="onClickToggleQuestion()" class="interactable"/>
                    </div>
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
                <div class="hide-btn" >
                    <RoundButton @click="toggleTopPanel()" class="interactable">
                        <img class="drop-down" src="../assets/icons/drop_down.svg"/>
                    </RoundButton>
                </div>
            </div>
        </div>
    </Transition>
    <Transition name="show-btn" @after-leave="showPanel()">
        <div class="show-button" v-if="show_btn_visible">
            <RoundButton @click="toggleTopPanel()" class="interactable" :style="styleSelectedQueue()">
                <img class="drop-down" style="transform: rotate(0deg);" src="../assets/icons/drop_down.svg"/>
            </RoundButton>
        </div>
    </Transition>
</template>

<script setup>
    import CardQueue from "./CardQueue.vue"
    import RoundButton from "./default/RoundButton.vue";
    import { useQSortStore } from "../stores/q-sort"
    import { useSettingsStore } from "../stores/settings";
    import { useGlobalStore } from "../stores/global";
    import { ref } from 'vue'

    const panel_visible = ref(true)
    const show_btn_visible = ref(false)
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

    function toggleTopPanel(){
        if(show_btn_visible.value){
            show_btn_visible.value = !show_btn_visible.value
        }else{
            panel_visible.value = !panel_visible.value
        }
    }

    function styleSelectedQueue(){
        if(q_store.isSelectedInQueue() && !panel_visible.value){
            return {"border": "2px solid yellow"}
        }
        return {"border": "2px solid transparent"}
    }

    function showButton(){
        show_btn_visible.value = !show_btn_visible.value
    }

    function showPanel(){
        panel_visible.value = !panel_visible.value
    }

</script>

<style lang="scss" scoped>
    @use "../scss/Colors/Colors" as *;

    .show-button{
        min-width: 320px;
        width: min(100vmin, 450px);
        padding: min(2vmin, 10px);
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
    }

    .question-queue{
        pointer-events: all;
        width: 100%;
        max-width: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

        .question-wrapper{
            $question-wrapper-padding: min(2vmin, 5px);
            width: 100%;
            // padding: min(2vmin, 10px);
            max-height: 200px;
            font-size: max(13px, min(4vmin, 20px));
            font-variation-settings: 'wght' 500;
            color: #FFFFFF;
            background-color: $secondary_bg;
            overflow: hidden;
            box-sizing: border-box;

            .question-animation-wrapper{
                display: flex;
                justify-content: space-around;
                align-items: center;
                gap: 10px;
                padding: min(2vmin, 10px);
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
                
            }
            .hide-btn{
                grid-row-start: 1;
                grid-column-start: 1;
                height: 100%;
                width: min(100vmin, 450px);
                min-width: 320px;
                box-sizing: border-box;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                padding: 10px;
                margin: 0;
                pointer-events: none;
                align-self: center;
                & *{
                    pointer-events: all;
                }
                img{
                    transform: rotate(180deg);
                }
            }
        }
    }
    .interactable{
        pointer-events: all;
    }

    .show-btn-enter-active{
        animation-name: hide-panel;
        animation-direction: reverse;
        animation-fill-mode: forwards;
        animation-duration: .3s;
        animation-timing-function: ease;
    }
    .show-btn-leave-active{
        animation-name: hide-panel;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-duration: .3s;
        animation-timing-function: ease;
    }

    .question-queue-enter-active{
        animation-name: hide-panel;
        animation-direction: reverse;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease;
    }

    .question-queue-leave-active{
        animation-name: hide-panel;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease;
    }

    .question-enter-active{
        animation-name: hide-question;
        animation-direction: reverse;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease-out;
    }

    .question-leave-active{
        animation-name: hide-question;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease-out;
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

    @keyframes hide-panel {
        0%{
            transform: translateY(0%);
        }
        100%{
            transform: translateY(-100%);
        }
    }


    @keyframes hide-question {
        0%{
            max-height: 100%;
        }
        100%{
            max-height: 0%;
        }
    }

    @keyframes hide-question-toggle {
        0%{
            opacity: 1;
        }
        100%{
            transform: scale(1.1);
            opacity: 0;
        }
    }
</style>