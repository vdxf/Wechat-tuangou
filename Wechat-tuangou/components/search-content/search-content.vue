<template>
  <view>
    <view class="search-goods-list">
      <view v-for="item in goodsList" :key="item.Id" @click="handleGoodsDetail(item.Id)">
        <goods-cart :item="item" :isHome="false"></goods-cart>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"search-content",
    data() {
      return {
        goodsList: {},
        total: 0,
        query: {
            "PageIndex": 1,
            "PageSize": 10,
            "Keywords": '',
        }
      };
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(kw){
        this.query.Keywords = kw
        const { data: res } = await wx.$http.post('/api/Product/GetProductList', this.query)
        this.total = res.Data.Count
        this.goodsList = res.Data.Data
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
.search-goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding:  0 32rpx;
}
</style>