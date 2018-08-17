<template>
    <mt-tabbar v-model="selectedId">
        <mt-tab-item id="/" href="/#/">
            <img slot="icon" src="http://pdldvxx5l.bkt.clouddn.com/home.png">
            主页
        </mt-tab-item>
        <mt-tab-item id="/classify" href="/#/classify">
            <img slot="icon" src="http://pdldvxx5l.bkt.clouddn.com/app%20store.png">
            分类
        </mt-tab-item>
        <mt-tab-item id="/shoppingCart" href="/#/shoppingCart">
            <img slot="icon" src="http://pdldvxx5l.bkt.clouddn.com/shopping.png">
            购物车
        </mt-tab-item>
        <mt-tab-item id="/my" href="/#/my">
            <img slot="icon" src="http://pdldvxx5l.bkt.clouddn.com/user.png">
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