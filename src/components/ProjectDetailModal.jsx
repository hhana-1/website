import React from "react";
import CloseIcon from "../assets/x-solid.svg";

function ProjectDetailModal({ project, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-modal" onClick={onClose}>
        <img src={CloseIcon} alt="Close" width="20" height="20" />
        </button>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <a className='visit-project-link' href={project.link} target="_blank" rel="noopener noreferrer">
          Visit the Project
        </a>
      </div>
    </div>
  );
}

export default ProjectDetailModal;
