<template>
    <div>
        <head-adv-bar/>
        <bottom-nav-bar/>
    </div>
</template>

<script>
    import bottomNavBar from "../components/btmNavBar"
    import headAdvBar from "../components/hdAdvBar"

    export default {
        data() {
            return {
                searchData: ""
            }
        },
        components: {
            "head-adv-bar": headAdvBar,
            "bottom-nav-bar": bottomNavBar
        }
    }
</script>

<style>
</style>