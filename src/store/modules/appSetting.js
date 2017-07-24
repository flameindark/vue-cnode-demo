import * as types from '../mutation-types'
import axios from 'axios'

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


const actions = {
  logout({commit,state}){
    commit('LOGOUT')
  },
  router_change({commit},data){
    commit(types.ROUTER_CHANGE,data);
  },
}

const mutations = {
  [types.LOGIN] (state){
    state.isLogin = true;
  },
  [types.LOGOUT] (state){
    state.isLogin = false;
  },
  [types.ROUTER_CHANGE] (state,data){
    state.currentRouter = data;
  },
  [types.SET_LOGININFO] (state,data){
    state.loginInfo = data
  },
  [types.SET_UNREAD_MESSAGE_NUM] (state,data){
    state.loginInfo.message_num = data
  }
}



export default {
  state,
  actions,
  mutations,
  getters
}
