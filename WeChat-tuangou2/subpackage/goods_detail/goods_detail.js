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
        showdialog: false,
        showNav: false,
        navList: [
            {name: '商品详情', id: 'tag1'},
            {name: '团品实拍', id: 'tag2'},
            {name: '资质授权', id: 'tag3'},
            {name: '关于售后', id: 'tag4'}
        ],
        currentIndex: 0,
        scrollTopTag: '',
        isIphoneX: false,
    },
    handleClose(){
        this.setData({
            close: !this.data.close
        })
    },
    showDialog(){
        this.setData({
            showdialog: true
        })
    },
    handleChangeNav(e){
        const {tag} = e.currentTarget.dataset
        const query = wx.createSelectorQuery()
        query.selectViewport().scrollOffset()
        query.select(`#${tag}`).boundingClientRect()
        query.exec((res) => {
            const scrollTop = res[0].scrollTop
            wx.pageScrollTo({
                scrollTop: scrollTop + res[1].top - 110,
                duration: 500
            })
        })
    },
    onPageScroll(e){
        const query = wx.createSelectorQuery()
        query.selectViewport().scrollOffset()
        query.select(`#tag1`).boundingClientRect()
        query.select(`#tag2`).boundingClientRect()
        query.select(`#tag3`).boundingClientRect()
        query.select(`#tag4`).boundingClientRect()
        query.exec((res) => {
            let scrollTop = res[0].scrollTop
            const tag1 = scrollTop + res[1].top - 120
            const tag2 = scrollTop + res[2].top - 120
            const tag3 = scrollTop + res[3].top - 120
            const tag4 = scrollTop + res[4].top - 120
            if (e.scrollTop > tag1) {
                this.setData({
                    showNav: true
                })
                if (e.scrollTop >= tag1 && e.scrollTop < tag2){
                    this.setData({
                        currentIndex: 0
                    })
                } else if (e.scrollTop >= tag2 && e.scrollTop < tag3) {
                    this.setData({
                        currentIndex: 1
                    })
                } else if (e.scrollTop >= tag3 && e.scrollTop < tag4) {
                    this.setData({
                        currentIndex: 2
                    })
                } else if (e.scrollTop >= tag4) {
                    this.setData({
                        currentIndex: 3
                    })
                }
            } else {
                this.setData({
                    showNav: false
                }) 
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const app = getApp()
        const isIphoneX = app.globalData.isIphoneX
        this.setData({
            isIphoneX: isIphoneX,
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
    back(){
        wx.navigateBack()
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