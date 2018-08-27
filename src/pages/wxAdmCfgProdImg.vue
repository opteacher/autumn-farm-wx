<template>
    <div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" :href="`/#/autumnFarmWX/admin/config/prod/${$route.params.pid}/detail`">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd ml-3">
                    <p class="gray-text mb-0">返回产品详情</p>
                </div>
            </a>
        </div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <div class="weui-uploader">
                        <div class="weui-uploader__hd">
                            <p class="weui-uploader__title">图片上传</p>
                            <div class="weui-uploader__info">{{images.length}}/{{maxNum}}</div>
                        </div>
                        <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles">
                                <li v-for="img in images" class="weui-uploader__file"
                                    :class="{'weui-uploader__file_status': img.pcs < 100}"
                                    :style="`background-image:url(${img.img})`">
                                    <div v-if="img.pcs < 0" class="weui-uploader__file-content">
                                        <i class="weui-icon-warn"></i>
                                    </div>
                                    <div v-if="img.pcs < 100" class="weui-uploader__file-content">{{img.pcs}}%</div>
                                </li>
                            </ul>
                            <div v-show="images.length < maxNum" class="weui-uploader__input-box">
                                <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" @change="uploadImg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:" class="weui-btn weui-btn_primary">确定</a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                maxNum: 5,
                images: []
            }
        },
        async created() {
            try {
                let result = (await this.axios.get(`/mdl/v1/prod/${this.$route.params.pid}/images`)).data.data;
                if(result.length !== 1) {
                    throw new Error("没有找到指定产品")
                }
                let prod = result[0];
                for(let img of prod.images) {
                    this.images.push({img, pcs: 100})
                }
            } catch (e) {
                weui.alert(`获取产品图片失败：${e.message || JSON.stringify(e)}`)
            }
        },
        methods: {
            uploadImg(uplEve) {
                let name = `产品图片_${this.$route.params.pid}_${this.images.length}`;
                let file = uplEve.target.files[0];

                let observable = qiniu.upload(file, name, token, {}, {
                    useCdnDomain: true,
                    region: qiniu.region.z0
                })
            }
        }
    }
</script>