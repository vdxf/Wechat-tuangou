import { createRouter, createWebHistory } from 'vue-router'
import { firstRoute } from './firstRoute'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false })

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
  next()
})
router.afterEach((to, from) => {
  Nprogress.done()
})

export default router
