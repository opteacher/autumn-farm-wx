<template>
    <div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:" @click="$router.go(-1)">
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
                            <ul class="weui-uploader__files mb-0" id="uploaderFiles">
                                <li v-for="(img, idx) in images" class="weui-uploader__file"
                                    :class="{'weui-uploader__file_status': img.pcs <= 100}"
                                    :style="`background-image:url(${img.src}); background-size: ${img.pcs <= 100 ? '50': '100'}%`"
                                    @click="hdlShowGallery(idx)">
                                    <div v-if="img.pcs < 0" class="weui-uploader__file-content">
                                        <i class="weui-icon-warn"></i>
                                    </div>
                                    <div v-if="img.pcs <= 100 && img.pcs >= 0" class="weui-uploader__file-content">{{img.pcs}}%</div>
                                </li>
                            </ul>
                            <div v-show="images.length < maxNum && !uplLock" class="weui-uploader__input-box">
                                <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" @change="uploadImg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-gallery" v-show="selImgIdx !== -1" style="display: block;">
            <span class="weui-gallery__img" :style="`background-image: url(${selImgIdx !== -1 ? images[selImgIdx].src : '/img/加载.png'}); background-size: 100%`" @click="hdlHideGallery"></span>
            <div class="weui-gallery__opr">
                <a href="javascript:" class="weui-gallery__del" @click="hdlDelImg">
                    <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                </a>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="javascript:" class="weui-btn weui-btn_primary" @click="doConfirm">确定</a>
        </div>
    </div>
</template>

<script>
    import _ from "lodash"
    import cookies from "../../utils/cookies"

    export default {
        data() {
            return {
                tempData: {},
                maxNum: 5,
                images: [],
                uplLock: false,
                selImgIdx: -1
            }
        },
        async created() {
	        this.maxNum = this.$route.query.num ? parseInt(this.$route.query.num) : 5;

        	let result = {};
        	try {
        		result = (
        			await this.axios.get(`/autumnFarmWX/mdl/v1/temp/${this.$route.params.tid}`)
                ).data.data[0]
            } catch (e) {
                weui.alert(`获取临时数据失败：${e.message || JSON.stringify(e)}`);
                return
	        }
	        this.tempData = JSON.parse(result.json);
	        this.tempData.tempId = this.$route.params.tid;

            if(this.maxNum === 1) {
            	if(!this.tempData.icon) {
            		return
                }
	            this.images = [{
	            	src: this.tempData.icon, pcs: 101
	            }]
            } else {
	            if(!this.tempData.images) {
		            return
	            }
	            this.images = this.tempData.images;
	            if(this.images.length !== 0) {
		            this.images = this.images.map(img => {
			            return {src: img, pcs: 101}
		            });
	            }
            }
        },
        methods: {
            async uploadImg(uplEve) {
                let file = uplEve.target.files[0];
                let token = "";
                try {
                    token = (await this.axios.get("/autumnFarmWX/api/v1/cdn/upload/token")).data;
                } catch (e) {
                    weui.alert(`获取七牛云CDN上传TOKEN失败：${e.message || JSON.stringify(e)}`);
                    return
                }

                let observable = qiniu.upload(file, file.name, token, {}, {
                    useCdnDomain: true,
                    region: qiniu.region.z0
                });
                this.images.push({src: "/img/加载.png", pcs: 0});
                let lastIdx = this.images.length - 1;
                this.uplLock = true;
                let self = this;
                observable.subscribe({
                    next(res) {
                        self.images[lastIdx].pcs = parseInt(res.total.percent)
                    },
                    error(err) {
                        self.images[lastIdx].pcs = -1;
                        self.uplLock = false
                    },
                    async complete(res) {
                        try {
                            self.images[lastIdx].pcs = 101;
                            self.images[lastIdx].src = (
                                await self.axios.post("/autumnFarmWX/api/v1/cdn/manage/image", res)
                            ).data;
                        } catch (res) {
                            weui.alert(`保存图片信息失败：${res.response.data || JSON.stringify(res)}`)
                        }
                        self.uplLock = false
                    }
                })
            },
            hdlShowGallery(idx) {
                this.selImgIdx = idx
            },
            hdlHideGallery() {
                this.selImgIdx = -1;
            },
            hdlDelImg() {
                _.pullAt(this.images, this.selImgIdx);
                this.selImgIdx = -1;
            },
            async doConfirm() {
            	try {
		            if(this.maxNum === 1) {
                        this.tempData.icon = this.images[0].src
		            } else {
			            this.tempData.images = this.images.map(img => img.src)
		            }
		            await this.axios.put(`/autumnFarmWX/mdl/v1/temp/${this.tempData.tempId}`, {
		            	json: JSON.stringify(this.tempData)
                    })
                } catch (e) {
                    weui.alert(`获取临时数据失败：${e.message || JSON.stringify(e)}`)
	            }
                this.$router.push(`${this.$route.query.backUrl}?tempId=${this.tempData.tempId}`)
            }
        }
    }
</script>