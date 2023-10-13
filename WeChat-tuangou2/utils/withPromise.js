
export const withPromise = (fn, options = {}) => {
  return new Promise((reslove, reject) => {
    fn({
      success: reslove,
      fail: reject,
      ...options,
    })
  })
}

