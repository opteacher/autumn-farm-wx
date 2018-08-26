<template></template>

<script>
    import cookies from "../../utils/cookies"

    export default {
        created() {
            // 保存微信传过来的用户openid
            if(this.$route.query.code) {
                cookies.set("openid", this.$route.query.code)
            }
        }
    }
</script>