<template>
  <div class="price-input-number">
    <ElInputNumber
      min="0"
      :model-value="modelValue"
      :precision="precision"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <ElButton
      class="price-input-number-btn"
      icon="refresh"
      @click="handleChange"
    >
      换算
    </ElButton>
  </div>
</template>

<script setup lang="ts">
  import { reqGetExchangeRate } from '@/api/product/index'
  const $emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Number,
      default: null,
    },
    getSource: {
      type: Function,
      default: () => ({}),
    },
    precision: {
      type: Number,
      default: 0,
    },
  })
  const handleChange = async () => {
    const { way, price } = props.getSource()
    const {Data: rate} = await reqGetExchangeRate({ way })
    $emit('update:modelValue', price ? price * rate : 0)
  }
</script>
<style scoped lang="scss">
.price-input-number {
  width: 100%;
  display: flex;
  .el-input-number {
    width: 70%;
  }
} 
.price-input-number-btn {
  width: 80px;
  margin-left: 10px;
}
</style>