<template>
  <view class="goods-cart">
    <image :src="item.ProductImageUrl || defaultImg"></image>
    <view class="goods-title">{{item.SubTitle}}</view>
    <view class="cart-bottom">
      <view class="left">
        <view class="new">
          <image src="../../static/image/shandian.png"></image>
          <text>新品首团</text>
        </view>
        <view class="welfare">
          <text>福利品</text>
        </view>
      </view>
      <view class="right">
        <uni-icons custom-prefix="iconfont" type="icon-a-fenxiang2" size="16" color="#fff"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"goods-cart",
    props: {
      item: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        defaultImg: '../../static/image/null.jpg',
      };
    },
  }
</script>

<style lang="scss">
.goods-cart {
  border-radius: 20rpx;
  margin-bottom: 40rpx;
  overflow: hidden;
  background-color: #fff;
  width: 328rpx;
  height: 440rpx;
  display: flex;
  flex-direction: column;
  image {
    display: block;
    width: 328rpx;
    height: 328rpx;
  }
  .goods-title {
    height: 28rpx;
    line-height: 28rpx;
    font-size: 28rpx;
    color: #1A1A1A;
    padding: 10rpx 20rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.cart-bottom {
  padding: 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20rpx;
}
.left {
  display: flex;
}
.new {
  display: flex;
  align-items: center;
  background-color: #F0190F;
  color: #fff;
  padding: 2rpx 6rpx;
  border-radius: 4rpx;
  margin-right: 5rpx;
  text {
    white-space: nowrap;
  }
  image {
    width: 10px;
    height: 20rpx;
    margin-right: 5rpx;
  }
}
.welfare {
  background-color: #F0AA05;
  color: #fff;
  border-radius: 4rpx;
  padding: 2rpx 6rpx;
}
.right {
  background-color: #F0190F;
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>