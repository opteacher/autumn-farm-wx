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
                <img class="weui-tabbar__icon" :src="selTab === 'fruit' ? '/img/水果_active.png' : '/img/水果.png'" alt="">
                <p class="weui-tabbar__label">水果</p>
            </a>
            <a class="weui-tabbar__item" href="/#/autumnFarmWX/prod/list/poultry" :class="{'weui-bar__item_on': selTab === 'poultry'}">
                <img class="weui-tabbar__icon" :src="selTab === 'poultry' ? '/img/家禽_active.png' : '/img/家禽.png'" alt="">
                <p class="weui-tabbar__label">家禽</p>
            </a>
            <a class="weui-tabbar__item" href="/#/autumnFarmWX/prod/list/aquatic" :class="{'weui-bar__item_on': selTab === 'aquatic'}">
                <img class="weui-tabbar__icon" :src="selTab === 'aquatic' ? '/img/水产_active.png' : '/img/水产.png'" alt="">
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
        	weui.alert(JSON.stringify(this.$route.query));
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
</style>