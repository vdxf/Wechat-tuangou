<template>
  <ElDialog class="pro-dialog-form" v-model="visible" :title="computedProps.title" destroy-on-close>
    <ElForm
      ref="formInstance"
      inline
      label-position="top"
      :label-width="computedProps.labelWidth"
      :model="computedSources.formModel"
      :rules="rules"
    >
      <ElFormItem
        v-for="(item, key) in computedSources.metadata"
        :style="{
          display: 'block',
          width: item.width || componentStyle[item.is] || `48%`,
        }"
        :key="key"
        :label="item.label"
        :prop="key"
      >
        <ElInput
          v-if="item.is === 'form-input'"
          v-model="item.value"
          placeholder="请填写"
          clearable
          v-bind="item.props"
        />
        <ElSelect
          v-else-if="item.is === 'form-select'"
          v-model="item.value"
          placeholder="请选择"
          clearable
          v-bind="item.props"
        >
          <ElOption
            v-for="(option, index) in item.options"
            v-bind="option.props"
            :key="index"
            :label="option[item.labelKey || 'label'] || option"
            :value="option[item.valueKey || 'value'] ?? option"
          />
        </ElSelect>
        <template v-else-if="item.is === 'form-radio'">
          <ElRadioGroup v-model="item.value">
            <ElRadio
              v-for="(option, index) in item.options"
              v-bind="option.props"
              :key="index"
              :label="option[item.valueKey || 'value'] ?? option"
            >
              {{ option[item.labelKey || 'label'] || option }}
            </ElRadio>
          </ElRadioGroup>
        </template>
        <template v-else-if="item.is === 'form-checkbox'">
          <ElCheckboxGroup v-model="item.value" v-bind="item.props">
            <ElCheckbox
              v-for="(option, index) in item.options"
              v-bind="option.props"
              :key="index"
              :label="option[item.valueKey || 'value'] ?? option"
            >
              {{ option[item.labelKey || 'label'] || option }}
            </ElCheckbox>
          </ElCheckboxGroup>
        </template>
        <ElDatePicker
          v-else-if="item.is === 'form-date-picker'"
          v-model="item.value"
          type="date"
          placeholder="请选择"
          clearable
          :value-format="item.props?.type ? datePickerValueFormat[item.props.type] : ''"
          v-bind="item.props"
        />
        <ElInputNumber
          v-else-if="item.is === 'form-input-number'"
          v-model="item.value"
          v-bind="item.props"
        />
        <ProImageUpload
          v-else-if="item.is === 'form-image-upload'"
          v-model="item.value"
          v-bind="item.props"
        />
        <ProFileUpload
          v-else-if="item.is === 'form-file-upload'"
          v-model="item.value"
          v-bind="item.props"
        />
        <ProTags v-else-if="item.is === 'form-tags'" v-model="item.value" v-bind="item.props" />
        <Component
          v-else-if="item.is"
          v-model="item.value"
          v-bind="{ ...item, ...item.props }"
          :is="item.is"
        />
      </ElFormItem>
    </ElForm>

    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="hide('cancel')">取消</ElButton>
        <ElButton type="primary" @click="handleSubmit" :loading="loading">确认</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import { useVisible } from '@daysnap/vue-use'
  import { isFunction } from '@daysnap/utils'
  import type { FormInstance } from 'element-plus'
  import { useWithLoading } from '@/hooks'
  import { proDialogFormProps, type ProDialogFormProps, type ProDialogFormMetadata } from './types'

  const dynamicProps = ref<Partial<ProDialogFormProps>>()
  const props = defineProps(proDialogFormProps)

  const computedProps = computed<ProDialogFormProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )

  const rules = ref<Record<string, any>>({})

  const computedSources = computed(() => {
    const formModel: Record<string, any> = {}
    const formRules: Record<string, any> = {}
    const metadata: ProDialogFormMetadata = {}
    const sourceMetadata = computedProps.value.metadata ?? {}
    Object.entries(sourceMetadata).forEach(([key, item]) => {
      let { hidden, value, rules } = item
      if (isFunction(hidden)) {
        hidden = hidden(value, item, sourceMetadata)
      }
      if (!hidden) {
        formModel[key] = value
        metadata[key] = item
      }
      if (isFunction(rules)) {
        rules = rules(value, item, sourceMetadata)
      }
      formRules[key] = rules
    })

    if (JSON.stringify(rules.value) !== JSON.stringify(formRules)) {
      rules.value = formRules
    }

    return { formModel, metadata }
  })

  const { show, hide, confirm, visible } = useVisible<
    Partial<ProDialogFormProps>,
    Record<string, any>
  >({
    showCallback: (options) => {
      dynamicProps.value = options
    },
  })

  const formInstance = ref<FormInstance>()
  const [loading, handleSubmit] = useWithLoading(async () => {
    if (!formInstance.value) {
      return
    }
    await formInstance.value.validate().throw()
    const { formModel, metadata } = computedSources.value
    await computedProps.value.request?.(formModel, metadata)
    confirm(formModel)
  })

  const componentStyle: Record<string, string> = {
    'form-image-upload': '100%',
    'form-file-upload': '100%',
    'form-tags': '100%',
  }

  // YYYY-MM-DD HH:mm:ss
  const datePickerValueFormat: Record<string, string> = {
    date: 'YYYY-MM-DD',
    daterange: 'YYYY-MM-DD',
    datetimerange: 'YYYY-MM-DD HH:mm:ss',
  }

  defineExpose({
    show,
    hide,
  })
</script>

<style lang="scss">
  @import '@/assets/scss/define';
  .pro-dialog-form {
    width: 96%;
    max-width: 800px;
    .el-form-item__content {
      @extend %w100;
    }
    .el-select {
      @extend %w100;
    }
    .el-input-number {
      width: 240px;
      min-width: 200px;
    }
    .el-form--inline {
      @extend %jcs;
      .el-form-item {
        margin-right: 0;
      }
    }
  }
  @media (max-width: 500px) {
    .el-form--inline {
      .el-form-item {
        width: 100% !important;
      }
    }
  }
</style>
