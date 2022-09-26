import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { getAppTheme, setAppTheme } from "../utils/theme";

export type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

export function useThemeContext() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getAppTheme());

  const handleChangeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setAppTheme(newTheme);
  }, [theme]);

  const defaultContext = {
    theme,
    toggleTheme: handleChangeTheme,
  };

  return (
    <ThemeContext.Provider value={defaultContext}>
      <div className={`${theme === "dark" ? "dark" : ""}`}>
        <div className="dark:bg-midnight-800">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
}
