import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import navigation from '@/store/modules/navigation';
import layout from '@/store/modules/layout';
import profile from '@/store/modules/profile';
export default createStore({
  modules: {
      auth,
      navigation,
      profile,
      layout
  },
  actions: {
      resetStore({commit}){
          commit("auth/RESET")
          commit("navigation/RESET")
          commit("profile/RESET")
          commit("layout/RESET")
      }
  }
});
