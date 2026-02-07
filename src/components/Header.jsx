import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);
  const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 1200px)").matches);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const largeQuery = window.matchMedia("(min-width: 1200px)");

    const handleMobileChange = (e) => setIsMobile(e.matches);
    const handleLargeChange = (e) => setIsLargeScreen(e.matches);

    mobileQuery.addEventListener("change", handleMobileChange);
    largeQuery.addEventListener("change", handleLargeChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      largeQuery.removeEventListener("change", handleLargeChange);
    };
  }, []);

  const getLogoWidth = () => {
    if (isMobile) return "min(65vw, 400px)";
    return "min(23vw, 215px)";
  };

  return (
    <div style={{ 
    display: "flex",
    alignItems: "center",
    justifyContent: isMobile ? "center" : "flex-start",
    marginTop: isMobile ? "15px" : "0px",
    width: isMobile ? "100%" : "auto",
    }}>
      <img
        src={theme === "dark" ? "/HH_c_logo.png" : "/namelogo.PNG"}
        alt="Logo"
        onClick={()=> navigate("/")}
        style={{
          width: getLogoWidth(),
          minWidth: "100px",
          height: "auto",
          padding: "3% 0",
          cursor: "url('/vintage0pointer.svg'), pointer",
          marginTop: isMobile ? "20px" : "0px",
        }}
      />
    </div>
  );
}

export default Header;
