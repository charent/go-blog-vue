import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/Index.vue'
import Dashboard from '@/views/dashboard/Index.vue'
import store from "@/store/index"

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
 
    // 只有经过身份验证的用户才能进入管理页面
    meta: { requiresAuth: true },
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
    path: '/article/:articleId',
    name: '文章',
    component: () => import('@/views/article/ArticleDetail.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404NotFound.vue')
  },
 
  // 根据服务器返回信息决定的page not found
  {
    path: '/404NotFound',
    name: '404',
    component: () => import('@/views/404NotFound.vue')
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from ,next) => {
  const token = store.getters.token
  if(!to.matched.some(record => record.meta.requiresAuth)){
    //如果路由中没有meta的requireAuth，不验证，直接放行
      next()
  }else{
      if(token){
          next()
      }else{
        next({path:'/login'})
      }
  }
  return
})

export default router
