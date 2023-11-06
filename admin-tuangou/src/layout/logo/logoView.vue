<template>
  <div class="logo-view">
    <Transition name="layout-sidebar-logo-fade">
      <RouterLink to="/" key="fold" v-if="LayoutSetting.fold">
        <img src="@/assets/image/logo.png" alt="logo" />
      </RouterLink>
      <RouterLink key="expand" v-else to="/">
        <img src="@/assets/image/logo.png" alt="logo" />
        <span>{{ setting.title }}</span>
      </RouterLink>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useTabbarStore from '@/stores/modules/tabbar'
const LayoutSetting = useTabbarStore()
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
    width: 30px;
    height: 30px;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    color: #fff;
  }
  span {
    margin-left: 10px;
  }
}
.layout-sidebar-logo-fade-enter-active {
    transition: opacity 0.3s;
  }
  .layout-sidebar-logo-fade-enter-from,
  .layout-sidebar-logo-fade-leave-to {
    opacity: 0;
  }
</style>