import request from '@/utils/request'
import type { GetProductList, GetProductListResponse, PageParams, GetProductBrandListResponse, GetBuyGroupListResponse,GetProductTagListResponse, GetOpenGroupListResponse, ProductModel, PostProductResponse,PostBuyGroup, PostBuyGroupResponse } from './type'

//获取商品列表
export const reqProductList = (data: GetProductList) => request<GetProductListResponse>('/Product/GetProductList', data, { method: 'POST' })
//获取商品品牌全部列表
export const reqProductBrandList = (data: PageParams) => request<GetProductBrandListResponse>('/Product/GetProductBrandList',data, { method: 'POST' })
//获取团购分组列表
export const reqBuyGroupList = (data: PageParams) => request<GetBuyGroupListResponse>('/Product/GetBuyGroupList',data, { method: 'POST' })
//获取商品标签列表
export const reqProductTagList = (data: PageParams) => request<GetProductTagListResponse>('/Product/GetProductTagList',data, { method: 'POST' })
//获取开团列表
export const reqOpenGroupList = (data: PageParams) => request<GetOpenGroupListResponse>('/Market/GetOpenGroupList',data, { method: 'POST' })
//新增/修改商品信息
export const reqPostProduct = (data:ProductModel) => request<PostProductResponse>('/Product/PostProduct', data, { method: 'POST' })
//新增/修改团购分组信息
export const reqPostBuyGroup = (data:PostBuyGroup) => request<PostBuyGroupResponse>('/Product/PostBuyGroup', data, { method: 'POST' })
//删除团购分组详情
export const reqDeleteBuyGroup = (data: {Id:number}) => request('/Product/DelBuyGroupInfo', data, { method: 'GET' })