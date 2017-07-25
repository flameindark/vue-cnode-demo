import * as types from '../mutation-types'
import axios from 'axios'

// initial state
const state = {
  
  isLogin: false,
  loginInfo: null,
  loginInfoDetail: null,
  currentRouter: '/'
}

const getters = {
  currentRouter: state => state.currentRouter,
  loginInfo: state => state.loginInfo,
  loginInfoDetail: state => state.loginInfoDetail
}


const actions = {
  set_login_info({commit,state},data) {
    commit('SET_LOGIN_INFO',data)
  },
  logout({commit,state}){
    commit('LOGOUT')
  },
  router_change({commit},data){
    commit(types.ROUTER_CHANGE,data);
  },
}

const mutations = {
  [types.SET_LOGIN_INFO] (state,data){
    state.loginInfoDetail = data;
    state.isLogin = true;
  },
  [types.LOGOUT] (state){
    state.loginInfo = null;
    state.isLogin = false;
  },
  [types.ROUTER_CHANGE] (state,data){
    state.currentRouter = data;
  },
  [types.LOGIN_CHECK] (state,data){
    state.loginInfo = data
  },
  [types.SET_UNREAD_MESSAGE_NUM] (state,data){
    state.loginInfo= { ...state.loginInfo , message_num:data }
  }
}



export default {
  state,
  actions,
  mutations,
  getters
}
