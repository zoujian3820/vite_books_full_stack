import goodstorageutil from '@/utils/goodstorageutil'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const ctgy = () => import('@/piniaviews/ctgy/index.vue')
const books = () => import('@/piniaviews/books/index.vue')
const shopcartlist = () => import('@/piniaviews/shopcartlist/index.vue')
const search = () => import('@/piniaviews/search/index.vue')
const login = () => import('@/piniaviews/userinfo/login.vue')
const register = () => import('@/piniaviews/userinfo/register.vue')
const bookdetail = () => import('@/piniaviews/bookdetail/index.vue')
const goods = () => import('@/piniaviews/bookdetail/components/goods.vue')
const evaluate = () =>
  import('@/piniaviews/bookdetail/components/evaluate/index.vue')
const home = () => import('@/piniaviews/home/home.vue')
const orderinfo = () => import('@/piniaviews/orderinfo/index.vue')
const ordersort = () => import('@/piniaviews/orderinfo/ordersort/index.vue')

const animal = () => import('@/myanimal/animal.vue')
search
const routes: RouteRecordRaw[] = [
  {
    name: 'testpinia',
    path: '/testpinia',
    component: import('@/piniaexam/index.vue')
  },
  {
    name: 'home',
    path: '/home',
    component: home
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
    name: 'bookdetail',
    path: '/bookdetail',
    component: bookdetail,
    redirect: '/goods',
    children: [
      {
        name: 'goods',
        path: '/goods',
        component: goods
      },
      {
        name: 'evaluate',
        path: '/evaluate',
        component: evaluate
      }
    ]
  },
  {
    name: 'shopcartlist',
    path: '/shopcartlist',
    component: shopcartlist
  },
  {
    name: 'order',
    path: '/order',
    component: orderinfo
  },
  {
    name: 'ordersort',
    path: '/ordersort',
    component: ordersort
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
      const token = goodstorageutil.get('access_token')
      if (token) {
        next({
          path: '/home'
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
    // redirect: '/home'
    component: home
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 忽略路径
  const uncheckedPaths = ['/login', '/register']
  const token = goodstorageutil.get('access_token')
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
