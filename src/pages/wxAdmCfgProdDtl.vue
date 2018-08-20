<template>
    <wx-admin-lyt tabIndex="prodLst">
        <div class="weui-panel weui-panel_access">
            <a href="/#/autumnFarmWX/admin/config/prods">
                <div class="weui-panel__hd">
                    返回产品列表
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