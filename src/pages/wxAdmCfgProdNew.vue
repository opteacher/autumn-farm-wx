<template>
    <div>
        <div class="weui-cells__title">新增产品</div>
        <form class="weui-cells weui-cells_form" action="/mdl/v1/prod" method="POST">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">品名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入产品名" v-model="form.body.name">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">图片</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入图片链接" v-model="form.body.icon">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">简介</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入产品简介" v-model="form.body.bsDesc">
                </div>
            </div>
        </form>
        <div class="weui-btn-area">
            <a href="javascript:" class="weui-btn weui-btn_primary" @click="doAddProd">添加</a>
        </div>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
    			form: {
    				body: {
    					name: "",
                        icon: "",
                        bsDesc: ""
                    }
                }
            }
        },
    	methods: {
    		async doAddProd() {
    			try {
    				await this.axios.post("/mdl/v1/prod", this.form.body);
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