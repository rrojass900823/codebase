
const SHOW_GENERAL_LOADING = "SHOW_GENERAL_LOADING";
const state = {
  general_loading:false
};
const mutations={
  SHOW_GENERAL_LOADING(state, loading) {
    state.general_loading = loading;
  },
};
const actions={
  showGeneralLoading({ commit }, loading) {
    commit(SHOW_GENERAL_LOADING, loading);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
