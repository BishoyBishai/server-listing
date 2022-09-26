export const setSessionToken = (userToken: string) => {
  localStorage.setItem("access-token", userToken || "");
};

export const getAccessSessionToken = () => {
  return localStorage.getItem("access-token");
};

export const clearSessionToken = () => {
  localStorage.setItem("access-token", "");
  window.location.reload();
};
