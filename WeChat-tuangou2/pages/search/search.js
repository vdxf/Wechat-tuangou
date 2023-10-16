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
        kw: false
    },
    onLoad(options) {
        this.getGoodsList()
    },
    handleSearch(e){
        this.setData({
            'query.Keywords': e.detail,
            'query.PageIndex': 1,
        })
        this.getGoodsList()
    },
    async getGoodsList(){
        if (this.data.query.Keywords) {
            this.setData({kw: true})
        }
        this.setData({
            isLoading: true
        })
        const { data: res } = await reqGoodsList(this.data.query)
        if (!this.data.kw) {
            this.setData({
                goodsList: [...this.data.goodsList, ...res.Data.Data],
                total: res.Data.Count,
                isLoading: true
            })
        } else {
            this.setData({
                resultList: this.data.query.PageIndex === 1 ? res.Data.Data : [...this.data.resultList, ...res.Data.Data],
                total: res.Data.Count,
                isLoading: true
            })
        }
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