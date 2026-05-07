import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/x-solid.svg";
import GlitterEffect from "./glitter/GlitterEffect";
import GlitterOverlayTop from "./glitter/GlitterOverlayTop";

// Dynamically import all images from photos_from_ROL folder
const imageModules = import.meta.glob('../assets/photos_from_ROL/*', { eager: true });
const allImages = Object.values(imageModules).map((module) => module.default);

const MODAL_REVEAL_DELAY_MS = 200;

function ProjectDetailModal({ project, onClose }) {
  const showGlitter = project?.id === 1;
  const [glitterSeed, setGlitterSeed] = useState(0);
  const [showModalContent, setShowModalContent] = useState(!showGlitter);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (!showGlitter) {
      setShowModalContent(true);
      return undefined;
    }

    setShowModalContent(false);

    const revealTimer = window.setTimeout(() => {
      setShowModalContent(true);
    }, MODAL_REVEAL_DELAY_MS);

    return () => {
      window.clearTimeout(revealTimer);
    };
  }, [project?.id, showGlitter]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [allImages.length]);

  const triggerGlitter = () => {
    setGlitterSeed((currentSeed) => currentSeed + 1);
  };

  const goToPrevious = () => {
    setCarouselIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCarouselIndex((prevIndex) => 
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = () => {
    triggerGlitter();
    goToNext();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {showGlitter && (
        <GlitterEffect
          key={`base-${glitterSeed}`}
          durationMs={3330}
          starCount={100}
          calmDown={showModalContent}
        />
      )}
      {showGlitter && (
        <GlitterOverlayTop
          key={`top-${glitterSeed}`}
          durationMs={3330}
          starCount={34}
          calmDown={showModalContent}
        />
      )}
      <div className={`modal modal-fade-in ${showModalContent ? "is-visible" : ""}`}>
        <button className="close-modal" onClick={onClose}>
        <img src={CloseIcon} alt="Close" width="20" height="20" />
        </button>
        <h3>{project.title}</h3>
        {allImages.length > 0 ? (
          <div className="carousel-container">
            <div className="carousel-image-wrapper">
              {allImages.length > 1 && (
                <button className="carousel-btn carousel-btn-prev" onClick={goToPrevious}>
                  ❮
                </button>
              )}
              <img
                src={allImages[carouselIndex]}
                alt={`Project ${carouselIndex + 1}`}
                className="modal-project-image"
                onClick={handleImageClick}
              />
              {allImages.length > 1 && (
                <button className="carousel-btn carousel-btn-next" onClick={goToNext}>
                  ❯
                </button>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="carousel-indicators">
                {allImages.map((_, index) => (
                  <span
                    key={index}
                    className={`indicator ${index === carouselIndex ? "active" : ""}`}
                    onClick={() => setCarouselIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p>No images available</p>
        )}
        <p>{project.description}</p>
        {/* <a className='visit-project-link' href={project.link} target="_blank" rel="noopener noreferrer">
          Visit the Project
        </a> */}
      </div>
    </div>
  );
}

export default ProjectDetailModal;
