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
        <div v-for="order in orders" class="weui-form-preview mb-2">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">付款金额</label>
                    <em class="weui-form-preview__value">{{order.totalAmount}}</em>
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
                    <label class="weui-form-preview__label">备注</label>
                    <span class="weui-form-preview__value">
                        <input class="weui-input text-right" type="text" placeholder="请输入备注">
                    </span>
                </div>
            </div>
        </div>
        <div class="weui-cells__title">递送方式</div>
        <div class="weui-cells weui-cells_checkbox">
            <label class="weui-cell weui-check__label" for="s11">
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd"><p>顺丰快递：{{}}</p></div>
            </label>
        </div>
        <div class="weui-cells__title">收款地址</div>
        <div class="weui-cells weui-cells_radio">
            <label class="weui-cell weui-check__label" for="x11">
                <div class="weui-cell__bd">
                    <p>cell standard</p>
                </div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" name="radio1" id="x11" checked>
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
            <a href="javascript:void(0);" class="weui-cell weui-cell_link">
                <div class="weui-cell__bd">添加更多</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                orders: []
            }
        },
        created() {
            this.orders = [this.$route.query]
        }
    }
</script>