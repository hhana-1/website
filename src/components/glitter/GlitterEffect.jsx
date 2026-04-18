import { useEffect, useMemo, useState } from "react";
import "./glitter.css";

function GlitterEffect({ durationMs = 3500, starCount = 100 }) {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, index) => {
        const usePink = index % 2 === 0;

        const color = usePink ? "#fe33ee" : "#00ffff";

        const softColor = usePink
          ? "rgba(254, 51, 238, 0.62)"
          : "rgba(0, 255, 255, 0.62)";

        const glowColor = usePink
          ? "rgba(254, 51, 238, 0.85)"
          : "rgba(0, 255, 255, 0.85)";

        return {
        id: index,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.9}s`,
        duration: `${2.1 + Math.random() * 1.2}s`,
        size: `${18 + Math.random() * 18}px`,
        color,
        softColor,
        glowColor,
      };
      }),
    [starCount]
  );

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setFadingOut(true);
    }, Math.max(durationMs - 450, 0));

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
    <div className={`glitter-layer ${fadingOut ? "is-fading" : ""}`} aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="glitter-star"
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

export default GlitterEffect;