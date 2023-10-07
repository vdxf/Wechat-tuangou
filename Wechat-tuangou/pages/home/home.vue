<template>
  <view class="home-view">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="item in bannerList" :key="item.Id">
        <view class="swiper-item">
          <image :src="item.ImageUrl"></image>
        </view>
      </swiper-item>
    </swiper>
    <div class="content">
      <home-content></home-content>
    </div>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        bannerList: {},
      };
    },
    onLoad() {
      this.getBannerList()
    },
    methods: {
      async getBannerList(){
        const { data: res } =await wx.$http.post('/api/Banner/GetBannerList')
        if (res.Status !== 0){
          return wx.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.bannerList = res.Data
      },
    }
  }
</script>

<style lang="scss">
.home-view {
  height: 380rpx;
  background: linear-gradient(180deg, #FD3423 0%, rgba(253,52,35,0) 100%);
  padding: 20px 0;
}
swiper {
  height: 180rpx;
  padding: 0 20rpx;
  margin-bottom: 20rpx;
}
.swiper-item {
  width: 710rpx;
  height: 180rpx;
  border-radius: 10rpx;
  overflow: hidden;
  image {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
