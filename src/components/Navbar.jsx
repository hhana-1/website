import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`navbar ${theme}`}>
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className={`icon ${isOpen ? "fade-out" : "fade-in"}`}>☰</span>
        <span className={`icon ${isOpen ? "fade-in" : "fade-out"}`}>✖</span>

      </button>
      <ul className={`nav-links ${isOpen ? "open" : ""} ${theme}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/typography_illustration" onClick={() => setIsOpen(false)}>Type & Illu</Link></li>
        <li><Link to="/embroidery" onClick={() => setIsOpen(false)}>Embroidery</Link></li>
        <li><Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
        <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
    
      </ul>
    </nav>
  );
}

export default Navbar;
