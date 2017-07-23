import Vue from 'vue'
import Vuex from 'vuex'
import topic from './modules/topic'
import appSetting from './modules/appSetting'
import createLogger from '../plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    appSetting,
    topic
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
