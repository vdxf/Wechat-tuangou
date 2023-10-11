// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        goodsList: [],
        total: 0,
        query: {
            "PageIndex": 1,
            "PageSize": 10,
            "Keywords": '',
        },
        isLoading: false,
    },
    onChange(e) {
        this.setData({
          value: e.detail,
        });
      },
      onSearch(e) {
        this.getGoodsList(e.detail)
      },
      onClick() {
        this.getGoodsList(this.data.value)
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getGoodsList()
    },
    getGoodsList(kw){
        if (kw) {
            this.setData({
                'query.Keywords': kw
            })
        }
        this.setData({
            isLoading: true
        })
        wx.showLoading({
          title: '数据加载中...'
        })
        wx.request({
          url: 'https://dz.xuetang51.com/api/Product/GetProductList',
          method: 'POST',
          data: this.data.query,
          success: (res) => {
              this.setData({
                goodsList: [...this.data.goodsList, ...res.data.Data.Data],
                total: res.data.Data.Count
              })
          },
          complete: () => {
            wx.hideLoading()
            this.setData({
                isLoading: false
            })
            wx.stopPullDownRefresh()
          }
        })
      },
      handleGoodsDetail(e){
        const id = e.currentTarget.dataset.item.Id
        wx.navigateTo({
          url: `/subpackage/goods_detail/goods_detail?id=${id}`,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.setData({
            goodsList: [],
            total: 0,
            'query.PageIndex': 1 
        })
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.query.PageIndex * this.data.query.PageSize >= this.data.total){
            return wx.showToast({
              title: '数据加载完毕！',
              icon: 'none',
            })
        }
        if (this.data.isLoading) return 
        this.setData({
            'query.PageIndex': this.data.query.PageIndex + 1
        })
        this.getGoodsList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})