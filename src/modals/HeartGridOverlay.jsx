import React from "react";
import "./HeartGridOverlay.css";

const HeartGridOverlay = () => {
  const rows = 5;
  const cols = 7;

  return (
    <div className="heart-grid-overlay">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="heart-row">
          {Array.from({ length: cols }).map((_, colIdx) => {
            const isHeart = (rowIdx + colIdx) % 2 === 0;
            return (
              <div key={colIdx} className="heart-cell">
                {isHeart ? "♥︎" : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default HeartGridOverlay;
