<template>
    <!--<p>{{$route.params.type}}</p>-->
    <div>
        <header-adv-bar/>
        <div class="weui-grids">
            <a class="weui-grid" href="#">
                <div class="weui-grid__icon">
                    <img src="holder.js/28x28"/>
                </div>
                <p class="weui-grid__label">item 1</p>
            </a>
            <a class="weui-grid" href="#">
                <div class="weui-grid__icon">
                    <img src="holder.js/28x28"/>
                </div>
                <p class="weui-grid__label">item 2</p>
            </a>
        </div>
    </div>
</template>

<script>
    import hdrAdvBar from "../components/hdrAdvBar"

    export default {
    	components: {
    		"header-adv-bar": hdrAdvBar
        }
    }
</script>