<template>
    <div class="wrapper">
        <div class="q-list" @click="goToRoute('Sorting', {uid: 2})">
            <div class="title">
                Q-sorting Datasets
            </div>
            <div class="options-wrapper">

            </div>
        </div>
    </div>
</template>
<script setup>
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from "../stores/global" 
    const router = useRouter()
    const g_store = useGlobalStore()

    function goToRoute(route_name, params=null, ){
        router.push({name: route_name, params: params==null? {} : params})
    }
</script>
<style lang="scss" scoped>
    @use "../scss/Colors/Colors" as *;
    .wrapper{
        background-color: #8CB37F;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .q-list{
            min-width: 280px;
            height: fit-content;
            width: min(80vmin, 600px);
            background-color: $primary_bg;
            border-radius: 6px;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 10px;
            .title{
                color: #FFFFFF;
                font-size: max(20pt, min(7vmin, 30pt));
                font-variation-settings: 'wght' 500;
            }
            .options-wrapper{
                width: 100%;
                height: 400px;
                background-color: $secondary_bg;
                border-radius: 6px;
            }
        }
    }
</style>