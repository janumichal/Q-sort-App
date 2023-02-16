import { defineStore } from "pinia"
import { ref } from "vue"

export const useSettingsStore = defineStore("settings", () => {
    const saving_enabled = ref(true)
    const question_opened = ref(true)
    const cookie_name = "Q-sortApp-settings"

    function updateSettings(){
        $cookies.set(cookie_name, {saving: saving_enabled.value, question: question_opened.value})
    }

    function loadSettings(){
        if($cookies.isKey(cookie_name)){
            var settings = $cookies.get(cookie_name)
            saving_enabled.value = settings.saving
            question_opened.value = settings.question
        }else{
            updateSettings()
        }
    }

    return {
        saving_enabled, question_opened,


        updateSettings, loadSettings
    }
})