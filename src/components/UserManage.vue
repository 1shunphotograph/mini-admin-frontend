<template>
    <div class="usermanage">

        <div class="form">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="工号">
                    <el-input v-model="formInline.id" placeholder="工号" />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.name" placeholder="姓名" />
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formInline.age" placeholder="年龄" />
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formInline.tel" placeholder="电话" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUser">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="add">
            <el-button type="primary" @click="addUserFormOpen = true">新增员工</el-button>
        </div>
        <el-dialog v-model="addUserFormOpen" title="新增员工" width="300px" center>
            <el-form :model="formAddUser">
                <el-form-item label="工号" :label-width="formLabelWidth">
                    <el-input v-model="formAddUser.id" autocomplete="off" />
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="formAddUser.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="formAddUser.age" autocomplete="off" />
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="formAddUser.gender" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="formAddUser.tel" autocomplete="off" />
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="formAddUser.address" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addUserFormOpen = false">取消</el-button>
                    <el-button type="primary" @click="addUser">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div class="table">
            <el-table :data="UserTable" style="width: 100%" border stripe>
                <el-table-column label="工号" prop="id" />
                <el-table-column label="姓名" prop="name" />
                <el-table-column label="年龄" prop="age" />
                <el-table-column label="性别" prop="gender" />
                <el-table-column label="电话" prop="tel" />
                <el-table-column label="地址" prop="address" />
                <el-table-column align="center" label="编辑">
                    <template #default="scope">
                        <el-button @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { reactive } from 'vue'
const addUserFormOpen = ref(false)

const formInline = reactive({
    id: '',
    name: '',
    age: '',
    tel: ''
})
const formLabelWidth = '50px'
const formAddUser = reactive({
    id: '',
    name: '',
    age: '',
    gender: '',
    tel: '',
    address: ''
})
const formUpdateUser = reactive({
    id: '',
    name: '',
    age: '',
    gender: '',
    tel: '',
    address: ''
})

onMounted(() => {
    axios.get('/api/user/all').then(
        function (response) {
            UserTable.value = response.data;
        }
    )
})
const getAll = () => {
    axios.get('/api/user/all').then(
        function (response) {
            UserTable.value = response.data;
        }
    )
}
const getUser = () => {
    axios.get('/api/user', {
        params: {
            id: formInline.id
        }
    }).then(
        function (response) {
            console.log(response.data.status)
        }
    )
}
const addUser = () => {
    axios.post('/api/user/add', {
        id: formAddUser.id,
        name: formAddUser.name,
        age: formAddUser.age,
        gender: formAddUser.gender,
        tel: formAddUser.tel,
        address: formAddUser.address
    }).then(
        function (response) {
            getAll()
        }
    )
    // addUserFormOpen.value = false
}
const updateUser = () => {
    axios.put('/api/user/update', {
        id: formInline.id,
        name: formInline.name,
        age: formInline.age,
        tel: formInline.tel
    }).then(
        function (response) {
            getAll()
        }
    )
}
const deleteUser = () => {
    axios.delete('/api/user', {
        id: formInline.id,
    }).then(
        function (response) {
            getAll()
        }
    )
}
const handleEdit = (index, row) => {
    console.log(row.id, row.name, index)
}
const handleDelete = (index, row) => {
    console.log(row.id, row.name, index)
}
const UserTable = ref([
    // {
    //     id: 1001,
    //     name: 'Tom',
    //     age: 18,
    //     tel: 13012259556,
    //     address: '河南省洛阳市'
    // }
])
</script>
<style>
.form {
    width: 100%;
    margin: 0 auto;
}

.add {
    margin: 5px auto 25px;
}
</style>
