<template>
  <div class="price-input-number">
    <ElInputNumber
      :model-value="modelValue"
      :precision="precision"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <ElButton
      class="price-input-number-btn"
      icon="refresh"
      :loading="loading"
      @click="handleTransform"
    >
      换算
    </ElButton>
  </div>
</template>

<script setup lang="ts">
  import { reqExchangeRateInfo } from '@/api'
  import { useWithLoading } from '@/hooks'

  const emits = defineEmits(['update:modelValue'])

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

  const [loading, handleTransform] = useWithLoading(async () => {
    const { way, price } = props.getSource()
    const rate = await reqExchangeRateInfo({ way })
    emits('update:modelValue', price ? price * rate : 0)
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define';
  .price-input-number {
    @extend %df;
    @extend %aic;
  }
  .price-input-number-btn {
    margin-left: 10px;
  }
</style>
