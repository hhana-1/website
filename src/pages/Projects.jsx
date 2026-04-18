
import { useState } from "react";
import { projects } from "../data/projects";
import ProjectDetailModal from "../components/ProjectDetailModal"; 
import "./Projects.css";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (proj) => {
    setSelectedProject(proj);
  };

  const closeModal = () => {
    setSelectedProject(null); // Close the modal
  };

  return (
    <div id="projects" className="container01">
      <h1>Projects</h1>
      <div className="project-container">
        {projects.map((proj) => (
          <div
            className="project-div"
            key={proj.id}
            onClick={() => handleProjectClick(proj)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleProjectClick(proj);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className='project-image'>
              <img
                src={proj.imageGallery.image1}
                alt='Project image'
                className={proj.id === 1 ? "project-image-rol" : ""}
              />
              </div>
            <h3>{proj.title}</h3>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="view-project-link"
            >
              View Project
            </a>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}

export default Projects;

