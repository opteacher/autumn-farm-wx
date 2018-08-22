<template>
    <div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="/#/autumnFarmWX/admin/config/prods">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回产品列表</p>
                </div>
            </a>
        </div>
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
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__hd">
                    <label class="weui-label" style="margin-left: 15px;">类别</label>
                </div>
                <div class="weui-cell__bd">
                    <select class="weui-select gray-text" style="margin-left: -15px" v-model="form.body.type">
                        <option value="" style="display: none" selected disabled>请选择类别</option>
                        <option value="fruit">水果</option>
                        <option value="poultry">家禽</option>
                        <option value="aquatic">水产</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">简介</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入产品简介" v-model="form.body.baseDesc">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label mb-0">详细介绍</label>
                    <a href="https://www.jianshu.com/p/1e402922ee32">Markdown</a>
                </div>
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" placeholder="请输入文本" rows="3" v-model="form.body.moreDesc"></textarea>
                    <div class="weui-textarea-counter"><span>0</span>/200</div>
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
                        type: "",
                        baseDesc: "",
                        moreDesc: ""
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
            top: -2px;
            position: absolute;
            top: 50%;
            margin-top: -2px;
            left: 15px;
        }
    }
</style>