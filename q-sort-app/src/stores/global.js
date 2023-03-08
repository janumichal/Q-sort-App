import { defineStore} from "pinia"
import { ref, nextTick, onBeforeMount } from "vue"


import food_json from "../assets/datasets/food-sort.json" // Medium dataset (tmp because there is no server)
import affects_json from "../assets/datasets/affects_sort.json" // Medium dataset (tmp because there is no server)
import BFI2_json from "../assets/datasets/BFI2_data.json" // Large dataset (tmp because there is no server)


export const useGlobalStore = defineStore("global", () => {
    const settings_visible = ref(false)
    const transitionCount = ref(0)
    const datasets = ref([food_json, affects_json, BFI2_json]) // (tmp because there is no server)

    function inTransition(){
        return transitionCount.value > 0
    }

    function addTransition(){
        transitionCount.value++
    }

    function removeTransition(){
        transitionCount.value--
    }

    function waitForTransitions(){
        return new Promise((resolve) => {
            nextTick(() => {
                function checkCondition(){
                    if(inTransition()){
                        setTimeout(checkCondition, 100)
                    }else{
                        resolve();
                    }
                }
                checkCondition()
            })
        })
    }

    return {
        settings_visible, transitionCount, datasets,

        inTransition, addTransition, removeTransition, waitForTransitions
    }
})