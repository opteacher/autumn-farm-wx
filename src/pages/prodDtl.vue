<template>
    <!--<div>{{$route.params.id}}</div>-->
    <div>
        <div class="weui-cells mt-0">
            <a class="weui-cell weui-cell_access" :href="`/#/autumnFarmWX/prod/list/${$route.query.type}`">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回产品列表</p>
                </div>
            </a>
        </div>
        <hdr-adv-bar/>
        <div class="weui-tab">
            <div class="weui-navbar mb-3">
                <div class="weui-navbar__item weui-bar__item_on">
                    详细介绍
                </div>
                <div class="weui-navbar__item">
                    评论
                </div>
            </div>
            <div class="weui-tab__panel weui-article">
                <div class="weui-article">
                    <h1 class="mb-0">{{prod.name}}</h1>
                    <p class="mb-0">{{prod.baseDesc}}</p>
                </div>
                <section v-html="this.prod.moreDesc"></section>
            </div>
        </div>
        <div class="fixed-bottom weui-form-preview__ft">
            <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:">加入购物车</a>
            <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:">立即购买</button>
        </div>
    </div>
</template>

<script>
    import holderjs from "holderjs"
    import hdrAdvBar from "../components/hdrAdvBar"

    export default {
        components: {
            "hdr-adv-bar": hdrAdvBar
        },
        data() {
            return {
                prod: {}
            }
        },
        mounted() {
            holderjs.run()
        },
        async created() {
            try {
                this.prod = (await this.axios.get(`/mdl/v1/prod/${this.$route.params.id}`)).data.data;
                if(this.prod.length !== 1) {
                    throw new Error(`未找到指定id：${this.$route.params.id}产品记录`)
                }
                this.prod = this.prod[0];
                this.prod.moreDesc = this.cvtMkdToHtml(this.prod.moreDesc)
            } catch (e) {
                weui.alert(`获取产品详情失败：${e.message || JSON.stringify(e)}`)
            }
        },
        methods: {
            cvtMkdToHtml(content) {
                return markdown.toHTML(content)
            }
        }
    }
</script>

<style type="text/scss">
    .fixed-bottom {
        position: fixed !important;
    }
</style>