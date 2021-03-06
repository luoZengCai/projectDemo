import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  getters: {
    isLogin: (state) => {
      return !!state.token
    },
    cartTotal: state => { // 计算购物车中项目总数
      let num = 0;
      state.cart.forEach(v => {
        num += v.cartCount;
      });
      return num;
    },
    total: state => state.cart.reduce((num,v) => num += v.cartCount*v.price, 0)
  },
  mutations: {
    setToken: (state,token) => {
      state.token = token
    },
    addCart: (state,item) => {
      const goods = state.cart.find(v => v.id == item.id)
      if (goods) {
        goods.cartCount += 1
      } else {
        state.cart.push({
          ...item,
          cartCount: 1
        })
      }
    },
    countMinus(state, index) {
      const item = state.cart[index];
      if (item.cartCount > 1) {
        item.cartCount -= 1;
      } else {
        state.cart.splice(index, 1);
      }
    },
    countAdd(state,index) {
      state.cart[index].cartCount += 1;
    }
  },
  actions: {

  }
})

// 监听store变化
store.subscribe((mutation,state) => {
  switch (mutation.type) {
    case "setToken":
      localStorage.setItem("token", JSON.stringify(state.token));
      break;
    case "addCart":
      localStorage.setItem("cart", JSON.stringify(state.cart));
      break;
  }
})

export default store
