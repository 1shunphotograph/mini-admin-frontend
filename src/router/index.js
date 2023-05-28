import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'index',
      component: () => import('../views/HomeView.vue'),
      children: [
        // {
        //   path: '',
        //   redired: '/index'
        // },
        {
          path: 'index',
          name: 'index',
          component: () => import('../components/Index.vue')
        },
        {
          path: '/usermanage',
          name: 'usermanage',
          component: () => import('../components/UserManage.vue')
        },
        {
          path: '/depmanage',
          name: 'depmanage',
          component: () => import('../components/DepManage.vue')
        },
        {
          path: '/permanage',
          name: 'permanage',
          component: () => import('../components/PerManage.vue')
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('../components/SysSetting.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    },
    {
      path: '/403',
      name: '403',
      component: () => import('../views/404.vue')
    }
    // {
    //   path: '*',
    //   redirect: '/404'
    // }
  ]
})

export default router
