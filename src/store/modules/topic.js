import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as types from '../mutation-types'

Vue.use(VueAxios, axios)
Vue.use(Vuex);


const state = {
        currentTab: 'all',
        topicList: [],
        currentPage: 1,
        topic: {},
        loadTopicDetailSuccess: false,
}

const getters = {
    topicList: state => state.topicList,
    currentTab: state => state.currentTab,
    topic: state => state.topic,
    loadTopicDetailSuccess: state => state.loadTopicDetailSuccess
}

const mutations = {
        [types.REFRESH_TOPICS_LIST] (state, data){
            state.topicList = data;
        },
        [types.LOAD_MORE_TOPICS] (state, data){
            state.topicList = state.topicList.concat(data);
        },
        [types.UPDATE_CURRENT_PAGE] (state,data=1){
            state.currentPage = data;
        },
        [types.CHANGE_TAB] (state, data) {
            state.currentTab = data
        },
        [types.FETCH_TOPIC_DATA] (state,data) {
            state.topic = data;
        }
}

const actions = {
    //首页tab页的改动
    change_tab ({ commit }, tab) {
        commit('CHANGE_TAB',tab)
    },

    // 加载或刷新列表首页帖子数据
    refreshTopiclistData({commit,state}){
        commit(types.UPDATE_CURRENT_PAGE);
        axios.get(`https://cnodejs.org/api/v1/topics?limit=20&page=1&tab=${state.currentTab}`)
            .then(result => {
                 commit('REFRESH_TOPICS_LIST',result.data.data);
            });
    },

    // 加载更多帖子列表
    loadMoreTopicList({commit,state}) {
        commit(types.UPDATE_CURRENT_PAGE,state.currentPage+1);
        axios.get(`https://cnodejs.org/api/v1/topics?limit=20&page=${state.currentPage}&tab=${state.currentTab}`)
            .then(result => {
                commit('LOAD_MORE_TOPICS',result.data.data);
            })
    },

    // 加载帖子的详细内容
    onFetchTopicDetail ({commit},topicId) {
        axios.get(`https://cnodejs.org/api/v1/topic/${topicId}`)
          .then(result => {
            commit('FETCH_TOPIC_DATA',result.data.data);
          })
          .catch(e => {
            console.log(e)
            alert(e)
          })
    },

}


export default {
  state,
  actions,
  getters,
  mutations
}