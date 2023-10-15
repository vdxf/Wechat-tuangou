<template>
  <ProTable :request="handleRequest" :query-metadata="queryMetadata" ref="proTableInstance">
    <template #actions>
      <ElButton type="primary" plain icon="Plus" @click="handleAddedOrUpdate()">新增</ElButton>
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
        {{ formatDate(scope.row.CreatedDate) }}
      </template>
    </ElTableColumn>

    <ElTableColumn fixed="right" label="操作" width="120">
      <template #default="scope">
        <ElButton link type="primary" @click="handleAddedOrUpdate(scope.row)">编辑</ElButton>
        <ElButton link type="danger" @click="handleDelete(scope.row)">删除</ElButton>
      </template>
    </ElTableColumn>
  </ProTable>

  <ProDialogForm ref="proDialogFormInstance" />
</template>

<script setup lang="ts">
  import { doGroupAddedUpdate, doGroupDelete, reqGroupList } from '@/api'
  import { useProDialogForm, useProTable } from '@/components'
  import type { GroupItem } from '@/types'
  import { formatDate } from '@daysnap/utils'

  // 列表
  const [queryMetadata, proTableInstance, handleRequest] = useProTable(
    {
      Keywords: {
        is: 'form-input',
        value: '',
        props: {
          placeholder: '请填写搜索关键词',
        },
      },
    },
    async ([PageIndex, PageSize], query) => {
      const { Data, Count } = await reqGroupList({ PageIndex, PageSize, ...query })
      return [Data, Count]
    },
  )

  // 编辑 or 新增
  const [proDialogFormInstance, handleAddedOrUpdate] = useProDialogForm<GroupItem>(
    () => ({
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
    }),
    async (metadata, withBanana, item) => {
      await proDialogFormInstance.value.show({
        title: item ? '编辑分组' : '新增分组',
        metadata,
        request: withBanana(async (params) => doGroupAddedUpdate({ ...item, ...params })),
      })
      proTableInstance.value.reload()
      ElMessage.success('操作成功')
    },
  )

  // 删除
  const handleDelete = async (item: GroupItem) => {
    await ElMessageBox.confirm(`确认删除该数据？`)

    const { Id } = item
    await doGroupDelete({ Id })
    proTableInstance.value.reload()
  }
</script>
