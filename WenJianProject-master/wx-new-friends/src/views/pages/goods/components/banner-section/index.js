import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  data: {
    arrData: [],
  },
  properties: {
    objData: {
      type: Object,
      value: null,
      observer(v) {
        if (!v) return
        const {
          ProductImageUrl,
          ProductBannerImageUrl,
          ProductBannerVideoUrl,
        } = v
        const list = ProductBannerImageUrl
          ? ProductBannerImageUrl.split(';')
          : []
        // type 1 照片   2 视频
        this.setData({
          arrData: [
            { type: 1, url: ProductImageUrl },
            { type: 2, url: ProductBannerVideoUrl },
            ...list.map((url) => ({ type: 1, url })),
          ],
        })
      },
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
