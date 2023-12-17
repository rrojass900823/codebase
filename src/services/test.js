import api from "@/api/api";
import { apiEndpoints } from "@/constants";
export default{
  async getPokemontTypes(params = {}) {
    return api.request(apiEndpoints.pokemon_api_test.pokemon_types, params, 'get');
  },
}
