<template>
    <el-container>
        <el-main class="text-center">
            <a href="/#/">
                <img class="img-thumbnail" src="holder.js/200x200" alt="前往主页">
            </a>
            <form>
                <el-input class="mt-3" type="text" v-model="form.body.username" placeholder="用户名" required/>
                <el-input class="mt-2" type="password" v-model="form.body.password" placeholder="密码" required/>
                <div class="text-left mt-2">
                    <el-checkbox v-model="form.rememberMe">记住账户</el-checkbox>
                </div>
                <button type="button" class="btn btn-success mt-4 btn-block" @click="doLogin">登录</button>
                <a class="btn btn-default mt-2 btn-block" role="button" href="/#/logup">注册</a>
            </form>
        </el-main>
    </el-container>
</template>

<script>
    import holderjs from "holderjs"

    export default {
        data() {
            return {
                form: {
                    body: {
                        username: "",
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
                    await this.$auth.login({
                        data: this.form.body,
                        rememberMe: this.form.rememberMe
                    });
                    this.$message({
                        type: "success",
                        message: "登录成功"
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