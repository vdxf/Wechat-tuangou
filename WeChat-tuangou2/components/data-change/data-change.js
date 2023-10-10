// components/data-change/data-change.js
Component({
    lifetimes: {
        attached() {
            this.setData({
                today: this.getCurrentDay(0)
            }),
            this.triggerEvent('handleChangeDate', { date: this.getCurrentDay(0) })
        }
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
        today: '',
        num: 0,
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getCurrentDay(n){
            var currentDate = new Date() // 当前日期
            currentDate.setDate(currentDate.getDate() + n)
            var year = currentDate.getFullYear()
            var month = currentDate.getMonth() + 1
            var day = currentDate.getDate()
            month = month < 10 ? '0' + month : month
            day = day < 10 ? '0' + day : day
            return `${year}-${month}-${day}`
        },
        prevDate(){
            const n = --this.data.num
            this.setData({
                today: this.getCurrentDay(n)
            }),
            this.triggerEvent('handleChangeDate', { date: this.getCurrentDay(n) })
        },
        nextDate(){
            const n = ++this.data.num
            this.setData({
                today: this.getCurrentDay(n)
            }),
            this.triggerEvent('handleChangeDate', { date: this.getCurrentDay(n) })
        },
    }
})