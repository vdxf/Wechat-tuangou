import request from '@/utils/request'
import type { GetProductList, GetProductListResponse, GetProductBrandAllLisResponse, PostProductResponse } from './type'

//获取商品列表
export const reqProductList = (data: GetProductList) => request<GetProductListResponse>('/Product/GetProductList', data, { method: 'POST' })
//获取商品品牌全部列表
export const reqProductBrandAllList = () => request<GetProductBrandAllLisResponse>('/Product/GetProductBrandAllList', { method: 'POST' })
//新增商品信息
export const reqPostProduct = (data:ProductModel) => request<PostProductResponse>('/Product/PostProduct', { method: 'POST' })