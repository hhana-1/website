import { useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./ThemeSwitcher.css";

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.animation = 'none';
      setTimeout(() => {
        sliderRef.current.style.animation = 'sliderOpacity 0.8s ease-out';
      }, 10);
    }
  }, [theme]);

  return (
    <div className="theme-switcher-holder">
    <div className={`theme-switcher ${theme}`}>
      <div ref={sliderRef} className={`theme-slider ${theme}`}></div>
      
      <button
        onClick={() => setTheme("cherry")}
        className={`theme-button cherry ${theme === "cherry" ? "active" : ""}`}
      >
        🍒
      </button>

      <button
        onClick={() => setTheme("party")}
        className={`theme-button party ${theme === "party" ? "active" : ""}`}
      >
        🎉
      </button>

    </div>
    </div>
  );
}

export default ThemeSwitcher;
