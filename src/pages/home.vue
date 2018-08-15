<template>
    <main-layout>
        <head-adv-bar/>
        <button v-show="$auth.check()" @click="doLogout">退出</button>
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
        },
        methods: {
            doLogout() {
                this.$auth.logout();
            }
        }
    }
</script>

<style>
</style>