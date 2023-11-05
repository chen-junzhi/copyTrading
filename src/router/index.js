import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/trade'
    },
    {
      path: '/trade',
      name: 'CopyTrade',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/copyTrade/index.vue')
    },
    {
      path: '/trade/detail',
      name: 'CopyTradeDetail',
      component: () => import('@/views/copyTrade/detail.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/components/404.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

export default router
