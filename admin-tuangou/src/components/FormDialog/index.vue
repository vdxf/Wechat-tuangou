<template>
  <el-dialog v-model="props.show" :title="props.title" @close="$emit('cancle')">
   <el-form :rules="rules.value" :model="formData">
    <el-form-item v-for="(item, key) in formData" :key="key" :label="item.label" :prop="key">
      <el-input v-if="item.is === 'form-input'" v-model="item.value" placeholder="请填写" clearable v-bind="item.props" />
      <el-select v-else-if="item.is === 'form-select'" v-model="item.value" placeholder="请选择" clearable v-bind="item.props">
        <el-option v-for="option1 in item?.options?.Data" :key="option1.Id" :label="option1[item.labelKey || 'label'] || option1"
        :value="option1[item.valueKey || 'value'] ?? option1" />
      </el-select>
      <template v-else-if="item.is === 'form-radio'">
        <el-radio-group v-model="item.value">
          <el-radio v-for="(option, index) in item.options" :key="index" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="item.is === 'form-checkbox'">
          <el-checkbox-group v-model="item.value" v-bind="item.props">
            <el-checkbox
              v-for="(option, index) in item.options"
              v-bind="option.props"
              :key="index"
              :label="option[item.valueKey || 'value'] ?? option"
            >
              {{ option[item.labelKey || 'label'] || option }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <el-date-picker
          v-else-if="item.is === 'form-date-picker'"
          v-model="item.value"
          type="date"
          placeholder="请选择"
          clearable
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-bind="item.props"
        />
        <el-input-number
          v-else-if="item.is === 'form-input-number'"
          v-model="item.value"
          v-bind="item.props"
        />
        <ImageUpload 
          v-else-if="item.is === 'form-image-upload'"
          v-model="item.value"
          v-bind="item.props"
        />
        <VideoUpload 
          v-else-if="item.is === 'form-file-upload'"
          v-model="item.value"
          v-bind="item.props"
        />
        <Component
          v-else-if="item.is"
          v-model="item.value"
          v-bind="{ ...item, ...item.props }"
          :is="item.is"
        />
    </el-form-item>
   </el-form>
   <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('cancle')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import ImageUpload from './ImageUpload.vue'
import VideoUpload from './VideoUpload.vue'
import { computed, reactive } from 'vue'
const $emit = defineEmits(['submit', 'cancle'])
const props = defineProps(['show','formData', 'title', 'Id'])
const rules = reactive<Record<string, any>>({})
const computedProps = computed(() => {
  const formModel: Record<string, any> = {}
  const formRules: Record<string, any> = {}
  Object.entries(props.formData).forEach(([key, item]) => {
    const { value, rules } = item as any
    formModel[key] = value
    formRules[key] = rules
  })
  return { formModel, formRules }
})
rules.value = computedProps.value.formRules
const handleSubmit = () => {
  $emit('submit', computedProps.value.formModel, props.Id)
}
</script>
<style scoped lang="scss">
</style>