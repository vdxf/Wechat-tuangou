import type { RouteRecordRaw } from 'vue-router'
import { LayoutView } from '@/layout'

export default [
  {
    path: '/goods',
    component: LayoutView,
    meta: { title: '商品管理', icon: 'Goods' },
    children: [
      {
        path: '',
        component: () => import('@/views/goods/GoodsListView.vue'),
        meta: { title: '商品列表' },
      },
      {
        path: 'group',
        component: () => import('@/views/goods/GroupListView.vue'),
        meta: { title: '分组列表' },
      },
      {
        path: 'tag',
        component: () => import('@/views/goods/TagListView.vue'),
        meta: { title: '标签列表' },
      },
      {
        path: 'brand',
        component: () => import('@/views/goods/BrandListView.vue'),
        meta: { title: '品牌列表' },
      },
      {
        path: 'open-group',
        component: () => import('@/views/goods/OpenGroupListView.vue'),
        meta: { title: '开团列表' },
      },
    ],
  },
] as RouteRecordRaw[]
