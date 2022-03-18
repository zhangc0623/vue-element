import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '../views/Table.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/components/Layout'),
    children: [
      {
        path: '/',
        name: 'home',
        component: Table
      },
      {
        path: '/Triangle',
        name: 'Triangle',
        component: () => import('../views/Triangle.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
