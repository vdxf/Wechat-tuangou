<template>
  <div class="main-view">
    <Header v-if="route.path !== '/home'"></Header>
    <div class="list-view">
      <div class="list-header">
        <h2>列表</h2>
        <div class="btn-group">
          <el-button>刷新</el-button>
          <el-button type="warning" plain :icon="Edit">批量处理</el-button>
          <el-button type="primary" plain :icon="Plus">新增</el-button>
        </div>
      </div>
      <div class="list-content">
        <RouterView v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/contant-header/index.vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script> 
<style scoped lang="scss">
.main-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list-view {
  flex: 1;
  background-color: #fff;
  padding: 20px;
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