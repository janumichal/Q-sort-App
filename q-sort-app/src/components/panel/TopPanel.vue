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
                <div class="card-queue-wrapper" >
                    <Transition name="queue-toggle"
                        @after-leave="showSubmit(), g_store.removeTransition()"
                        @before-leave="g_store.addTransition()" 
                        @before-enter="g_store.addTransition()" 
                        @after-enter="g_store.removeTransition()" appear>
                        <CardQueue v-if="s_store.queue_visible"/>
                    </Transition>
                    <Transition name="submit-btn"
                        @after-leave="showQueue(), g_store.removeTransition()"
                        @before-leave="g_store.addTransition()" 
                        @before-enter="g_store.addTransition()" 
                        @after-enter="g_store.removeTransition()" appear>
                        <div class="submit-wrapper" v-if="submit_visible">
                            <NormalButton class="submit-btn" :btn_type="ButtonTypes.Submit" @click="onSubmitSort()">
                                <div class="submit-btn-inner-wrapper">
                                    Submit
                                    <img src="../../assets/icons/submit.svg" />
                                </div>
                            </NormalButton>
                        </div>
                    </Transition>
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
    import { ref, watch, onBeforeMount } from 'vue'
    import NormalButton from "../default/NormalButton.vue";
    import { ButtonTypes } from "../../enums";
    import { useRouter } from "vue-router";

    const router = useRouter()

    const show_btn_visible = ref(false)
    const submit_visible = ref(false)

    const q_store = useQSortStore()
    const s_store = useSettingsStore()
    const g_store = useGlobalStore()

    function showQueue(){
        s_store.queue_visible = !s_store.queue_visible
    }

    function showSubmit(){
        submit_visible.value = !submit_visible.value

    }

    function onSubmitSort(){
        // Here would be Fetch function with the data
        router.replace({name: "Ferwell"})
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
            s_store.queue_visible = !(q_store.queue.length <= 0)
            submit_visible.value = (q_store.queue.length <= 0)
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

    watch(
        q_store.queue,
        () =>{
            if(q_store.queue.length <= 0){
                g_store.waitForTransitions().then(() => {
                    s_store.queue_visible = false
                })
            }else{
                submit_visible.value = false
            }
        }
    )


    onBeforeMount(() => {
        if(q_store.queue.length <= 0){
            s_store.queue_visible = false
            submit_visible.value = true
        }else{
            submit_visible.value = false
            s_store.queue_visible = true
        }
    })

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
            .card-queue-wrapper{
                height: fit-content;
                .submit-wrapper{
                    width: 100%;
                    height: 90px;
                    background-color: $primary_bg;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 0 0 6px 6px;
                    overflow: hidden;
                    box-sizing: border-box;

                    .submit-btn{
                        font-size: 20px;
                        font-variation-settings: 'wght' 500;
                        padding: 10px 20px 10px 20px;
                        color: #000000;
                        .submit-btn-inner-wrapper{
                            justify-content: center;
                            align-items: center;
                            display: flex;
                            flex-direction: row;
                            gap: 10px;
                            img{
                                width: 25px;
                            }
                        }
                    }
                }
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
        animation-duration: .5s;
        animation-timing-function: ease;
    }
    .show-btn-leave-active{
        animation-name: hide-panel;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-duration: .5s;
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

    .submit-btn-enter-active{
        animation-name: hide-submit-btn;
        animation-direction: reverse;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease-out;
    }

    .submit-btn-leave-active{
        animation-name: hide-submit-btn;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        animation-timing-function: ease-out;
    }

    .queue-toggle-enter-active{
        animation-name: hide-submit-btn;
        animation-direction: reverse;
        animation-fill-mode: forwards;
        animation-duration: .3s;
        animation-timing-function: ease-out;
    }

    .queue-toggle-leave-active{
        animation-name: hide-submit-btn;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-duration: .3s;
        animation-timing-function: ease-out;
    }

    @keyframes hide-submit-btn {
        0%{
            height: 90px;
        }
        100%{
            height: 0px;
        }
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