import axios from "axios";
import { baseApiUrl } from "@/utils/constant";
import { getCookies, delCookies } from "@/utils/cookies";

axios.defaults.headers["Content-Type"] = "application/json";

const baseApi = axios.create({
  baseURL: baseApiUrl,
});

baseApi.interceptors.request.use(
  (config) => {
    const token = getCookies("CERT");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    else {
      delCookies("CERT");
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

baseApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    switch (error.response.status) {
      case 401:
        delCookies("CERT");
        break;
      default:
        break;
    }
    throw error?.response?.data ?? error;
  }
);

export { baseApi };
