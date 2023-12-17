import axios from "axios";
const baseURL = "https://pokeapi.co/api/v2/"; // ONLY FOR TEST ...TODO...
const api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

api.request = function (
  endpoint,
  params = {},
  method = "post",
) {
  //if (params.limit === undefined) params.limit = 0;
  //if (params.start === undefined) params.start = 0;
  return new Promise(async (resolve, reject) => {
    if (method == "post") {
      try {
        const res = await api
          .post(baseURL+endpoint, params);
        if (res.data !== undefined) resolve(res.data);
        else reject(res);
      } catch (error) {
        reject(error);
      }
    }
    else {
      try {
        const res_1 = await api
          .get(baseURL+endpoint, {
            params,
          });
        if (res_1.data !== undefined && res_1.data) resolve(res_1.data);
        else reject(res_1);
      } catch (error_1) {
        reject(error_1);
      }
    }
  })
}
export default api;
