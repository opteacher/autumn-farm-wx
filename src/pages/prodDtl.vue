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
            <div class="weui-navbar mb-3" style="display: none;">
                <div class="weui-navbar__item weui-bar__item_on">介绍</div>
                <div class="weui-navbar__item" @click="hdlCommentTab">评论</div>
            </div>
            <div class="weui-panel">
                <div class="weui-panel__bd">
                    <div class="weui-media-box weui-media-box_text">
                        <h4 class="weui-media-box__title">{{prod.name}}</h4>
                        <p class="weui-media-box__desc mb-0">{{prod.title}}</p>
                        <ul class="weui-media-box__info mb-0">
                            <li class="weui-media-box__info__meta">快递：{{prod.express[0].typ}}</li>
                            <li class="weui-media-box__info__meta">{{prod.express[0].cost}}</li>
                            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">{{prod.prefer.join(" & ")}}</li>
                        </ul>
                    </div>
                </div>
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
                prod: {
                	express:[{}],
                    prefer: []
                },
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
            } catch (e) {
                weui.alert(`获取产品详情失败：${e.message || JSON.stringify(e)}`)
            }
        },
        methods: {
        	hdlCommentTab() {
        		weui.alert("评论功能还未开启，敬请期待")
            }
        }
    }
</script>

<style type="text/scss">
    .fixed-bottom {
        position: fixed !important;
    }
</style>