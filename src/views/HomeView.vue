<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
      <span class="logo" @click="isCollapse = !isCollapse">LOGO</span>
      <span @click="router.push('/login')">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </span>
    </el-header>
    <!-- 主体 -->
    <el-container class="content">
      <!-- 侧边菜单 -->
      <el-aside class="aside">
        <el-menu router class="el-menu-vertical-demo" :collapse="isCollapse">
          <template v-for="link in links">
            <template v-if="link.subs">
              <el-sub-menu :index="link.index" :key="link.id">
                <template #title><span>{{ link.title }}</span></template>
                <el-menu-item v-for="sub in link.subs" :index="sub.index" :key="sub.id">
                  <span>{{ sub.title }}</span>
                </el-menu-item>
              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item :index="link.index" :key="link.id">
                <template #title>
                  <span>{{ link.title }}</span></template>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <!-- 内容区 -->
      <el-main class="main">
        <div class="base">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { Setting, Cellphone } from '@element-plus/icons-vue'
import router from '../router';

const links = ref([
  {
    id: 'index',
    index: 'index',
    title: "首页"
  }, {
    id: 'manage',
    index: 'manage',
    title: "管理平台",
    subs: [
      {
        id: 'usermanage',
        index: 'usermanage',
        title: "员工管理"
      }, {
        id: 'depmanage',
        index: 'depmanage',
        title: "部门管理"
      }, {
        id: 'permanage',
        index: 'permanage',
        title: "权限管理"
      }
    ]
  }, {
    id: 'setting',
    index: 'setting',
    title: "系统设置"
  },
])
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;

  .header {
    width: 100%;
    height: 70px;
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    box-shadow: 0px 3px 10px #d8d8d8;
    background: linear-gradient(45deg, #2196f3 30%, #21cbf3 90%);

    .logo {
      font-size: 1.5rem;
    }
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: row;

    .aside {
      width: fit-content;
      height: inherit;

      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 300px;
        min-height: 100%;
      }

      span {
        margin-left: 1rem;
        font-size: 0.9rem;
      }
    }

    .main {
      // width: 100%;
      // flex: 1;
      height: inherit;
      background-color: rgb(247, 247, 247);

      .base {
        width: 100%;
        min-height: 100%;
        margin: 0 auto;
        padding: 2rem;
        border-radius: 10px;
        background-color: white;
      }
    }
  }
}
</style>
