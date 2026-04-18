import React, { useState } from "react";
import CloseIcon from "../assets/x-solid.svg";
import GlitterEffect from "./glitter/GlitterEffect";
import GlitterOverlayTop from "./glitter/GlitterOverlayTop";
import picture from "/illu_typ/logo_rol.jpg";

function ProjectDetailModal({ project, onClose }) {
  const showGlitter = project?.id === 1;
  const [glitterSeed, setGlitterSeed] = useState(0);

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
          durationMs={3500}
          starCount={100}
        />
      )}
      {showGlitter && (
        <GlitterOverlayTop
          key={`top-${glitterSeed}`}
          durationMs={4200}
          starCount={34}
        />
      )}
      <div className="modal">
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
