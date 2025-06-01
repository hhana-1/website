import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <div style={{ display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: isMobile ? "15px" : "0px",
    }}>
      <img
        src={theme === "dark" ? "/HH_c_logo.png" : "/namelogo.PNG"}
        alt="Logo"
        onClick={()=> navigate("/")}
        style={{
          width: "min(68vw, 580px)",
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
