import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [WowComponent.wow$.mixins.Input],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  data: { visible: false },
  properties: {},
})
