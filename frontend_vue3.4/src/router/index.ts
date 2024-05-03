import goodstorageutil from '@/utils/goodstorageutil'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const ctgy = () => import('@/piniaviews/ctgy/index.vue')
const books = () => import('@/piniaviews/books/index.vue')
const shopcartlist = () => import('@/piniaviews/shopcartlist/index.vue')
const search = () => import('@/piniaviews/search/index.vue')
const login = () => import('@/piniaviews/userinfo/login.vue')
const register = () => import('@/piniaviews/userinfo/register.vue')

const animal = () => import('@/myanimal/animal.vue')
search
const routes: RouteRecordRaw[] = [
  {
    name: 'testpinia',
    path: '/testpinia',
    component: import('@/piniaexam/index.vue')
  },
  {
    name: 'ctgy',
    path: '/ctgy',
    component: ctgy
  },
  {
    name: 'books',
    path: '/books',
    component: books
  },
  {
    name: 'shopcartlist',
    path: '/shopcartlist',
    component: shopcartlist
  },
  {
    name: 'search',
    path: '/search',
    component: search
  },
  {
    name: 'login',
    path: '/login',
    component: login,
    beforeEnter: (to, from, next) => {
      const token = goodstorageutil.get('token')
      if (token) {
        next({
          path: '/ctgy'
        })
      } else {
        next()
      }
    }
  },
  {
    name: 'register',
    path: '/register',
    component: register
  },
  {
    name: 'an',
    path: '/an',
    component: animal
  },
  {
    name: 'default',
    path: '/',
    // redirect: '/ctgy'
    component: ctgy
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 忽略路径
  const uncheckedPaths = ['/login', '/register']
  const token = goodstorageutil.get('token')
  if (token || uncheckedPaths.find((pth) => to.path.startsWith(pth))) {
    next()
  } else {
    next({
      path: '/login',
      query: {
        redirect: encodeURIComponent(to.fullPath),
        isRouteIntercep: 1
      }
    })
  }
})

export default router
