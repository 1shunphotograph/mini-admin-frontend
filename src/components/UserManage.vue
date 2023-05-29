<template>
    <div class="usermanage">

        <div class="form">
            <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                <el-form-item label="工号">
                    <el-input v-model="formSearch.id" placeholder="工号" />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formSearch.name" placeholder="姓名" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUser">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="getAll">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="add">
            <el-button type="primary" @click="openAndReset">新增员工</el-button>
        </div>
        <el-dialog v-model="addUserOpen" title="新增员工" width="300px" center>
            <el-form :model="formAdd">
                <el-form-item label="工号" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.id" autocomplete="off" />
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.age" autocomplete="off" />
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.gender" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="formAdd.tel" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click=" addUserOpen = false">取消</el-button>
                    <el-button type="primary" @click="addUser">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="updateUserOpen" title="编辑信息" width="300px" center>
            <el-form :model="formUpdate">
                <el-form-item label="工号" :label-width="formLabelWidth">
                    <el-input v-model="formUpdate.id" autocomplete="off" disabled />
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="formUpdate.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="formUpdate.age" autocomplete="off" />
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="formUpdate.gender" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="formUpdate.tel" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click=" updateUserOpen = false">取消</el-button>
                    <el-button type="primary" @click="updateUser">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div class="table">
            <el-table :data="UserTable" style="width: 100%" stripe border>
                <el-table-column label="工号" prop="id" width="150px" />
                <el-table-column label="姓名" prop="name" />
                <el-table-column label="年龄" prop="age" width="150px" />
                <el-table-column label="性别" prop="gender" width="150px" />
                <el-table-column label="电话" prop="tel" min-width="150px" />
                <el-table-column align="center" label="编辑" min-width="200px">
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
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import qs from 'qs';

const addUserOpen = ref(false)
const updateUserOpen = ref(false)

const formSearch = reactive({
    id: '',
    name: '',
    age: '',
    tel: ''
})
const formLabelWidth = '50px'
let formAdd = reactive({
    id: '',
    name: '',
    age: '',
    gender: '',
    tel: ''
})
let formUpdate = reactive({
    id: '',
    name: '',
    age: '',
    gender: '',
    tel: ''
})

onMounted(() => {
    axios.get('/api/user/all').then(
        function (response) {
            UserTable.value = response.data;
        }
    )
})
const openAndReset = () => {
    addUserOpen.value = true
    formAdd = reactive({
        id: '',
        name: '',
        age: '',
        gender: '',
        tel: ''
    })
}
const getAll = () => {
    axios.get('/api/user/all').then(
        function (response) {
            UserTable.value = response.data;
        }
    )
}
const getUser = () => {
    axios.get('/api/user/id', {
        params: {
            id: formSearch.id
        }
    }).then(
        function (response) {
            UserTable.value = response.data;
        }
    )
}
const addUser = () => {
    addUserOpen.value = false

    const data = reactive({
        id: formAdd.id,
        name: formAdd.name,
        age: formAdd.age,
        gender: formAdd.gender,
        tel: formAdd.tel
    })
    axios.post('/api/user/add', qs.stringify(data)).then(
        function (response) {
            getAll()
        }
    )

}
const updateUser = () => {
    updateUserOpen.value = false
    axios.put('/api/user/update', {
        id: formUpdate.id,
        name: formUpdate.name,
        age: formUpdate.age,
        gender: formUpdate.gender,
        tel: formUpdate.tel
    }).then(
        function (response) {
            getAll()
        }
    )
}
const deleteUser = () => {

}
const handleEdit = (index, row) => {
    updateUserOpen.value = true
    formUpdate.id = row.id;
    formUpdate.name = row.name;
    formUpdate.age = row.age;
    formUpdate.gender = row.gender;
    formUpdate.tel = row.tel;
}
const handleDelete = (index, row) => {
    axios.delete('/api/user/id', {
        params: {
            id: row.id
        }
    }).then(
        function (response) {
            getAll()
        }
    )
}
const UserTable = ref([
    {
        id: 1001,
        name: 'Tom',
        age: 18,
        gender: "男",
        tel: 13012259556
    }
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
