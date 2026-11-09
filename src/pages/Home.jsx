import { useTheme } from "../context/ThemeContext";
import "../App.css";
import "../index.css";
import "./Home.css";
import StarScroll from "../components/StarScroll/StarScroll";

function Home() {
  const { theme } = useTheme();

  // Party theme: 3D star that turns as the page scrolls
  if (theme === "party") {
    return (
      <div className="container01">
        {/* Tall scroll area: the star stays in view and turns as the page scrolls */}
        <div className="home-scroll">
          <div className="home-star-sticky">
            <StarScroll className="home-star" turnsPerScreen={0.5} />
          </div>
        </div>
      </div>
    );
  }

  // Cherry theme: the original cherry drawing (to be replaced by a 3D cherry later)
  return (
    <div className="container01">
      <div
        className="cherry-papa"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="/cherry_picture.png"
          alt="Cherry drawing"
          style={{
            width: "min(48vw, 580px)",
            minWidth: "100px",
            height: "auto",
            padding: "3% 0",
          }}
        />
      </div>
    </div>
  );
}

export default Home;
