<template>
    <wx-admin-lyt tabIndex="prodLst">
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__hd">
                产品列表
            </div>
            <div class="weui-panel__bd">
                <a v-for="prod in prods" class="weui-media-box weui-media-box_appmsg weui-cell_access"
                   :href="`/#/autumnFarmWX/admin/config/prod/${prod._id}/detail`">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" :src="prod.icon">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{prod.name}}</h4>
                        <p class="weui-media-box__desc">{{prod.bsDesc}}</p>
                    </div>
                    <div class="weui-cell__ft"></div>
                </a>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="addProd">添加产品</a>
        </div>
    </wx-admin-lyt>
</template>

<script>
    import holderjs from "holderjs"
    import { MessageBox } from "mint-ui"
    import wxAdminLyt from "../layouts/wxAdminLyt"

    export default {
        components: {
            "wx-admin-lyt": wxAdminLyt
        },
        data() {
            return {
                prods: []
            }
        },
        mounted() {
            holderjs.run()
        },
        async created() {
            try {
                this.prods = (await this.axios.get("/mdl/v1/prods")).data.data;
            } catch (e) {
                weui.alert(`获取产品列表失败：${e.message || JSON.stringify(e)}`)
            }
        },
        methods: {
            addProd() {
                weui.dialog({
                    title: "添加产品",
                    content: "内容",
                    buttons: [{
                        label: "取消",
                        type: "default"
                    }, {
                        label: "确定",
                        type: "primary",
                        onClick: () => { alert("确定") }
                    }]
                })
            }
        }
    }
</script>

<style type="text/scss">
    .weui-btn_primary {
        color: #ffffff !important;
    }
</style>