<template>
  <div class="main-view"  v-if="route.path !== '/home'">
    <Header></Header>
    <div class="list-view">
      <div class="list-header">
        <h2>列表</h2>
        <div class="btn-group">
          <el-button :icon="RefreshRight">刷新</el-button>
          <el-button type="warning" plain :icon="Edit" v-if="route.path === '/goods/productList'">批量处理</el-button>
          <el-button type="primary" plain :icon="Plus" v-if="!route.path.includes('/data')">新增</el-button>
        </div>
      </div>
      <div class="list-content">
        <RouterView v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/contant-header/index.vue'
import { Plus, Edit, RefreshRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()
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
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
}
</style>