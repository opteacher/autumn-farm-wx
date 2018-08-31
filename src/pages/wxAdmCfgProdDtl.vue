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
            <a href="javascript:" class="weui-btn weui-btn_warn" @click="doDelProd">删除</a>
        </div>
    </wx-admin-lyt>
</template>

<script>
    import holderjs from "holderjs"
    import wxAdminLyt from "../layouts/wxAdminLyt"
    import edtOrderForm from "../forms/edtProdForm"

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
                        prefers: []
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
                let result = (await this.axios.get(`/autumnFarmWX/mdl/v1/prod/${this.$route.params.pid}`)).data.data;
                if(result.length !== 1) {
                    throw new Error("找不到指定产品")
                }
	            _.forIn(result[0], (v, k) => {
		            if(v) {
			            this.form.body[k] = v
		            }
	            })
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

                    await this.axios.put(`/autumnFarmWX/mdl/v1/prod/${this.$route.params.pid}`, this.form.body);
                    weui.alert("修改成功", () => {
                        this.$router.push("/autumnFarmWX/admin/config/prods")
                    });
                } catch (e) {
                    weui.alert(`新增产品失败：${e.message || JSON.stringify(e)}`)
                }
            },
            async doDelProd() {
            	try {
		            weui.confirm(`确认删除产品：${this.form.body.name}`, async () => {
                        await this.axios.delete(`/autumnFarmWX/mdl/v1/prod/${this.$route.params.pid}`);
                        this.$router.push("/autumnFarmWX/admin/config/prods")
		            })
                } catch (e) {
		            weui.alert(`删除产品失败：${e.message || JSON.stringify(e)}`)
	            }

            }
        }
    }
</script>

<style type="text/scss">
</style>