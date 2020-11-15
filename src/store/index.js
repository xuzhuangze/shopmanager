import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import persistedState from 'vuex-persistedstate'
import state from "./state";
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default new Vuex.Store({
  getters,
  state,
  actions,
  mutations,
  plugins: [persistedState()]
})
