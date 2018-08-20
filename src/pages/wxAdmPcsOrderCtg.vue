<template>
    <wx-admin-lyt tabIndex="orders">
        <div id="search_header">
            <div class="weui-search-bar" id="search_bar">
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
        </div>
        <br/>
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单号</label>
                    <em class="weui-form-preview__value">12345</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">商品*数量</label>
                    <span class="weui-form-preview__value">葡萄(0xabcd) * 1(大箱)</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">下单时间</label>
                    <span class="weui-form-preview__value">2018-08-20 13:20:00</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">客户(联系电话)</label>
                    <span class="weui-form-preview__value">张先生(13918559376)</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">状态</label>
                    <span class="weui-form-preview__value">未付款</span>
                </div>
            </div>
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:">取消订单</a>
            </div>
        </div>
        <br/>
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单号</label>
                    <em class="weui-form-preview__value">12345</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">商品/数量</label>
                    <span class="weui-form-preview__value">葡萄(0xabcd) / 1(大箱)</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">下单时间</label>
                    <span class="weui-form-preview__value">2018-08-20 13:20:00</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">客户/联系电话</label>
                    <span class="weui-form-preview__value">张先生 / 13918559376</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">状态</label>
                    <span class="weui-form-preview__value">已付款</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">备注</label>
                    <span class="weui-form-preview__value"></span>
                </div>
            </div>
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:">取消订单</a>
                <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary">输入快递号</button>
            </div>
        </div>
        <br/>
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单号</label>
                    <em class="weui-form-preview__value">12345</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">商品/数量</label>
                    <span class="weui-form-preview__value">葡萄(0xabcd) / 1(大箱)</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">下单时间</label>
                    <span class="weui-form-preview__value">2018-08-20 13:20:00</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">客户/联系电话</label>
                    <span class="weui-form-preview__value">张先生 / 13918559376</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">状态</label>
                    <span class="weui-form-preview__value">已发货</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">备注</label>
                    <span class="weui-form-preview__value"></span>
                </div>
            </div>
        </div>
        <br/>
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单号</label>
                    <em class="weui-form-preview__value">12345</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">商品/数量</label>
                    <span class="weui-form-preview__value">葡萄(0xabcd) / 1(大箱)</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">下单时间</label>
                    <span class="weui-form-preview__value">2018-08-20 13:20:00</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">客户/联系电话</label>
                    <span class="weui-form-preview__value">张先生 / 13918559376</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">状态</label>
                    <span class="weui-form-preview__value">已完成</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">备注</label>
                    <span class="weui-form-preview__value"></span>
                </div>
            </div>
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
		mounted() {
			holderjs.run()
		},
        created() {
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
        }
	}
</script>

<style type="text/scss">
    #search_text {
        margin-bottom: 0.3rem !important;
    }
    #search_header {
        margin-top: -2.5vh;
    }
</style>