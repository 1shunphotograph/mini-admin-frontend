<template>
    <div>
        <h2>这里是系统首页</h2>
        <el-button type="primary" @click="testAxios">请求</el-button>
        <h3 v-for="item in items" :key="item">{{ item }}</h3>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
const items = ref([]);
function testAxios() {
    axios.get('/api/index').then(
        function (response) {
            items.value = response.data;
        }
    )
}
</script>

<style lang="scss" scoped></style>