// components/dialog-content/dialog-content.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean,
            default: false,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onEnter(){
        },
        close(){
            this.setData({
                show: false
            })
        },
    }
})