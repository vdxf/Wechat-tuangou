import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

const $$HISTORY_RECORD = '$$HISTORY_RECORD'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Storage,
    WowComponent.wow$.mixins.Modal,
  ],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    keyword: {
      type: String,
      value: '',
      observer(value) {
        this.setData({ value })
      },
    },
  },
  data: {
    value: '',
    arrHistory: [],
    visible: false,
    focus: false,
  },
  methods: {
    handleSearch() {
      let { value, arrHistory } = this.data
      if (value) {
        const index = arrHistory.indexOf(value)
        if (index > -1) {
          arrHistory.splice(index, 1)
        }
        arrHistory.unshift(value)
        arrHistory = arrHistory.slice(0, 20)
        this.setData({ arrHistory, visible: false })
        this.storageSet($$HISTORY_RECORD, arrHistory)
      }
      this.triggerEvent('search', { value })
    },
    handleClear() {
      this.modalConfirm({
        title: '温馨提示',
        content: '确认清空搜索历史记录？',
      })
        .then(() => {
          this.setData({ arrHistory: [] })
          this.storageRemove($$HISTORY_RECORD)
        })
        .toast()
    },
    handleFocus() {
      this.storageGet($$HISTORY_RECORD)
        .then((res) => {
          this.setData({ arrHistory: res, visible: true })
        })
        .null()
    },
    handleClearKeyword() {
      this.setData({ value: '', focus: true })
    },
    handleSearchByHistory(e) {
      const { value } = this.inputParams(e)
      this.setData({ value })
      this.handleSearch()
    },
    handleHide() {
      this.setData({ visible: false, focus: false })
    },
  },
})
