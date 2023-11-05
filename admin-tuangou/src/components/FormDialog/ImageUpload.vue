<template>
  <div class="image-content" >
    <label class="image-box">
      <el-icon v-if="!base64Url"><Plus /></el-icon>
      <div class="image-choose" v-else>
        <el-image 
          class="image-item"
          :src="base64Url"
          fit="cover"
          :preview-src-list="imgUrl"
          preview-teleported
        >
        </el-image>
        <el-icon @click.prevent="handleClose"><Close /></el-icon>
      </div>
      <input type="file" @change="handleUploadImage" style="opacity: 0;" :disabled="base64 !== ''"/>
    </label>
  </div>
</template>

<script setup lang="ts">
import { reqUploadImage } from '@/api/product';
import { ImageType } from '@/utils/enums';
import { ref } from 'vue';
const $emit = defineEmits(['update:modelValue'])
const base64Url = ref()
const base64 = ref<string>('')
const imgUrl = ref<string>('')
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
    imgUrl.value = res.Data
    $emit('update:modelValue', imgUrl.value)
  }
  reader.readAsDataURL(file)
}
const handleClose = () => {
  base64Url.value = ''
  base64.value = ''
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
    border-radius: 5px;
    input {
      width: 100%;
    }
    .image-item {
      display: block;
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
}
.image-choose {
  display: flex;
  position: relative;
  i {
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border: 2px solid #ff1010;
    border-radius: 50%;
    color: #ff1010;
    margin-top: -6px;
    margin-right: -6px;
  }
}
</style>