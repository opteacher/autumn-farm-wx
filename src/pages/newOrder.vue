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
                    <em class="weui-form-preview__value">{{totalAmount}}</em>
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

        <div class="weui-cells__title">递送方式</div>
        <div class="weui-cells weui-cells_checkbox">
            <label v-for="exp in prod.express" class="weui-cell weui-check__label" :for="exp.typ">
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" :id="exp.typ" v-model="useExpress" @click="hdlClkExp">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd"><p>{{exp.typ}}：{{exp.cost}}</p></div>
            </label>
        </div>
        <div class="weui-cells__tips text-right">自提地址：上海市嘉定区平成路嘉华居</div>

        <div v-show="useExpress" class="weui-cells__title">收款地址</div>
        <div v-show="useExpress" class="weui-cells weui-cells_radio">
            <label v-show="order.address" class="weui-cell weui-check__label" for="selRecvAddr">
                <div class="weui-cell__bd"><p>{{order.address}}</p></div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" name="radio1" id="selRecvAddr" checked>
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
            <a href="javascript:void(0);" class="weui-cell weui-cell_link">
                <div class="weui-cell__bd" @click="hdlAddAddress">添加更多</div>
            </a>
        </div>

        <div class="weui-cells__title">联系方式</div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__bd ml-3">
                    <input class="weui-input" type="text" placeholder="请输入姓名">
                </div>
                <div class="weui-cell__ft mr-2">
                    <select class="weui-select" v-model="sexCall">
                        <option value="先生">先生</option>
                        <option value="女士">女士</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" placeholder="请输入手机号">
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
                    <img src="/img/微信.png" alt="" style="width:20px;margin-right:5px;display:block">
                </div>
                <div class="weui-cell__bd"><p>微信</p></div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" name="radio1" id="weixin" checked>
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
        </div>

        <div class="weui-btn-area">
            <a href="javascript:" class="weui-btn weui-btn_primary">付款</a>
        </div>
    </div>
</template>

<script>
    import _ from "lodash"
    import Vue from "vue"
    import addRecvAddrForm from "../forms/addRecvAddrForm"

    export default {
        data() {
            return {
                order: {address: ""},
                prod: {},
	            totalAmount: "",
	            unitPrice: {},
                useExpress: false,
                sexCall: "先生"
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

	        let upSig = this.unitPrice[this.order.unit];
	        let up = _.compact(upSig.match(/[\d.]*/g))[0];
	        this.totalAmount = parseFloat(up) * this.order.amount;
	        this.totalAmount = upSig.replace(up, this.totalAmount)
        },
        methods: {
	        hdlClkExp(me) {
	        	let expIndex = _.findIndex(this.prod.express, exp => exp.typ === me.target.id);
		        let expCost = this.prod.express[expIndex].cost;
		        let cost = _.compact(expCost.match(/[\d.]*/g))[0];
		        let orgAmt = _.compact(this.totalAmount.match(/[\d.]*/g))[0];
		        let ttlAmt = parseFloat(orgAmt);
		        ttlAmt += parseFloat(`${me.target.checked ? "+" : "-"}${cost}`);
		        this.totalAmount = this.totalAmount.replace(orgAmt, ttlAmt);
	        },
	        hdlAddAddress() {
	        	weui.dialog({
                    title: "管理收获地址",
                    buttons: [{
	                    label: '取消',
	                    type: 'default'
                    }, {
	                    label: '确定',
	                    type: 'primary',
	                    onClick: function () { alert('确定') }
                    }]
                });
	        	new Vue(addRecvAddrForm).$mount(".weui-dialog__bd")
            }
        }
    }
</script>