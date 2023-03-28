import { defineStore } from "pinia"
import { ref } from "vue"

export const useSettingsStore = defineStore("settings", () => {
    const savingEnabled = ref(true)
    const queueVisible = ref(true)
    const minimapEnabled = ref(true)
    const questionOpened = ref(true)
    const panelOpened = ref(true)
    const introVisible = ref(true)
    const showIntro = ref(true)
    const cookieName = "Q-sortApp-settings"
    

    function updateSettings(){
        $cookies.set(cookieName, {saving: savingEnabled.value, minimap: minimapEnabled.value, intro: showIntro.value})
    }

    function loadSettings(){
        if($cookies.isKey(cookieName)){
            var settings = $cookies.get(cookieName)
            savingEnabled.value = settings.saving
            minimapEnabled.value = settings.minimap
            showIntro.value = settings.intro
            introVisible.value = showIntro.value
        }else{
            updateSettings()
        }
    }

    return {
        savingEnabled, questionOpened, panelOpened, minimapEnabled, queueVisible, showIntro, introVisible,

        updateSettings, loadSettings
    }
})