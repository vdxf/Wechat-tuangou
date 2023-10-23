import type { Router } from 'vue-router'
import { NProgress } from '@/utils'
import { metadata } from '@/metadata'
import { useUserinfoStore } from '@/stores'

export function setupGuards(router: Router) {
  // 鉴权
  router.beforeEach((to) => {
    const { userinfo } = useUserinfoStore()
    const isLogin = !!userinfo?.AccessToken

    // 是否需要授权，1 需要授权、-1 不需要登录、0 登录、不登录都可以
    const requiresAuth = to.meta.requires ?? 1
    // 已登录进入到不需要登录的页面，直接跳转回首页
    if (isLogin && requiresAuth === -1) {
      return { path: '/', replace: true }
    }
    // 未登录进入到需要登录的页面，直接跳转取登录
    if (!isLogin && requiresAuth === 1) {
      return { path: '/login', replace: true }
    }

    NProgress.start()
  })

  // 设置标题
  router.afterEach((to) => {
    NProgress.done()
    window.document.title = to.meta.title ? `${to.meta.title} - ${metadata.title}` : metadata.title
  })
}
