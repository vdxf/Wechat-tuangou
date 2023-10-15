import type { BannerItem, PagingParams, PagingResult } from '@/types'
import curl from './curl'

// 列表
export const reqBannerList = (data: PagingParams<Partial<{ Keywords: string }>>) =>
  curl<PagingResult<BannerItem>>('api/admin/Banner/GetBannerList', data, { method: 'POST' })

// 新增、修改
export const doBannerAddedUpdate = (data: Partial<BannerItem>) =>
  curl('api/admin/Banner/PostBanner', data, { method: 'POST' })

// 删除
export const doBannerDelete = (data: Pick<BannerItem, 'Id'>) =>
  curl('api/admin/Banner/DelBannerInfo', data)
