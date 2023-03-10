<template>
    <div class="wrapper">
        <div class="q-list">
            <div class="title">
                Q-sorting Datasets
            </div>
            <div class="options-wrapper">
                <DatasetTile 
                    v-for="(dataset, index) in g_store.datasets" 
                    :key="index" 
                    :name="dataset.name"
                    :statement_count="dataset.cards.length"
                    :size="getDatasetSize(dataset.cards.length)"
                    :question="dataset.question"
                    :uid="dataset.uid"/>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useGlobalStore } from "../stores/global" 
    import DatasetTile from "../components/DatasetTile.vue";
    const g_store = useGlobalStore()

    function getDatasetSize(count){
        if(count >= 75){
            return "Large"
        }else if(count >= 25){
            return "Medium"
        }else{
            return "Small"
        }
    }

</script>
<style lang="scss" scoped>
    @use "../scss/Colors/Colors" as *;
    .wrapper{
        background-color: #8CB37F;
        width: 100%;
        height: 100%;
        display: flex;
        overflow-y: auto;
        .q-list{
            margin: auto;
            height: fit-content;
            min-width: 280px;
            width: min(80vmin, 600px);
            background-color: $primary_bg;
            border-radius: 6px;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-sizing: border-box;
            .title{
                color: #FFFFFF;
                font-size: max(20pt, min(7vmin, 30pt));
                font-variation-settings: 'wght' 500;
            }
            .options-wrapper{
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        }
    }
</style>