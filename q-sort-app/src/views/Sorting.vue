<template>
    <div class="sorting-wrapper"  :style="getTopBgColor()">
            <div class="queue-wrapper">
                <div class="queue">
                    <Transition name="question">
                        <div ref="question" class="question-wrapper" v-if="question_visible">
                            <div class="question-info-icon" @click="onClickToggleQuestion()">
                                <img src="../assets/icons/info_black_24dp.svg" />
                            </div>
                            <div class="question">
                                {{ cd_store.question }}
                            </div>
                            <div class="question-close-icon" @click="onClickToggleQuestion()">
                                <img  src="../assets/icons/close_white_24dp.svg"/>
                            </div>
                        </div>
                    </Transition>
                    <Transition name="question-toggle">
                        <div class="question-toggle" @click="onClickToggleQuestion()" v-if="question_toggle_visible">
                            <img src="../assets/icons/info_black_24dp.svg" />
                        </div>
                    </Transition>
                    <div ref="queue">
                        <CardQueueVue />
                    </div>
                </div>
            </div>
        <div ref="srt_table" class="srt-table" :style="getBottomBgColor()">
            <SortingTableVue ref="table" />
        </div>
    </div>
</template>

<script setup>
    import CardQueueVue from "../components/CardQueue.vue"
    import SortingTableVue from "../components/SortingTable.vue"
    import { useCardDatesetStore } from "../stores/card-dataset"
    import { ref, onMounted, watch } from 'vue'
    import json_data from "../assets/datasets/food-sort.json"

    const cd_store = useCardDatesetStore()
    const question_visible = ref(true)
    const question_toggle_visible = ref(false)


    const question = ref(null)
    const srt_table = ref(null)
    const queue = ref(null)
    const table = ref(null)

    //Load dataset
    cd_store.loadDataset(json_data)


    function getBottomBgColor(){
        return {"background-color": cd_store.colors[cd_store.colors.length-1]}
    }
    function getTopBgColor(){
        return {"background-color": cd_store.colors[0]}
    }

    function onClickToggleQuestion(){
        question_visible.value = !question_visible.value
        question_toggle_visible.value = !question_toggle_visible.value
    }

    const question_height = ref(0)

    onMounted(() => {
        var height = question.value.clientHeight
        question.value.style.maxHeight = height.toString() + "px"
        question_height.value = question.value.clientHeight
        srt_table.value.style.minHeight = (window.innerHeight - (queue.value.clientHeight + question.value.clientHeight)).toString()  + "px";
    })

    watch(
        question_visible,
        (newVal, _) =>{
            if(newVal){
                srt_table.value.style.minHeight = (window.innerHeight - (queue.value.clientHeight + question_height.value)).toString()  + "px";
            }else{
                srt_table.value.style.minHeight = (window.innerHeight - queue.value.clientHeight).toString()  + "px";
            }
        }
    )

</script>

<style lang="scss" scoped>
    
    .sorting-wrapper{ //TODO change card size and animate question closure 
        overflow-x: auto;
        height: 100vh;
        width: 100vw;

        .queue-wrapper{
            pointer-events: none;
            position: sticky;
            top: 0;
            left: 0;
            z-index: 1000;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .queue{
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

                    .question-info-icon, .question-close-icon{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 40px;
                        margin: 0px;
                    }
                    .question-info-icon{
                        cursor: pointer;
                        img{
                            width: 30px;
                        }
                    }
                    .question-close-icon{
                        img{
                            transition: transform ease-in-out 0.2s;
                        }
                    }
                    .question-close-icon:hover{
                        img{
                            transform: scale(1.3);
                            cursor: pointer;
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