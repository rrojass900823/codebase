import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import navigation from '@/store/modules/navigation';
import layout from '@/store/modules/layout';
import profile from '@/store/modules/profile';
import store from '@/store/modules/store';
export default createStore({
  modules: {
      auth,
      navigation,
      profile,
      layout,
      store
  },
  actions: {
      resetStore({commit}){
          commit("auth/RESET")
          commit("navigation/RESET")
          commit("profile/RESET")
          commit("layout/RESET")
          commit("store/RESET")
      }
  }
});
