import { defineStore } from 'pinia'

const useTabbarStore = defineStore('TabbarStore', {
  state: () => {
    return {
      fold: false,
      history: [],
    }
  },
  actions: {
  },
  getters: {}
})
export default useTabbarStore