// ProjectsPage.jsx
import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import '../Assets/CSS/Inventory.css';

const dummyProjects = [
    { id: 1, name: 'Residential Complex - Phase 1', location: 'Indore North', status: 'Active', materialsNeeded: ['Cement', 'Steel', 'Bricks'] },
    { id: 2, name: 'Commercial Plaza', location: 'Vijay Nagar', status: 'Planning', materialsNeeded: ['Cement', 'Paint', 'Tiles'] },
    { id: 3, name: 'Highway Bridge Project', location: 'Ring Road', status: 'Active', materialsNeeded: ['Steel', 'Cement', 'Sand'] },
];

export default function ProjectsPage() {
    return (
        <div className="projects-tab">
            <div className="search-bar">
                <div className="search-input-container">
                    <Search className="search-icon" size={20} />
                    <input type="text" className="search-input" placeholder="Search projects..." />
                </div>
                <button className="filter-btn">
                    <Filter size={18} />
                    Filter by Status
                </button>
                <button className="add-btn">
                    <Plus size={18} />
                    Add Project
                </button>
            </div>

            <div className="projects-grid">
                {dummyProjects.map(project => (
                    <div key={project.id} className="project-card">
                        <div className="project-header">
                            <div>
                                <div className="project-name">🏗️ {project.name}</div>
                                <div className="project-location">📍 {project.location}</div>
                            </div>
                            <span className={`project-status ${project.status.toLowerCase()}`}>{project.status}</span>
                        </div>
                        <div>
                            <strong style={{ color: '#6b7280', fontSize: '14px' }}>Materials Required:</strong>
                            <div className="project-materials">
                                {project.materialsNeeded.map((material, idx) => (
                                    <span key={idx} className="material-tag">📦 {material}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
