// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('res => ', res)
      }
    })
    //判断是否为iPhoneX
    this.checkIsIphoneX()
  },
  checkIsIphoneX(){
    const that = this
    wx.getSystemInfo({
      success: (res) => {
        const model = res.model 
        if(/iphone\sx/i.test(model) || (/iphone/i.test(model) && /unknown/.test(model)) || /iphone\s11/i.test(model)){
          that.globalData.isIphoneX = true
        } else {
          that.globalData.isIphoneX = false
        }
      } 
    })

  },
  globalData: {
    userInfo: null,
    isIphoneX: false,
  }
})
