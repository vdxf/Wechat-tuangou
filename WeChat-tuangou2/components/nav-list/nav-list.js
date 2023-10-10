// components/nav-list/nav-list.js
Component({
    lifetimes: {
        attached() {
            this.getBuyGroupList()
        },
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        buyGroupList: {},
        currentIndex: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getBuyGroupList(){
            wx.request({
                url: 'https://dz.xuetang51.com/api/Product/GetBuyGroupList',
                method: 'POST',
                success: (res) => {
                    this.setData({
                        buyGroupList: res.data.Data
                    })
                }
            })
        },
        handleChangeNav(e){
            const {index, item} = e.currentTarget.dataset
            this.setData({
                currentIndex: index
            })
            this.triggerEvent('handleChangeNav',{Id: item.Id})
        }
    }
})