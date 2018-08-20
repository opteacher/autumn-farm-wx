<template>
    <div class="text-left">
        <form class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">品名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入产品名">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">图片</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入图片链接">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">简介</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入产品简介">
                </div>
            </div>
        </form>
    </div>
</template>

<style type="text/scss">
    .weui-dialog__bd {
        padding: 0;
    }
</style>