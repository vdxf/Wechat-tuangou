import type { GroupItem, PagingParams, PagingResult } from '@/types'
import curl from '../curl'

// 获取团购分组列表
export const reqGroupList = (data: PagingParams<Partial<{ Keywords: string }>>) =>
  curl<PagingResult<GroupItem>>('api/admin/Product/GetBuyGroupList', data, { method: 'POST' })

// 提交团购分组信息（新增、修改）
export const doGroupAddedUpdate = (data: Partial<GroupItem>) =>
  curl('api/admin/Product/PostBuyGroup', data, { method: 'POST' })

// 删除团购分组
export const doGroupDelete = (data: Pick<GroupItem, 'Id'>) =>
  curl('api/admin/Product/DelBuyGroupInfo', data)
