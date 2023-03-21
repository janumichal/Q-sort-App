<template>
    <ModalWindow @toggleModal="updateVisibility($event)" :key="reload_modal" :visible="g_store.settings_visible">
        <template v-slot:header>
            Settings
        </template>
        <template v-slot:content>
            <div class="options-wrapper">
                <div class="option">
                    <div class="text">
                        Progress auto-saving
                    </div>
                    <div class="interactable">
                        <ToggleButton :id="'save'" v-model="s_store.saving_enabled"/>
                    </div>
                </div>
                <div class="option">
                    <div class="text">
                        Scrollbar minimap
                    </div>
                    <div class="interactable">
                        <ToggleButton :id="'minimap'" v-model="s_store.minimap_enabled"/>
                    </div>
                </div>
                <div class="option">
                    <div class="text">
                        How-To video
                    </div>
                    <div class="interactable">
                        <NormalButton :btn_type="ButtonTypes.Normal" @click="showIntro()">
                            Show
                        </NormalButton>
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

    function updateVisibility(value){
        g_store.settings_visible = value
    }

    function showIntro(){
        updateVisibility(false)
        s_store.intro_visible = !s_store.intro_visible
    }

    watch(
        () => g_store.settings_visible,
        () =>{
                reload_modal.value++
                s_store.updateSettings()
        }
    )



</script>
<style lang="scss" scoped>
@use "../scss/Colors/Colors" as *;
    .options-wrapper{
        width: 300px;
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