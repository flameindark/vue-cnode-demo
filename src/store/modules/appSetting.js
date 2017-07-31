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
  login ({commit, state}, accessToken) {
    axios.post('https://cnodejs.org/api/v1/accesstoken', {
      accesstoken: accessToken
    }).then(result => {
              // 获取用户信息
      commit('SET_LOGIN_INFO', {...result.data, accessToken})
      localStorage.setItem('accessToken', accessToken)
      // 获取用户详细信息
      axios.get('https://cnodejs.org/api/v1/user/' + result.data.loginname)
      .then(res => {
        commit('SET_LOGIN_INFO_DETAIL', res.data.data)
      })
    }).then(
    // 获取未读信息
      axios.get(`https://cnodejs.org/api/v1/message/count?accesstoken=${accessToken}`)
      .then(result => {
        commit('SET_UNREAD_MESSAGE_NUM', 1)
      })
    ).catch(() => {
      localStorage.removeItem('accessToken')
    })
  },
  logout ({commit, state}) {
    commit('LOGOUT')
  },
  router_change ({commit}, data) {
    commit(types.ROUTER_CHANGE, data)
  }
}

const mutations = {
  [types.SET_LOGIN_INFO_DETAIL] (state, data) {
    state.loginInfoDetail = data
    state.isLogin = true
  },
  [types.LOGOUT] (state) {
    state.loginInfo = null
    state.isLogin = false
  },
  [types.ROUTER_CHANGE] (state, data) {
    state.currentRouter = data
  },
  [types.SET_LOGIN_INFO] (state, data) {
    state.loginInfo = data
  },
  [types.SET_UNREAD_MESSAGE_NUM] (state, data) {
    state.loginInfo = { ...state.loginInfo, message_num: data }
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
