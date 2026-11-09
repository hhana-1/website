import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`navbar ${theme}`}>
      <button
        className={`menu-toggle ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="main-menu"
      >
        {/* three lines that morph into an X when open */}
        <span className="menu-toggle-bar" />
        <span className="menu-toggle-bar" />
        <span className="menu-toggle-bar" />
      </button>
      <ul id="main-menu" className={`nav-links ${isOpen ? "open" : ""} ${theme}`}>
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
