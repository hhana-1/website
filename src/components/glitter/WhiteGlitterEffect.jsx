import { useEffect, useMemo, useState } from "react";
import "./glitter-white.css";

function WhiteGlitterEffect({ durationMs = 3500, starCount = 100 }) {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const layerFadeOutMs = 1200;

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, index) => ({
        id: index,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.9}s`,
        duration: `${2.1 + Math.random() * 1.2}s`,
        size: `${18 + Math.random() * 18}px`,
      })),
    [starCount]
  );

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setFadingOut(true);
    }, Math.max(durationMs - layerFadeOutMs, 0));

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
      className={`glitter-layer-white ${fadingOut ? "is-fading" : ""}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="glitter-star-white"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
}

export default WhiteGlitterEffect;
