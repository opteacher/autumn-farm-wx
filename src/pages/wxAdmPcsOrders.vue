<template>
    <wx-admin-lyt tabIndex="orders">
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="/#/autumnFarmWX/admin/process/order/category/waitForPay">
                <div class="weui-cell__bd">
                    <span>带付款订单</span>
                </div>
                <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="/#/autumnFarmWX/admin/process/order/category/waitForSend">
                <div class="weui-cell__bd">
                    <span>待发货订单</span>
                    <span class="weui-badge" v-show="numWaitForSend !== 0">{{numWaitForSend}}</span>
                </div>
                <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="/#/autumnFarmWX/admin/process/order/category/alreadySent">
                <div class="weui-cell__bd">
                    <span>已发货订单</span>
                </div>
                <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="/#/autumnFarmWX/admin/process/order/category/finished">
                <div class="weui-cell__bd">
                    <span>已完成订单</span>
                </div>
                <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="/#/autumnFarmWX/admin/process/order/category/canceled">
                <div class="weui-cell__bd">
                    <span>已撤销订单</span>
                </div>
                <div class="weui-cell__ft"></div>
            </a>
        </div>
    </wx-admin-lyt>
</template>

<script>
    import holderjs from "holderjs"
    import wxAdminLyt from "../layouts/wxAdminLyt"

    export default {
    	data() {
    		return {
    			numWaitForSend: 0
            }
        },
        components: {
            "wx-admin-lyt": wxAdminLyt
        },
        mounted() {
            holderjs.run()
        },
        methods: {
	        toDetail(category) {
	        	let self = this;
	        	return () => {
			        self.$router.push(`/autumnFarmWX/admin/process/order/category/${category}`)
                }
            }
        },
        async created() {
        	try {
        		let result = (await this.axios.get("/mdl/v1/orders?process=waitForSend")).data.data;
        		this.numWaitForSend = result.length
            } catch (e) {
		        weui.alert(`查询代发货订单数失败：${e.message || JSON.stringify(e)}`)
	        }
        }
    }
</script>