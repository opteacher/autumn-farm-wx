<template>
    <el-container>
        <el-main class="text-center">
            <a href="/#/">
                <img class="img-thumbnail" src="holder.js/200x200" alt="前往主页">
            </a>
            <form>
                <el-input class="mt-3" type="text" v-model="form.body.username" placeholder="用户名" required/>
                <el-input class="mt-2" type="password" v-model="form.body.password" placeholder="密码" required/>
                <el-input class="mt-2" type="password" v-model="form.repeatPwd" placeholder="再次输入密码" required/>
                <div class="text-left mt-2">
                    <el-checkbox v-model="form.autoLogin">直接登录</el-checkbox>
                </div>
                <button type="button" class="btn btn-success mt-4 btn-block" @click="doLogup">注册</button>
            </form>
        </el-main>
    </el-container>
</template>

<script>
    import holderjs from "holderjs"
    import constants from "../../constants/controller"

    export default {
        data() {
            return {
                form: {
                    body: {
                        username: "",
                        password: ""
                    },
                    repeatPwd: "",
                    autoLogin: true
                }
            }
        },
        mounted() {
            holderjs.run();
        },
        methods: {
            async doLogup() {
                try {
                    this.$auth.register({
                        data: this.form.body,
                        autoLogin: this.form.autoLogin,
                        redirect: this.form.autoLogin ? "/" : "/login"
                    });
                    this.$message({
                        type: "success",
                        message: "注册成功"
                    });
                } catch (res) {
                    if(res.response) {
                        res = res.response;
                    }
                    this.$notify.error({
                        title: `错误 - ${res.status}`,
                        position: "bottom-left",
                        message: res.data.message || JSON.stringify(res.data)
                    });
                }
            }
        }
    }
</script>

<style type="text/scss">
</style>