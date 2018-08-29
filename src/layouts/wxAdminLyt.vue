<template>
    <div v-show="$auth.ready()">
        <div class="page js_show">
            <div class="page__bd page__bd_spacing">
                <div class="weui-tab">
                    <div class="weui-navbar">
                        <div class="weui-navbar__item" id="orders" :class="{'weui-bar__item_on': tabIndex === 'orders'}" @click="hdTopTabChg">订单</div>
                        <div class="weui-navbar__item" id="prodLst" :class="{'weui-bar__item_on': tabIndex === 'prodLst'}" @click="hdTopTabChg">产品表</div>
                        <div class="weui-navbar__item" id="advBar" :class="{'weui-bar__item_on': tabIndex === 'advBar'}" @click="hdTopTabChg">广告板</div>
                    </div>
                </div>
                <div class="weui-tab-container">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["tabIndex"],
        methods: {
            hdTopTabChg(mouseEvent) {
                let selTab = mouseEvent.target.id;
                if(selTab === this.tabIndex) {
                    return;
                }

                let toPath = "";
                switch(selTab) {
                    case "orders":
                        toPath = "/autumnFarmWX/admin/process/orders";
                        break;
                    case "advBar":
                        toPath = "/autumnFarmWX/admin/config/advbar";
                        break;
                    case "prodLst":
                        toPath = "/autumnFarmWX/admin/config/prods";
                        break;
                }
                this.$router.push({path: toPath})
            }
        }
    }
</script>

<style type="text/scss">
    .weui-tab-container {
        margin-top: 50px;
    }
</style>