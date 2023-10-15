import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Jump,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Curl,
  ],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: {},
    },
  },
})
