import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || ''
  },
  getters: {
    isLogin: (state) => {
      return !!state.token
    }
  },
  mutations: {
    setToken: (state,token) => {
      state.token = token
    }
  },
  actions: {

  }
})
