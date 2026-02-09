import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Embroidery from "./pages/Embroidery";
import TypeIllu from "./pages/TypeIllu";
import Header from "./components/Header";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";
import AudioPlayer from './components/Audio_player/Audio-player.jsx';
import "./App.css";
import "./index.css";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={`app-wrapper ${theme}`}>
      <Router>
        <div className={`header-navbar-wrapper ${theme}`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1400px', padding: '20px 5vw' }}>
            <Header />
            <Navbar />
          </div>
        </div>
        <ThemeSwitcher />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/typography_illustration" element={<TypeIllu />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/embroidery" element={<Embroidery />} />
        </Routes>
      </Router>

      <AudioPlayer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
