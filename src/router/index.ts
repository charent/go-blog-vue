import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '@/views/dashboard/index.vue'

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
    component: () => import('../views/manager/login.vue')
  },

  {
    path: '/manager',
    // name: '管理',
    component: () => import('@/components/manager/index.vue'),
    // redirect:'dashboard',
    children: [
      {
        path: 'dashboard',
        name: '数据面板',
        component: Dashboard,
        meta: { title: '数据面板' }
      }
    ]
    
  },

  // {
  //   path: '/dashboard',
  //   name: '数据面板',
  //   component: () => import('@/views/manager/dashboard.vue')
  // }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
