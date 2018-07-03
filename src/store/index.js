import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    page: 1,
    forRecords: [],
    mineOrder: {
      isInfo: '1',
      bookingPageNo: 1,
      bookingItems: [],
      buyPageNo: 1,
      buyItems: []
    },
    index: {
      scrolltop: 1
    },
    mineInfo: {
      remainScore: 1
    },
    pgMaterial: {
      pgMaterialStatus: '1'
    }
  },
  mutations: {
    savePage (state) {
      alert(state.page)
    }
  }
})

export default store
