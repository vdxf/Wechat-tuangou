<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
  <el-radio-button :label="false">新友团管理平台</el-radio-button>
  <el-radio-button :label="true">collapse</el-radio-button>
</el-radio-group>
<el-menu
  default-active="2"
  class="el-menu-vertical-demo"
  :collapse="isCollapse"
  @open="handleOpen"
  @close="handleClose"
>
  <el-menu-item index="1">
    <el-icon><icon-menu /></el-icon>
    <template #title>主页</template>
  </el-menu-item>
  <el-sub-menu index="2">
    <template #title>
      <el-icon><location /></el-icon>
      <span>商品管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="1-1">商品列表</el-menu-item>
      <el-menu-item index="1-2">分组列表</el-menu-item>
      <el-menu-item index="1-3">标签列表</el-menu-item>
      <el-menu-item index="1-4">品牌列表</el-menu-item>
      <el-menu-item index="1-5">开团列表</el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>
  
  <el-menu-item index="3">
    <el-icon><document /></el-icon>
    <template #title>Banner管理</template>
  </el-menu-item>
  <el-sub-menu index="4">
    <template #title>
      <el-icon><location /></el-icon>
      <span>数据中心</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="1-1">商品分享</el-menu-item>
      <el-menu-item index="1-2">商品点击</el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>
</el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>