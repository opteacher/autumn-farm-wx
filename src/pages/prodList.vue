<template>
    <!--<p>{{$route.params.type}}</p>-->
    <div>
        <header-adv-bar/>
        <div class="weui-grids">
            <a class="weui-grid" href="#">
                <div class="weui-grid__icon">
                    <img src="/img/葡萄.png"/>
                </div>
                <p class="weui-grid__label">葡萄</p>
            </a>
            <a class="weui-grid" href="#">
                <div class="weui-grid__icon">
                    <img src="/img/草莓.png"/>
                </div>
                <p class="weui-grid__label">草莓</p>
            </a>
        </div>
    </div>
</template>

<script>
    import holderjs from "holderjs"
    import hdrAdvBar from "../components/hdrAdvBar"

    export default {
    	components: {
    		"header-adv-bar": hdrAdvBar
        },
        mounted() {
            holderjs.run()
        },
        created() {

        }
    }
</script>

<style type="text/scss">
    a p {
        text-decoration: none;
    }
</style>