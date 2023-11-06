<template>
  <div class="upload-video">
    <el-button type="primary" icon="upload" class="upload-btn" v-if="computeValue.length < props.max">
      上传文件
      <input type="file" @change="handleUpoadFiles">
    </el-button>
    <ul v-if="computeValue.length >= 1">
      <li v-for="(item, index) in computeValue" :key="index" class="files-item">
        <a :href="item" target="_blank">{{ item }}</a>
        <el-icon v-if="!disabled" @click="handleDelete(index)">
          <CircleCloseFilled />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reqUploadVideo } from '@/api/product';
import { FileUploadProps } from '@/utils/enums';
import { isArray } from '@daysnap/utils';
import { ElMessage } from 'element-plus';
import { computed } from 'vue';

const $emit = defineEmits(['update:modelValue'])
const props = defineProps(FileUploadProps)
const computeValue:any = computed(() => {
  const { modelValue } = props
  return isArray(modelValue) ? modelValue : modelValue ? [modelValue] : []
})
const handleDelete = (index: number) => {
  let value: string | string[] = ''
  if (isArray(props.modelValue)) {
    value = [...props.modelValue]
    value.splice(index, 1)
  }
  $emit('update:modelValue', value)
}
const handleUpoadFiles = async (e:any) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  target.value = ''
  if (!file) return
  if (file.size >= 1024 * 1024 * 200) {
    return ElMessage.warning('文件不能超过200M')
  }
  const { fileType,modelValue } = props
  let { Data:value } = await reqUploadVideo({
    VideoFile: file,
    VideoType: fileType,
    IsRawFileName: false,
  })
  if (isArray(modelValue)) {
    value = [...modelValue, value]
  }
  $emit('update:modelValue', value)
}
</script>
<style scoped lang="scss">
.upload-btn {
  position: relative;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.files-item {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-top: 4px;
  a {
    width:100%;
    text-decoration: underline;
    color: #007bee;
    margin-right: 10px;
  }
  i {
    margin-right: 10px;
    color: #ee0000;
    background-color: #f2f2f2;
  }
}
</style>