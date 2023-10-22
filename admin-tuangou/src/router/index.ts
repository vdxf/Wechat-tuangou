import { createRouter, createWebHistory } from 'vue-router'
import { firstRoute } from './firstRoute'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false })

import pinia from '@/stores/index'
import useUserStore from '@/stores/modules/user'
const userStore = useUserStore(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: firstRoute,
  //滚动条
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

router.beforeEach((to: any, from: any, next: any) => {
  Nprogress.start()
  const { AccessToken } = userStore
  if (AccessToken) {
    if (to.path === '/login') {
      next ({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach((to, from) => {
  Nprogress.done()
  window.document.title = `${to.meta.title}` || '新友团'
})

export default router
