
const state = {
  counter_cart: 0
};
const getters = {};
const mutations = {
  SET_COUNTERCART(state, counter) {
    state.counter_cart = counter;
  },
};
const actions = {
  setCounterCart({ commit }, counter) {
    commit(SET_COUNTERCART, counter);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
