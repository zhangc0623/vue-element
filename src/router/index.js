import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
        component: HomeView
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
