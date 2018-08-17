<template>
    <div>
        <div>
            <mt-header title="登录">
                <router-link to="/my" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
            <mt-field type="tel" placeholder="请输入手机号" v-model="form.body.phonenum"/>
            <mt-field type="password" placeholder="请输入密码" v-model="form.body.password"/>
            <mt-field placeholder="请输入图片中的验证码">
                <img data-src="holder.js/94x45">
            </mt-field>
            <div class="pt-1 pl-2 pr-2">
                <mt-switch v-model="form.rememberMe">记住账户</mt-switch>
            </div>
        </div>
        <div class="mt-4 container">
            <mt-button class="w-100 mb-3" type="primary" @click.native="doLogin">登录</mt-button>
            <mt-button class="w-100" type="default" @click.native="toLogup">没有账户，免费注册</mt-button>
        </div>
    </div>
</template>

<script>
    import holderjs from "holderjs"
    import { Indicator, MessageBox, Toast } from "mint-ui";

    export default {
        data() {
            return {
                form: {
                    body: {
                        phonenum: "",
                        password: ""
                    },
                    rememberMe: false
                }
            }
        },
        mounted() {
            holderjs.run();
        },
        methods: {
            async doLogin() {
                try {
                    Indicator.open();
                    await this.$auth.login({
                        data: this.form.body,
                        rememberMe: this.form.rememberMe
                    });
                    Indicator.close();
                    Toast({
                        message: "登录成功",
                        iconClass: "icon icon-success"
                    });
                } catch (res) {
                    if(res.response) {
                        res = res.response;
                    }
                    MessageBox({
                        title: `错误 - ${res.status}`,
                        message: res.message || res.data.message || JSON.stringify(res.data)
                    }).then(() => {
                        Indicator.close()
                    });
                }
            },
            toLogup() {
                window.location.href = "/#/logup"
            }
        }
    }
</script>

<style type="text/scss">
    label, h1 {
        margin-bottom: 0;
    }
</style>