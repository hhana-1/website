import React from "react";
import CloseIcon from "../assets/x-solid.svg";
import GlitterEffect from "./glitter/GlitterEffect";
import picture from "/illu_typ/logo_rol.jpg";

function ProjectDetailModal({ project, onClose }) {
  const showGlitter = project?.id === 1;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {showGlitter && <GlitterEffect durationMs={3500} starCount={100} />}
      <div className="modal">
        <button className="close-modal" onClick={onClose}>
        <img src={CloseIcon} alt="Close" width="20" height="20" />
        </button>
        <h3>{project.title}</h3>
        <img src={picture} alt="Project" className="modal-project-image" />
        <p>{project.description}</p>
        {/* <a className='visit-project-link' href={project.link} target="_blank" rel="noopener noreferrer">
          Visit the Project
        </a> */}
      </div>
    </div>
  );
}

export default ProjectDetailModal;
