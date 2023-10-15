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
    <ElTableColumn prop="Sort" label="排序" show-overflow-tooltip />
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
  import { doBrandAddedUpdate, doBrandDelete, reqBrandList } from '@/api'
  import { useProDialogForm, useProTable } from '@/components'
  import type { TagItem } from '@/types'
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
      const { Data, Count } = await reqBrandList({ PageIndex, PageSize, ...query })
      return [Data, Count]
    },
  )

  // 编辑 or 新增
  const [proDialogFormInstance, handleAddedOrUpdate] = useProDialogForm<TagItem>(
    () => ({
      Name: {
        label: '名称',
        value: '',
        is: 'form-input',
        props: {
          maxlength: 4,
          placeholder: '请填写名称',
        },
        rules: [{ required: true, message: '请填写名称' }],
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
        title: item ? '编辑品牌' : '新增品牌',
        metadata,
        request: withBanana(async (params) => doBrandAddedUpdate({ ...item, ...params })),
      })
      proTableInstance.value.reload()
      ElMessage.success('操作成功')
    },
  )

  // 删除
  const handleDelete = async (item: TagItem) => {
    await ElMessageBox.confirm(`确认删除该数据？`)

    const { Id } = item
    await doBrandDelete({ Id })
    proTableInstance.value.reload()
  }
</script>
