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
                        <em class="weui-form-preview__value">{{order.oid}}</em>
                    </div>
                </div>
                <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">商品*数量</label>
                        <span class="weui-form-preview__value">{{order.prodName}}({{order.prodId}}) * {{order.amount}}({{order.unit}})</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">下单时间</label>
                        <span class="weui-form-preview__value">{{order.time}}</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">客户(联系电话)</label>
                        <span class="weui-form-preview__value">{{order.custName}}({{order.custContact}})</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">状态</label>
                        <span class="weui-form-preview__value">{{order.process}}</span>
                    </div>
                    <div class="weui-form-preview__item" v-show="order.wayBill">
                        <label class="weui-form-preview__label">运单(快递)</label>
                        <span class="weui-form-preview__value">{{order.wayBill}}</span>
                    </div>
                </div>
                <div class="weui-form-preview__ft">
                    <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:">取消订单</a>
                </div>
            </div>
            <br/>
        </div>
    </wx-admin-lyt>
</template>

<script>
    import $ from "jquery"
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
        }
	}
</script>

<style type="text/scss">
    #search_text {
        margin-bottom: 0.3rem !important;
    }
</style>