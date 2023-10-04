<template>
  <view class="nav-box">
    <view class="new">
      新品区
    </view>
    <view class="add">
      加开区
    </view>
    <view class="day">
      日常区
    </view>
    <view class="more">
      展业包
    </view>
  </view>
</template>

<script>
  export default {
    name:"nav-list",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.nav-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>