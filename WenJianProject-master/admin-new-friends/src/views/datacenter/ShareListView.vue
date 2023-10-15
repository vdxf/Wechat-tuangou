<template>
  <ProTable :request="handleRequest" :query-metadata="queryMetadata" ref="proTableInstance">
    <ElTableColumn type="expand">
      <template #default="scope">
        <ElRow :gutter="20">
          <ElCol :span="12">
            <span>Id</span>
            <span>{{ scope.row.Id }}</span>
          </ElCol>
          <ElCol :span="12">
            <span>商品ID</span>
            <span>{{ scope.row.ProductId }}</span>
          </ElCol>
          <ElCol :span="12">
            <span>OpenId</span>
            <span>{{ scope.row.OpenId }}</span>
          </ElCol>
          <ElCol :span="12">
            <span>IP</span>
            <span>{{ scope.row.IP }}</span>
          </ElCol>
          <ElCol :span="12">
            <span>排序</span>
            <span>{{ scope.row.Sort }}</span>
          </ElCol>
        </ElRow>
      </template>
    </ElTableColumn>

    <ElTableColumn prop="OpenId" label="OpenId" show-overflow-tooltip />
    <ElTableColumn prop="Name" label="商品名称" show-overflow-tooltip />
    <ElTableColumn prop="ProductImageUrl" label="图片">
      <template #default="scope">
        <ElImage
          style="width: 40px; height: 40px"
          :src="scope.row.ProductImageUrl"
          :preview-src-list="[scope.row.ProductImageUrl]"
          fit="cover"
          preview-teleported
        />
      </template>
    </ElTableColumn>
    <ElTableColumn label="开团日期" show-overflow-tooltip>
      <template #default="scope">
        {{ formatDate(scope.row.GroupDate) }} ~ {{ formatDate(scope.row.GroupEndDate) }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="创建时间" show-overflow-tooltip>
      <template #default="scope">
        {{ formatDate(scope.row.CreatedDate) }}
      </template>
    </ElTableColumn>
  </ProTable>
</template>

<script setup lang="ts">
  import { reqDataCenterShareList } from '@/api'
  import { useProTable } from '@/components'
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
      date: {
        is: 'form-date-picker',
        value: [],
        get: (v) => {
          const [StartDate, EndDate] = v
          return { StartDate, EndDate }
        },
        props: {
          type: 'datetimerange',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
        },
      },
      GroupDate: {
        is: 'form-date-picker',
        value: '',
        props: {
          type: 'datetime',
          placeholder: '开团时间',
        },
      },
    },
    async ([PageIndex, PageSize], query) => {
      const { Data, Count } = await reqDataCenterShareList({ PageIndex, PageSize, ...query })
      return [Data, Count]
    },
  )
</script>
