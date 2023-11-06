export const firstRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView/LoginView.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/',
    redirect: '/home',
    name: 'layout',
    component: () => import('@/layout/LayoutView.vue'),
    meta: {},
    children: [
      {
        path: '/home',
        component: () => import('@/views/HomeView/HomeView.vue'),
        meta: {
          title: '主页',
          icon: 'Odometer'
        }
      }
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    redirect: '/goods/productList',
    component: () => import('@/layout/LayoutView.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods'
    },
    children: [
      {
        path: '/goods/productList',
        component: () => import('@/views/Goods/ProductListView.vue'),
        meta: {
          title: '商品列表',
        }
      },
      {
        path: '/goods/group',
        component: () => import('@/views//Goods/GroupListView.vue'),
        meta: {
          title: '分组列表',
        }
      },
      {
        path: '/goods/tag',
        component: () => import('@/views/Goods/TagListView.vue'),
        meta: {
          title: '标签列表',
        }
      },
      {
        path: '/goods/brand',
        component: () => import('@/views/Goods/BrandListView.vue'),
        meta: {
          title: '品牌列表',
        }
      },
      {
        path: '/goods/open-group',
        component: () => import('@/views/Goods/OpenGroupView.vue'),
        meta: {
          title: '开团列表',
        }
      },
    ]
  },
  {
    path: '/banner',
    component: () => import('@/layout/LayoutView.vue'),
    meta: {},
    children: [
      {
        path: '/banner',
        component: () => import('@/views/BannerView/BannerView.vue'),
        meta: {
          title: 'Banner管理',
          icon: 'Monitor'
        },
      }
    ]
  },
  {
    path: '/data',
    redirect: '/data/share',
    component: () => import('@/layout/LayoutView.vue'),
    meta: {
      title: '数据中心',
      icon: 'DataAnalysis'
    },
    children: [
      {
        path: '/data/share',
        component: () => import('@/views/DataView/GoodsShareView.vue'),
        meta: {
          title: '商品分享',
        }
      },
      {
        path: '/data/click',
        component: () => import('@/views/DataView/GoodsClickView.vue'),
        meta: {
          title: '商品点击',
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/NotFount/NotFountView.vue'),
    meta: {
      title: '404',
      hidden: true
    }
  }
]