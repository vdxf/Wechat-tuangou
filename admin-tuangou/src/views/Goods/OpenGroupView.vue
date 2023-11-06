<template>
  <Table @request="handleRequest" ref="childRef">
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
        </ElRow>
      </template>
    </ElTableColumn>

    <ElTableColumn prop="Name" label="名称" show-overflow-tooltip />
    <ElTableColumn label="开团时间" show-overflow-tooltip>
      <template #default="scope">
        开团时间：{{ formatDate(scope.row.GroupDate) }} ~
        {{ formatDate(scope.row.GroupEndDate) }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="创建时间" show-overflow-tooltip>
      <template #default="scope">
        {{ formatDate(scope.row.CreatedDate) }}
      </template>
    </ElTableColumn>

    <ElTableColumn fixed="right" label="操作" width="120">
      <template #default="scope">
        <ElButton link type="primary" @click="handleAddedOrUpdate(scope.row)">编辑</ElButton>
        <ElButton link type="danger" @click="handleDelete(scope.row)">删除</ElButton>
      </template>
    </ElTableColumn>
  </Table>
  <FormDialog :show="dialogShow" :title="title" :Id="Id" :formData="formData" ref="formDialog" @cancle="handleCancle" @submit="handleSubmit"></FormDialog>
</template>
<script lang="ts" setup>
import { formatDate, getDayMillisecond } from '@daysnap/utils'
import FormDialog from '@/components/FormDialog/index.vue'
import { Plus } from '@element-plus/icons-vue'
import { reqOpenGroupList, reqPostOpenGroup, reqDeleteOpenGroup } from '@/api/product';
import Table from '@/components/Table/TableView.vue'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';

const childRef = ref()
const title = ref<string>('')
const Id = ref<number>()
const handleRequest = async ([PageIndex, PageSize]:any, query:any) => {
 const { Data:res } = await reqOpenGroupList({PageIndex, PageSize, ...query})
 childRef.value.setData([res.Data, res.Count])
}
//新增 / 编辑
const dialogShow = ref<boolean>(false)
const handleAddedOrUpdate = (e?:any) => {
  title.value = e.Id ? '编辑' : '新增' 
  if (e.Id) {
    Id.value = e.Id
    const groupData = ref<any>([])
    Object.entries(e).forEach(([key, value]) => {
      console.log('key => ', key)
      if (key === 'GroupDate') {
        groupData.value[0] = value as string
      } else if (key === 'GroupEndDate') {
        groupData.value[1] = value as string
      }
      if (formData[key] && formData[key] !== 'GroupDate') {
        formData[key].value = value
      }
    })
    formData.GroupDate.value = groupData.value
  }
  dialogShow.value = true
}
//删除
const handleDelete = async (e:any) => {
  ElMessageBox.confirm(
    '您确认要删除此项吗？',
    '温馨提示！',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(async () => {
    await reqDeleteOpenGroup({Id: e.Id})
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    childRef.value.handleReqTableList([1,10])
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  })
}
const handleCancle = () => {
  Id.value = undefined
  Object.entries(formData).forEach(([key]) => {
    formData[key].value = ''
  })
  dialogShow.value = false
}
const handleSubmit = async (query: any, Id:any) => {
  query.GroupEndDate = query.GroupDate[1]
  query.GroupDate = query.GroupDate[0]
  await reqPostOpenGroup({...query, Id})
  childRef.value.handleReqTableList([1,10])
  dialogShow.value = false
  ElMessage.success('操作成功')
}
const formData = reactive<any>({
  Name: {
    label: '名称',
    value: '',
    is: 'form-input',
    props: {
      placeholder: '请填写名称',
    },
    rules: [{ required: true, message: '请填写名称' }],
  },
  GroupDate: {
    label: '开团日期',
    value: (() => {
      const datetime = Date.now()
      const min = formatDate(datetime + getDayMillisecond(1), 'yyyy-MM-dd')
      const max = formatDate(datetime + getDayMillisecond(4), 'yyyy-MM-dd')
      return [`${min} 10:00:00`, `${max} 10:00:00`]
    })(),
    is: 'form-date-picker',
    props: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      defaultTime: new Date(2000, 1, 1, 10, 0, 0),
    },
    rules: [{ required: true, message: '请选择开团日期', trigger: 'blur' }],
  },
})
</script>
<style scoped lang="scss">
@import '@/assets/sass/global.scss';
</style>