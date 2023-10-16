// components/search-action/search-action.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        value: '',
        focus: false,
        show: false,
        historyList: [],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleSearch(){
            const { value } = this.data
            this.triggerEvent('search', value)
            if (!value) {
                return
            }
            else {
                const set = new Set(this.data.historyList)
                set.delete(value)
                set.add(value)
                this.setData({
                    historyList: Array.from(set).reverse()
                })
            }
            
        },
        handleInput(e){
            this.setData({
                value: e.detail.value
            })
        },
        handleFocus(){
            this.setData({
                show: true
            })
        },
        handleClear(){
            this.setData({
                value: '',
                focus: true,
            })
        },
        handleClearHistory(){
            wx.showModal({
                title: '温馨提示',
                content: '确认清空历史记录？',
                success: (res) => {
                    this.setData({
                        focus: true
                    })
                    if(res.confirm){
                        this.setData({
                            historyList: []
                        })
                    }
                }
            })
        },
        handleHide(){
            this.setData({
              show: false,
              focus: false  
            })
        },
        handleSearchByHistory(e){
            const {value} = e.currentTarget.dataset
            this.setData({
                value: value
            })
            this.handleSearch()
        }
    }
})