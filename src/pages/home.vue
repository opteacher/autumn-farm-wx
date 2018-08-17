<template>
    <div>
        <head-adv-bar/>
        <class-recommend-bar/>
        <bottom-nav-bar/>
    </div>
</template>

<script>
    import btmNavBar from "../components/btmNavBar"
    import hdrAdvBar from "../components/hdrAdvBar"
    import clsRcmdBar from "../components/clsRcmdBar"

    export default {
        data() {
            return {
                searchData: ""
            }
        },
        components: {
            "head-adv-bar": hdrAdvBar,
            "bottom-nav-bar": btmNavBar,
            "class-recommend-bar": clsRcmdBar
        }
    }
</script>

<style>
</style>