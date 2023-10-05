<template>
  <view class="nav-box">
     <view :class="['nav-item', currentIndex === index ? 'active' : '']" v-for="(item, index) in buyGroupList" :key="item.Id" @click="handleChangeNav(index,item)">
       <text>{{item.Name}}</text>
     </view>
  </view>
</template>

<script>
  export default {
    name:"nav-list",
    data() {
      return {
        buyGroupList: {},
        currentIndex: 0
      };
    },
    created() {
      this.getBuyGroupList()
    },
    methods: {
      async getBuyGroupList(){
        const { data: res } = await wx.$http.post('/api/Product/GetBuyGroupList')
        if (res.Status === 0) {
          this.buyGroupList = res.Data
        }
      },
      handleChangeNav(index,item){
        this.currentIndex = index
        console.log(item);
        // this.$emit('hamdleChangeNav',item)
      }
    }
  }
</script>

<style lang="scss">
.nav-box {
  background-color: #fff;
  height: 80rpx;
  border-radius: 40rpx 40rpx 0 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.nav-item {
  font-size: 28rpx;
  &.active {
    text {
      color: #ff1010;
    }
  }
}
</style>