import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Auth,
    WowComponent.wow$.mixins.Modal,
    WowComponent.wow$.mixins.File,
    WowComponent.wow$.mixins.Loading,
    WowComponent.wow$.mixins.Helper,
  ],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    objData: {
      type: Object,
      value: {},
    },
  },
  methods: {
    handleSave() {
      const { auth$, objData } = this.data
      const { VideoUrls } = objData
      const videos = VideoUrls.split(';')
      this.authScope(auth$.WRITE_PHOTOS_ALBUM, `保存相册需要授权哦...`)
        .then(() => {
          this.loadingShow({ title: '下载保存中' })
          return Promise.all(videos.map((url) => this.fileDownload(url)))
        })
        .then((res) => {
          return Promise.all(
            res.map((item) =>
              this.helperFnPromise('saveVideoToPhotosAlbum', {
                filePath: item.tempFilePath,
              }),
            ),
          )
        })
        .then(() => {
          this.loadingHide()
          this.modalToast('保存成功')
        })
        .toast(() => {
          this.loadingHide()
        })
    },
  },
})
