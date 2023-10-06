<template>
  <view>
     <view class="search-box">
       <van-search v-model="keyword" background="transparent" placeholder="请输入关键词搜索" use-action-slot bind:search="onSearch" shape="round">
         <view class="search-btn" slot="action" bind:tap="onClick">搜索</view>
       </van-search>
     </view> 
     <view class="search-result">
       <text>暂未找到相关商品，为您推荐更多内容</text>
     </view>
     <search-content></search-content>
  </view>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
     onSearch() {
       console.log('搜索' + this.data.value);
     },
     onClick() {
       console.log('搜索' + this.data.value);
     },
    }
  }
</script>

<style lang="scss">
  page {
    background: linear-gradient(#f5f5f5 0%, rgba(245, 245, 245, 0) 100%);
  }
.search-box {
  background-color: #f5f5f5;
  padding-right: 20rpx;
  position: sticky;
  top: 0;
  z-index: 2;
}
.van-search__content {
  border: 1px solid #ccc;
  position: relative;
  height: 72rpx;
  padding-right: 150rpx;
}
.search-btn {
  position: absolute;
  right: 26rpx;
  top: 26rpx;
  z-index: 2;
  background-color: #F0190F;
  color: #fff;
  height: 64rpx;
  width: 128rpx;
  text-align: center;
  border-radius: 32rpx;
}
.search-result {
  height: 40rpx;
  font-size: 24rpx;
  color: #999999;
  line-height: 40rpx;
  padding: 0 40rpx;
  margin-bottom: 20rpx;
}
</style>
