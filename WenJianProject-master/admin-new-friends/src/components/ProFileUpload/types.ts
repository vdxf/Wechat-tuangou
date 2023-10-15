import { VideoType } from '@/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export const proFileUploadProps = {
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

export type ProFileUploadProps = ExtractPropTypes<typeof proFileUploadProps>
