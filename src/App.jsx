import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Embroidery from "./pages/Embroidery";
import TypeIllu from "./pages/TypeIllu";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Header />
      <Navbar />
      <ThemeSwitcher />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/typography_illustration" element={<TypeIllu />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/embroidery" element={<Embroidery />} />
      </Routes>
    </Router>
    </ ThemeProvider>
  );
}

export default App;