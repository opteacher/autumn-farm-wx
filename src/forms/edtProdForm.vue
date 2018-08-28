<template>
    <div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">品名</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请输入产品名" v-model="form.body.name">
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">图标</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="选择图标" v-model="form.body.icon">
            </div>
            <div class="weui-cell__ft">
                <a class="weui-cell weui-cell_access p-0" href="javascript:" @click="hdlSelImages('icon')">
                    <div class="weui-cell__ft">选择图标</div>
                </a>
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">图片</label>
            </div>
            <div class="weui-cell__bd gray-text">{{form.body.images.length}} / 5</div>
            <div class="weui-cell__ft">
                <a class="weui-cell weui-cell_access p-0" href="javascript:" @click="hdlSelImages('images')">
                    <div class="weui-cell__ft">选择图片</div>
                </a>
            </div>
        </div>
        <div class="weui-cell weui-cell_select">
            <div class="weui-cell__hd">
                <label class="weui-label" style="margin-left: 15px;">类别</label>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select gray-text" style="margin-left: -15px" v-model="form.body.type">
                    <option value="" style="display: none" selected disabled>请选择类别</option>
                    <option value="fruit">水果</option>
                    <option value="poultry">家禽</option>
                    <option value="aquatic">水产</option>
                </select>
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">标题</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请输入产品标题" v-model="form.body.title">
            </div>
        </div>
        <div class="weui-cell weui-cell_vcode">
            <div class="weui-cell__hd">
                <label class="weui-label">定价</label>
            </div>
            <div class="weui-cell__bd"></div>
            <div class="weui-cell__ft">
                <button class="weui-vcode-btn" @click="addPrice">添加价格</button>
            </div>
        </div>
        <div v-for="(price, index) in form.body.prices" class="weui-cells mt-0">
            <a class="price-item weui-cell weui-cell_access" @click="hdlShowDelPriceBtn">
                <div class="weui-cell__bd"><p>{{price.price}}</p></div>
                <div class="weui-cell__ft">{{price.unit}}</div>
            </a>
            <a class="price-item weui-cell weui-cell_swiped" style="display: none">
                <div class="weui-cell__bd">
                    <a class="weui-cell weui-cell_access" @click="hdlHideDelPriceBtn">
                        <div class="weui-cell__bd"><p>{{price.price}}</p></div>
                        <div class="weui-cell__ft">{{price.unit}}</div>
                    </a>
                </div>
                <div class="weui-cell__ft">
                    <a class="weui-swiped-btn weui-swiped-btn_warn" href="javascript:" :rel="index" @click="delPrice">删除</a>
                </div>
            </a>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">快递方式</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请输入快递方式" v-model="form.body.express[0].typ">
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">快递单价</label>
            </div>
            <div class="weui-cell__bd">
                <input name="price" class="weui-input" type="number" pattern="[0-9\.]*" placeholder="请输入快递单价" v-model="form.body.express[0].cost">
            </div>
            <div class="weui-cell__ft">￥</div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">优惠(&分隔)</label>
            </div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请输入优惠方案" v-model="form.body.prefer">
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import _ from "lodash"
    import Vue from "vue"
    import addPriceForm from "./addPriceForm"
    import cookies from "../../utils/cookies"

    export default {
        props: {
            body: Object
        },
        data() {
            return {
                form: {
                    key: "prod",
                    body: this.body
                }
            }
        },
        created() {
            if(cookies.get("back_url", true)) {
                this.form.body = cookies.get(this.form.key, true)
            }
        },
        methods: {
            addPrice() {
                let self = this;
                weui.dialog({
                    title: "添加价格",
                    buttons: [{
                        label: "取消",
                        type: "default"
                    }, {
                        label: "确认",
                        type: "primary",
                        onClick() {
                            let form = $(this).parents(".weui-dialog").children("form");
                            let data = _.fromPairs(form.serializeArray().map(v => [v.name, v.value]));
                            self.form.body.prices.push({
                                price: data.price,
                                unit: data.unit
                            })
                        }
                    }]
                });
                new Vue(addPriceForm).$mount(".weui-dialog__bd")
            },
            delPrice(me) {
                let index = parseInt(me.target.rel);
                this.form.body.prices = this.form.body.prices.slice(0, index)
                    .concat(this.form.body.prices.slice(index + 1))
            },
            hdlShowDelPriceBtn(me) {
                let a = $(me.target.closest(".price-item"));
                let na = a.next(".weui-cell_swiped:first");
                let nabd = na.children(".weui-cell__bd:first-child");

                a.toggle();
                na.toggle();
                nabd.animate({
                    left: "-=68px"
                }, 200);
            },
            hdlHideDelPriceBtn(me) {
                let na = $(me.target.closest(".price-item"));
                let a = na.prev(".weui-cell_access:first");
                let nabd = na.children(".weui-cell__bd:first-child");
                nabd.animate({
                    left: "+=68px"
                }, 200, () => {
                    na.toggle();
                    a.toggle();
                });
            },
            hdlSelImages(imgType) {
                if(!this.form.body.name || this.form.body.name === "") {
                    weui.alert("请先输入产品名");
                    return
                }
                cookies.set(this.form.key, this.form.body);
                cookies.set("back_url", `${window.location.href}?imgType=${imgType}`);
                this.$router.push([
                    "/autumnFarmWX/admin/config/prod/images",
                    `?num=${imgType === "icon" ? 1 : 5}`,
                    `&name=${this.form.body.name}`
                ].join(""))
            }
        }
    }
</script>