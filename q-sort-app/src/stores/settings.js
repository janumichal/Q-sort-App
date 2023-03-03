import { defineStore } from "pinia"
import { ref } from "vue"

export const useSettingsStore = defineStore("settings", () => {
    const saving_enabled = ref(true)
    const question_opened = ref(true)
    const panel_opened = ref(true)
    const cookie_name = "Q-sortApp-settings"

    function updateSettings(){
        $cookies.set(cookie_name, {saving: saving_enabled.value})
    }

    function loadSettings(){
        if($cookies.isKey(cookie_name)){
            var settings = $cookies.get(cookie_name)
            saving_enabled.value = settings.saving
        }else{
            updateSettings()
        }
    }

    return {
        saving_enabled, question_opened, panel_opened,

        updateSettings, loadSettings
    }
})