import Vue from 'vue';
import Vuex from 'vuex';
import { setUserCookies, getUserCookies, removeUserCookies } from "@/utils/userCookies"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    user: getUserCookies(),
    menuRoutes:[],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
    state.user = 
    {
      username:'',
      email:'',
      appkey:'',
      role:''
    }
      },
      changeMenuRoutes(state, routes) {
        state.menuRoutes = routes;
      },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setUserCookies(userInfo);
    },
    logout({commit})
    {
      commit('logout');
      removeUserCookies();
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {
  },
});
