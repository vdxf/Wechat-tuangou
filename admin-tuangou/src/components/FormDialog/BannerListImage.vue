<template>
 <div class="banner-content">
  <el-upload
    list-type="picture-card"
    :limit="props.max"
    :http-request="handleUpload"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    :on-preview="handPreview"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img style="width: 100%; height: 100%;" w-full :src="base64Url" alt="Preview Image" />
  </el-dialog>
 </div>
</template>
<script setup lang="ts">
import { reqUploadImage } from '@/api/product';
import { ImageType } from '@/utils/enums';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const dialogVisible = ref<boolean>(false)

const handleExceed = () => {
  ElMessage({
    type: 'error',
    message: `图片最多只能上传${props.max}张`
  })
}
const handPreview = () => {
  dialogVisible.value = true
}
//图片上传
const base64Url = ref()
const base64 = ref<string>()
const BannerList = ref<any>([])
const $emit = defineEmits(['update:modelValue'])
const props = defineProps(['max'])
const handleUpload = async (e:any) => {
  const file = e.file
  const reader = new FileReader()
  reader.onload = async e => {
    base64Url.value = e.target?.result
    base64.value = base64Url.value.replace(/.*;base64,/, '') as string
    const res =  await reqUploadImage({
      Basic: base64.value,
      ImageType: ImageType.GOODS,
      Suffix: `.jpeg`, 
    })
    const imgUrl = res.Data
    BannerList.value.push(imgUrl)
    const list = BannerList.value.join(';')
    $emit('update:modelValue', list)
  }
  reader.readAsDataURL(file)
}
const handleRemove = (e:any) => {
  console.log('e => ', e)
}
</script>
<style scoped lang="scss">
.banner-content {
  display: flex;
  img {
    display: block;
    width: 1000px;
    height: 100px;
    object-fit: cover;
  }
}
:deep(.el-dialog) {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

</style>