import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Jump,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.File,
    WowComponent.wow$.mixins.Image,
    WowComponent.wow$.mixins.Loading,
    WowComponent.wow$.mixins.System,
    WowComponent.wow$.mixins.Broadcast,
    WowComponent.wow$.mixins.Curl,
    WowComponent.wow$.mixins.Auth,
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
  data: {
    event: 'auth-user-info',
    visible: false,
    isPosterShow: false,
  },
  lifetimes: {
    attached() {
      this.systemGetRpx()
      this.data.unbind = this.broadcastAddEventListener(
        this.data.event,
        this.handleAuthUserInfo.bind(this),
      )
    },
    detached() {
      if (this.data.unbind) {
        this.data.unbind()
      }
    },
  },
  methods: {
    hide() {
      this.setData({ visible: false, isPosterShow: false })
    },
    handleResetPoster() {
      this.setData({ visible: false, isPosterShow: false })
      this.routerPush('auth_index', { event: this.data.event })
    },
    handleSavePoster() {
      const { auth$ } = this.data
      this.authScope(auth$.WRITE_PHOTOS_ALBUM, `保存相册需要授权哦...`)
        .then(() => {
          return this.canvasToTempFilePath()
        })
        .then((res) => {
          return this.imageSave(res.tempFilePath)
        })
        .then(() => {
          this.modalToast('保存图片成功')
          this.hide()
        })
        .toast()
        .finally(() => {
          this.loadingHide()
        })
    },
    canvasToTempFilePath() {
      return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath(
          {
            canvasId: 'myCanvas',
            success: resolve,
            fail: reject,
          },
          this,
        )
      })
    },
    handleAuthUserInfo(res = {}) {
      this.setData({ visible: false })
      // http://tmp/rwUA1I9fAAf014bdcbc4723ed1fec08773b7a94ea360.jpeg
      // http://tmp/P27NGRfotF8Be9109b2b3ef25019202a3a29a36d3506.jpeg
      const { objData, system$, api$ } = this.data
      const { ProductImageUrl, Id, Name } = objData
      const { avatarUrl, nickname } = res
      this.loadingShow()
      this.curl(
        api$.DO_QR_CODE_CREATE,
        {
          Name:
            Date.now() +
            new Array(6)
              .fill('')
              .map(() => '1234567890'[Math.floor(Math.random() * 10)])
              .join(''),
          QRCodeType: 2,
          QRCodeUrl: 'pages/home/index',
          SceneCode: `a=true&to=goods_index&Id=${Id}`,
        },
        { loading: false },
      )
        .then((res) => {
          return Promise.all([
            this.fileDownload(ProductImageUrl),
            this.fileDownload(res),
          ])
        })
        .then((res) => {
          const [cover, qrcode] = res.map((item) => item.tempFilePath)
          const ctx = wx.createCanvasContext('myCanvas', this)
          const { rpx } = system$
          const j = (x) => x * rpx
          const width = j(600)
          const height = j(800)
          const setStep = (fn) => {
            ctx.save()
            fn()
            ctx.restore()
          }

          // 清空画布
          ctx.clearRect(0, 0, width, height)
          setStep(() => {
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, width, height)
          })

          // 绘制商品主图
          setStep(() => {
            ctx.drawImage(cover, 0, 0, j(600), j(480))
          })

          // 绘制商品名称
          setStep(() => {
            ctx.setFillStyle('#333333')
            ctx.setFontSize(16)
            this.textPreWrap(
              ctx,
              Name,
              j(50),
              height - j(50 + 150 + 50),
              j(20),
              width - j(50 + 50 + 20),
              1,
            )
          })

          // 绘制头像
          setStep(() => {
            ctx.beginPath()
            // 先画个圆，前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
            ctx.arc(
              j(100 / 2) + j(50),
              j(100 / 2) + height - j(100 + 50 + 50),
              j(100 / 2),
              0,
              Math.PI * 2,
              false,
            )
            ctx.clip()
            ctx.drawImage(
              avatarUrl,
              j(50),
              height - j(100 + 50 + 50),
              j(100),
              j(100),
            )
          })

          // 绘制昵称
          setStep(() => {
            ctx.setFillStyle('#333333')
            ctx.setFontSize(12)
            this.textPreWrap(
              ctx,
              nickname,
              j(50),
              height - j(50),
              j(20),
              width - j(50 + 250 + 20),
              1,
            )
          })

          // 绘制二维码
          setStep(() => {
            ctx.drawImage(
              qrcode,
              width - j(150 + 50),
              height - j(150 + 50),
              j(150),
              j(150),
            )
          })

          ctx.draw()
          this.setData({ isPosterShow: true })
          this.loadingHide()
        })
        .toast(() => {
          this.loadingHide()
        })
    },

    //字体换行，可以限制换行条数
    /**
			ctx： 画布的上下文环境
			content： 需要绘制的文本内容
			drawX： 绘制文本的x坐标
			drawY： 绘制文本的y坐标
			lineHeight：文本之间的行高
			lineMaxWidth：每行文本的最大宽度
			lineNum：最多绘制的行数
			*/
    textPreWrap(ctx, content, drawX, drawY, lineHeight, lineMaxWidth, lineNum) {
      var drawTxt = '' // 当前绘制的内容
      var drawLine = 1 // 第几行开始绘制
      var drawIndex = 0 // 当前绘制内容的索引
      // 判断内容是否可以一行绘制完毕
      if (ctx.measureText(content).width <= lineMaxWidth) {
        ctx.fillText(content.substring(drawIndex, i), drawX, drawY)
      } else {
        for (var i = 0; i < content.length; i++) {
          drawTxt += content[i]
          if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
            if (drawLine >= lineNum) {
              ctx.fillText(
                content.substring(drawIndex, i) + '...',
                drawX,
                drawY,
              )

              break
            } else {
              ctx.fillText(content.substring(drawIndex, i + 1), drawX, drawY)
              drawIndex = i + 1
              drawLine += 1
              drawY += lineHeight
              drawTxt = ''
            }
          } else {
            // 内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
            if (i === content.length - 1) {
              ctx.fillText(content.substring(drawIndex), drawX, drawY)
            }
          }
        }
      }
    },
  },
})
