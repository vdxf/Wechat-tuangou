import type { ExtractPropTypes } from 'vue'
import type { FormItemRule } from 'element-plus'
import type { Arrayable } from '@daysnap/types'

export interface ProDialogFormField {
  is?: any
  label?: string
  width?: string
  value?: any
  defaultValue?: any
  get?: (...args: any[]) => any
  set?: (...args: any[]) => any
  hidden?:
    | boolean
    | ((value: any, field: ProDialogFormField, metadata: ProDialogFormMetadata) => boolean)
  props?: Record<string, any>
  options?: any
  labelKey?: string
  valueKey?: string
  rules?:
    | Arrayable<FormItemRule>
    | ((
        value: any,
        field: ProDialogFormField,
        metadata: ProDialogFormMetadata,
      ) => Arrayable<FormItemRule>)
  [prop: string]: any
}

export type ProDialogFormMetadata = Record<string, ProDialogFormField>

export interface ProDialogFormRequest {
  (data: Record<string, any>, metadata: ProDialogFormMetadata): Promise<any>
}

export const proDialogFormProps = {
  title: String,
  metadata: {
    type: Object as PropType<ProDialogFormMetadata>,
  },
  request: {
    type: Function as PropType<ProDialogFormRequest>,
  },
  labelWidth: {
    type: String,
    default: '120px',
  },
}

export type ProDialogFormProps = ExtractPropTypes<typeof proDialogFormProps>
