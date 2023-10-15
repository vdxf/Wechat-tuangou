import type { OpenGroupItem, PagingParams, PagingResult } from '@/types'
import curl from '../curl'

// 开团列表
export const reqOpenGroupList = (data: PagingParams<Partial<{ Keywords: string }>>) =>
  curl<PagingResult<OpenGroupItem>>('api/admin/Market/GetOpenGroupList', data, { method: 'POST' })

// 开团信息（新增、修改）
export const doOpenGroupAddedUpdate = (data: Partial<OpenGroupItem>) =>
  curl('api/admin/Market/PostOpenGroup', data, { method: 'POST' })

// 删除开团
export const doOpenGroupDelete = (data: Pick<OpenGroupItem, 'Id'>) =>
  curl('api/admin/Market/DelOpenGroupInfo', data)
