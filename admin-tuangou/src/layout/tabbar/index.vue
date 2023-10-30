<template>
  <div class="tabber-view">
    <div class="tabbar-content">
      <el-icon class="change" size="20" @click="handleChangeIcon">
        <component :is="TabbarSetting.fold ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <div class="tabber-inner">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index" v-show="item.meta.title">
            <span>{{ item.meta.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="tabber-right">
          <el-button size="default" style="border: none;" @click="handleScreenFull">
            <el-icon size="20"><FullScreen /></el-icon>
          </el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="../../assets/image/login.jpg">
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLoginOut">安全退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="tabber-history" ref="refTags">
      <el-tabs type="card" class="tabber-item" closable :model-value="route.path" @tab-remove="handleRemoveTab" @tab-change="handleChangeTab">
        <el-tab-pane v-for="item in historyList" :key="item.path" :name="item.path" style="height: 30px;">
          <template #label>
            <span @contextmenu.prevent="handleContentMenu(item, $event)">
              {{ item?.meta?.title }}
            </span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useTabbarStore from '@/stores/modules/tabbar'
import { reactive, ref, watch } from 'vue';

const TabbarSetting = useTabbarStore() 
const handleChangeIcon = () => {
  TabbarSetting.fold = !TabbarSetting.fold
}
const handleScreenFull = () => {
  const full = document.fullscreenElement // 判断当前是否为全屏
  //切换全屏
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import useUserStore from '@/stores/modules/user'
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const handleLoginOut = async () => {
  await userStore.userLoginOut()
  router.replace('/login')
}

const position = reactive({ left: 0, top: 0, visible: false })
const refTags = ref<HTMLElement>()
const selectedTag = ref<RouteLocationNormalizedLoaded>()
const handleContentMenu = (tag: RouteLocationNormalizedLoaded, event: MouseEvent) => {
  selectedTag.value = tag
  if (refTags.value) {
    const menuMinWidth = 105
    const offsetLeft = refTags.value.getBoundingClientRect().left
    const { offsetWidth, offsetHeight } = refTags.value
    const maxLeft = offsetWidth - menuMinWidth
    const left = event.clientX - offsetLeft + 15
    position.left = left > maxLeft ? maxLeft : left
    position.top = event.clientY - offsetHeight
    position.visible = true
  }
}
const historyList = ref<Array<RouteLocationNormalizedLoaded>>([])
watch(
  route, 
  (value) => {
    if (!historyList.value.find((item) => item.path === value.path)) {
      historyList.value.push(Object.assign({}, value))
    }
  },
  { immediate: true }
)
const handleChangeTab = (path?: any) => {
  if(Array.isArray(path)) {
    historyList.value = []
  } else {
    const tag = historyList.value.find((item) => item.path === path)
    if (tag) {
      router.push(tag)
    }
  }
}
const handleRemoveTab = (path: any) => {
  selectedTag.value = { path } as any
  handleClose()
}
const handleClose = () => {
    historyList.value = historyList.value.filter((item) => item.path !== selectedTag.value?.path)
    const latestTag = historyList.value.slice(-1)[0]
    if (latestTag) {
      router.push(latestTag)
    } else {
      router.replace('/')
    }
  }
</script>
<style lang="scss" scoped>
.tabber-view {
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
  position: relative;
  box-shadow: 0 1px 1px 0 #f6f6f6 inset;
  padding: 5px 10px 0;
  :deep(.el-tabs) {
    --el-tabs-header-height: 32px;
  }
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
  :deep(.el-tabs__nav) {
    border: none;
  }
  :deep(.el-tabs__item) {
    user-select: none;
    overflow: hidden;
    padding: 0 24px !important;
    margin-right: -15px;
    border: 0;
    font-size: 13px;
    font-weight: 400;
    &:hover {
      color: #515a6e;
      background: #dee1e6;
    }
  }
  :deep(.is-icon-close){
    width: 14px !important;
  }
}
</style>