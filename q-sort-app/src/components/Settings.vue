<template>
    <ModalWindow>
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
                        <RoundButton />
                    </div>
                </div>
                <div class="option">
                    <div class="text">
                        Auto-saving progress
                    </div>
                    <div class="interactable">
                        <RoundButton />
                    </div>
                </div>
                <div class="option">
                    <div class="text">
                        Auto-saving progress
                    </div>
                    <div class="interactable">
                        <RoundButton />
                    </div>
                </div>
            </div>
        </template>
    </ModalWindow>
</template>
<script setup>
    import ModalWindow from '../components/default/ModalWindow.vue';
    import RoundButton from './default/RoundButton.vue';

</script>
<style lang="scss">
    .options-wrapper{
        display:flex;
        flex-direction: column;
        gap: 5px;
        .option{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>