import type { PropType } from 'vue'
export enum ImageType {
  GOODS = 1, // 商品
  OTHER = 99, // 其他
}

export enum VideoType {
  GOODS = 1, // 商品
  OTHER = 99, // 其他
}

export const BANNER_TYPE = [
  { label: 'h5', value: 1 },
  { label: '小程序', value: 2 },
]
export enum BannerType {
  H5 = 1, // h5
  MINI = 2, // 小程序
}

export const FileUploadProps = {
  fileType: {
    type: [Number, String] as PropType<VideoType>,
    default: VideoType.OTHER,
  },
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  accept: {
    type: String,
    default: 'video/*',
  },
  max: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}