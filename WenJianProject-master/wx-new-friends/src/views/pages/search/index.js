//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Paging,
    WowPage.wow$.mixins.Loadmore,
    WowPage.wow$.mixins.Format,
    WowPage.wow$.mixins.Share,
  ],
  data: {
    Keywords: '',
  },
  onLoad() {
    this.pagingRefresh()
  },
  handleShare(event) {
    console.log('111')
    const { item } = this.inputParams(event)
    this.data.selectItem = item
  },
  handleSearch(event) {
    const { value } = this.inputParams(event)
    this.data.Keywords = value
    this.pagingRefresh(true)
  },
  pagingGetUrlParamsOptions({ pagingIndex }) {
    if (pagingIndex === 1) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    }
    const { api$, Keywords } = this.data
    return { url: api$.REQ_GOODS_LIST, params: { Keywords } }
  },
  shareGetConfig() {
    const { Name, ProductImageUrl, Id } = this.data.selectItem
    if (this.data.selectItem) {
      this.data.selectItem = ''
      return {
        title: Name,
        imageUrl: ProductImageUrl,
        path: this.shareStringify({ Id, to: `/pages/goods/index`, a: true }),
      }
    }
    return {}
  },
})
