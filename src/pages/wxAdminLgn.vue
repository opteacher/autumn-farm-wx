<template>
    <div v-show="$auth.ready()">
        <div class="page js_show">
            <div class="page__bd page__bd_spacing">
                <div class="weui-cells__title">
                    管理员登录
                </div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">用户名</label>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" placeholder="请输入用户名" v-model="form.body.username"/>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">密码</label>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="password" placeholder="请输入密码" v-model="form.body.password"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_vcode">
                        <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="number" placeholder="请输入验证码" v-model="form.verify">
                        </div>
                        <div class="weui-cell__ft">
                            <img class="weui-vcode-img" data-src="holder.js/110x45">
                        </div>
                    </div>
                </div>
                <div class="weui-btn-area">
                    <a class="weui-btn weui-btn_primary" href="javascript:" @click="doLogin">登录</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import holderjs from "holderjs"
    import { MessageBox } from "mint-ui"

    export default {
        data() {
            return {
                form: {
                    body: {
                        username: "",
                        password: ""
                    },
                    verify: ""
                }
            }
        },
        methods: {
            doLogin() {
                this.$auth.login({
                    data: this.form.body,
                    redirect: "/autumnFarmWX/admin/process/orders"
                }).then(null, res => {
                    if(res.response) {
                        res = res.response
                    }
                    weui.alert(`登录失败：${res.data}`)
                });
            }
        },
        mounted() {
            holderjs.run()
        }
    }
</script>