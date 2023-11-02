<template>
  <TableForm @search="handleSearch"></TableForm>
  <TablePagination :data="Data" :total="Count" @request="handleReqTableList">
    <template #actions>
        <slot name="actions"> </slot>
      </template>
      <template #table="scope">
        <slot name="table" :data="scope.data"></slot>
      </template>
      <slot></slot>
  </TablePagination>
</template>
<script lang="ts">
  export default {
    name: 'TableView'
  }
</script>

<script lang="ts" setup>
import TableForm from './TableForm.vue'
import TablePagination from './TablePagination.vue'
import { ref, onBeforeMount } from 'vue'
const Data = ref()
const Count = ref()
const $emit = defineEmits(['request'])
const currenPage = ref<number>(1)
onBeforeMount(() => {
  $emit('request', [1, 10])
})
const setData = (e:any) => {
 Data.value = e[0]
 Count.value = e[1]
}
const handleSearch = (value:any) => {
  if (value.date){
    value.StartDate = value.date[0]
    value.EndDate = value.date[1]
  }
  $emit('request', [1, 10], value)
}
const handleReqTableList = async (e:any) => {
  if (e.pageIndex){
    currenPage.value = e.pageIndex
  }
  $emit('request', [currenPage.value, e.pageSize || 10])
}
defineExpose({
  setData,
  handleReqTableList
})
</script>

<style scoped lang="scss"></style>