<template>
  <div class="logo-view">
    <img :src="setting.logo">
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>
<style lang="scss" scoped>
.logo-view {
  height: 50px;
  background-color: #2b2f3a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: block;
    width: 30px;
    height: 30px;
  }
  p {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
  }
}
</style>