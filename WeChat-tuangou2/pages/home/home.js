// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: {},
        goodsList: {},
        total: 0,
        query: {
            "PageIndex": 1,
            "PageSize": 10,
            "BuyGroupId": 1,
            "GroupDate": '',
        },
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getBannerList()
        this.getGoodsList()
    },
    getBannerList(){
        wx.request({
            url: '/api/Banner/GetBannerList',
            method: 'POST',
            success: (res) => {
                this.setData({
                    bannerList: res.data.Data
                })
            },
            fail(){
                wx.showToast({
                    title: '数据请求失败！',
                    duration: 1500,
                    icon: 'none'
                })
            }
        })
    },
    handleChangeNav(options){
        this.setData({
            'query.BuyGroupId': options.detail.Id
        })
        this.getGoodsList()
    },
    handleGoodsDetail(e){
        const id = e.currentTarget.dataset.item.Id
        wx.navigateTo({
          url: `/subpackage/goods_detail/goods_detail?id=${id}`,
        })
    },
    handleChangeDate(e){
        console.log(e)
        // const GroupDate = e.detail.date
        //     this.setData({
        //         'query.GroupDate': GroupDate
        //     })
        //     this.getGoodsList()
    },
    getGoodsList(){
        wx.request({
          url: 'https://dz.xuetang51.com/api/Product/GetProductList',
          data: this.data.query,
          method: 'POST',
          success: (res) => {
            this.setData({
                goodsList: res.data.Data.Data,
                total: res.data.Data.Count
            })
          }
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})