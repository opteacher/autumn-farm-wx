<template>
    <div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入地址" v-model="address">
                </div>
                <div class="weui-cell__ft">
                    <button class="weui-vcode-btn" @click="addAddress">添加</button>
                </div>
            </div>
        </div>
        <div class="weui-cells weui-cells_radio mt-0">
            <label v-for="(addr, index) in addresses" class="weui-cell weui-check__label" :for="addr" @click="selAddr = addr">
                <div class="weui-cell__bd">
                    <p class="text-left">{{addr}}</p>
                </div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" name="addrRadio" :id="addr" :checked="selAddr === addr">
                    <span class="weui-icon-checked"></span>
                    <i class="weui-icon-cancel" :alt="index" @click="delAddress"></i>
                </div>
            </label>
        </div>
        <input id="hidSelAddress" type="hidden" v-model="selAddr"/>
    </div>
</template>

<script>
    import $ from "jquery"

    export default {
        props: {
            addresses: Array,
            selAddress: String,
            userId: String
        },
        data() {
            return {
                address: "",
                selAddr: this.selAddress
            }
        },
        methods: {
            async addAddress() {
                this.addresses.push(this.address);
                this.address = "";

                try {
                    let users = (await this.axios.put(`/mdl/v1/user/${this.userId}`, {
                        addresses: [this.addresses]
                    })).data.data;
                    if(users.length !== 1) {
                        throw new Error("保存用户地址失败：返回结为空")
                    }
                    console.log(JSON.stringify(users[0]))
                } catch (e) {
                    weui.alert(`添加用户地址失败：${e.message || JSON.stringify(e)}`)
                }

            },
            delAddress(me) {
                let delIdx = parseInt($(me.target).attr("alt"));
                this.addresses = this.addresses.slice(0, delIdx).concat(
                    this.addresses.slice(delIdx + 1)
                )
            }
        }
    }
</script>