<template>
  <Table @request="handleRequest" :data="data">
    <template #actions>
      <el-button type="primary" plain :icon="Plus" @click="handleAddedOrUpdate">新增</el-button>
    </template>

    <ElTableColumn type="expand">
      <template #default="scope">
        <ElRow :gutter="20">
          <ElCol :span="12">
            <span>Id</span>
            <span>{{ scope.row.Id }}</span>
          </ElCol>
          <ElCol :span="12">
            <span>排序</span>
            <span>{{ scope.row.Sort }}</span>
          </ElCol>
        </ElRow>
      </template>
    </ElTableColumn>

    <ElTableColumn prop="Name" label="名称" show-overflow-tooltip />
    <ElTableColumn prop="SimpleName" label="简称" show-overflow-tooltip />
    <ElTableColumn label="创建时间" show-overflow-tooltip>
      <template #default="scope">
        {{ scope.row.CreatedDate }}
      </template>
    </ElTableColumn>

    <ElTableColumn fixed="right" label="操作" width="120">
      <template #default="scope">
        <ElButton link type="primary" @click="handleAddedOrUpdate(scope.row)">编辑</ElButton>
        <ElButton link type="danger" @click="handleDelete(scope.row)">删除</ElButton>
      </template>
    </ElTableColumn>
  </Table>
  <FormDialog :show="dialogShow" :formData="formData" ref="formDialog" @cancle="handleCancle" @submit="handleSubmit"></FormDialog>
</template>
<script lang="ts" setup>
import FormDialog from '@/components/FormDialog/index.vue'
import { Plus } from '@element-plus/icons-vue'
import { reqBuyGroupList, reqPostBuyGroup } from '@/api/product';
import Table from '@/components/Table/TableView.vue'
import { reactive, ref } from 'vue'
const data = ref()
const handleRequest = async ([PageIndex, PageSize], query) => {
 const { Data:res } = await reqBuyGroupList({PageIndex, PageSize, ...query})
 data.value = [res.Data, res.Count]
}
//新增 / 编辑
const dialogShow = ref<boolean>(false)
const handleAddedOrUpdate = (e?:any) => {
  dialogShow.value = true
}
//删除
const handleDelete = (e:any) => {
  console.log('e => ', e)
}
const handleCancle = () => {
  dialogShow.value = false
}
const handleSubmit = async () => {
  const query = Object.entries(formData)
  await reqPostBuyGroup({...query})
  dialogShow.value = false
}
const formData = reactive({
  Name: {
    label: '名称',
    value: '',
    is: 'form-input',
    props: {
      placeholder: '请填写名称',
    },
    rules: [{ required: true, message: '请填写名称' }],
  },
  SimpleName: {
    label: '简称',
    value: '',
    is: 'form-input',
    props: {
      placeholder: '请填写简称',
    },
    rules: [{ required: true, message: '请填写简称' }],
  },
  Sort: {
    label: '排序',
    value: 1,
    is: 'form-input-number',
    rules: [{ required: true, message: '请填写排序' }],
  },
})
</script>
<style scoped lang="scss">
@import '@/assets/sass/global.scss';
</style>