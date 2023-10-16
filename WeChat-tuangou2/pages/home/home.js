// pages/home/home.js
import { reqBannerList, reqGoodsList } from '../../api/index'
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
        isIphoneX: false,
        isFresh: true,
        isLoading: false,
        finished: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const app = getApp()
        const isIphoneX = app.globalData.isIphoneX
        this.setData({
            isIphoneX: isIphoneX,
        })
        this.getBannerList()
        this.getGoodsList()
    },
    async getBannerList(){
        const {data: res} = await reqBannerList()
        console.log(res)
        this.setData({
            bannerList: res.Data
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
    async getGoodsList(){
        this.setData({
            isLoading: true
        })
        const query = this.data.query
        const { data: res } = await reqGoodsList(query)
        this.setData({
            goodsList: res.Data.Data,
            total: res.Data.Count,
            isLoading: true
        })
    },
    async handleRefresh(){
        await this.getGoodsList()
        this.setData({
            isFresh: false
        })
    },
    handleReachBottom(){
        if (this.data.query.PageIndex * this.data.query.PageSize >= this.data.total){
            this.setData({
                finished: true
            })
            return 
        }
        if (!this.data.isLoading) return
        this.setData({
            'query.PageIndex': this.data.query.PageIndex + 1
        })
        this.getGoodsList()
    },
})