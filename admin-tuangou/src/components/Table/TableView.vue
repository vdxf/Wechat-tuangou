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
const props = defineProps(['data'])
onBeforeMount(() => {
  $emit('request', [1, 10])
  setData()
})
const setData = () => {
  setTimeout(() => {
    Data.value = props.data[0]
    Count.value = props.data[1]
  },1000)
}
const handleSearch = (value:any) => {
  if (value.date){
    value.StartDate = value.date[0]
    value.EndDate = value.date[1]
  }
  $emit('request', [1, 10], value)
  setData()
}
const handleReqTableList = async (e:any) => {
  $emit('request', [e.pageIndex || 1, e.pageSize || 10])
  setData()
}
defineExpose({
  handleReqTableList
})
</script>

<style scoped lang="scss"></style>