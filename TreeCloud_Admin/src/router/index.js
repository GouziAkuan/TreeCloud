import { createRouter, createWebHashHistory } from 'vue-router'
import { adminTokenStore } from '@/stores/token'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    // 登录
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    // 树类中心
    {
      path: '/adminTreeType',
      component: () => import('@/views/index/IndexPage.vue'),
      redirect: '/adminTreeType/treeTypeCenter',
      children: [
        {
          path: 'treeTypeCenter',
          component: () => import('@/views/treeType/TreeTypeCenter.vue')
        },
        {
          path: 'addTreeType',
          component: () => import('@/views/treeType/AddTreeType.vue')
        },
        {
          path: 'updateTreeType',
          component: () => import('@/views/treeType/UpdateTreeType.vue')
        }
      ]
    },
    // 树中心
    {
      path: '/adminTree',
      component: () => import('@/views/index/IndexPage.vue'),
      redirect: '/adminTree/treeCenter',
      children: [
        {
          path: 'treeCenter',
          component: () => import('@/views/tree/TreeCenter.vue')
        },
        {
          path: 'addTree',
          component: () => import('@/views/tree/AddTree.vue')
        },
        {
          path: 'updateTree',
          component: () => import('@/views/tree/UpdateTree.vue')
        }
      ]
    },
    // 领养中心
    {
      path: '/adminAdopt',
      component: () => import('@/views/index/IndexPage.vue'),
      redirect: '/adminAdopt/adoptCenter',
      children: [
        {
          path: 'adoptCenter',
          component: () => import('@/views/adopt/AdoptCenter.vue')
        },
        {
          path: 'updateAdopt',
          component: () => import('@/views/adopt/UpdateAdopt.vue')
        }
      ]
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin')) {
    const tokenStore = adminTokenStore()
    if (!tokenStore.RefreshToken) {
      // 如果没有token，重定向到登录页
      next('/login')
    } else {
      // 如果有token，继续导航
      next()
    }
  } else {
    // 不是/admin开头的路径直接放行
    next()
  }
})

export default router
