// pages/search/search.js
import { reqGoodsList } from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        goodsList: [],
        resultList: [],
        total: 0,
        query: {
            "PageIndex": 1,
            "PageSize": 10,
            "Keywords": '',
        },
        isLoading: false,
        finished: false,
    },
    onChange(e){
        const kw = e.detail
        this.setData({
            value: kw,
        });
    },
    onSearch() {
        this.onClick()
    },
    onClick() {
        if (this.data.value){
            this.getGoodsList(this.data.value)
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getGoodsList()
    },
    async getGoodsList(){
        this.setData({
            isLoading: true
        })
        const { data: res } = await reqGoodsList(this.data.query)
        this.setData({
            resultList: [...this.data.resultList, ...res.Data.Data],
            total: res.Data.Count,
            isLoading: true
        })
    },
    handleGoodsDetail(e){
        const id = e.currentTarget.dataset.item.Id
        wx.navigateTo({
            url: `/subpackage/goods_detail/goods_detail?id=${id}`,
        })
    },
    onReachBottom() {
        if (this.data.query.PageIndex * this.data.query.PageSize >= this.data.total){
            this.setData({
                finished: true
            })
            return wx.showToast({
              title: '数据加载完毕！',
              icon: 'none',
            })
        }
        if (!this.data.isLoading) return
        this.setData({
            'query.PageIndex': this.data.query.PageIndex + 1
        })
        this.getGoodsList()
    },
})