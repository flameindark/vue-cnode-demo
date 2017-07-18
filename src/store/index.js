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
        currentPage: 1
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
        }
    },
    mutations: {
        updateTopList(state, data) {
            state.topicList = data;
        },
        loadMoreTopic(state, data) {
            state.topicList.push(...data);
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
        queryTopiclistData(store,{queryParam}){
            this.axios.get(`https://cnodejs.org/api/v1/topics?limit=20&page=${currentPage}&tab=${queryParam}`)
                .then(result => (
                     store.commit('updateTopList',
                        result.data.data.map(item=> {
                            return {
                                'src': item.author.avatar_url,
                                'title': item.title,
                                'desc': 'other',
                                'url': '/article/'+ item.id
                            }
                        }))
                ));
            store.commit('updateCurrentPage',2);
        },

        // 加载更多帖子列表
        loadMoreList(store, {queryParam}) {
            this.axios.get(`https://cnodejs.org/api/v1/topics?limit=20&page=${state.currentPage}&tab=${queryParam}`)
                .then(result => (
                    // 更新帖子列表数据
                    store.commit('loadMoreTopic',
                        result.data.data.map(item=> {
                            return {
                                'src': item.author.avatar_url,
                                'title': item.title,
                                'desc': 'other',
                                'url': '/article/'+ item.id
                            }
                        })
                    )
                )).then(
                    // 更新当前已加载帖子的页数
                    store.commit('updateCurrentPage',++state.currentPage)
                )

        }   
    }

});
