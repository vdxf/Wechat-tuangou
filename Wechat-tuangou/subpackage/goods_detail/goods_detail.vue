<template>
  <view class="detail-view">
    <uni-icons class="back" type="arrowleft" size="24" @click=""></uni-icons>
    <view class="top-image">
      <image :src="goodsDetail.ProductImageUrl" mode="widthFix"></image>
    </view>
    <view class="goods-title">
      <view class="goods-name">
        <text>{{goodsDetail.Name}}</text>
      </view>
      <view class="goods-title-buttom">
        <view class="new">
          <image src="../../static/image/shandian.png"></image>
          <text>新品首团</text>
        </view>
        <view class="welfare">
          <text>福利品</text>
        </view>
      </view>
    </view>
    <view class="goods-detail-cart">
      <text class="cart-title">商品详情</text>
      <view class="cart-content" v-if="close">
        <view class="cart-item" v-for="item in 8" :key="item">
          <text class="left">品牌</text>
          <text class="right">轩妈</text>
        </view>
      </view>
      <view class="cart-close">
         <text>{{close ? '收起' : '展开'}}</text>
         <uni-icons type="arrowup" v-if="close" @click="close = !close"></uni-icons>
         <uni-icons type="arrowdown" v-else @click="close = !close"></uni-icons>
      </view>
    </view>
    <view class="goods-capture">
      <view class="capture-title">团品实拍</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        Id: '',
        goodsDetail: {},
        close: true,
      };
    },
    onLoad(options) {
      this.Id = options.id
      this.getGoodsDetail()
    },
    methods: {
      async getGoodsDetail(){
        const { data: res } = await wx.$http.get('/api/Product/GetProductInfo?id=' + this.Id)
        this.goodsDetail = res.Data
      }
    }
  }
</script>

<style lang="scss">
page {
  background-color: #f2f2f2;
}
.back {
  width: 64rpx;
  height: 64rpx;
  background-color: rgba(255, 255, 255, 0.6);
  position: fixed;
  top: 48rpx;
  left: 12rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.detail-view {
}
.top-image {
  width: 750rpx;
  image {
    display: block;
    width: 100%;
  }
}
.goods-title {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 24rpx 32rpx;
  margin-bottom: 20rpx;
}
.goods-name {
  text {
    height: 96rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #1A1A1A;
    line-height: 48rpx;
  }
}
.goods-title-buttom {
  display: flex;
  margin-top: 24rpx;
  font-size: 20rpx;
  color: #FFFFFF;
  line-height: 20rpx;
  white-space: nowrap;
}
.new {
  display: flex;
  align-items: center;
  background-color: #F0190F;
  padding: 4rpx;
  border-radius: 4rpx;
  margin-right: 6rpx;
  image {
    width: 10px;
    height: 20rpx;
    margin-right: 5rpx;
  }
}
.welfare {
  background-color: #F0AA05;
  border-radius: 4rpx;
  padding: 4rpx;
}
.goods-detail-cart {
  background-color: #fff;
  padding: 24rpx 32rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20rpx;
}
.cart-title {
  font-size: 28rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  &::before {
    content: '';
    display: block;
    width: 6rpx;
    height: 28rpx;
    background-color: #F0190F;
    margin-right: 10rpx;
  }
}
.cart-content {
  background-color: #F7F7F7;
  padding: 16rpx;
  border-radius: 16rpx;   
}
.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
  font-size: 24rpx;
  &:last-child {
    margin-bottom: 0;
  }
  .left {
    color: #1A1A1A;
  }
  .right {
    color: #999;
  }
}
.cart-close {
  margin-top: 20rpx;
  font-size: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goods-capture {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.capture-title {
  padding: 40rpx 0;
  display: flex;
  align-items: center;
  &::before, &::after {
    content: '';
    display: block;
    width: 94rpx;
    height: 1rpx;
    background-color: #EBEBEB;
    margin: 0 20rpx;
  }
}
</style>
