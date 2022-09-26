import { Theme } from "../contexts/themeContext";

export const setAppTheme = (theme: Theme) => {
  localStorage.setItem("default-theme", theme);
};

export const getAppTheme = () => {
  return (localStorage.getItem("default-theme") || "light") as Theme;
};
