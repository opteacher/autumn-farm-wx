<template>
    <mt-tabbar v-model="selectedId">
        <mt-tab-item id="/" href="/#/">
            <img slot="icon" src="holder.js/24x24">
            主页
        </mt-tab-item>
        <mt-tab-item id="/classify" href="/#/classify">
            <img slot="icon" src="holder.js/24x24">
            分类
        </mt-tab-item>
        <mt-tab-item id="/shoppingCart" href="/#/shoppingCart">
            <img slot="icon" src="holder.js/24x24">
            购物车
        </mt-tab-item>
        <mt-tab-item id="/my" href="/#/my">
            <img slot="icon" src="holder.js/24x24">
            我的
        </mt-tab-item>
    </mt-tabbar>
</template>

<script>
    import holderjs from "holderjs"

    export default {
        data() {
            return {
                selectedId: "home"
            }
        },
        created() {
            this.selectedId = this.$route.path
        },
        mounted() {
            holderjs.run();
        }
    }
</script>