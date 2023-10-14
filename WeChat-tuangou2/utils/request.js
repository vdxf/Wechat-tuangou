import { withPromise } from "./withPromise"

export const reqUserInfo = withLoading((data) => request('/api/user/list', data, { method: 'post' }))

export const request = (url, data = {}, options = {}) => {
  return withPromise(wx.request, { 
    url: '111',
    method: 'get',
    data: {
      xxx: '11'
    }
  })
}

