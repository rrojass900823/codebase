
import router from "@/router";
import { appRoutes } from "@/constants";
const SET_SOMEONELOGIN = "SET_SOMEONELOGIN";
import store from '@/store';

const state={
  routeFrom:null
};
const getters={};
const actions={
  setSomeoneLogin({ commit }){
    commit(SET_SOMEONELOGIN, current );
  },
  navigateTo({ commit },to){
    if(store.getters['auth/isLoggedIn'])
      router.push(to);
  }
};
const mutations={
  SET_SOMEONELOGIN(state, current) {
    state.someoneLogin = current;
},
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
