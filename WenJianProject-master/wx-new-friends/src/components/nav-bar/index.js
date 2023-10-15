import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

const statusBarHeight = wx.getSystemInfoSync()['statusBarHeight']

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Router],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    title: {
      type: String,
      value: '',
    },
    classes: {
      type: String,
      value: '',
    },
    useLeft: {
      type: Boolean,
      value: true,
    },
    useSeat: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    styles: `padding-top: ${statusBarHeight}px`,
  },
  methods: {
    handleLeft() {
      this.routerPop()
      this.triggerEvent('left')
    },
  },
})
