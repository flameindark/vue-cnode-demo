import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        currentTab: '',
        topicList: [],
        moreList: [],
        isShowLogin: false,
        currentPage: 1,
        currentMenu: 'index',
        loginInfo: {
          avatarUrl: null,
          id: null,
          loginname: '',
          accessToken: ''
        },
    },
    getters: {
        getIsShowLogin(state) {
            return state.isShowLogin;
        },
        getCurrentTab(state) {
            return state.currentTab;
        },
        getTopicList(state) {
            return state.topicList;
        },
        getMoreList(state) {
            return state.moreList;
        },
        getCurrentPage(state) {
            return state.currentPage;
        },
        getAccessToken(state) {
            return state.accessToken;
        },
        getCurrentMenu(state) {
            return state.currentMenu;
        },
        getLoginInfo(state) {
            return state.loginInfo;
        }
    },
    mutations: {
        updateTopList(state, data) {
            state.topicList = data;
        },
        loadMoreTopic(state, data) {
            state.topicList = state.topicList.concat(data);
        },
        updateCurrentPage(state, data) {
            state.currentPage = data;
        },
        updateCurrentTab(state, data) {
            state.currentTab = data;
        },
        toggleUserInfo(state) {
            state.isShowLogin = !state.isShowLogin;
        }
    },
    actions: {
        // 加载或刷新列表首页帖子数据
        refreshTopiclistData(store,{tab}){
            this.axios.get(`https://cnodejs.org/api/v1/topics?limit=20&page=1&tab=${tab}`)
                .then(result => {
                     store.commit('updateTopList',result.data.data);
                });
            store.commit('updateCurrentPage',2);
        },

        // 加载更多帖子列表
        loadMoreTopicList(store, {tab,page}) {
            this.axios.get(`https://cnodejs.org/api/v1/topics?limit=20&page=${state.currentPage}&tab=${tab}&page=${page}`)
                .then(result => {
                    store.commit('loadMoreTopic',result.data.data);
                })
        },

    }

});
