import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./ThemeSwitcher.css";

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switcher-holder">
    <div className="theme-switcher">
      <button
        onClick={() => setTheme("light")}
        className={`theme-button light ${theme === "light" ? "active" : ""}`}
      >
        🍒
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`theme-button dark ${theme === "dark" ? "active" : ""}`}
      >
        🎉
      </button>

    </div>
    </div>
  );
}

export default ThemeSwitcher;
