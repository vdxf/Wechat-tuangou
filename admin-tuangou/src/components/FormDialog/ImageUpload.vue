<template>
  <div class="image-content" >
    <label class="image-box">
      <el-icon v-if="!base64Url"><Plus /></el-icon>
      <div class="image-choose">
        <img v-if="base64Url" :src="base64Url" />
      </div>
      <input type="file" @change="handleUploadImage" style="opacity: 0;"/>
    </label>
  </div>
</template>

<script setup lang="ts">
import { reqUploadImage } from '@/api/product';
import { ImageType } from '@/utils/enums';
import { ref } from 'vue';
const $emit = defineEmits(['update:modelValue'])
const base64Url = ref()
const base64 = ref<string>()
const handleUploadImage = async (event:any) => {
  const file = event.target.files[0]
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
    $emit('update:modelValue', imgUrl)
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped lang="scss">
.image-content {
  width: 100%;
  height: 100%;
  .image-box {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed #ccc;
    border-radius: 10px;
    input {
      width: 100%;
    }
    img {
      display: block;
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
}
</style>