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
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Format,
    WowPage.wow$.mixins.Share,
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Monitor,
  ],
  data: {
    arrBanner: '',
    arrGroup: '',
    current: 0,
    currentDate: '',
  },
  onLoad(options) {
    this.routerGetParams(options)
    this.shareHandle(options)
    this.assignmentDate()
    this.getDataInfo()
  },
  assignmentDate() {
    this.setData({ currentDate: this.formatDate('yyyy-MM-dd') })
  },
  handleDateChange(event) {
    const { value: currentDate } = this.inputParams(event)
    this.setData({ currentDate }, () => {
      this.selectComponent(`#refContent${this.data.current}`).pagingRefresh(
        true,
      )
    })
  },
  handleShare(event) {
    const { item } = this.inputParams(event)
    this.data.selectItem = item
  },
  getDataInfo() {
    const { api$ } = this.data
    Promise.all([
      this.curl(
        api$.REQ_BANNER_LIST,
        {},
        {
          useError: true,
          loading: false,
        },
      ),
      this.curl(
        api$.REQ_GROUP_LIST,
        {},
        {
          useError: true,
          loading: false,
        },
      ),
    ])
      .then((res) => {
        const [arrBanner, arrGroup] = res
        this.setData({ arrGroup, arrBanner })
      })
      .toast()
  },
  shareGetConfig() {
    const { selectItem } = this.data
    if (selectItem) {
      const { Name, ProductImageUrl, Id } = selectItem
      this.monitorShareSubmit(selectItem)
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
