<template>
  <view class="choose-date">
    <view class="yesterday" @click="prevDate">前一天</view>
    <view class="choose-box">
      <view class="today">
        <text>{{today}}</text>
      </view>
    </view>
    <view class="tomorrow" @click="nextDate">后一天</view>
  </view>
</template>

<script>
  export default {
    name:"date-choose",
    data() {
      return {
        today: '',
        num: 0,
        onDisplay: false,
      };
    },
    created() {
      this.today = this.getCurrentDay(0)
      this.$emit('handleChangeDate', this.today)
    },
    methods: {
      //获取当前日期
      getCurrentDay(n){
        var currentDate = new Date() // 当前日期
        currentDate.setDate(currentDate.getDate() + n)
        var year = currentDate.getFullYear()
        var month = currentDate.getMonth() + 1
        var day = currentDate.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return `${year}-${month}-${day}`
      },
      prevDate(){
        const n = --this.num
        this.today = this.getCurrentDay(n)
        this.$emit('handleChangeDate', this.today)
      },
      nextDate(){
        const n = ++this.num
        this.today = this.getCurrentDay(n)
        this.$emit('handleChangeDate', this.today)
      },
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
  background-color: rgba(255, 255, 255, 0.5);
  margin: 20rpx auto;
  border-radius: 36rpx;
  backdrop-filter: blur(10px);
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