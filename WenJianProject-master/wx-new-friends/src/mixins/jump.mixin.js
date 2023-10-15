import InputMixin from 'wow-wx/mixins/wx/input.mixin'
import RouterMixin from 'wow-wx/mixins/wx/router.mixin'
import ModalMixin from 'wow-wx/mixins/wx/modal.mixin'
import LoadingMixin from 'wow-wx/mixins/wx/loading.mixin'
import UserMixin from 'wow-wx/mixins/utils/user.mixin'

export default {
  mixins: [InputMixin, RouterMixin, ModalMixin, UserMixin, LoadingMixin],

  jumpUserLogin(callback, loading = true) {
    const { api$, scene = '' } = this.data
    loading && this.loadingShow()
    this.userLogin()
      .then((code) => {
        return this.curl(
          api$.DO_USER_LOGIN,
          {
            Code: code,
            Scene: scene,
          },
          {
            loading: false,
          },
        )
      })
      .then((res) => {
        return this.userUpdate(res)
      })
      .then(() => {
        return this.userGet()
      })
      .then((res) => {
        callback && callback(res)
        loading && this.loadingHide()
      })
      .toast(() => {
        loading && this.loadingHide()
      })
  },

  jumpPageOrFireFn(e) {
    const { item, ...rest } = this.inputParams(e)
    let {
      url,
      params,
      fn,
      async,
      sync,
      disabled,
      close = false,
      event,
      filter,
      premise = '',
    } = Object.assign({}, rest, typeof item === 'object' ? item : {})

    if (disabled) {
      return
    }

    // 过滤拦截器
    if (filter) {
      filter = filter.split(',')
      for (let i = 0, len = filter.length; i < len; i++) {
        const result = this[filter[i]](params || item)
        if (result) {
          return true
        }
      }
    }

    const fireFn = () => {
      if (url) {
        this.routerPush(url, params || item, !!close)
      }
      if (fn && this[fn]) {
        this[fn](params || item, e)
      }
      if (event) {
        this.triggerEvent(event, params || item)
      }
    }

    if (typeof sync !== 'undefined' && !sync) {
      // 去登录
      return this.jumpUserLogin(fireFn)
    }

    if (async || premise) {
      return this.userGet()
        .then(fireFn)
        .catch(() => {
          this.jumpUserLogin(fireFn)
        })
    }

    // 其他
    fireFn()
  },

  // 跳转到小程序
  jumpMiniProgram(event) {
    const { appid: appId, path } = this.inputParams(event)
    wx.navigateToMiniProgram({
      appId, // 小程序appid
      path, // 跳转关联小程序app.json配置里面的地址
      envVersion: 'release',
      success(res) {
        console.log('打开成功 => ', res)
      },
      fail(err) {
        console.log('打开失败 => ', err)
      },
    })
  },

  jumpTabBarPage(e) {
    const { url } = this.inputParams(e)
    this.routerRoot(url)
  },

  jumpPopPage(event) {
    const root = 'pages/home/index'
    const { route = root } =
      typeof event === 'object' ? this.inputParams(event) : { route: event }

    // eslint-disable-next-line no-undef
    const pages = getCurrentPages()
    let delta
    if (root === route) {
      if (pages[0].route === route) {
        delta = pages.length - 1
        // return this.routerPop(pages.length - 1)
      }
    } else {
      const index = pages.findIndex((item) => item.route === route)
      if (index > -1) {
        delta = pages.length - index - 1
      }
      // 没有的话返回到首页
      if (!delta) {
        this.jumpPopPage()
        return
      }
    }
    delta ? this.routerPop(delta) : this.routerRoot(`/${route}`, {}, true)
  },
}
