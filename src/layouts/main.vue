<template>
    <div>
        <slot/>
        <div class="row fixed-bottom p-2" id="btmNavBar">
            <div class="col">
                <button type="button" class="btn btn-success w-100">主页</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success w-100">分类</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success w-100">账户</button>
            </div>
        </div>
    </div>
</template>

<style type="text/scss">
    #btmNavBar {
        background-color: #eeeeee;
    }
</style>