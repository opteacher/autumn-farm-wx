<template>
    <wx-admin-lyt tabIndex="prodLst">
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="/#/autumnFarmWX/admin/config/prods">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回产品列表</p>
                </div>
            </a>
        </div>
    </wx-admin-lyt>
</template>

<script>
    import holderjs from "holderjs"
    import wxAdminLyt from "../layouts/wxAdminLyt"

    export default {
        components: {
            "wx-admin-lyt": wxAdminLyt
        },
        mounted() {
            holderjs.run()
        }
    }
</script>

<style type="text/scss">
</style>