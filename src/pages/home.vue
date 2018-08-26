<template></template>

<script>
    import cookies from "../../utils/cookies"

    export default {
        async created() {
            // 保存微信传过来的用户openid
            if(this.$route.query.code) {
                cookies.set("openid", this.$route.query.code)
            }

            // 注入权限验证配置
            let timestamp = Date.now();
            let nonceStr = uuidv4().replace("-", "");
            try {
                let result = (await this.axios.get("/api/v1/weixin/signature", {
                    params: {
                        appId: "",
                        nonceStr,
                        jsapi_ticket: "",
                        timestamp,
                        url: window.location.href
                    }
                })).data
            } catch (e) {
                weui.alert(`获取微信签名失败：${e.message || JSON.stringify(e)}`);
                return
            }
            wx.config({
                debug: true,
                appId: result.appid,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: result.signature,
                jsApiList: ["checkJsApi", "chooseWXPay"]
            });
            wx.error(res => {
                weui.alert(`注入权限验证配置失败：${JSON.stringify(res)}`)
            })
        }
    }
</script>