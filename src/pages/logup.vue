<template>
    <div v-if="step === 'phone'">
        <div>
            <mt-header title="注册">
                <router-link to="/my" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
            <mt-field type="tel" placeholder="请输入手机号" v-model="form.body.phonenum">
                <mt-button type="default" size="small">发送验证码</mt-button>
            </mt-field>
            <mt-field type="number" placeholder="请输入收到的验证码"/>
        </div>
        <div class="mt-5 container">
            <mt-button class="w-100" type="primary" @click.native="toIptPassword">下一步</mt-button>
        </div>
    </div>
    <div v-else-if="step === 'password'">
        <div>
            <mt-header title="注册">
                <mt-button icon="back" slot="left" @click.native="toIptPhone">返回</mt-button>
            </mt-header>
            <mt-field placeholder="请输入密码" type="password" v-model="form.body.password"/>
            <mt-field placeholder="请重复密码" type="password" v-model="form.repeatPwd"/>
            <mt-field placeholder="请输入图片中的验证码">
                <img data-src="holder.js/94x45">
            </mt-field>
        </div>
        <div class="mt-5 container">
            <mt-button class="w-100" type="primary" @click.native="doLogup">确认注册</mt-button>
        </div>
    </div>
    <div v-else></div>
</template>

<script>
    import holderjs from "holderjs"
    import { Indicator, MessageBox } from "mint-ui";

    export default {
        data() {
            return {
                step: "phone",
                form: {
                    body: {
                        phonenum: "",
                        password: ""
                    },
                    repeatPwd: "",
                    autoLogin: true
                }
            }
        },
        updated() {
            holderjs.run()
        },
        methods: {
            async doLogup() {
                try {
                    Indicator.open();
                    await this.$auth.register({
                        data: this.form.body,
                        autoLogin: this.form.autoLogin,
                        redirect: this.form.autoLogin ? "/" : "/login"
                    });
                    MessageBox({
                        title: "提示",
                        message: "注册成功",
                        showCancelButton: true
                    }).then(action => {
                        Indicator.close();
                        if(action === "confirm") {
                            window.location.href = "/#/";
                        } else {
                            window.location.href = "/#/my";
                        }
                    });
                } catch (res) {
                    if(res.response) {
                        res = res.response;
                    }
                    MessageBox({
                        title: `错误 - ${res.status}`,
                        message: res.message || res.data.message || JSON.stringify(res.data)
                    }).then(action => {
                        Indicator.close()
                    });
                }
            },
            toIptPassword() {
                this.step = "password"
            },
            toIptPhone() {
                this.step = "phone"

            }
        }
    }
</script>

<style type="text/scss">
    label, h1 {
        margin-bottom: 0;
    }
</style>