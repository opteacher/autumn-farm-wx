<template>
    <div class="mb-3">
        <div class="icon-box">
            <i class="weui-icon-warn weui-icon_msg-primary mb-2"></i>
            <div class="icon-box__ctn">
                <p class="icon-box__desc">点击确认，交易即完成</p>
                <p class="icon-box__desc">交易金额将打给商户</p>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入验证码">
                </div>
                <div class="weui-cell__ft">
                    <button class="weui-vcode-btn">获取验证码</button>
                </div>
            </div>
        </div>
        <div class="weui-cells__tips text-left">验证码将发送到尾号为{{phone.slice(-4)}}的手机上</div>
    </div>
</template>

<script>
    export default {
        props: ["phone"]
    }
</script>