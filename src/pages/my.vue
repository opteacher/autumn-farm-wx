<template>
    <div>
        <div class="pt-3">
            <div class="text-center">
                <a href="/#/logup">
                    <img class="rounded-circle img-fluid img-thumbnail" data-src="holder.js/200x200?text=avatar">
                </a>
            </div>
            <div class="mt-3">
                <mt-cell title="昵称"/>
                <mt-cell title="标题文字">说明文字</mt-cell>
                <mt-cell title="标题文字">说明文字</mt-cell>
                <mt-cell title="标题文字">说明文字</mt-cell>
            </div>
            <div class="mt-3 mb-3">
                <mt-cell title="订单" to="github.com" is-link>说明文字</mt-cell>
            </div>
            <mt-button v-show="$auth.check()" class="w-100" type="danger" @click="doLogout">退出登录</mt-button>
        </div>
        <bottom-nav-bar/>
    </div>
</template>

<script>
    import btmNavBar from "../components/btmNavBar"

    export default {
        components: {
            "bottom-nav-bar": btmNavBar
        },
        methods: {
            doLogout() {
                this.$auth.logout();
            }
        }
    }
</script>