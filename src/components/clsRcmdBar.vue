<template>
    <div>
        <mt-navbar class="mb-1" v-model="selected">
            <mt-tab-item id="vegetable" :class="{'is-selected': selected === 'vegetable'}">蔬菜</mt-tab-item>
            <mt-tab-item id="fruit">水果</mt-tab-item>
            <mt-tab-item id="poultry">家禽</mt-tab-item>
            <mt-tab-item id="aquatic">水产</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="vegetable">
                <mt-cell v-for="n in 10" :title="'内容 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="fruit">
                <mt-cell v-for="n in 4" :title="'测试 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="poultry">
                <mt-cell v-for="n in 6" :title="'选项 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="aquatic">
                <mt-cell v-for="n in 6" :title="'选项 ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selected: "vegetable"
            }
        }
    }
</script>