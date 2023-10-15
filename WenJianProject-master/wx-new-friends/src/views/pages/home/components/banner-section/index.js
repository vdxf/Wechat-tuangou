import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Jump, WowComponent.wow$.mixins.Input],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    list: {
      type: Array,
      value: [],
    },
  },
  methods: {
    handleSelect(e) {
      const { item } = this.inputParams(e)
      const { BannerType, AppId, PagePath, Name } = item

      // h5
      if (BannerType === 1 && PagePath) {
        return this.routerPush('webview_index', { link: PagePath, title: Name })
      }

      // appid
      if (BannerType === 2 && AppId) {
        return this.jumpMiniProgram({
          detail: { appid: AppId, path: PagePath },
        })
      }

      // 商品
      if (BannerType === 3 && PagePath) {
        return this.routerPush('goods_index', { Id: PagePath })
      }
    },
  },
})
