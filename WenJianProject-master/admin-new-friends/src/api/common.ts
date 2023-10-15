import type { ImageType, VideoType } from '@/utils'
import curl from './curl'

// 用户登录
export const doAdminUserLogin = (data: { Account: string; Password: string }) =>
  curl('api/admin/Passport/Login', data, { method: 'POST' })

// 用户登出
export const doAdminUserLogout = () => curl('api/admin/Passport/LoginOut')

// 上传图片
export const doImageUpload = (data: { Basic: string; Suffix: string; ImageType: ImageType }) =>
  curl<string>('api/admin/Comm/UploadImage', data, { method: 'POST' })

// 上传视频
export const doVideoUpload = (data: {
  VideoFile: Blob
  VideoType: VideoType
  IsRawFileName: Boolean
}) => {
  const fd = new FormData()
  Object.entries(data).forEach(([key, item]) => {
    fd.append(key, item as any)
  })
  return curl('api/admin/Comm/UploadVideo', fd, { method: 'POST' })
}

// 汇率换算
// 1人民币->新加坡币，2新加坡币->人民币
export const reqExchangeRateInfo = (data: { way: 1 | 2 }) =>
  curl(`api/admin/Product/GetExchangeRate`, data)
