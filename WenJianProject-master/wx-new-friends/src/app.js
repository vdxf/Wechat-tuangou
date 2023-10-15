import './app.json'
import './sitemap.json'
import './project.config.json'
import './app.scss'
import './wxs/filter.wxs'

import 'src/assets/images/tabbar-home-1.png'
import 'src/assets/images/tabbar-home-2.png'
import 'src/assets/images/tabbar-search-1.png'
import 'src/assets/images/tabbar-search-2.png'

import WowApp from 'wow-wx/lib/app'

const wowApp = new WowApp()

const formatKey = (key, cut) => {
  key = key.substring(key.lastIndexOf('/') + 1, key.indexOf(cut))
  return key.substring(0, 1).toUpperCase() + key.substring(1)
}

WowApp.requireDir(
  require.context('./mixins', true, /\.mixin\.js$/),
  (key, value) => {
    wowApp.use('mixins', formatKey(key, '.mixin'), value.default || value)
  },
).requireDir(
  require.context('wow-wx/mixins', true, /\.mixin\.js$/),
  (key, value) => {
    wowApp.use('mixins', formatKey(key, '.mixin'), value.default || value)
  },
)

// 数组降纬 某些微信版本手机没有这个方法
if (typeof Array.prototype.flat !== 'function') {
  Array.prototype.flat = function () {
    return this.reduce((acc, val) => acc.concat(val), [])
  }
}

wowApp.init({
  broadcastEvents: [],
  onError(msg) {
    console.log('[APP ERROR] => ', msg)
  },
  onPageNotFound() {
    this.wow$.mixins.Router.routerPush('home_index')
  },
})
