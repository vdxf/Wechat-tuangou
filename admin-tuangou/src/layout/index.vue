<template>
  <div class="layout-view">
    <div class="left-nav">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#304156" text-color="#fff">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="right">
      <div class="home-tabbar">
        456
      </div>
      <div class="home-content">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'

import useUserStore from '@/stores/modules/user'
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.layout-view {
  width: 100%;
  height: 100vh;
  display: flex;
}
.left-nav {
  width: 210px;
  height: 100vh;
  background-color: #304156;
}
.right {
  flex: 1;
  position: relative;
}
.home-tabbar {
  position: fixed;
  top: 0;
  left: 210px;
  right: 0;
  height: 88px;
  z-index: 9;
  background-color: #fff;
}
.home-content {
  position: absolute;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f3f4;
  padding: 20px;
  overflow: auto;
}
.scrollbar {
  width: 100%;
  height: auto;
  color: #fff;
  .el-menu {
    border-right: 0;
  }
}
</style>