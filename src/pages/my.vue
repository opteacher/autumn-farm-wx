<template>
    <div>
        <div class="pt-3">
            <div class="text-center">
                <a v-if="!$auth.check()" href="/#/login">
                    <img class="rounded-circle img-fluid img-thumbnail" data-src="holder.js/200x200?text=avatar&size=30">
                </a>
            </div>
            <div class="mt-3">
                <mt-cell title="昵称"/>
                <mt-cell title="标题文字">说明文字</mt-cell>
                <mt-cell title="标题文字">说明文字</mt-cell>
                <mt-cell title="标题文字">说明文字</mt-cell>
            </div>
            <div v-show="$auth.check()" class="mt-3 mb-3">
                <mt-cell title="订单" to="github.com" is-link>说明文字</mt-cell>
                <mt-cell title="收藏" to="github.com" is-link>说明文字</mt-cell>
            </div>
            <div class="container">
                <mt-button v-show="$auth.check()" class="w-100" type="danger" @click="doLogout">退出登录</mt-button>
            </div>
        </div>
        <bottom-nav-bar/>
    </div>
</template>

<script>
    import holderjs from "holderjs"
    import btmNavBar from "../components/btmNavBar"

    export default {
        components: {
            "bottom-nav-bar": btmNavBar
        },
        methods: {
            doLogout() {
                this.$auth.logout({
                    redirect: "/my"
                });
            }
        },
        updated() {
            holderjs.run()
        }
    }
</script>