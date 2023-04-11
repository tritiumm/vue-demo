import { createRouter, createWebHistory } from 'vue-router'
import HospitalEnd from '../views/HospitalEnd.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HospitalEnd
    },
    {
      path: '/insurance',
      name: 'insurance',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/InsuranceEnd.vue')
    }
  ]
})

export default router
