import { withPromise } from "./withPromise"

// export const reqUserInfo = withLoading((data) => request('/api/Banner/GetBannerList', data, { method: 'post' }))

const baseUrl = 'https://dz.xuetang51.com/api/'

export const $request = (url, data = {}, options = {}) => {
  if (data) {
    return withPromise(wx.request, { 
        url: baseUrl + url,
        method: options.method,
        data,
      })
  } else {
    return withPromise(wx.request, { 
        url: baseUrl + url,
        method: options.method,
      })
  }
}

