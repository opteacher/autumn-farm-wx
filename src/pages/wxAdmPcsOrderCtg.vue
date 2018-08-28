<template>
    <wx-admin-lyt tabIndex="orders">
        <div id="backToOrders" class="weui-cells mt-0">
            <a class="weui-cell weui-cell_access" href="/#/autumnFarmWX/admin/process/orders">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回订单列表</p>
                </div>
            </a>
        </div>
        <div class="weui-cells__title">{{$route.params.category}}</div>
        <div class="weui-search-bar d-none" id="search_bar">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" id="search_input" placeholder="搜索" />
                    <a href="javascript:" class="weui-icon-clear" id="search_clear"></a>
                </div>
                <label for="search_input" class="weui-search-bar__label" id="search_text">
                    <i class="weui-icon-search"></i>
                    <span>搜索</span>
                </label>
            </form>
            <a href="javascript:" class="weui-search-bar__cancel-btn" id="search_cancel">取消</a>
        </div>
        <div v-for="order in orders">
            <div class="weui-form-preview">
                <div class="weui-form-preview__hd">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">订单号</label>
                        <em class="weui-form-preview__value" style="font-size: 1em">{{order._id}}</em>
                    </div>
                </div>
                <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">商品</label>
                        <span class="weui-form-preview__value">{{order.prodName}}({{order.prodId}})</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">数量</label>
                        <span class="weui-form-preview__value">{{order.amount}} / {{order.unit}}</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">下单时间</label>
                        <span class="weui-form-preview__value">{{order.time}}</span>
                    </div>
                    <div class="weui-form-preview__item" v-show="order.custName && order.custContact">
                        <label class="weui-form-preview__label">客户(联系电话)</label>
                        <span class="weui-form-preview__value">{{order.custName}}({{order.custContact}})</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">状态</label>
                        <span class="weui-form-preview__value">{{order.process}}</span>
                    </div>
                    <div class="weui-form-preview__item" v-show="order.expTyp">
                        <label class="weui-form-preview__label">运单(快递)</label>
                        <span class="weui-form-preview__value">{{order.expNo || ""}}({{order.expTyp}})</span>
                    </div>
                </div>
                <div class="weui-form-preview__ft">
                    <a v-show="$route.params.category !== '已撤销'" class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:" @click="doCancel(order._id)">取消订单</a>
                    <a v-show="$route.params.category === '待发货'" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:" @click="doInputNo(order._id)">输入快递号</a>
                </div>
            </div>
            <br/>
        </div>
    </wx-admin-lyt>
</template>

<script>
    import $ from "jquery"
    import Vue from "vue"
	import holderjs from "holderjs"
	import wxAdminLyt from "../layouts/wxAdminLyt"

	export default {
		components: {
			"wx-admin-lyt": wxAdminLyt
		},
        data() {
		    return {
		        orders: []
            }
        },
		mounted() {
			holderjs.run()
		},
        async created() {
	        $(function(){
		        let $searchBar = $('#search_bar'),
			        $searchText = $('#search_text'),
			        $searchInput = $('#search_input'),
			        $searchClear = $('#search_clear'),
			        $searchCancel = $('#search_cancel');

		        function hideSearchResult(){
			        $searchInput.val('');
		        }
		        function cancelSearch(){
			        hideSearchResult();
			        $searchBar.removeClass('weui-search-bar_focusing');
			        $searchText.show();
		        }

		        $searchText.on('click', function(){
			        $searchBar.addClass('weui-search-bar_focusing');
			        $searchInput.focus();
		        });
		        $searchInput.on('blur', function () {
		        	if(!this.value.length)
		        		cancelSearch();
		        });
		        $searchClear.on('click', function(){
			        hideSearchResult();
			        $searchInput.focus();
		        });
		        $searchCancel.on('click', function(){
			        cancelSearch();
			        $searchInput.blur();
		        });
	        });

	        try {
                this.orders = (await this.axios.get(`/mdl/v1/orders?process=${this.$route.params.category}`)).data.data
            } catch (e) {
                weui.alert(`获取订单列表失败：${e.message || JSON.stringify(e)}`)
            }
        },
        methods: {
	        async doCancel(oid) {
	        	try {
			        weui.confirm(`确认撤销订单：${oid}？`, async () => {
				        await this.axios.put(`/mdl/v1/order/${oid}`, {process: "已撤销"});
				        this.$router.go(0)
			        })
                } catch (e) {
	        		weui.alert(`取消订单失败：${e.message || JSON.stringify(e)}`)
		        }
            },
            async doInputNo(oid) {
	        	let self = this;
	        	weui.dialog({
                    title: "输入快递运单号",
			        buttons: [{
				        label: '取消',
				        type: 'default'
			        }, {
				        label: '确定',
				        type: 'primary',
				        async onClick() {
				        	try {
						        await self.axios.put(`/mdl/v1/order/${oid}`, {
						        	process: "已发货",
                                    expNo: $(this).parents(".weui-dialog").find(".weui-input").val()
                                });
                                self.$router.go(0)
                            } catch (e) {
				        		weui.alert(`更新快递运单号失败：${e.message || JSON.stringify(e)}`)
					        }
                        }
			        }]
                });
	        	new Vue({
                    template: `
                    <div class="weui-cells mb-3">
                    <div class='weui-cell'>
                    <div class='weui-cell__bd'>
                    <input class='weui-input' type='text' placeholder="运单号">
                    </div>
                    </div>
                    </div>
                    `
                }).$mount(".weui-dialog__bd")
            }
        }
	}
</script>

<style type="text/scss">
    #search_text {
        margin-bottom: 0.3rem !important;
    }
</style>