// components/goods-cart/goods-cart.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            default: {},
        },
        isHome: {
            type: Boolean,
            default: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        defaultImg: '../../static/image/null.jpg',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})