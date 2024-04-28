import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const ctgy = () => import('@/piniaviews/ctgy/index.vue')
const books = () => import('@/piniaviews/books/index.vue')
const animal = () => import('@/myanimal/animal.vue')

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

export default router
