<template>
    <wx-admin-lyt tabIndex="prodLst">
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="/#/autumnFarmWX/admin/config/prods">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回产品列表</p>
                </div>
            </a>
        </div>
        <div class="weui-cells__title">编辑产品</div>
        <edt-order-form :body="form.body"/>
        <div class="weui-btn-area">
            <a href="javascript:" class="weui-btn weui-btn_primary" @click="doEdtProd">修改</a>
        </div>
    </wx-admin-lyt>
</template>

<script>
    import holderjs from "holderjs"
    import wxAdminLyt from "../layouts/wxAdminLyt"
    import edtOrderForm from "../forms/edtOrderForm"

    export default {
        data() {
            return {
                form: {
                    body: {
                        name: "",
                        icon: "",
                        type: "",
                        title: "",
                        prices: [],
                        express: [{
                            typ: "",
                            cost: ""
                        }],
                        prefer: ""
                    }
                }
            }
        },
        components: {
            "wx-admin-lyt": wxAdminLyt,
            "edt-order-form": edtOrderForm
        },
        mounted() {
            holderjs.run()
        },
        async created() {
            try {
                let result = (await this.axios.get(`/mdl/v1/prod/${this.$route.params.pid}`)).data.data;
                if(result.length !== 1) {
                    throw new Error("找不到指定产品")
                }
                result = result[0];
                this.form.body._id = result._id;
                this.form.body.name = result.name;
                this.form.body.icon = result.icon;
                this.form.body.type = result.type;
                this.form.body.title = result.title;
                this.form.body.prices = result.prices;
                this.form.body.express = result.express;
                this.form.body.prefer = result.prefer;
            } catch (e) {
                weui.alert(`获取产品详情失败：${e.message || JSON.stringify(e)}`)
            }
        },
        methods: {
            async doEdtProd() {
                try {
                    if(this.form.body.express[0].cost === "") {
                        this.form.body.express[0].cost = 0
                    }
                    this.form.body.date = new Date();

                    await this.axios.put(`/mdl/v1/prod/${this.$route.params.pid}`, this.form.body);
                    weui.alert("修改成功", () => {
                        this.$router.push("/autumnFarmWX/admin/config/prods")
                    });
                } catch (e) {
                    weui.alert(`新增产品失败：${e.message || JSON.stringify(e)}`)
                }
            }
        }
    }
</script>

<style type="text/scss">
</style>