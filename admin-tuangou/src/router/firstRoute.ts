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
      title: 'layout',
      hidden: false
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomeView/index.vue'),
        meta: {
          title: '主页',
          hidden: false,
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
      hidden: false,
      icon: 'Goods'
    },
    children: [
      {
        path: '/productList',
        name: 'productList',
        component: () => import('@/views/GoodsView/ProductList/index.vue'),
        meta: {
          title: '商品列表',
          hidden: false
        }
      },
      {
        path: '/groupList',
        name: 'groupList',
        component: () => import('@/views/GoodsView/GroupList/index.vue'),
        meta: {
          title: '分组列表',
          hidden: false
        }
      },
      {
        path: '/tagList',
        name: 'tagList',
        component: () => import('@/views/GoodsView/TagList/index.vue'),
        meta: {
          title: '标签列表',
          hidden: false
        }
      },
      {
        path: '/brandList',
        name: 'brandList',
        component: () => import('@/views/GoodsView/BrandList/index.vue'),
        meta: {
          title: '品牌列表',
          hidden: false
        }
      },
      {
        path: '/creatList',
        name: 'creatList',
        component: () => import('@/views/GoodsView/CreatList/index.vue'),
        meta: {
          title: '开团列表',
          hidden: false
        }
      },
    ]
  },
  {
    path: '/banner',
    name: 'banner',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/banner',
        name: 'banner',
        component: () => import('@/views/BannerView/index.vue'),
        meta: {
          title: 'Banner管理',
          hidden: false,
          icon: 'Monitor'
        }
      }
    ]
  },
  {
    path: '/data',
    name: 'data',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '数据中心',
      hidden: false,
      icon: 'DataAnalysis'
    },
    children: [
      {
        path: '/goodsShare',
        name: 'goodsShare',
        component: () => import('@/views/DataView/GoodsShare/index.vue'),
        meta: {
          title: '商品分享',
          hidden: false
        }
      },
      {
        path: '/goodsClick',
        name: 'goodsClick',
        component: () => import('@/views/DataView/GoodsClick/index.vue'),
        meta: {
          title: '商品点击',
          hidden: false
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