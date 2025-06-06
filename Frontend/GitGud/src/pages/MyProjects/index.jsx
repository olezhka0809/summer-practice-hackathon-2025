// MyProjectsPage.jsx - pagină pentru listarea proiectelor
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import '../../styles/MyProjectsPage.scss'; // asigură-te că ai acest fișier pentru stiluri

const dummyProjects = [
  { id: 1, title: 'CRM Dashboard', description: 'Client & task management system' },
  { id: 2, title: 'Inventory App', description: 'Manage stock and suppliers' },
  { id: 3, title: 'Portfolio Website', description: 'Personal web portfolio and blog' }
];

const MyProjectsPage = () => {
  const [projects] = useState(dummyProjects);

  return (
    <div className="my-projects-page container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Projects</h2>
        <Link to="/addproject" className="btn btn-orange">
          <FaPlusCircle className="me-2" /> Add a Project
        </Link>
      </div>

      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-6 col-lg-4 mb-4">
            <div className="project-card shadow-sm p-4 rounded">
              <h5>{project.title}</h5>
              <p className="text-muted small">{project.description}</p>
              <Link to={`/projects/${project.id}`} className="btn btn-sm btn-outline-primary mt-2">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjectsPage;
