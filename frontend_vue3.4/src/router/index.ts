import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const ctgy = () => import('@/views/ctgy/index.vue')

const routes: RouteRecordRaw[] = [
  {
    name: 'ctgy',
    path: '/ctgy',
    component: ctgy
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

export default router
