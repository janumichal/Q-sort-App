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
        background-color: $primary_bg;
        width: 100%;
        height: 100%;
        display: flex;
        overflow-y: auto;
        .q-list{
            margin: auto;
            height: fit-content;
            min-width: 280px;
            width: min(85vmin, 900px);
            padding-top: 20px;
            padding-bottom: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 30px;
            box-sizing: border-box;
            align-items: center;
            .title{
                color: #FFFFFF;
                font-size: max(20pt, min(7vmin, 30pt));
                font-variation-settings: 'wght' 600;
                background: url("../assets/images/gradient.png") 20% 50%;
                background-size: cover;
                background-repeat: no-repeat;
                color: transparent;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                -webkit-background-clip: text;
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