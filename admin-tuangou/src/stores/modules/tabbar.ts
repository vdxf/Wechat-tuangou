import { defineStore } from 'pinia'

const useTabbarStore = defineStore('TabbarStore', {
  state: () => {
    return {
      fold: false
    }
  },
  actions: {
  },
  getters: {}
})
export default useTabbarStore