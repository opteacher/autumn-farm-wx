<template>
    <!--<p>{{$route.params.type}}</p>-->
    <div>
        <header-adv-bar/>
        <div class="weui-grids">
            <a v-for="prod in prods" class="weui-grid" :href="`/#/autumnFarmWX/prod/detail/${prod._id}?type=${selTab}`">
                <div class="weui-grid__icon">
                    <img :src="prod.icon"/>
                </div>
                <p class="weui-grid__label">{{prod.name}}</p>
            </a>
        </div>
        <div class="weui-tabbar">
            <a class="weui-tabbar__item" href="/#/autumnFarmWX/prod/list/fruit" :class="{'weui-bar__item_on': selTab === 'fruit'}">
                <i class="iconfont fs-25 icon-fruit" :class="{'is-active': selTab === 'fruit'}"></i>
                <p class="weui-tabbar__label">水果</p>
            </a>
            <a class="weui-tabbar__item" href="/#/autumnFarmWX/prod/list/poultry" :class="{'weui-bar__item_on': selTab === 'poultry'}">
                <i class="iconfont fs-25 icon-chicken" :class="{'is-active': selTab === 'poultry'}"></i>
                <p class="weui-tabbar__label">家禽</p>
            </a>
            <a class="weui-tabbar__item" href="/#/autumnFarmWX/prod/list/aquatic" :class="{'weui-bar__item_on': selTab === 'aquatic'}">
                <i class="iconfont fs-25 icon-fish" :class="{'is-active': selTab === 'aquatic'}"></i>
                <p class="weui-tabbar__label">水产</p>
            </a>
        </div>
    </div>
</template>

<script>
    import holderjs from "holderjs"
    import hdrAdvBar from "../components/hdrAdvBar"
    import cookies from "../../utils/cookies"

    export default {
        data() {
            return {
                selTab: "",
                prods: []
            }
        },
    	components: {
    		"header-adv-bar": hdrAdvBar
        },
        mounted() {
            holderjs.run()
        },
        created() {
            this.loadProdList(this.$route.params.type)
        },
        methods: {
            async loadProdList(type) {
                try {
                    this.selTab = type;
                    this.prods = (await this.axios.get("/mdl/v1/prods", { params: {type} })).data.data
                } catch (e) {
                    weui.alert(`查询产品列表失败：${e.message || JSON.stringify(e)}`)
                }
            },
            hdlSelectTab(mosEve) {
                this.selTab = mosEve.target.closest("a").rel;
                this.$router.replace(`/autumnFarmWX/prod/list/${this.selTab}`);
                // this.loadProdList()
            }
        },
        watch: {
            "$route" (to) {
                this.loadProdList(to.path.split("/").pop())
            }
        }
    }
</script>

<style type="text/scss">
    a p {
        margin-bottom: 0;
    }
    a:hover {
        text-decoration: none;
    }
    .weui-tabbar {
        .is-active {
            color: #09BA07;
        }
    }
    .fs-25 {
        font-size: 25px
    }
</style>