// 是否是开发环境
export const __DEV__ = process.env.NODE_ENV === 'development'

// 项目名称
export const NAME = 'NEW-FRIENDS'

// 零钱的状态
export const BANNER_TYPE = [
  { label: 'h5', value: 1 },
  { label: '小程序', value: 2 },
]
export enum BannerType {
  H5 = 1, // h5
  MINI = 2, // 小程序
}

export const parseText = (
  arr: { label: string; value: string | number }[],
  value: string | number,
) => {
  const item = arr.find((item) => item.value === value)
  return item?.label
}
