
import { URL_FLAGS } from "@/constants";

const Utils = {
  data() {
    return {};
  },

  methods: {
    getFlag(countryCode) {
      return URL_FLAGS + countryCode + ".svg";
    },
    navigateTo(to){
      this.$router.push(to);
    }
  },
};
export default Utils;
