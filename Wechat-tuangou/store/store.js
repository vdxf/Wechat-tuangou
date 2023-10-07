import Vue from 'vue'
import Vuex from 'vuex'
import moduleGoods from '@/store/goods.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'm_goods': moduleGoods,
  }
})

export default store