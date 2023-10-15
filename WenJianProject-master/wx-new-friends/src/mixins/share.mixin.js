export default {
  shareHandle(options) {
    const { params$ } = this.data
    let { scene = '', to = params$.to, ...params } = options

    if (scene) {
      scene = decodeURIComponent(scene)
      // 为了兼容 getUnlimitedQRCode scene 带参
      if (scene.includes('=')) {
        const {
          scene: sScene,
          to: sTo,
          ...rest
        } = scene.split('&').reduce((res, item) => {
          const [key, value] = item.split('=')
          res[key] = value
          return res
        }, {})
        scene = sScene || ''
        if (sTo) to = sTo
        Object.assign(params, rest)
      }
    }

    Object.assign(params, params$)

    if (scene) {
      this.data.scene = scene
    }

    if (to) {
      const callback = () => this.routerPush(to, params)
      if (!params.a) {
        return callback()
      }
      this.userGet()
        .then(callback)
        .catch(() => {
          this.jumpUserLogin(callback)
        })
      return
    }
  },

  shareGetConfig() {
    return {}
  },

  shareStringify(params = {}, path = 'pages/home/index') {
    const query = Object.keys(params)
      .reduce((res, k) => {
        res.push(`${k}=${params[k]}`)
        return res
      }, [])
      .join('&')
    return `${path}${path.includes('?') ? '&' : '?'}${query}`
  },

  onShareAppMessage(options) {
    return Object.assign(
      {
        title: '好友分享团购素材给你',
        path: 'pages/home/index',
        // imageUrl: s('icon-share.jpg'),
      },
      this.shareGetConfig(options),
    )
  },
}
