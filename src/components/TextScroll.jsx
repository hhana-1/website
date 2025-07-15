'use client';

import { useRef, useEffect } from "react";
import { useScroll } from "framer-motion";

export default function TextScroll() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    if (!scrollYProgress) return;

    const unsubscribe = scrollYProgress.on("change", (e) => {
      console.log(e);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={container} className="text-scroll" style={{ border: "1px solid pink" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 90 200 60">
        <path
          id="curved-text"
          d="M 2.6895596,135.24643 C 49.18052,178.6636 49.94816,97.34042 102.20326,97.592592 c 49.1888,0.237376 33.42739,82.607898 96.82415,35.348498"
          fill="none"
          stroke="black"
          strokeWidth="0.264583"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
        />

        <text style={{ fontSize: "7px" }}>
          {[...Array(3)].map((_, i) => (
            <textPath key={i} href="#curved-text" startOffset={`${i * 40}%`}>
              Wohooo I am texty
            </textPath>
          ))}
        </text>
      </svg>
    </div>
  );
}
