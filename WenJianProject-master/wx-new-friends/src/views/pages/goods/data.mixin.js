let scrollTop = 0,
  height = 0

function throttle(fn, ms) {
  let timer = null
  // eslint-disable-next-line func-names
  return function (...args) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, ms)
  }
}

const statusBarHeight = wx.getSystemInfoSync()['statusBarHeight']

export default {
  data: {
    styles: `padding-top: ${statusBarHeight}px`,
    title: '',
    current: -1,
    arrTabs: [
      { label: '商品详情', id: 'refDetailsSection' },
      { label: '团品实拍', id: 'refVideoSection' },
      { label: '资质授权', id: 'refCredentialSection' },
      { label: '关于售后', id: 'refPosterSaleSection' },
    ],
  },
  onLoad() {
    this.systemGetRpx()
    scrollTop = 0
    const { rpx } = this.data.system$
    height = (88 + 88 + 20) * rpx + statusBarHeight
  },
  handleScrollTo(event) {
    const { index } = this.inputParams(event)
    const { id } = this.data.arrTabs[index] || {}
    wx.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec((res) => {
        const [el] = res
        if (!el) {
          return
        }
        wx.pageScrollTo({
          scrollTop: scrollTop + el.top - height,
          duration: 300,
        })
        setTimeout(() => this.setData({ current: index }), 330)
      })
  },
  scrollToViews: throttle(function () {
    const { arrTabs, current } = this.data
    const query = wx.createSelectorQuery()
    arrTabs.forEach((item) => {
      query.select(`#${item.id}`).boundingClientRect()
    })
    query.exec((res) => {
      if (!res[0]) {
        return
      }
      const index = res.findIndex((item, index) => {
        const prevItem = res[index - 1]
        let top = (prevItem ? prevItem.bottom : item.top - 1) - height
        let bottom = item.bottom - height
        return top < 0 && bottom > 0
      })
      if (index !== current) {
        this.setData({ current: index })
      }
    })
  }, 30),
  onPageScroll(e) {
    scrollTop = e.scrollTop
    this.scrollToViews()
  },
}
