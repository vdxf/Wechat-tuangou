import type { PagingParams, PagingResult } from '@/types'
import curl from './curl'

// 获取商品分享数据列表
export const reqDataCenterShareList = (data: PagingParams<Partial<{ Keywords: string }>>) =>
  curl<PagingResult>('api/admin/Market/GetTrackDetailShareList', data, {
    method: 'POST',
  })

// 获取商品点击数据列表
export const reqDataCenterViewVolumeList = (data: PagingParams<Partial<{ Keywords: string }>>) =>
  curl<PagingResult>('api/admin/Market/GetTrackDetailClickList', data, {
    method: 'POST',
  })
