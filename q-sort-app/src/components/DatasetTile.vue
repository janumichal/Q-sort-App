<template>
    <div>
        <div class="wrapper" @click="goToRoute('Sorting', {uid: uid})">
            <div class="details">
                <div class="name">
                    {{ name }}
                </div>
                <div class="sc-wrapper">
                    <div class="count">
                        <img src="../assets/icons/statements.svg"/>
                        {{ statement_count }}
                    </div>
                    <div class="size">
                        {{ size }}
                    </div>
                </div>
            </div>
            <div class="description">
                <Transition name="question">
                    <div class="question-wrapper" v-if="question_visible">
                        <div class="question">
                            {{ question }}
                        </div>
                    </div>
                </Transition>
                <div class="button-wrapper" >
                    <NormalButton :btn_type="ButtonTypes.Normal" @click="showDescription($event)">
                        See {{ question_visible? 'less' : 'more'}}
                    </NormalButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import NormalButton from './default/NormalButton.vue';
    import { ButtonTypes } from '../enums';
    const props = defineProps({
        name: String,
        size: String,
        statement_count: Number,
        question: String,
        uid: String
    })
    const router = useRouter()
    const question_visible = ref(false)


    function showDescription(event){
        event.stopPropagation();
        question_visible.value = !question_visible.value
    }
    function goToRoute(route_name, params=null, ){
        router.push({name: route_name, params: params==null? {} : params})
    }
</script>
<style lang="scss" scoped>
    @use "../scss/Colors/Colors" as *;
    .wrapper{
        width: 100%;
        height: fit-content;
        background-color: $secondary_bg;
        border-radius: 6px;
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
        cursor: pointer;

        transition: background-color .2s ease-out;

        &:hover{
            background-color: $secondary_bg_hover;
        }
        
        .details{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            gap: 10px;
            .name{
                font-size: 23px;
                font-variation-settings: 'wght' 500;
                width: 100%;
                justify-self: center;
            }
            .sc-wrapper{
                display: flex;
                flex-direction: column;
                align-items: center;
                .count{
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: #ffd500;
                    img{
                        width: 25px;
                    }
                }
                .size{
                    opacity: .4;
                }
            }
        }
        .description{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            
            .question-wrapper{
                box-sizing: border-box;
                width: 100%;
                overflow: hidden;

                .question{
                    opacity: .7;
                    width: 100%;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    box-sizing: border-box;
                }
            }
            .button-wrapper{
                margin-top: 10px;
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }
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


    @keyframes hide-question {
        0%{
            max-height: 100px;
        }
        100%{
            max-height: 0px;
        }
    }
</style>