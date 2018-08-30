<template>
    <div>
        <div class="weui-cells mt-0">
            <a class="weui-cell weui-cell_access" :href="`/#/autumnFarmWX/order/list/${$route.query.process}`">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回订单列表</p>
                </div>
            </a>
        </div>
        <div class="weui-panel">
            <div class="weui-panel__hd p-0">
                <div class="weui-cell">
                    <div class="weui-cell__bd">订单号：{{order._id}}</div>
                    <span class="weui-cell__ft"></span>
                </div>
            </div>
            <div class="weui-panel__bd">
                <div href="javascript:void(0);"
                     class="weui-media-box weui-media-box_appmsg pb-0">
                    <div class="media">
                        <img class="align-self-start mr-3 img-fluid" :src="prod.icon" style="width: 64px">
                        <div class="media-body">
                            <div class="weui-cells no-tb-border mt-0">
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        <label class="weui-label">
                                            <h5 class="weui-media-box__title">
                                                <i class="iconfont green-text" :class="iconMap[prod.type]"></i>&nbsp;{{prod.name}}
                                            </h5>
                                        </label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc">
                                        <p class="weui-media-box__desc">{{prod.title}}</p>
                                    </div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        <label class="weui-label fs-13">
                                            <i class="iconfont icon-huiyishiqueren_huabanfuben green-text"></i>&nbsp;下单时间
                                        </label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc text-truncate">{{order.time}}</div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        <label class="weui-label fs-13">
                                            <i class="iconfont icon-xiangxi green-text"></i>&nbsp;购买数量
                                        </label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc">{{order.amount}}&nbsp;x&nbsp;{{order.unit}}</div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        <label class="weui-label fs-13">
                                            <i class="iconfont icon-shiliangzhinengduixiang-copy green-text"></i>&nbsp;总金额
                                        </label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc">{{order.total}}￥</div>
                                </div>
                                <div class="weui-cell" v-show="order.expNo">
                                    <div class="weui-cell__hd">
                                        <label class="weui-label fs-13">
                                            <i class="iconfont icon-wuliu green-text"></i>&nbsp;快递({{order.expTyp}})
                                        </label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc">{{order.expNo}}</div>
                                </div>
                                <div class="weui-cell" v-show="order.cancelReason">
                                    <div class="weui-cell__hd">
                                        <label class="weui-label fs-13">
                                            <i class="iconfont icon-chuyidong green-text"></i>&nbsp;撤单理由
                                        </label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc">{{order.cancelReason}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-panel__ft">
                <div class="weui-cell weui-cell_link">
                    <div class="weui-cell__bd">{{order.process}}</div>
                    <div class="weui-cell__ft">
                        <a v-show="order.process === '待付款'" href="javascript:" class="weui-btn weui-btn_mini weui-btn_primary mt-0 ml-2" @click="doPay">付款</a>
                        <a v-show="order.process === '已发货'" href="javascript:" class="weui-btn weui-btn_mini weui-btn_primary mt-0 ml-2" @click="doConfirm">确认收货</a>
                        <a href="javascript:" class="weui-btn weui-btn_mini weui-btn_default mt-0 ml-2">联系商家</a>
                        <a v-show="!['已完成', '已撤销'].includes(order.process)" href="javascript:" class="weui-btn weui-btn_mini weui-btn_warn mt-0 ml-2" @click="doCancel">取消</a>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="['待发货'].includes(order.process)" v-show="false" class="weui-panel">
            <div class="weui-panel__hd">推荐</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                    <mt-swipe :auto="4000" style="height: 30vh;">
                        <mt-swipe-item>
                            <img class="img-fluid" data-src="holder.js/414x210?text=1">
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <img class="img-fluid" data-src="holder.js/414x210?text=2">
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <img class="img-fluid" data-src="holder.js/414x210?text=3">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>
        <div v-if="['已发货'].includes(order.process)" v-show="order.expTyp" class="weui-panel">
            <div class="weui-panel__hd">追踪快递</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">{{order.expTyp}}</h4>
                    <p class="weui-media-box__desc">快递进度查询暂时不支持，可前往快递官网更具快递单号查询进度</p>
                    <ul class="weui-media-box__info mb-0">
                        <li class="weui-media-box__info__meta">发货时间</li>
                        <li class="weui-media-box__info__meta">{{order.time}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="['已完成'].includes(order.process)" class="weui-panel">
            <div class="weui-panel__hd">评价</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text pb-0">
                    <div class="weui-flex">
                        <div v-for="level in 5" class="weui-flex__item text-center" @click="rateLevel = level">
                            <i v-if="rateLevel >= level" class="iconfont icon-star-fill fs-25 green-text"></i>
                            <i v-else class="iconfont icon-star fs-25 green-text"></i>
                        </div>
                    </div>
                    <div class="weui-cells weui-cells_form">
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <textarea class="weui-textarea" placeholder="请输入文字评价" rows="3" v-model="rateContent"></textarea>
                                <div class="weui-textarea-counter"><span>{{rateContent.length}}</span>/200</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-panel__ft">
                <div class="weui-cell">
                    <a href="javascript:" class="weui-btn weui-btn_primary w-100" @click="submitRate">提交评论</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    import holderjs from "holderjs"
    import confRecvForm from "../forms/confRecvForm"
    import cancelOrderForm from "../forms/cancelOrderForm"

    export default {
    	data() {
    		return {
    			order: {},
    			prod: {},
                iconMap: {
                    "fruit": "icon-fruit",
                    "poultry": "icon-chicken",
                    "aquatic": "icon-fish"
                },
                rateLevel: 0,
                rateContent: ""
            }
        },
        async created() {
    		try {
    			this.order = (await this.axios.get(`/mdl/v1/order/${this.$route.params.oid}`)).data.data[0];
                this.rateLevel = this.order.rateLevel || 0;
                this.rateContent = this.order.rateContent || ""
		    } catch (e) {
                weui.alert(`获取订单${this.$route.params.oid}失败：${e.message || JSON.stringify(e)}`);
                return
		    }

		    try {
    			this.prod = (await this.axios.get(`/mdl/v1/prod/${this.order.prodId}`)).data.data[0]
            } catch (e) {
			    weui.alert(`获取产品${this.order.prodId}失败：${e.message || JSON.stringify(e)}`);
		    }
        },
        mounted() {
            holderjs.run()
        },
        methods: {
            doPay() {
                this.$router.push({
                    path: "/autumnFarmWX/order/new",
                    query: {
                        orderId: this.order._id,
                        prodId: this.order.prodId,
                        prodTyp: this.prod.type
                    }
                })
            },
            doConfirm() {
                let self = this;
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
                                await self.axios.put(`/mdl/v1/order/${self.order._id}`, {process: "已完成"});
                                self.$router.go(0)
                            }
                        }]
                    })
                } catch (e) {
                    weui.alert(`确认收货失败：${e.message || JSON.stringify(e)}`)
                }
                new Vue({
                    data() {
                        return { phone: self.order.custContact }
                    },
                    components: {
                        "conf-recv-form": confRecvForm
                    },
                    template: "<conf-recv-form :phone='phone'/>"
                }).$mount(".weui-dialog__bd")
            },
            doCancel() {
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
                                await self.axios.put(`/mdl/v1/order/${self.order._id}`, {
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
                        return { orderId: self.order._id }
                    },
                    components: {
                        "cancel-order-form": cancelOrderForm
                    },
                    template: "<cancel-order-form :orderId='orderId'/>"
                }).$mount(".weui-dialog__bd")
            },
            async submitRate() {
                let params = {};
                if(this.rateLevel !== 0) {
                    params.rateLevel = this.rateLevel
                }
                if(this.rateContent !== "") {
                    params.rateContent = this.rateContent
                }
                try {
                    await this.axios.put(`/mdl/v1/order/${this.order._id}`, params);
                    weui.alert("评论成功，谢谢")
                } catch (e) {
                    weui.alert(`更新用户的评论失败：${e.message || JSON.stringify(e)}`)
                }
            }
        }
    }
</script>

<style type="text/scss">
    .fs-13 {
        font-size: 13px;
    }
    .fs-25 {
        font-size: 25px;
    }
    .green-text {
        color: #09BB07;
    }
</style>