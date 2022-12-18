<template>
    <div class="sorting-wrapper"  :style="getTopBgColor()">
            <div class="queue-wrapper">
                <div class="queue">
                    <div class="question-wrapper">
                        <div class="question-info-icon" >
                            <img src="../assets/icons/info_black_24dp.svg" />
                        </div>
                        <div class="question">
                            {{ cd_store.question }}
                        </div>
                        <div class="question-close-icon">
                            <img  src="../assets/icons/close_white_24dp (1).svg"/>
                        </div>
                    </div>
                    <CardQueueVue/>
                </div>
            </div>
        <div class="srt-table" :style="getBottomBgColor()">
            <SortingTableVue></SortingTableVue>
        </div>
    </div>
</template>

<script setup>
    import CardQueueVue from "../components/CardQueue.vue"
    import SortingTableVue from "../components/SortingTable.vue"
    import { useCardDatesetStore } from "../stores/card-dataset"
    import json_data from "../assets/datasets/food-sort.json"

    const cd_store = useCardDatesetStore()

    cd_store.loadDataset(json_data)

    function getBottomBgColor(){
        return {"background-color": cd_store.colors[cd_store.colors.length-1]}
    }
    function getTopBgColor(){
        return {"background-color": cd_store.colors[0]}
    }

</script>

<style lang="scss" scoped>
    @use "../scss/Constants" as *;
    
    .sorting-wrapper{ //TODO change card size and animate question closure 
        overflow-x: auto;
        height: 100vh;
        width: 100vw;

            .queue-wrapper{
                position: sticky;
                top: 0;
                left: 0;
                z-index: 1000;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .queue{
                    min-width: 380px;
                    width: 100%;
                    max-width: $queue-width;
                    .question-wrapper{
                        display: flex;
                        $question-wrapper-padding: 10px;
                        width: calc(100% - 2 * $question-wrapper-padding);
                        padding: $question-wrapper-padding;
                        font-size: min(4vmin, 20px);
                        font-variation-settings: 'wght' 500;
                        color: #FFFFFF;
                        background-color: #329DFF;

                        gap: 10px;
                        justify-content: center;
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
                }
            }
            .srt-table{
                min-height: calc(100vh - $queue-height);
            }
    }
</style> 