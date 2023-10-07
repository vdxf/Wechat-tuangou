<template>
  <view>
    <date-choose @handleChangeDate="handleChangeDate"></date-choose>
    <nav-list @handleChangeNav="handleChangeNav"></nav-list>
    <view class="home-goods-list">
      <view v-for="item in goodsList" :key="item.Id" @click="handleGoodsDetail(item.Id)">
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
            "BuyGroupId": 1,
            "GroupDate": '',
            
        },
      };
    },
    created() {
      this.handleChangeDate()
    },
    methods: {
      async getGoodsList(){
        const { data: res } = await wx.$http.post('/api/Product/GetProductList', this.query)
        this.total = res.Data.Count
        this.goodsList = res.Data.Data
      },
      handleChangeNav(options){
        this.query.BuyGroupId = options
        this.getGoodsList()
      },
      handleChangeDate(options){
        this.query.GroupDate = options
        this.getGoodsList()
      },
      handleGoodsDetail(Id){
        wx.navigateTo({
          url: `/subpackage/goods_detail/goods_detail?id=${Id}`,
        })
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