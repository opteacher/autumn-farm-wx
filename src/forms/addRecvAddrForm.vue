<template>
    <div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入地址">
                </div>
                <div class="weui-cell__ft">
                    <button class="weui-vcode-btn">添加</button>
                </div>
            </div>
        </div>
        <div class="weui-cells weui-cells_radio mt-0">
            <label class="weui-cell weui-check__label" for="x11">
                <div class="weui-cell__bd">
                    <p class="text-left">cell standard</p>
                </div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" id="x11" checked>
                    <span class="weui-icon-checked"></span>
                    <i class="weui-icon-cancel"></i>
                </div>
            </label>
            <label class="weui-cell weui-check__label" for="x12">
                <div class="weui-cell__bd">
                    <p class="text-left">cell standard</p>
                </div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" id="x12">
                    <span class="weui-icon-checked"></span>
                    <i class="weui-icon-cancel"></i>
                </div>
            </label>
        </div>
    </div>
</template>

<script>
    import cookies from "../../utils/cookies"

    export default {
    	async created() {
    		try {
			    let openid = cookies.get("openid");
			    await this.axios.get(`/mdl/v1/user/${openid}`)
            } catch (e) {
                weui.alert(`获取用户信息错误：${e.message || JSON.stringify(e)}`)
		    }
        }
    }
</script>