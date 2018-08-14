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
</style>