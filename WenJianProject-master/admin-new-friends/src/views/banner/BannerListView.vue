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
            <span>小程序AppId</span>
            <span>{{ scope.row.AppId }}</span>
          </ElCol>
          <ElCol :span="12">
            <span>页面路径/URL</span>
            <span>{{ scope.row.PagePath }}</span>
          </ElCol>
          <ElCol :span="12">
            <span>排序</span>
            <span>{{ scope.row.Sort }}</span>
          </ElCol>
        </ElRow>
      </template>
    </ElTableColumn>

    <ElTableColumn prop="Name" label="名称" show-overflow-tooltip />
    <ElTableColumn label="类型" show-overflow-tooltip>
      <template #default="scope">
        {{ parseText(BANNER_TYPE, scope.row.BannerType) }}
      </template>
    </ElTableColumn>
    <ElTableColumn prop="ImageUrl" label="图片">
      <template #default="scope">
        <ElImage
          style="width: 40px; height: 40px"
          :src="scope.row.ImageUrl"
          :preview-src-list="[scope.row.ImageUrl]"
          fit="cover"
          preview-teleported
        />
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
  </ProTable>

  <ProDialogForm ref="proDialogFormInstance" />
</template>

<script setup lang="ts">
  import { doBannerAddedUpdate, doBannerDelete, reqBannerList } from '@/api'
  import { useProDialogForm, useProTable } from '@/components'
  import type { BannerItem } from '@/types'
  import { BANNER_TYPE, BannerType, ImageType, parseText } from '@/utils'
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
      const { Data, Count } = await reqBannerList({ PageIndex, PageSize, ...query })
      return [Data, Count]
    },
  )

  // 编辑 or 新增
  const [proDialogFormInstance, handleAddedOrUpdate] = useProDialogForm<BannerItem>(
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
      BannerType: {
        label: '类型',
        value: BannerType.H5,
        is: 'form-radio',
        options: [...BANNER_TYPE],
        rules: [{ required: true, message: '请选择类型' }],
      },
      ImageUrl: {
        label: '图片(710 * 180)',
        value: '',
        is: 'form-image-upload',
        props: {
          imageType: ImageType.GOODS,
        },
        rules: [{ required: true, message: '请选择商品图片', trigger: 'blur' }],
      },
      AppId: {
        label: '小程序AppId',
        value: '',
        is: 'form-input',
        hidden: (_, __, metadata) => {
          return metadata.BannerType.value !== BannerType.MINI
        },
        props: {
          placeholder: '请填写小程序AppId',
        },
        rules: [{ required: true, message: '请填写小程序AppId' }],
      },
      PagePath: {
        label: '页面路径/URL',
        value: '',
        is: 'form-input',
        props: {
          placeholder: '请填写页面路径/URL',
        },
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
        title: item ? '编辑Banner' : '新增Banner',
        metadata,
        request: withBanana(async (params) => doBannerAddedUpdate({ ...item, ...params })),
      })
      proTableInstance.value.reload()
      ElMessage.success('操作成功')
    },
  )

  // 删除
  const handleDelete = async (item: BannerItem) => {
    await ElMessageBox.confirm(`确认删除该数据？`)

    const { Id } = item
    await doBannerDelete({ Id })
    proTableInstance.value.reload()
  }
</script>
