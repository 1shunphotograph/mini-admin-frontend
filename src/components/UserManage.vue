<template>
    <el-table :data="UserTable" style="width: 100%" border stripe>
        <el-table-column label="工号" prop="id" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="年龄" prop="age" />
        <el-table-column label="性别" prop="gender" />
        <el-table-column label="电话" prop="tel" />
        <el-table-column label="地址" prop="address" />
        <el-table-column align="center" label="编辑">
            <!-- <template #header>
                <el-input v-model="search" placeholder="Type to search" />
            </template> -->
            <template #default="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
                <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
onMounted(() => {
    axios.get('/api/user/all').then(
        function (response) {
            UserTable.value = response.data;
            console.log(UserTable.value)
        }
    )
})

// const search = ref('')
const handleEdit = (index, row) => {
    console.log(row.id, row.name)
}
const handleDelete = (index, row) => {
    console.log(index, row)
}

const UserTable = ref([
    {
        id: 1001,
        name: 'Tom',
        age: 18,
        tel: 13012259556,
        address: '河南省洛阳市'
    }
])
</script>
