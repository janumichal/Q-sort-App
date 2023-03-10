<template>
    <Transition name="question-queue" 
        @after-leave="showButton()"
        @before-leave="g_store.addTransition()" 
        @after-enter="g_store.removeTransition()">
        <div class="question-queue" v-if="s_store.panel_opened">
            <Transition name="question" 
                @before-leave="g_store.addTransition()" 
                @after-leave="g_store.removeTransition()"
                @before-enter="g_store.addTransition()" 
                @after-enter="g_store.removeTransition()">
                <div class="question-wrapper" v-if="s_store.question_opened">
                    <div class="question-animation-wrapper">
                        <div class="question-info-icon">
                            <img src="../../assets/icons/question.svg" />
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
                                <img src="../../assets/icons/question.svg"/>
                            </RoundButton>
                        </Transition>
                    </div>
                    <div>
                        <RoundButton @click="onClickOpenSettings()" class="interactable">
                            <img src="../../assets/icons/settings.svg"/>
                        </RoundButton>
                    </div>
                </div>
                <div class="card-queue-wrapper">
                    <CardQueue />
                </div>
                <div class="hide-btn" >
                    <RoundButton @click="toggleTopPanel()" class="interactable">
                        <img class="drop-down" src="../../assets/icons/drop_down.svg"/>
                    </RoundButton>
                </div>
            </div>
        </div>
    </Transition>
    <Transition name="show-btn" @after-leave="showPanel()" 
            @before-leave="g_store.addTransition()" 
            @after-enter="g_store.removeTransition()">
        <div class="show-button" v-if="show_btn_visible">
            <RoundButton @click="toggleTopPanel()" class="interactable" :style="styleSelectedQueue()">
                <img class="drop-down" style="transform: rotate(0deg);" src="../../assets/icons/drop_down.svg"/>
            </RoundButton>
        </div>
    </Transition>
</template>

<script setup>
    import CardQueue from "../panel/CardQueue.vue"
    import RoundButton from "../default/RoundButton.vue";
    import { useQSortStore } from "../../stores/q-sort"
    import { useSettingsStore } from "../../stores/settings";
    import { useGlobalStore } from "../../stores/global";
    import { ref } from 'vue'

    const show_btn_visible = ref(false)
    const q_store = useQSortStore()
    const s_store = useSettingsStore()
    const g_store = useGlobalStore()

    function onSubmitSort(){ // TODO needs implementation
        // Create json and console.log it (represents sending the json to the server)
    }

    function onClickToggleQuestion(){
        s_store.question_opened = !s_store.question_opened
        // s_store.updateSettings()
    }

    function onClickOpenSettings(){
        g_store.settings_visible = !g_store.settings_visible
    }

    function toggleTopPanel(){
        if(show_btn_visible.value){
            show_btn_visible.value = !show_btn_visible.value
        }else{
            s_store.panel_opened = !s_store.panel_opened
        }
    }

    function styleSelectedQueue(){
        if(q_store.isSelectedInQueue() && !s_store.panel_opened){
            return {"border": "2px solid yellow"}
        }
        return {"border": "2px solid transparent"}
    }

    function showButton(){
        show_btn_visible.value = !show_btn_visible.value
    }

    function showPanel(){
        s_store.panel_opened = !s_store.panel_opened
    }

</script>

<style lang="scss" scoped>
    @use "../../scss/Colors/Colors" as *;

    $minWidth-panel: 320px;
    $maxWidth-panel: 550px;

    .show-button{
        min-width: $minWidth-panel;
        max-width: $maxWidth-panel;
        width: 100%;
        padding: min(2vmin, 10px);
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
    }

    .question-queue{
        pointer-events: all;
        width: 100%;
        min-width: $minWidth-panel;
        max-width: $maxWidth-panel;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        cursor: default;

        .question-wrapper{
            width: 100%;
            color: #FFFFFF;
            background-color: $secondary_bg;
            box-sizing: border-box;
            overflow: hidden;

            .question-animation-wrapper{
                display: flex;
                align-items: center;
                gap: 10px;
                padding: min(2vmin, 10px);
                width: 100%;
                box-sizing: border-box;
                .question{
                    font-size: max(13px, min(3.5vmin, 18px));
                    font-variation-settings: 'wght' 500;

                }
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
            width: 100%;

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
                box-sizing: border-box;
            }
            .hide-btn{
                grid-row-start: 1;
                grid-column-start: 1;
                height: 100%;
                width: 100%;
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