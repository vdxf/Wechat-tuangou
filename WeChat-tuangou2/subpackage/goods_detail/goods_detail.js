// subpackage/goods_detail/goods_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Id: '',
        goodsDetail: {},
        videoList: {},
        close: true,
    },
    handleClose(){
        this.setData({
            close: !this.data.close
        })
    },
    showDialog(){
        console.log(123)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            Id: options.id 
        })
        this.getGoodsDetail()
    },
    getGoodsDetail(){
        const Id = this.data.Id
        wx.request({
          url: `https://dz.xuetang51.com/api/Product/GetProductInfo?id=${Id}`,
          method: 'GET',
          success: (res) => {
              this.setData({
                  goodsDetail: res.data.Data,
                  videoList: res.data.Data.VideoUrls.split(';')
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