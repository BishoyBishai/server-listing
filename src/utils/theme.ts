import { DEFAULT_THEME } from "../constants/localStorage";
import { Theme } from "../contexts/themeContext";

export const setAppTheme = (theme: Theme) => {
  localStorage.setItem(DEFAULT_THEME, theme);
};

export const getAppTheme = () => {
  return (localStorage.getItem(DEFAULT_THEME) || "light") as Theme;
};
