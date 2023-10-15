import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Curl,
    WowComponent.wow$.mixins.Paging,
    WowComponent.wow$.mixins.Input,
  ],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer(v) {
        v && this.pagingRefresh()
        const refWowScroll = this.selectComponent('#wowScroll')
        if (refWowScroll) {
          refWowScroll.resume()
        }
      },
    },
    item: {
      type: Object,
      value: {},
    },
    date: {
      type: String,
      value: '',
    },
  },
  methods: {
    pagingGetUrlParamsOptions({ pagingIndex }) {
      if (pagingIndex === 1) {
        const refWowScroll = this.selectComponent('#wowScroll')
        if (refWowScroll) {
          refWowScroll.returnTop()
        }
      }
      const { api$, item, date } = this.data
      const params = { BuyGroupId: item.Id }
      if (date) params.GroupDate = date
      return { url: api$.REQ_GOODS_LIST, params }
    },
    handleShare(e) {
      const { item } = this.inputParams(e)
      this.triggerEvent('share', { item })
    },
  },
})
