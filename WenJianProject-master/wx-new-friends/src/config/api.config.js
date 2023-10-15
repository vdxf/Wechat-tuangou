export const isProd = (() => {
  let result = true
  try {
    if (wx.getAccountInfoSync) {
      const accountInfo = wx.getAccountInfoSync()
      const { envVersion } = accountInfo.miniProgram
      // develop trial release
      if (['develop', 'trial'].includes(envVersion)) {
        result = false
      }
    }
  } catch (e) {
    /* empty */
  }
  return result
})()

export default {
  H5_BASE_URL: isProd ? '' : '',

  // 微信授权登录
  DO_USER_LOGIN: 'api/AppletApi/UserAuthorize',

  // 获取Banner列表
  REQ_BANNER_LIST: 'api/Banner/GetBannerList',

  // 获取团购分组列表
  REQ_GROUP_LIST: 'api/Product/GetBuyGroupList',

  // 获取商品详情
  REQ_GOODS_INFO: 'api/Product/GetProductInfo',

  // 获取商品列表
  REQ_GOODS_LIST: 'api/Product/GetProductList',

  // 提交商品信息点击数据
  DO_MONITOR_VIEW_VOLUME_SUBMIT: 'api/Market/PostTrackDetailClick',

  // 提交商品信息分享数据
  DO_MONITOR_SHARE_SUBMIT: 'api/Market/PostTrackdetailshare',

  // 获取二维码
  DO_QR_CODE_CREATE: 'api/AppletApi/CreateQRCode',
}
