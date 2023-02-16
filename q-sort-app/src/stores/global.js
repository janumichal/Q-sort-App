import { defineStore} from "pinia"
import { ref } from "vue"

export const useGlobalStore = defineStore("global", () => {
    const settings_visible = ref(false)
    return {
        settings_visible
    }
})