<template>
    <div>
        <mt-navbar v-model="selTab" :fixed="true" style="z-index: 39;">
            <mt-tab-item id="全部" href="/#/autumnFarmWX/order/list/全部">全部</mt-tab-item>
            <mt-tab-item id="待付款" href="/#/autumnFarmWX/order/list/待付款">待付款</mt-tab-item>
            <mt-tab-item id="待发货" href="/#/autumnFarmWX/order/list/待发货">待发货</mt-tab-item>
            <mt-tab-item id="已发货" href="/#/autumnFarmWX/order/list/已发货">已发货</mt-tab-item>
            <mt-tab-item id="已完成" href="/#/autumnFarmWX/order/list/已完成">已结束</mt-tab-item>
        </mt-navbar>
        <div class="weui-tab__panel" style="margin-top: 55px;">
            <div v-for="order in orders" class="weui-panel">
                <div class="weui-panel__hd p-0">
                    <a :href="`/#/autumnFarmWX/order/detail/${order._id}?process=${selTab}`" class="weui-cell weui-cell_access weui-cell_link">
                        <div class="weui-cell__bd">订单号：{{order._id}}</div>
                        <span class="weui-cell__ft"></span>
                    </a>
                </div>
                <div class="weui-panel__bd">
                    <div v-if="order.prodId in prods" class="weui-flex">
                        <div class="weui-media-box weui-media-box_appmsg">
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" :src="prods[order.prodId].icon" alt="">
                            </div>
                            <div class="weui-media-box__bd">
                                <h4 class="weui-media-box__title">
                                    <i class="iconfont green-text" :class="iconMap[prods[order.prodId].type]"></i>&nbsp;{{prods[order.prodId].name}}
                                </h4>
                                <p class="weui-media-box__desc mb-2">{{prods[order.prodId].title}}</p>
                                <div class="weui-media-box__desc weui-flex w-100">
                                    <div class="weui-flex__item">
                                        <i class="iconfont icon-xiangxi green-text"></i>&nbsp;{{order.amount}}&nbsp;x&nbsp;{{order.unit}}{{order.expTyp ? ` + ${order.expTyp}` : ""}}
                                    </div>
                                    <div class="float-right">
                                        <i class="iconfont icon-shiliangzhinengduixiang-copy green-text"></i>&nbsp;{{order.total}}￥
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="weui-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__hd">
                            <i class="iconfont icon-moren gray-text" style="font-size: 2rem"></i>
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">产品名称</h4>
                            <p class="weui-media-box__desc">产品标题</p>
                        </div>
                    </div>
                </div>
                <div class="weui-panel__ft">
                    <div class="weui-cell weui-cell_link">
                        <div class="weui-cell__bd">{{order.process}}</div>
                        <div class="weui-cell__ft">
                            <a v-show="order.process === '待付款'" href="javascript:" class="weui-btn weui-btn_mini weui-btn_primary mt-0 ml-2" @click="doPay(order._id)">付款</a>
                            <a v-show="order.process === '已发货'" href="javascript:" class="weui-btn weui-btn_mini weui-btn_primary mt-0 ml-2" @click="doConfirm(order._id)">确认收货</a>
                            <a href="javascript:" class="weui-btn weui-btn_mini weui-btn_default mt-0 ml-2">联系商家</a>
                            <a v-show="!['已完成', '已撤销'].includes(order.process)" href="javascript:" class="weui-btn weui-btn_mini weui-btn_warn mt-0 ml-2" @click="doCancel(order._id)">取消</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import Vue from "vue"
    import holderjs from "holderjs"
    import cookies from "../../utils/cookies"
    import confRecvForm from "../forms/confRecvForm"
    import cancelOrderForm from "../forms/cancelOrderForm"

    export default {
        data() {
            return {
                selTab: "全部",
                orders: [],
                prods: {},
                iconMap: {
                    "fruit": "icon-fruit",
                    "poultry": "icon-chicken",
                    "aquatic": "icon-fish"
                }
            }
        },
        created() {
            this.reload()
        },
        mounted() {
            holderjs.run()
        },
        watch: {
            "selTab" (to, from) {
                this.reload()
            }
        },
        methods: {
            async reload() {
                let params = {
                    openId: cookies.get("openid")
                };
                this.selTab = this.$route.params.process;
                if (this.selTab !== "全部") {
                    params.process = this.selTab
                }
	            params.order_by = {time: -1};//按时间降序
                try {
                    this.orders = (await this.axios.get("/mdl/v1/orders", {params})).data.data;
                    if(this.selTab === "已完成") {
	                    params.process = "已撤销";
	                    let orders = (await this.axios.get("/mdl/v1/orders", {params})).data.data;
	                    this.orders = this.orders.concat(orders);
	                    this.orders.sort((o1, o2) => o1.time < o2.time ? 1 : -1);
                    }

                    let prods = {};// 不知为什么，vue的状态导致只能这样写
                    for (let order of this.orders) {
                        if (!(order.prodId in prods)) {
                            prods[order.prodId] = (await this.axios.get(`/mdl/v1/prod/${order.prodId}`)).data.data[0]
                        }
                    }
                    this.prods = prods
                } catch (e) {
                    weui.alert(`查询用户订单失败：${e.message || JSON.stringify(e)}`)
                }
            },
            doPay(oid) {
                let order = this.orders.find(order => order._id === oid);
                this.$router.push({
                    path: "/autumnFarmWX/order/new",
                    query: {
                        orderId: oid,
                        prodId: order.prodId,
                        prodTyp: this.prods[order.prodId].type
                    }
                })
            },
            doConfirm(oid) {
                let self = this;
                let order = this.orders.find(order => order._id === oid);
                try {
                    weui.dialog({
                        title: "确认收货",
                        buttons: [{
                            type: "default",
                            label: "取消"
                        }, {
                            type: "primary",
                            label: "确认",
                            disabled: "",
                            async onClick() {
                                let verfCode = $(this).parents(".weui-dialog").find(".weui-input").val();
                                // @_@ 判断验证码有效性
                                await self.axios.put(`/mdl/v1/order/${oid}`, {process: "已完成"});
                                self.$router.go(0)
                            }
                        }]
                    })
                } catch (e) {
                    weui.alert(`确认收货失败：${e.message || JSON.stringify(e)}`)
                }
                new Vue({
                    data() {
                        return { phone: order.custContact }
                    },
                    components: {
                        "conf-recv-form": confRecvForm
                    },
                    template: "<conf-recv-form :phone='phone'/>"
                }).$mount(".weui-dialog__bd")
            },
	        doCancel(oid) {
            	let self = this;
            	try {
		            weui.dialog({
			            title: "确认撤单",
			            buttons: [{
				            type: "default",
				            label: "取消"
			            }, {
				            type: "primary",
				            label: "确认",
				            async onClick() {
					            let form = $(this).parents(".weui-dialog");
					            let txtArea = form.find(".weui-textarea").val();
					            let cancelReason = txtArea || "";
					            if(cancelReason === "") {
						            cancelReason = form.find(".weui-select").val();
					            }
					            await self.axios.put(`/mdl/v1/order/${oid}`, {
					            	cancelReason,
                                    process: "已撤销"
					            });
                                self.$router.go(0)
				            }
			            }]
		            })
                } catch (e) {
                    weui.alert(`更新撤单理由失败：${e.message || JSON.stringify(e)}`)
	            }
            	new Vue({
                    data() {
                    	return { orderId: oid }
                    },
                    components: {
	                    "cancel-order-form": cancelOrderForm
                    },
                    template: "<cancel-order-form :orderId='orderId'/>"
                }).$mount(".weui-dialog__bd")
            }
        }
    }
</script>

<style type="text/scss">
    a {
        color: #586c94;
    }
    .no-tb-border:before {
        border-top: none;
    }
    .no-tb-border:after {
        border-bottom: none;
    }
</style>