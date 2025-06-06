// ViewProjectPage.jsx - afișare și editare fișier proiect
import React, { useState } from 'react';
import '../../styles/ViewProjectPage.scss'; // asigură-te că ai acest fișier pentru stiluri

const dummyProject = {
  title: 'CRM Dashboard',
  description: 'A dashboard to manage clients, tasks, and sales.',
  technologies: ['React', 'Node.js', 'MongoDB'],
  file: {
    name: 'specifications.txt',
    content: 'This project uses a MERN stack and supports real-time data sync...'
  }
};

const ViewProjectPage = () => {
  const { title, description, technologies, file } = dummyProject;
  const [fileContent, setFileContent] = useState(file.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Într-un caz real, trimite `fileContent` către backend
    console.log('Saved content:', fileContent);
    setIsEditing(false);
  };

  return (
    <div className="view-project-page container py-4">
      <h2 className="mb-3">{title}</h2>

      <div className="mb-4">
        <h5>Description:</h5>
        <p>{description}</p>
      </div>

      <div className="mb-4">
        <h5>Technologies Used:</h5>
        <div className="d-flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span key={idx} className="badge bg-orange">{tech}</span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h5>Attached File:</h5>
        <div className="file-box p-3 rounded">
          <strong>{file.name}</strong>
          {isEditing ? (
            <>
              <textarea
                className="form-control mt-3"
                rows="10"
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
              ></textarea>
              <button
                className="btn btn-success mt-2"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <pre className="file-content mt-2">{fileContent}</pre>
              <button
                className="btn btn-orange mt-2"
                onClick={() => setIsEditing(true)}
              >
                Edit File
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProjectPage;
