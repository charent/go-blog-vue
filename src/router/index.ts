import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/Index.vue'
import Dashboard from '@/views/dashboard/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/manager/Login.vue')
  },

  {
    path: '/manager',
    // name: '管理',
    component: () => import('@/views/manager/Index.vue'),
    // redirect:'dashboard',
    children: [
      {
        path: 'dashboard',
        name: '数据面板',
        component: Dashboard,
        meta: { title: '数据面板' }
      },
      {
        path: 'publish',
        name: '发布文章',
        component: () => import('@/views/article/Edit.vue'),
        meta: { title: '发布文章' }
      },
      {
        path: 'edit',
        name: '编辑文章',
        component: () => import('@/views/article/Edit.vue'),
        meta: { title: '编辑文章' }
      },

    ]
    
  },

  {
    path: '/article',
    name: '文章',
    component: () => import('@/views/article/Index.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
