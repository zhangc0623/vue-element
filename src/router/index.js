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
        path: '/DialogExample',
        name: 'DialogExample',
        component: () => import('../views/DialogExample.vue')
      },
      {
        path: '/LoadMoreExample',
        name: 'LoadMoreExample',
        component: () => import('../views/LoadMoreExample.vue')
      },
      {
        path: '/SvgExample',
        name: 'SvgExample',
        component: () => import('../views/SvgExample.vue')
      },
      {
        path: '/TimeLineExample',
        name: 'TimeLineExample',
        component: () => import('../views/TimeLineExample.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
