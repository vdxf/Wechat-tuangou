import type { GoodsItem, PagingParams, PagingResult } from '@/types'
import curl from '../curl'

// 获取商品列表
export const reqGoodsList = (data: PagingParams<Partial<{ Keywords: string }>>) =>
  curl<PagingResult<GoodsItem>>('api/admin/Product/GetProductList', data, { method: 'POST' })

// 提交商品信息（新增、修改）
export const doGoodsAddedUpdate = (data: Partial<GoodsItem>) =>
  curl('api/admin/Product/PostProduct', data, { method: 'POST' })

// 删除商品
export const doGoodsDelete = (data: Pick<GoodsItem, 'Id'>) =>
  curl('api/admin/Product/DelProductInfo', data)

// 批量修改商品开团时间
export const doGoodsBatchUpdate = (
  data: Pick<GoodsItem, 'GroupDate' | 'GroupEndDate' | 'IsShelfed'> & { Ids: number[] },
) => curl('api/admin/Product/PostProductCopy', data, { method: 'POST' })
