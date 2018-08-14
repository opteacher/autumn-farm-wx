<template>
    <main-layout>
        <head-adv-bar/>
    </main-layout>
</template>

<script>
    import holderjs from "holderjs"
    import mainLayout from "../layouts/main"
    import headAdvBar from "../components/hdAdvBar"

    export default {
        components: {
            "main-layout": mainLayout,
            "head-adv-bar": headAdvBar
        },
        mounted() {
            holderjs.run();
        }
    }
</script>

<style>
    .el-carousel {
        padding-left: -15px;
        padding-right: -15px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>