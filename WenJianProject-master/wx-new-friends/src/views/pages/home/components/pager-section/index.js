import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

const oneDayTime = 60 * 60 * 24 * 1000

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input, WowComponent.wow$.mixins.Format],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  data: {
    prevDisabled: false,
    nextDisabled: false,
  },
  properties: {
    value: {
      type: String,
      value: '',
      observer(v) {
        const dateTime = new Date(this.formatDate('yyyy/MM/dd')).getTime()
        const maxDateTime = dateTime + 1 * oneDayTime
        const minDateTime = dateTime - 10 * oneDayTime
        const currentDateTime = v
          ? new Date(v.replace(/-/gi, '/')).getTime()
          : dateTime
        this.setData({
          prevDisabled: currentDateTime <= minDateTime,
          nextDisabled: currentDateTime >= maxDateTime,
        })
      },
    },
  },
  methods: {
    handleSwitch(event) {
      const { type } = this.inputParams(event)
      const { value } = this.data
      let dateTime = (
        value ? new Date(value.replace(/-/gi, '/')) : new Date()
      ).getTime()
      dateTime = type > 0 ? dateTime + oneDayTime : dateTime - oneDayTime
      this.triggerEvent('change', {
        value: this.formatDate('yyyy-MM-dd', dateTime),
      })
    },
  },
})
