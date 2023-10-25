<template>
  <TableForm @search="handleSearch" :loading="loading"></TableForm>
  <TablePagination :data="data" :total="total" :loading="loading" @request="handleReqTableList">
    <template #actions>
        <slot name="actions"> </slot>
      </template>
      <template #table="scope">
        <slot name="table" :data="scope.data"></slot>
      </template>
      <slot></slot>
  </TablePagination>
</template>

<script lang="ts" setup>
import TableForm from './TableForm.vue'
import TablePagination from './TablePagination.vue'
import { ref,onBeforeMount } from 'vue'
import { reqProductList } from '@/api/product/index'
import type { ProductModel, GetProductListResponse } from '@/api/product/type'

const data = ref<ProductModel[]>()
const total = ref<number>()
const loading = ref<boolean>(false)
onBeforeMount(() => {
  reqGoodsList(1)
})
const handleSearch = (value:any) => {
  reqGoodsList(1, 10, value)
}
const handleReqTableList = async (e?:any) => {
  reqGoodsList(e.pageIndex, e.pageSize)
}
const reqGoodsList = async (pageIndex:number, pageSize?:number, value?: any) => {
  loading.value = true
  const { Data:res }:GetProductListResponse = await reqProductList({
    PageIndex: pageIndex,
    PageSize: pageSize || 10,
    Keywords: value?.input || '',
    BuyGroupId: value?.value1 || '',
    IsShelfed: value?.value2 || '',
    StartDate: value?.startDate[0] || '',
    EndDate: value?.startDate[1] || '',
    GroupDate: value?.openDate || '',
  })
  data.value = res.Data
  total.value = res.Count
  loading.value = false
}
</script>

<style scoped lang="scss"></style>