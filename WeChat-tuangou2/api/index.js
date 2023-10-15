import { $request } from "../utils/request"
import { withLoading } from "../utils/withLoading"

export const reqBannerList = withLoading((data = '') => {
    return $request('Banner/GetBannerList',data, { method: 'post' })
})

export const reqGoodsList = withLoading((data) => {
    return $request('Product/GetProductList', data, { method: 'post' })
})