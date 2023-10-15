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
        </ElRow>
      </template>
    </ElTableColumn>

    <ElTableColumn prop="Name" label="名称" width="240px" show-overflow-tooltip />
    <ElTableColumn label="开团时间" show-overflow-tooltip>
      <template #default="scope">
        开团时间：{{ formatDate(scope.row.GroupDate) }} ~
        {{ formatDate(scope.row.GroupEndDate) }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="创建时间" width="180px">
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
  import { doOpenGroupAddedUpdate, doOpenGroupDelete, reqOpenGroupList } from '@/api'
  import { useProDialogForm, useProTable } from '@/components'
  import type { TagItem } from '@/types'
  import { formatDate, getDayMillisecond } from '@daysnap/utils'

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
      const { Data, Count } = await reqOpenGroupList({ PageIndex, PageSize, ...query })
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
        width: '100%',
        get: (v) => {
          const [GroupDate, GroupEndDate] = v
          return { GroupDate, GroupEndDate }
        },
        set: (d, f) => {
          const { GroupDate, GroupEndDate } = d
          if (GroupDate && GroupEndDate) {
            f.value = [GroupDate, GroupEndDate]
          }
        },
        props: {
          type: 'datetimerange',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          defaultTime: new Date(2000, 1, 1, 10, 0, 0),
        },
        rules: [{ required: true, message: '请选择开团日期', trigger: 'blur' }],
      },
    }),
    async (metadata, withBanana, item) => {
      await proDialogFormInstance.value.show({
        title: item ? '编辑开团' : '新增开团',
        metadata,
        request: withBanana(async (params) => doOpenGroupAddedUpdate({ ...item, ...params })),
      })
      proTableInstance.value.reload()
      ElMessage.success('操作成功')
    },
  )

  // 删除
  const handleDelete = async (item: TagItem) => {
    await ElMessageBox.confirm(`确认删除该数据？`)

    const { Id } = item
    await doOpenGroupDelete({ Id })
    proTableInstance.value.reload()
  }
</script>
