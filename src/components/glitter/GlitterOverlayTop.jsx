import { useEffect, useMemo, useState } from "react";
import "./glitter-overlay-top.css";

function GlitterOverlayTop({ durationMs = 4200, starCount = 34 }) {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, index) => {
        const usePink = index % 2 === 0;

        return {
          id: index,
          top: `${4 + Math.random() * 92}%`,
          left: `${4 + Math.random() * 92}%`,
          delay: `${Math.random() * 1.1}s`,
          duration: "1.87s",
          size: "24px",
          color: usePink ? "#fe33ee" : "#00ffff",
          softColor: usePink
            ? "rgba(254, 51, 238, 0.7)"
            : "rgba(0, 255, 255, 0.7)",
          glowColor: usePink
            ? "rgba(254, 51, 238, 0.86)"
            : "rgba(0, 255, 255, 0.86)",
        };
      }),
    [starCount]
  );

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setFadingOut(true);
    }, Math.max(durationMs - 500, 0));

    const removeTimer = window.setTimeout(() => {
      setVisible(false);
    }, durationMs);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [durationMs]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`glitter-top-layer ${fadingOut ? "is-fading" : ""}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="glitter-top-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
            width: star.size,
            height: star.size,
            "--glitter-color": star.color,
            "--glitter-color-soft": star.softColor,
            "--glitter-glow": star.glowColor,
          }}
        />
      ))}
    </div>
  );
}

export default GlitterOverlayTop;
