import axios from "axios";
import { isProtectedAPI } from "./isProtectedAPI";
import { getAccessSessionToken } from "./token";

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
    if (accessToken && isProtectedAPI(config.url)) {
      config = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: accessToken,
        },
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
