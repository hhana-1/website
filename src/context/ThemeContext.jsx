// import { createContext, useEffect, useState, useContext } from "react";

// export const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.body.classList.toggle("bodyly", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }
// export const useTheme = () => useContext(ThemeContext);

import { createContext, useEffect, useState, useContext } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
