<template>
  <div class="tabber-view">
    <div class="tabbar-content">
      <el-icon class="change" size="20" @click="handleChangeIcon">
        <component :is="TabbarSetting.fold ? 'Fold' : 'Expand'"></component>
      </el-icon>
      <div class="tabber-inner">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="tabber-right">
          <el-button size="default" style="border: none;">
            <el-icon size="20"><FullScreen /></el-icon>
          </el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="../../assets/image/login.jpg">
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>安全退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="tabber-history">111111
    </div>
  </div>
</template>
<script lang="ts" setup>
import useTabbarStore from '@/stores/modules/tabbar'
const TabbarSetting = useTabbarStore() 
import { ref } from 'vue'
const fold = ref(false)
const handleChangeIcon = () => {
  TabbarSetting.fold = !TabbarSetting.fold
}
</script>
<style lang="scss" scoped>
.tabber-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tabbar-content {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  .change {
    width: 50px;
    height: 50px;
  }
}
.tabber-inner {
  flex: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.tabber-right {
  display: flex;
  align-items: center;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    img {
      display: block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin: 0 10px;
    }
  }
}
.tabber-history {
  display: flex;
  align-items: center;
  padding: 5px 20px 0 20px;
}
</style>