import { ACCESS_TOKEN } from "../constants/localStorage";

export const setSessionToken = (userToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, userToken || "");
};

export const getAccessSessionToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const clearSessionToken = () => {
  localStorage.setItem(ACCESS_TOKEN, "");
  window.location.reload();
};
