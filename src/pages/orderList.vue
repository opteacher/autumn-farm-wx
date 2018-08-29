<template>
    <div class="weui-tab">
        <div class="weui-navbar">
            <div class="weui-navbar__item weui-bar__item_on">
                全部
            </div>
            <div class="weui-navbar__item">
                待付款
            </div>
            <div class="weui-navbar__item">
                待发货
            </div>
            <div class="weui-navbar__item">
                待收货
            </div>
        </div>
        <div class="weui-tab__panel">
            <div v-for="order in orders" class="weui-panel">
                <div class="weui-panel__hd p-0">
                    <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                        <div class="weui-cell__bd">订单号：{{order._id}}</div>
                        <span class="weui-cell__ft"></span>
                    </a>
                </div>
                <div class="weui-panel__bd">
                    <a v-if="order.prodId in prods" href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="prods[order.prodId].icon" alt="">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{prods[order.prodId].name}}</h4>
                            <p class="weui-media-box__desc">{{prods[order.prodId].title}}</p>
                        </div>
                    </a>
                    <a v-else href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__hd">
                            <i class="iconfont icon-moren gray-text" style="font-size: 2rem"></i>
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">产品名称</h4>
                            <p class="weui-media-box__desc">产品标题</p>
                        </div>
                    </a>
                </div>
                <div class="weui-panel__ft">
                    <div class="weui-cell weui-cell_link w-100">
                        <div class="w-100 text-right">
                            <a href="javascript:" class="weui-btn weui-btn_mini weui-btn_primary mt-0 ml-2">按钮</a>
                            <a href="javascript:" class="weui-btn weui-btn_mini weui-btn_default mt-0 ml-2">按钮</a>
                            <a href="javascript:" class="weui-btn weui-btn_mini weui-btn_default mt-0 ml-2">按钮</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash"
    import cookies from "../../utils/cookies"

    export default {
        data() {
            return {
                orders: [],
                prods: {}
            }
        },
        async created() {
            let params = {
                openId: cookies.get("openid")
            };
            let process = this.$route.params.process;
            if(process !== "all") {
                params.process = process
            }
            try {
                this.orders = (await this.axios.get("/mdl/v1/orders", {params})).data.data;

                let prods = {};// 不知为什么，vue的状态导致只能这样写
                for(let order of this.orders) {
                    if(!(order.prodId in this.prods)) {
                        prods[order.prodId] = (await this.axios.get(`/mdl/v1/prod/${order.prodId}`)).data.data[0]
                    }
                }
                this.prods = prods
            } catch (e) {
                weui.alert(`查询用户订单失败：${e.message || JSON.stringify(e)}`)
            }
        }
    }
</script>