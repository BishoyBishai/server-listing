import useLogout from "../../hooks/useLogout";
import { Logout, Moon, LogoDark, LogoLight } from "../ui/icons";
import translation from "./../../localize/en.json";
import { useThemeContext } from "../../contexts/themeContext";

function Nav() {
  const logout = useLogout();
  const { toggleTheme, theme } = useThemeContext();
  return (
    <nav className="dark:bg-midnight-500 px-2 sm:px-4 py-2.5 bg-nord-layer-200 fixed w-full z-20 top-0 left-0">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a
          href="https://nordlayer.com/"
          target="blank"
          className="flex items-center"
        >
          <span className="self-center text-xl dark:text-white font-semibold whitespace-nowrap text-midnight-500">
            {theme === "light" ? <LogoDark /> : <LogoLight />}
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            type="button"
            onClick={logout}
            className="hidden sm:flex items-center justify-around w-32 text-midnight-500 dark:text-white bg-nord-layer-500 hover:bg-nord-layer-800 focus:ring-4 focus:outline-none focus:ring-nord-layer-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-midnight-600 dark:hover:bg-midnight-700 dark:focus:ring-midnight-800"
          >
            <Logout />
            {translation.logout}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="sm:hidden py-2 px-4 text-white dark:text-midnight-500"
          >
            <Logout />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="py-2 px-4 text-midnight-500 dark:text-white"
          >
            <Moon />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
