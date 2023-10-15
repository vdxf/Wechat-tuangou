import type { RouteRecordRaw } from 'vue-router'
import { LayoutView } from '@/layout'

export default [
  {
    path: '/data-center',
    component: LayoutView,
    meta: { title: '数据中心', icon: 'DataAnalysis' },
    redirect: '/data-center/share',
    children: [
      {
        path: '/data-center/share',
        component: () => import('@/views/datacenter/ShareListView.vue'),
        meta: { title: '商品分享' },
      },
      {
        path: '/data-center/view-volume',
        component: () => import('@/views/datacenter/ViewVolumeListView.vue'),
        meta: { title: '商品点击' },
      },
    ],
  },
] as RouteRecordRaw[]
