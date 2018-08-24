<template>
    <form class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input name="price" class="weui-input" type="number" pattern="[0-9\.]*" placeholder="价格" autofocus>
            </div>
            <div class="weui-cell__ft">￥</div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input name="unit" class="weui-input" type="text" placeholder="请输入单位">
            </div>
        </div>
    </form>
</template>