import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/x-solid.svg";
import GlitterEffect from "./glitter/GlitterEffect";
import GlitterOverlayTop from "./glitter/GlitterOverlayTop";
import picture from "/illu_typ/logo_rol.jpg";

const MODAL_REVEAL_DELAY_MS = 200;

function ProjectDetailModal({ project, onClose }) {
  const showGlitter = project?.id === 1;
  const [glitterSeed, setGlitterSeed] = useState(0);
  const [showModalContent, setShowModalContent] = useState(!showGlitter);

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

  const triggerGlitter = () => {
    setGlitterSeed((currentSeed) => currentSeed + 1);
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
        <img
          src={picture}
          alt="Project"
          className="modal-project-image"
          onClick={triggerGlitter}
        />
        <p>{project.description}</p>
        {/* <a className='visit-project-link' href={project.link} target="_blank" rel="noopener noreferrer">
          Visit the Project
        </a> */}
      </div>
    </div>
  );
}

export default ProjectDetailModal;
