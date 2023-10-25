<template>
  <div class="list-view">
    <div class="list-header">
      <h2>列表</h2>
      <div class="btn-group">
        <el-button plain :icon="RefreshRight" :loading="loading" @click="$emit('request', {})">刷新</el-button>
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="list-content">
      <slot name="table" :data="data">
        <el-table :data="data">
          <slot></slot>
        </el-table>
      </slot>
    </div>
    <el-pagination
      v-model:current-page="pageIndex"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="$emit('request', { pageIndex: $event })"
      @size-change="$emit('request', { pageSize: $event, pageIndex: 1 })"
    />
  </div>
</template>
<script lang="ts" setup>
import { RefreshRight } from '@element-plus/icons-vue'
import { ref } from 'vue'
defineProps(['data', 'total', 'loading'])

const pageIndex = ref<number>(1) 
const pageSize = ref<number>(10) 
</script> 
<style scoped lang="scss">
.main-view {
  height: 100%;
}
.list-view {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  min-height: 330px;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h2 {
    font-size: 16px;
    font-weight: 600;
  }
}
.el-pagination {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
}
</style>