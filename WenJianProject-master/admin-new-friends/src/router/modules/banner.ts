import type { RouteRecordRaw } from 'vue-router'
import { LayoutView } from '@/layout'

export default [
  {
    path: '/banner',
    component: LayoutView,
    meta: { title: 'Banner管理', icon: 'Monitor' },
    children: [
      {
        path: '',
        component: () => import('@/views/banner/BannerListView.vue'),
        meta: { title: 'Banner管理' },
      },
    ],
  },
] as RouteRecordRaw[]
