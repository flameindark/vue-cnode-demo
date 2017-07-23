import * as types from '../mutation-types'

// initial state
const state = {
  
  isLogin: false,
  loginInfo: {
    avatarUrl: null,
    id: null,
    loginname: '',
    accessToken: '',
    message_num: 0
  },
  currentRouter: '/'
}

const getters = {
  currentRouter: state => state.currentRouter,
  loginInfo: state => state.loginInfo
}


// actions
const actions = {
  login({commit,state}, accessToken) {
    commit('LOGIN')
  },
  logout({commit,state}){
    commit('LOGOUT')
  },
  router_change({commit},data){
    commit(types.ROUTER_CHANGE,data);
  }
}

// mutations
const mutations = {
  [types.LOGIN] (state){
    state.isLogin = true;
  },
  [types.LOGOUT] (state){
    state.isLogin = false;
  },
  [types.ROUTER_CHANGE] (state,data){
    state.currentRouter = data;
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
