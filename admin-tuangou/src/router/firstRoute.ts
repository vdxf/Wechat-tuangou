export const firstRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/NotFount/index.vue')
  }
]