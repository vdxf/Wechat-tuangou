<template>
  <view class="detail-view">
    <uni-icons class="back" type="arrowleft" size="24" @click="back"></uni-icons>
    <view class="top-image">
      <image :src="goodsDetail.ProductImageUrl" mode="widthFix"></image>
    </view>
    <view class="goods-title">
      <view class="goods-name">{{goodsDetail.Name}}</view>
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
      <view class="video-list">
        <view class="video-item" v-for="(item, index) in videoList" :key="index">
          <video :src="item" controls></video>
        </view>
      </view>
      <view class="capture-save">
        <button>保存视频</button>
      </view>
    </view>
    <view class="goods-qualifications">
      <view class="capture-title">资质授权</view>
      <view class="capture-image">
        <image :src="goodsDetail.Credential" mode="widthFix"></image>
      </view>
    </view>
    <view class="goods-service">
      <text class="cart-title">关于售后</text>
      <view class="service-item">
        <view class="service-send">关于发货</view>
        <text>接收订单后，仓库核实无误将第一时间为您发货，如签收后发现少发、错发，申请时间需在售后结束时间节点以内系统提报售后退款、补偿或补发处理。</text>
      </view>
      <view class="service-item">
        <view class="service-send">关于破损</view>
        <text>由于运输途中存在一定的颠簸与碰撞，可能会使个别商品出现破损，包裹签收第一时间内，您收到的团品如有破损问题的情况，麻烦家人们火速系统提报售后并联系售后平台客服，将破损产品和快递单号一同拍照发给客服，客服会在第一时间为您处理。</text>
      </view>
      <view class="service-item">
        <view class="service-send">关于质量问题</view>
        <text>包裹签收第一时间内，您收到的团品如有质量问题的情况，麻烦家人们火速联系系统提报售后并联系售后平台客服，将产品质量问题和快递单号一同拍照发给客服，客服会在第一时间为您处理。</text>
      </view>
      <view class="service-item">
        <view class="service-send">关于退换货</view>
        <text>团品如出现吊牌已摘、或显著使用痕迹等影响二次销售的情形，且无质量问题的，不支持无理由退还。</text>
      </view>
      <view class="feedback">点击查看：如何拍照反馈团品问题>></view>
    </view>
    <view class="share-btn">
      <button>分享给好友</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        Id: '',
        goodsDetail: {},
        videoList: {},
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
        this.videoList = res.Data.VideoUrls.split(';')
      },
      back(){
        wx.navigateBack({
          delta: 1
        })
      },
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
    height: 96rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #1A1A1A;
    line-height: 48rpx;
    overflow: hidden;
    text-overflow: ellipsis;
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
.goods-capture, 
.goods-qualifications {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20rpx;
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
.video-list {
  width: 100%;
}
.video-item {
  video {
    width: 100%;
  }
}
.capture-save {
  padding: 32rpx 0;
  button {
    width: 320rpx;
    height: 64rpx;
    line-height: 64rpx;
    background-color: #fff;
    font-size: 28rpx;
    color: #1A1A1A;
  }
}
.capture-image {
  width: 100%;
  image {
    display: block;
    width: 100%;
  }
}
.goods-service {
  background-color: #fff;
  padding: 24rpx 32rpx;
}
.service-item {
  padding: 0 16rpx;
  text {
    font-size: 24rpx;
    color: #999999;
    line-height: 40rpx;
  }
}
.service-send {
  font-size: 24rpx;
  font-weight: 500;
  color: #666666;
  line-height: 40rpx;
  display: flex;
  align-items: center;
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 6rpx;
    height: 6rpx;
    border-radius: 50%;
    background-color: #F0190F;
    margin-right: 10rpx;
    position: absolute;
    left: -16rpx;
  }
}
.feedback {
  padding: 12rpx 16rpx;
  font-size: 24rpx;
  color: #FA2D19;
  line-height: 40rpx;
}
.share-btn {
  border-top: 1rpx solid #f1f1f1;
  height: 112rpx;
  background: rgba(255,255,255,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 686rpx;
    height: 80rpx;
    background: linear-gradient(90deg, #F0190F 0%, #F03C0A 100%);
    border-radius: 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 80rpx;
  }
}
</style>
