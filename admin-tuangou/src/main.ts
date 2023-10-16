import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores'

import './assets/js/flexible.js'
import './assets/sass/global.scss'
import '@/assets/iconfont/iconfont.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
app.use(router)
app.use(ElementPlus,{
  locale: zhCn
})
app.use(pinia)

app.mount('#app')
