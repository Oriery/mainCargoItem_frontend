import { createRouter, createWebHistory } from 'vue-router'
import TransportsView from '../views/TransportsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/transports',
      alias: '/',
      name: 'transports',
      component: TransportsView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // TODO: add route with :locale param
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404View.vue'),
    },
  ],
})

export default router
