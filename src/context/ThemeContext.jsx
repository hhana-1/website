// import { createContext, useEffect, useState, useContext } from "react";

// export const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "cherry");

//   useEffect(() => {
//     document.body.classList.toggle("bodyly", theme === "party");
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
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "cherry") return "cherry";
    if (savedTheme === "party") return "party";
    return "party";
  });

  useEffect(() => {
    document.body.classList.remove("cherry", "party");
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
