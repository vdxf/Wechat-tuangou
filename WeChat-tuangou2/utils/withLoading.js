export const withLoading = (fn, opt = true) => {
    return async (parmas, options = opt) => {
        if (typeof  options  === 'boolean'&& options) {
            options = { title: '数据加载中...', mask: true  }
        } else if (typeof  options === 'object'&& options.title ) {
            options = { title: options.title, mask: true }
        } 
        const toast = options ? wx.showLoading(options) : ''
        try {
            const res = await fn(parmas)
            toast && wx.hideLoading()
            return res
        } catch (err) {
            toast && wx.hideLoading()
            throw err
        }
    }
  }