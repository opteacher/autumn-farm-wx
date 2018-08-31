<template>
    <div>
        <div class="weui-cells mt-0">
            <a class="weui-cell weui-cell_access" :href="`/#/autumnFarmWX/prod/list/${$route.query.type}`">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回产品列表</p>
                </div>
            </a>
        </div>
        <template>
            <mt-swipe :auto="4000" style="height: 30vh;">
                <mt-swipe-item v-for="img in prod.images" :key="img">
                    <img class="img-fluid" :src="img">
                </mt-swipe-item>
            </mt-swipe>
        </template>
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
                            <li class="weui-media-box__info__meta">
                                <i class="iconfont icon-huiyishiqueren_huabanfuben"></i>&nbsp;上市时间
                            </li>
                            <li class="weui-media-box__info__meta">{{prod.date}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="weui-panel" v-show="prod.prefers.length !== 0">
                <div class="weui-panel__hd"><i class="iconfont icon-youhui"></i>&nbsp;优惠</div>
                <div class="weui-panel__bd">
                    <div class="weui-media-box weui-media-box_small-appmsg">
                        <div class="weui-cells">
                            <div v-for="prefer in prod.prefers" class="weui-cell">
                                <div class="weui-cell__bd">#&nbsp;{{prefer}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-panel">
                <div class="weui-panel__hd"><i class="iconfont icon-jiage"></i>&nbsp;价格方案</div>
                <div class="weui-panel__bd">
                    <div class="weui-media-box weui-media-box_small-appmsg">
                        <div class="weui-cells">
                            <div v-for="price in prod.prices" class="weui-cell">
                                <div class="weui-cell__bd">
                                    <i class="iconfont icon-dian"></i>&nbsp;{{price.unit}}
                                </div>
                                <div class="weui-cell__ft gray-text">{{price.price}}￥</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-panel" style="margin-bottom: 10vh">
                <div class="weui-panel__hd"><i class="iconfont icon-wuliu"></i>&nbsp;运送方式</div>
                <div class="weui-panel__bd">
                    <div class="weui-media-box weui-media-box_small-appmsg">
                        <div class="weui-cells">
                            <div class="weui-cell">
                                <div class="weui-cell__bd"><i class="iconfont icon-navicon-ztdzsz"></i>&nbsp;自提</div>
                                <div class="weui-cell__ft gray-text">店铺位置: 上海</div>
                            </div>
                            <div v-for="express in prod.express" class="weui-cell">
                                <div class="weui-cell__bd">
                                    <i class="iconfont icon-tianmaoshunfengbaoyou"></i>&nbsp;{{express.typ}}
                                </div>
                                <div class="weui-cell__ft gray-text">{{express.cost}}￥</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed-bottom weui-form-preview__ft" style="background-color: white">
            <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:" onclick="weui.alert('购物车功能还未开启')">加入购物车</a>
            <button id="showActionSheetMenu" type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:">立即购买</button>
        </div>

        <div>
            <div class="weui-mask" id="actionSheetMask" style="display: none"></div>
            <div class="weui-actionsheet" id="actionSheetMenu">
                <div class="weui-actionsheet__title">
                    <div class="weui-media-box weui-media-box_appmsg pl-0 pr-0">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="prod.icon" alt="">
                        </div>
                        <div class="weui-media-box__bd text-left">
                            <h4 class="weui-media-box__title">{{prod.name}}</h4>
                            <p class="weui-media-box__desc text-truncate">{{prod.title}}</p>
                        </div>
                    </div>
                </div>
                <div class="weui-actionsheet__menu">
                    <div class="weui-actionsheet__cell weui-cell  weui-cell_noactive weui-cell_select weui-cell_select-after">
                        <div class="weui-cell__hd">
                            <label class="weui-label">购买类型</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select gray-text pl-5" v-model="order.unit" @change="hdlBuyChg">
                                <option class="text-center" v-for="prod in prod.prices" :value="prod.unit">{{prod.unit}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-actionsheet__cell weui-cell weui-cell_noactive weui-cell_vcode">
                        <div class="weui-cell__hd">
                            <label class="weui-label">购买数量</label>
                        </div>
                        <div class="weui-cell__bd">
                            <div class="weui-flex">
                                <div class="weui-flex__item">
                                    <a href="javascript:" class="weui-btn weui-btn_mini weui-btn_default h-100 align-middle float-right" @click="hdlBuyChg">-</a>
                                </div>
                                <div class="weui-flex__item text-center">{{order.amount}}</div>
                                <div class="weui-flex__item">
                                    <a href="javascript:" class="weui-btn weui-btn_mini weui-btn_default h-100 align-middle float-left" @click="hdlBuyChg">+</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="weui-actionsheet__cell weui-cell weui-cell_noactive">
                        <div class="weui-cell__hd"><label class="weui-label">总金额</label></div>
                        <div class="weui-cell__bd text-center">{{totalAmount}}￥</div>
                    </div>
                </div>
                <div class="weui-actionsheet__action">
                    <div class="weui-actionsheet__cell weui-form-preview__btn_primary" @click="newOrder">下单</div>
                    <div class="weui-actionsheet__cell" id="cancelActionSheetMenu">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import _ from "lodash"
    import holderjs from "holderjs"
    import hdrAdvBar from "../components/hdrAdvBar"
    import cookies from "../../utils/cookies"

    export default {
        components: {
            "hdr-adv-bar": hdrAdvBar
        },
        data() {
            return {
                prod: {
                	express:[{}],
                    prefers: []
                },
                order: {
                    prodId: "",
                    prodName: "",
                    unit: "",
                    amount: 1
                },
                unitPrice: {},
                totalAmount: "0"
            }
        },
        mounted() {
            holderjs.run()
        },
        async created() {
            try {
                this.prod = (await this.axios.get(`/autumnFarmWX/mdl/v1/prod/${this.$route.params.id}`)).data.data;
                if(this.prod.length !== 1) {
                    throw new Error(`未找到指定id：${this.$route.params.id}产品记录`)
                }
                this.prod = this.prod[0];

                this.order.prodId = this.prod._id;
                this.order.prodName = this.prod.name;
                this.order.unit = this.prod.prices[0].unit;
                this.totalAmount = this.prod.prices[0].price;

                this.unitPrice = _.fromPairs(this.prod.prices.map(p => [p.unit, p.price]));
            } catch (e) {
                weui.alert(`获取产品详情失败：${e.message || JSON.stringify(e)}`)
            }

            $(function(){
                let $actionSheetMenu = $("#actionSheetMenu");
                let $actionSheetMask = $("#actionSheetMask");

                function hideActionSheet() {
                    $actionSheetMenu.removeClass("weui-actionsheet_toggle");
                    $actionSheetMask.fadeOut(200);
                }

                $actionSheetMask.on("click", hideActionSheet);
                $("#cancelActionSheetMenu").on("click", hideActionSheet);
                $("#showActionSheetMenu").on("click", function(){
                    $actionSheetMenu.addClass("weui-actionsheet_toggle");
                    $actionSheetMask.fadeIn(200);
                });
            });
        },
        methods: {
        	hdlCommentTab() {
        		weui.alert("评论功能还未开启，敬请期待")
            },
            hdlBuyChg(me) {
        	    if(!me.target.value) {
                    if(me.target.text === "-" && this.order.amount === 1) {
                        return;
                    }
                    this.order.amount += parseInt(`${me.target.text}1`);
                }

                this.totalAmount = this.unitPrice[this.order.unit] * this.order.amount;
            },
            async newOrder() {
	            try {
		            this.order.openId = cookies.get("openid");
		            this.order.time = new Date();
                    this.order.process = "待付款";
                    this.order.total = this.totalAmount;
		            let result = (await this.axios.post("/autumnFarmWX/mdl/v1/order", this.order)).data.data;
		            if(result.length < 1) {
			            weui.alert(`插入订单数据库失败：${JSON.stringify(result)}`);
			            return
		            }
		            result = result[0];

		            weui.alert("下单成功，请于24内完成付款", () => {
			            this.$router.push({
				            path: "/autumnFarmWX/order/new",
				            query: {
					            orderId: result._id,
					            prodId: this.order.prodId,
					            prodTyp: this.prod.type
				            }
			            })
		            })
	            } catch (e) {
		            weui.alert(`新增订单失败：${e.message || JSON.stringify(e)}`)
	            }
            }
        }
    }
</script>

<style type="text/scss">
    .fixed-bottom {
        position: fixed !important;
    }
    .weui-cell_noactive:active {
        background-color: transparent !important;
    }
</style>