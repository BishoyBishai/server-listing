const { BASE_URL } = process.env;

const unprotectedAPI = ["/tokens"];
export const isProtectedAPI = (url?: string) => {
  if (!url) return false;
  const api = url.replace(BASE_URL || "", "");
  return !unprotectedAPI.includes(api);
};
