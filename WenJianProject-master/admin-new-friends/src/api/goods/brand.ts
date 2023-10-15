import type { PagingParams, PagingResult, BrandItem } from '@/types'
import curl from '../curl'

// 列表
export const reqBrandList = (data: PagingParams<Partial<{ Keywords: string }>>) =>
  curl<PagingResult<BrandItem>>('api/admin/Product/GetProductBrandList', data, { method: 'POST' })

// 新增、修改
export const doBrandAddedUpdate = (data: Partial<BrandItem>) =>
  curl('api/admin/Product/PostProductBrand', data, { method: 'POST' })

// 删除
export const doBrandDelete = (data: Pick<BrandItem, 'Id'>) =>
  curl('api/admin/Product/DelProductBrandInfo', data)
