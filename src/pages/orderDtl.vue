<template>
    <div>
        <div class="weui-cells mt-0">
            <a class="weui-cell weui-cell_access" :href="`/#/autumnFarmWX/order/list/${$route.query.process}`">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回订单列表</p>
                </div>
            </a>
        </div>
        <div class="weui-panel">
            <div class="weui-panel__hd p-0">
                <div class="weui-cell">
                    <div class="weui-cell__bd">订单号：{{order._id}}</div>
                    <span class="weui-cell__ft"></span>
                </div>
            </div>
            <div class="weui-panel__bd">
                <div href="javascript:void(0);"
                     class="weui-media-box weui-media-box_appmsg pb-0">
                    <div class="media">
                        <img class="align-self-start mr-3 img-fluid" :src="prod.icon" style="width: 64px">
                        <div class="media-body">
                            <div class="weui-cells no-tb-border mt-0">
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        <label class="weui-label">
                                            <h5 class="weui-media-box__title">{{prod.name}}</h5>
                                        </label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc">
                                        <p class="weui-media-box__desc">{{prod.title}}</p>
                                    </div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd weui-media-box__desc">
                                        <label class="weui-label">下单时间</label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc text-truncate">{{order.time}}</div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd weui-media-box__desc">
                                        <label class="weui-label">购买数量</label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc">{{order.amount}}</div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd weui-media-box__desc">
                                        <label class="weui-label">总金额</label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc">{{order.total}}￥</div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd weui-media-box__desc">
                                        <label class="weui-label">状态</label>
                                    </div>
                                    <div class="weui-cell__bd weui-media-box__desc">{{order.process}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="['已发货'].includes(order.process)" class="weui-panel">
            <div class="weui-panel__hd">追踪快递</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">标题一</h4>
                    <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                    <ul class="weui-media-box__info mb-0">
                        <li class="weui-media-box__info__meta">文字来源</li>
                        <li class="weui-media-box__info__meta">时间</li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="['已完成'].includes(order.process)" class="weui-panel">
            <div class="weui-panel__hd">评价</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">标题一</h4>
                    <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                    <ul class="weui-media-box__info mb-0">
                        <li class="weui-media-box__info__meta">文字来源</li>
                        <li class="weui-media-box__info__meta">时间</li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">其它信息</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
    			order: {},
    			prod: {}
            }
        },
        async created() {
    		try {
    			this.order = (await this.axios.get(`/mdl/v1/order/${this.$route.params.oid}`)).data.data[0]
		    } catch (e) {
                weui.alert(`获取订单${this.$route.params.oid}失败：${e.message || JSON.stringify(e)}`);
                return
		    }

		    try {
    			this.prod = (await this.axios.get(`/mdl/v1/prod/${this.order.prodId}`)).data.data[0]
            } catch (e) {
			    weui.alert(`获取产品${this.order.prodId}失败：${e.message || JSON.stringify(e)}`);
		    }
        }
    }
</script>