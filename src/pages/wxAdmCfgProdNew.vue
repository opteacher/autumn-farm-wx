<template>
    <div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:" @click="toBack">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回产品列表</p>
                </div>
            </a>
        </div>
        <div class="weui-cells__title">新增产品</div>
        <edt-order-form :body="form.body"/>
        <div class="weui-btn-area">
            <a href="javascript:" class="weui-btn weui-btn_primary" @click="doAddProd">添加</a>
        </div>
    </div>
</template>

<script>
    import edtOrderForm from "../forms/edtProdForm"

    export default {
        components: {
            "edt-order-form": edtOrderForm
        },
    	data() {
    		return {
    			form: {
    				body: {
    					tempId: "",
    					name: "",
                        icon: "",
                        type: "",
                        title: "",
                        prices: [],
					    express: [{
    						typ: "",
                            cost: 0
                        }],
					    prefers: [],
                        images: []
                    }
                }
            }
        },
    	methods: {
		    async toBack() {
		    	try {
				    if(this.form.body.tempId && this.form.body.tempId !== "") {
					    await this.axios.delete(`/autumnFarmWX/mdl/v1/temp/${this.form.body.tempId}`)
				    }
				    this.$router.push("/autumnFarmWX/admin/config/prods")
                } catch (e) {
		    		weui.alert(`删除临时数据失败：${e.message || JSON.stringify(e)}`)
			    }
            },
    		async doAddProd() {
    			try {
				    if(this.form.body.tempId && this.form.body.tempId !== "") {
					    await this.axios.delete(`/autumnFarmWX/mdl/v1/temp/${this.form.body.tempId}`)
				    }
                    this.form.body.date = new Date();
				    this.form.body.tempId = "";
    				await this.axios.post("/autumnFarmWX/mdl/v1/prod", this.form.body);
                    weui.alert("添加成功", () => {
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
    .gray-text {
        color: #808080;
    }
    .weui-cell_access {
        .weui-cell__hd {
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 0 0 2px 2px;
            border-color: #c8c8cd;
            border-style: solid;
            -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
            transform: matrix(.71,.71,-.71,.71,0,0);
            position: relative;
            top: 2px;
            position: absolute;
            top: 50%;
            margin-top: -4px;
            left: 15px;
        }
    }
    p {
        margin-bottom: 0;
    }
    label {
        margin-bottom: 0;
    }

    .weui-cell_select-before .money-symbol {
        width: 75px;
    }
</style>