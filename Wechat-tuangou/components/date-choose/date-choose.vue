<template>
  <view class="choose-date">
    <view class="yesterday" @click="prevDate">前一天</view>
    <view class="choose-box">
      <view class="today">2023-10-04</view>
    </view>
    <view class="tomorrow" @click="nextDate">后一天</view>
  </view>
</template>

<script>
  export default {
    name:"date-choose",
    data() {
      return {
        
      };
    },
    methods: {
      prevDate(){},
      nextDate(){}
    }
  }
</script>

<style lang="scss">
.choose-date {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 710rpx;
  height: 68rpx;
  background-color: #ddd;
  margin: 20rpx auto;
  border-radius: 34rpx;
  font-size: 28rpx;
  font-weight: 600;
  padding: 0 40rpx;
}
.today {
  background-color: #fff;
  height: 56rpx;
  width: 278rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 28rpx;
  color: #FA2D19;
}
</style>