import request from '@/utils/request'
import type { GetProductList, GetProductListResponse } from './type'

//获取商品列表
export const reqProductList = (data: GetProductList) => request<GetProductListResponse>('/Product/GetProductList', data, { method: 'POST' })