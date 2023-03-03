import { defineStore} from "pinia"
import { ref, nextTick } from "vue"

export const useGlobalStore = defineStore("global", () => {
    const settings_visible = ref(false)
    const transitionCount = ref(0)

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
        settings_visible, transitionCount,

        inTransition, addTransition, removeTransition, waitForTransitions
    }
})