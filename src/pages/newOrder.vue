<template>
    <div>
        <div class="weui-cells mt-0">
            <a class="weui-cell weui-cell_access" :href="`/#/autumnFarmWX/prod/detail/${$route.query.prodId}?type=${$route.query.prodTyp}`">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回产品主页</p>
                </div>
            </a>
        </div>

        <div class="weui-cells__title">清单</div>
        <div class="weui-form-preview mb-2">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">付款金额</label>
                    <em class="weui-form-preview__value">{{totalAmount}}￥</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">品名</label>
                    <span class="weui-form-preview__value">{{order.prodName}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">数量</label>
                    <span class="weui-form-preview__value">{{order.amount}} / {{order.unit}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">下单时间</label>
                    <span class="weui-form-preview__value">{{order.time}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">备注</label>
                    <span class="weui-form-preview__value">
                        <input class="weui-input text-right" type="text" placeholder="请输入备注" v-model="order.note">
                    </span>
                </div>
            </div>
        </div>

        <div class="weui-cells__title">
            <div class="weui-flex">
                <div>递送方式</div>
                <div v-show="!useExpress" class="weui-flex__item">
                    <div class="text-right">自提地址：上海市嘉定区平成路嘉华居</div>
                </div>
            </div>
        </div>
        <div class="weui-cells weui-cells_checkbox">
            <label v-for="exp in prod.express" class="weui-cell weui-check__label" :for="exp.typ">
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" :id="exp.typ" v-model="useExpress" @click="hdlClkExp">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd"><p>{{exp.typ}}：{{exp.cost}}</p></div>
            </label>
        </div>

        <div v-show="useExpress" class="weui-cells__title">收款地址</div>
        <div v-show="useExpress" class="weui-cells weui-cells_radio">
            <label v-show="selAddress" class="weui-cell weui-check__label" for="selRecvAddr">
                <div class="weui-cell__bd"><p>{{selAddress}}</p></div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" id="selRecvAddr" checked>
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
            <a href="javascript:" class="weui-cell weui-cell_link">
                <div class="weui-cell__bd" @click="hdlAddAddress">添加更多</div>
            </a>
        </div>

        <div class="weui-cells__title">联系方式</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__bd ml-3">
                    <input class="weui-input" type="text" placeholder="请输入姓名" v-model="user.name">
                </div>
                <div class="weui-cell__ft mr-2">
                    <select class="weui-select" v-model="user.sex">
                        <option value="先生">先生</option>
                        <option value="女士">女士</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" placeholder="请输入手机号" v-model="user.phone">
                </div>
                <div class="weui-cell__ft">
                    <button class="weui-vcode-btn">获取验证码</button>
                </div>
            </div>
        </div>

        <div class="weui-cells__title">付款方式</div>
        <div class="weui-cells weui-cells_radio">
            <label class="weui-cell weui-check__label" for="weixin">
                <div class="weui-cell__hd">
                    <i class="iconfont icon-weixin"></i>
                </div>
                <div class="weui-cell__bd"><p>微信</p></div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" name="radio1" id="weixin" checked>
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
        </div>

        <div class="weui-btn-area mb-3">
            <a href="javascript:" class="weui-btn weui-btn_primary" @click="doPayBill">付款</a>
        </div>
    </div>
</template>

<script>
    import _ from "lodash"
    import Vue from "vue"
    import cookies from "../../utils/cookies"
    import addRecvAddrForm from "../forms/addRecvAddrForm"

    export default {
        data() {
            return {
                order: {
                    address: ""
                },
                prod: {},
                user: {
                    name: "",
                    sex: "先生",
                    phone: "",
                    addresses: []
                },
	            totalAmount: 0,
	            unitPrice: {},
                useExpress: false,
                selAddress: ""
            }
        },
        async created() {
        	try {
		        this.order = (await this.axios.get(`/mdl/v1/order/${this.$route.query.orderId}`)).data.data;
                if(this.order.length !== 1) {
		        	weui.alert(`查询不到订单：${this.$route.query.orderId}`);
                    return
                }
		        this.order = this.order[0];
                if(!this.order.address) {
                    this.order.address = ""
                } else {
                    this.selAddress = this.order.address
                }
	        } catch (e) {
                weui.alert(`查询订单失败：${e.message || JSON.stringify(e)}`)
	        }

	        try {
        		this.prod = (await this.axios.get(`/mdl/v1/prod/${this.$route.query.prodId}`)).data.data;
		        if(this.prod.length !== 1) {
			        weui.alert(`查询不到货品：${this.$route.query.prodId}`);
			        return
		        }
		        this.prod = this.prod[0];
        		this.unitPrice = _.fromPairs(this.prod.prices.map(p => [p.unit, p.price]));
            } catch (e) {
		        weui.alert(`查询产品失败：${e.message || JSON.stringify(e)}`)
	        }

	        try {
        	    this.order.openId = cookies.get("openid");
        	    let users = (await this.axios.get(`/mdl/v1/users?openid=${this.order.openId}`)).data.data;
        	    if(users.length !== 0) {
        	        this.user = users[0];
        	        if(!this.user.addresses) {
                        this.user.addresses = []
                    }
                } else {
                    this.user.openid = this.order.openId;
                    users = (await this.axios.post("/mdl/v1/user", this.user)).data.data;
                    if(users.length === 1) {
                        this.user = users[0]
                    }
                }
            } catch (e) {
        	    weui.alert(`根据openid查询用户失败：${e.message || JSON.stringify(e)}`)
            }

	        this.totalAmount = this.unitPrice[this.order.unit] * this.order.amount
        },
        methods: {
	        hdlClkExp(me) {
                this.totalAmount += parseFloat(`${me.target.checked ? "+" : "-"}${this.prod.express.find(exp => exp.typ === me.target.id).cost}`)
	        },
	        hdlAddAddress() {
                let self = this;

	            weui.dialog({
                    title: "管理收货地址",
                    buttons: [{
	                    label: '取消',
	                    type: 'default'
                    }, {
	                    label: '确定',
	                    type: 'primary',
	                    onClick: function () {
	                        self.order.address = $("#hidSelAddress").val();
                            self.selAddress = self.order.address;
                        }
                    }]
                });

	        	new Vue({
                    data() {
                        return {
                            addresses: self.user.addresses || [],
                            selAddress: self.order.address,
                            userId: self.user._id
                        }
                    },
                    components: {
                        "add-recv-addr-form": addRecvAddrForm
                    },
                    template: "<add-recv-addr-form :userId='userId' :selAddress='selAddress' :addresses='addresses'/>"
                }).$mount(".weui-dialog__bd")
            },
            async doPayBill() {
	            // 查询订单是否重复
	            try {
	                let orders = (await this.axios.get(`/mdl/v1/order/${this.order._id}`)).data.data;
	                if(orders.length !== 1) {
	                    throw new Error("数据库存储错误：重复的订单记录")
                    }
                    if(!["待付款"].includes(orders[0].process)) {
	                    throw new Error("该订单已付款，请勿重复付款")
                    }
                } catch (e) {
	                weui.alert(`订单异常：${e.message || JSON.stringify(e)}`);
                    return
                }

                // 更新订单状态
	            try {
	                this.order.total = this.totalAmount;
	                this.order.custName = `${this.user.name} ${this.user.sex}`;
	                this.order.custContact = this.user.phone;
                    await this.axios.put(`/mdl/v1/order/${this.order._id}`, this.order)
                } catch (e) {
	                weui.alert(`付款失败，存储订单错误：${e.message || JSON.stringify(e)}`);
                    return
                }

                // 保存用户输入的个人信息
                try {
                    await this.axios.put(`/mdl/v1/user/${this.user._id}`, this.user)
                } catch (e) {
	                weui.alert(`付款失败，存储用户信息错误：${e.message || JSON.stringify(e)}`);
                    return
                }

                // 微信下单
                let wxPayRes = {};
                try {
                    wxPayRes = (await this.axios.post("/api/v1/weixin/order", {
                        orderId: this.order._id,
                        total: this.order.total,
                        openid: this.order.openId,
                        time: this.order.time,
                        prodId: this.prod._id,
                        body: this.prod.name, // 拼接body
                        callback: "http://opteacher.top/#/autumnFarmWX/order/new/notify",
                        note: this.order.note, // 写到detail里面
                    })).data.data;
                } catch(res) {
                    weui.alert(`付款失败，微信下单失败：${res.response.data || JSON.stringify(res)}`);
                    return
                }

                // 微信支付
                let self = this;
                wx.ready(async () => {
                    let result = {};
                    try {
                        result = (await self.axios.get("/api/v1/weixin/signature", {
                            params: { extra: {appid: ""} }
                        })).data;
                    } catch (e) {
                        weui.alert(`付款失败，发起微信支付失败：${e.message || JSON.stringify(e)}`);
                        return
                    }

	                wx.chooseWXPay({
                        timestamp: result.timestamp,
                        nonceStr: result.noncestr,
                        package: "",
                        signType: "SHA1",
                        paySign: result.signature,
                        success(res) {

                        }
                    })
                });

                // this.totalAmount
                weui.confirm("订单已下单，请耐心等待发货", {
                    buttons: [{
                        label: "前往我的订单",
                        type: "default",
                        onClick() {
                            self.$router.push(`/autumnFarmWX/order/detail/${self.order._id}`)
                        }
                    }, {
                        label: "继续购买",
                        type: "primary",
                        onClick() {
                            self.$router.push(`/autumnFarmWX/prod/list/${self.$route.query.prodTyp}`)
                        }
                    }]
                })
            }
        }
    }
</script>

<style type="text/scss">
    .icon-weixin {
        color: #09BA07;
        font-size: 25px;
        margin-right: 5px;
        display: block
    }
</style>