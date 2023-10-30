<template>
  <Table @request="handleRequest" :data="data">
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
        {{ scope.row.GroupDate }} ~ {{ scope.row.GroupEndDate }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="创建时间" show-overflow-tooltip>
      <template #default="scope">
        {{ scope.row.CreatedDate }}
      </template>
    </ElTableColumn>
  </Table>
</template>
<script lang="ts" setup>
import { reqClickList } from '@/api/product';
import Table from '@/components/Table/TableView.vue'
import { ref } from 'vue';

const data = ref()
const handleRequest = async ([PageIndex, PageSize], query) => {
 const { Data:res } = await reqClickList({PageIndex, PageSize, ...query})
 data.value = [res.Data, res.Count]
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/global.scss';
</style>