<template>
    <ModalWindow @toggleModal="updateVisibility($event)" :key="reload_modal" :visible="g_store.settings_visible">
        <template v-slot:header>
            Settings
        </template>
        <template v-slot:content>
            <div class="options-wrapper">
                <div class="option">
                    <div class="text">
                        Auto-saving progress
                    </div>
                    <div class="interactable">
                        <ToggleButton :id="'save'" v-model="s_store.saving_enabled"/>
                    </div>
                </div>
                <div class="option">
                    <div class="text">
                        Minimap enabled
                    </div>
                    <div class="interactable">
                        <ToggleButton :id="'minimap'" v-model="s_store.minimap_enabled"/>
                    </div>
                </div>
                <div class="option">
                    <div class="text">
                        Reset sorting table
                    </div>
                    <div class="interactable">
                        <NormalButton :btn_type="ButtonTypes.Warning" @click="q_store.resetTable()">
                            Reset
                        </NormalButton>
                    </div>
                </div>
            </div>
        </template>
    </ModalWindow>
</template>
<script setup>
    import { ref, watch } from 'vue';
    import ModalWindow from '../components/default/ModalWindow.vue';
    import ToggleButton from './default/ToggleButton.vue';
    import NormalButton from './default/NormalButton.vue';
    import { ButtonTypes } from '../enums';
    import { useQSortStore } from '../stores/q-sort';
    import { useSettingsStore } from '../stores/settings';
    import { useGlobalStore } from '../stores/global';
    const q_store = useQSortStore()
    const s_store = useSettingsStore()
    const g_store = useGlobalStore()

    const reload_modal = ref(0)

    const toggle1 = ref(true)
    const toggle2 = ref(true)

    watch(
        s_store,
        () => {
            console.log("saving", s_store.saving_enabled);
            console.log("minimap", s_store.minimap_enabled);
        }
    )

    function updateVisibility(value){
        g_store.settings_visible = value
    }

    const emits = defineEmits(["update:saving", "update:minimap"])

    function updateSaving(value){
        s_store.saving_enabled = value
        console.log("saving");
    }

    function updateMinimap(value){
        s_store.minimap_enabled = value
        console.log("minimap");
    }


    watch(
        g_store,
        () =>{
            reload_modal.value++
            s_store.updateSettings()
        }
    )



</script>
<style lang="scss" scoped>
@use "../scss/Colors/Colors" as *;
    .options-wrapper{
        display:flex;
        flex-direction: column;
        gap: 15px;
        padding: 10px;
        border-radius: 6px;
        background-color: rgba($color: $secondary_bg, $alpha: 0.6);
        .option{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>