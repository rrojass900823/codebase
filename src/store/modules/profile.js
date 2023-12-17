import router from "@/router";
import { appRoutes } from "@/constants";
const CLEAR_AUTH = "CLEAR_AUTH";
const LOGIN_USER = "LOGIN_USER";
const SET_SOMEONELOGIN = "SET_SOMEONELOGIN";
const state = {
  access_token: null,
  refresh_token: null,
  loginUser: null,
  permissions: [],
  someoneLogin:false
};
const getters={
  isLoggedIn:(state) => state.loginUser !== null
};
const mutations={
CLEAR_AUTH(state) {
  state.loginUser = null;
},
LOGIN_USER(state) {
  state.loginUser = "1QAZXSW23EDCVFR45TGBNHY67UJMKI89OLP0";
},
SET_SOMEONELOGIN(state, current) {
  state.someoneLogin = current;
},
};
const actions={
  logOut({ commit }) {
    commit(CLEAR_AUTH);
    commit(SET_SOMEONELOGIN, false);
    router.replace("/");
  },
  logIn({ commit }) {
    commit(LOGIN_USER);
    commit(SET_SOMEONELOGIN, true);
    router.push(appRoutes.DASHBOARD);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
