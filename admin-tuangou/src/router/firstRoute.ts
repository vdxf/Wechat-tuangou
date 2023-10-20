export const firstRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/',
    redirect: '/home',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'layout'
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/HomeView/index.vue'),
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
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods'
    },
    children: [
      {
        path: '/goods/productList',
        component: () => import('@/views/GoodsView/ProductList/index.vue'),
        meta: {
          title: '商品列表',
        }
      },
      {
        path: '/goods/group',
        component: () => import('@/views/GoodsView/GroupList/index.vue'),
        meta: {
          title: '分组列表',
        }
      },
      {
        path: '/goods/tag',
        component: () => import('@/views/GoodsView/TagList/index.vue'),
        meta: {
          title: '标签列表',
        }
      },
      {
        path: '/goods/brand',
        component: () => import('@/views/GoodsView/BrandList/index.vue'),
        meta: {
          title: '品牌列表',
        }
      },
      {
        path: '/goods/open-group',
        component: () => import('@/views/GoodsView/CreatList/index.vue'),
        meta: {
          title: '开团列表',
        }
      },
    ]
  },
  {
    path: '/banner',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'Banner管理',
    },
    children: [
      {
        path: '/banner',
        component: () => import('@/views/BannerView/index.vue'),
        meta: {
          title: 'Banner管理',
          icon: 'Monitor'
        },
      }
    ]
  },
  {
    path: '/data',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '数据中心',
      icon: 'DataAnalysis'
    },
    children: [
      {
        path: '/data/share',
        component: () => import('@/views/DataView/GoodsShare/index.vue'),
        meta: {
          title: '商品分享',
        }
      },
      {
        path: '/data/click',
        component: () => import('@/views/DataView/GoodsClick/index.vue'),
        meta: {
          title: '商品点击',
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/NotFount/index.vue'),
    meta: {
      title: '404',
      hidden: true
    }
  }
]