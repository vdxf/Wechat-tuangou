import type { PagingParams, PagingResult, TagItem } from '@/types'
import curl from '../curl'

// 获取标签列表
export const reqTagList = (data: PagingParams<Partial<{ Keywords: string }>>) =>
  curl<PagingResult<TagItem>>('api/admin/Product/GetProductTagList', data, { method: 'POST' })

// 提交标签（新增、修改）
export const doTagAddedUpdate = (data: Partial<TagItem>) =>
  curl('api/admin/Product/PostProductTag', data, { method: 'POST' })

// 删除标签
export const doTagDelete = (data: Pick<TagItem, 'Id'>) =>
  curl('api/admin/Product/DelProductTagInfo', data)
