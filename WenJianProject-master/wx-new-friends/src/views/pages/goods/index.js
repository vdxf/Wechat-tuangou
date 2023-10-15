//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.System,
    WowPage.wow$.mixins.Share,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Monitor,
  ],
  onLoad(options) {
    this.routerGetParams(options)
    this.reqGoodsInfo()
    this.monitorViewVolumeSubmit(this.data.params$)
  },
  reqGoodsInfo() {
    let { api$, params$, arrTabs } = this.data
    const { Id } = params$
    this.curl(
      api$.REQ_GOODS_INFO,
      {
        Id,
      },
      {
        method: 'get',
        loading: false,
        useError: true,
      },
    )
      .then((res) => {
        arrTabs = arrTabs.filter((item) => {
          const { id } = item
          if (id === 'refDetailsSection') {
            return ['DescriptionInfo', 'Description', 'DescriptionAttri'].find(
              (key) => res[key],
            )
          }
          if (id === 'refVideoSection') {
            return ['VideoUrls'].find((key) => res[key])
          }
          if (id === 'refCredentialSection') {
            return ['CredentialInfo', 'Credential'].find((key) => res[key])
          }
          if (id === 'refPosterSaleSection') {
            return ['AfterSalesInfo', 'AfterSales'].find((key) => res[key])
          }
          return true
        })
        const ids = arrTabs.map((item) => item.id)
        this.setData({
          objData: Object.assign(res, {
            isDetail: ids.includes('refDetailsSection'),
            isVideo: ids.includes('refVideoSection'),
            isCredential: ids.includes('refCredentialSection'),
            isPosterSale: ids.includes('refPosterSaleSection'),
          }),
          arrTabs,
        })
      })
      .toast()
  },
  shareGetConfig() {
    const { objData } = this.data
    const { Name, ProductImageUrl, Id } = objData
    this.monitorShareSubmit(objData)
    return {
      title: Name,
      imageUrl: ProductImageUrl,
      path: this.shareStringify({ Id, to: `/${this.route}`, a: true }),
    }
  },
})
