<template>
    <div class="mb-3">
        <div class="weui-cells">
            <div class="weui-cell weui-cell_select">
                <div class="weui-cell__bd">
                    <select class="weui-select" name="reason" v-model="cancelReason">
                        <option value="" style="display: none;">请选择撤单理由</option>
                        <option value="买错了">买错了</option>
                        <option value="多买了">多买了</option>
                        <option value="不想买了">不想买了</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
            </div>
            <div v-show="cancelReason === '其他'" class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" placeholder="请输入理由" rows="3" v-model="otherReason"></textarea>
                    <div class="weui-textarea-counter"><span>{{otherReason.length}}</span>/50</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
    			cancelReason: "",
                otherReason: ""
            }
        }
    }
</script>