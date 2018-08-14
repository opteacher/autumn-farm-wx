<template>
    <el-container>
        <el-main class="text-center">
            <a href="/#/">
                <img class="img-thumbnail" src="holder.js/200x200" alt="前往主页">
            </a>
            <form>
                <input class="form-control mt-3" type="text" placeholder="用户名" :value="form.username" required/>
                <input class="form-control mt-2" type="password" placeholder="密码" :value="form.password" required/>
                <input class="form-control mt-2" type="password" placeholder="再次输入密码" :value="form.repeatPwd" required/>
                <button type="button" class="btn btn-success mt-4 btn-block">注册</button>
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
                    username: "",
                    password: "",
                    repeatPwd: "",
                    rememberMe: false
                }
            }
        },
        mounted() {
            holderjs.run();
        }
    }
</script>

<style type="text/scss">
</style>