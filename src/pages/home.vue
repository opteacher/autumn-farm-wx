<template>
    <div>
        <div class="page__hd">
            <h1 class="page__title">秋缘农场公众号</h1>
            <p class="page__desc">如果是通过浏览器访问的，请输入微信openid</p>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入微信openid" v-model="openid">
                </div>
                <div class="weui-cell__ft">
                    <button class="weui-vcode-btn" @click="iptWxOpenid">确认</button>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="/#/autumnFarmWX/prod/list" class="weui-btn weui-btn_primary">产品列表</a>
            <a href="/#/autumnFarmWX/order/list" class="weui-btn weui-btn_primary">订单列表</a>
        </div>
        <div class="weui-footer weui-footer_fixed-bottom">
            <p class="weui-footer__text">Copyright © 2016-2018 opteacher</p>
        </div>
    </div>
</template>

<script>
    import uuidv4 from "uuid/v4"
    import cookies from "../../utils/cookies"

    export default {
        data() {
            return { openid: "" }
        },
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
                })).data;

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
            } catch (e) {
                weui.alert(`获取微信签名失败：${e.message || JSON.stringify(e)}`)
            }
        },
        methods: {
            iptWxOpenid() {
                cookies.set("openid", this.openid);
                weui.alert("<i class='weui-icon-success'></i>微信openid已保存到缓存中")
            }
        }
    }
</script>

<style type="text/scss">
    .page__hd {
        padding: 40px;

        .page__title {
            text-align: left;
            font-size: 20px;
            font-weight: 400;
        }

        .page__desc {
            margin-top: 5px;
            color: #888;
            text-align: left;
            font-size: 14px;
        }
    }
</style>