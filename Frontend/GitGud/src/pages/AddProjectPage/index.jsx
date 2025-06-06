
import React, { useState } from 'react';
import '../../styles/AddProjectPage.scss'; 

const AddProjectPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [file, setFile] = useState(null);

  const handleAddTechnology = () => {
    if (techInput && !technologies.includes(techInput)) {
      setTechnologies([...technologies, techInput]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  
  technologies.forEach((tech) => formData.append('technologies[]', tech)); // trimitem array
  if (file) formData.append('file', file);

  try {
    const response = await fetch('http://localhost:5000/api/projects/create', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to submit project');
    }

    const data = await response.json();
    console.log('Project created:', data);
    // Poți adăuga un redirect sau un mesaj de succes
  } catch (err) {
    console.error('Upload error:', err);
  }
};

  return (
    <div className="add-project-page container">
      <h2 className="mb-4">Add a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description..."
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Technologies</label>
          <div className="d-flex gap-2 mb-2">
            <input
              type="text"
              className="form-control"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Add technology"
            />
            <button type="button" className="btn btn-orange" onClick={handleAddTechnology}>Add</button>
          </div>
          <div className="tech-list d-flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span key={index} className="badge bg-orange d-flex align-items-center">
                {tech}
                <button
                  type="button"
                  className="btn-close ms-2 btn-sm"
                  aria-label="Remove"
                  onClick={() => handleRemoveTech(tech)}
                ></button>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Upload File</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-orange w-100">Submit Project</button>
      </form>
    </div>
  );
};

export default AddProjectPage;
