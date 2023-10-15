//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.File,
    WowPage.wow$.mixins.Loading,
    WowPage.wow$.mixins.Broadcast,
  ],
  data: {
    avatarUrl: '',
  },
  onLoad(options) {
    this.routerGetParams(options)
  },
  handleSubmit(e) {
    const { value } = this.inputParams(e)
    const { avatarUrl, params$ } = this.data
    const { nickname } = value
    if (!nickname) {
      return this.modalToast('请输入昵称')
    }
    if (!avatarUrl) {
      return this.modalToast('请选择头像')
    }
    this.routerPop()
    if (params$.event) {
      setTimeout(() => {
        this.broadcastSendEvent(params$.event, { avatarUrl, nickname })
      }, 300)
    }
  },
  handleChoose(event) {
    const { avatarUrl } = this.inputParams(event)
    this.setData({ avatarUrl })
  },
})
