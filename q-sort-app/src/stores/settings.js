import { defineStore } from "pinia"
import { ref } from "vue"

export const useSettingsStore = defineStore("settings", () => {
    const saving_enabled = ref(true)
    const queue_visible = ref(true)
    const minimap_enabled = ref(true)
    const question_opened = ref(true)
    const panel_opened = ref(true)
    const intro_visible = ref(true)
    const show_intro = ref(true)
    const cookie_name = "Q-sortApp-settings"
    

    function updateSettings(){
        $cookies.set(cookie_name, {saving: saving_enabled.value, minimap: minimap_enabled.value, intro: show_intro.value})
    }

    function loadSettings(){
        if($cookies.isKey(cookie_name)){
            var settings = $cookies.get(cookie_name)
            saving_enabled.value = settings.saving
            minimap_enabled.value = settings.minimap
            show_intro.value = settings.intro
            intro_visible.value = show_intro.value
        }else{
            updateSettings()
        }
    }

    return {
        saving_enabled, question_opened, panel_opened, minimap_enabled, queue_visible, show_intro, intro_visible,

        updateSettings, loadSettings
    }
})