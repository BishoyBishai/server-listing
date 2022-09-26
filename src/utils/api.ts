import axios from "axios";
import { isPublicAPI } from "./isPublicAPI";
import { clearSessionToken, getAccessSessionToken } from "./token";

const { BASE_URL } = process.env;

const customAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  proxy: {
    host: BASE_URL as string,
    port: 80,
    protocol: "https",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessSessionToken();
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: isPublicAPI(config.url) ? "" : accessToken,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (!isPublicAPI(originalConfig.url) && err.response.status === 401) {
      clearSessionToken();
    }
    return Promise.reject(err);
  }
);
export default customAxios;
