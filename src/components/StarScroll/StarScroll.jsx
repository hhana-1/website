import { useEffect, useRef } from "react";
import "./StarScroll.css";

// React wrapper for the scroll-rotating 3D star.
// three.js (~150 KB gzipped) is loaded only when this component mounts,
// so pages without the star don't download it.
function StarScroll({ className = "", turnsPerScreen = 0.5, axis = "y", smoothing = 6, float = true, pearl = true }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let star = null;
    let cancelled = false;

    import("./createStarScroll.js")
      .then(({ createStarScroll }) => {
        if (cancelled || !containerRef.current) return;
        star = createStarScroll(containerRef.current, { turnsPerScreen, axis, smoothing, float, pearl });
      })
      .catch((error) => console.error("StarScroll: failed to load", error));

    return () => {
      cancelled = true;
      star?.dispose();
    };
  }, [turnsPerScreen, axis, smoothing, float, pearl]);

  return <div ref={containerRef} className={`star-scroll ${className}`} aria-hidden="true" />;
}

export default StarScroll;
