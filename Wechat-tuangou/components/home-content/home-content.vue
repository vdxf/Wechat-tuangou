<template>
  <view>
    <nav-list @handleChangeNav="handleChangeNav"></nav-list>
    <view class="home-goods-list">
      <view v-for="item in goodsList" :key="item.Id" @click="handleGoodsDetail(item)">
        <goods-cart :item="item"></goods-cart>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"home-content",
    data() {
      return {
        goodsList: {},
        total: 0,
        query: {
            "PageIndex": 1,
            "PageSize": 10,
        }
      };
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(){
        const { data: res } = await wx.$http.post('/api/Product/GetProductList', this.query)
        this.total = res.Data.Count
        this.goodsList = res.Data.Data
      },
      handleChangeNav(item){
        console.log('123');
      }
    },
  }
</script>

<style lang="scss">
.home-goods-list {
  background: linear-gradient(#FFF 0%, rgba(255, 255, 255, 0) 100%);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding:  0 32rpx;
}
</style>