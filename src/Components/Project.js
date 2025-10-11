 // ProjectsPage.jsx
import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import '../Assets/CSS/Inventory.css';

const initialProjects = [
    { id: 1, name: 'Residential Complex - Phase 1', location: 'Indore North', status: 'Active', materialsNeeded: ['Cement', 'Steel', 'Bricks'] },
    { id: 2, name: 'Commercial Plaza', location: 'Vijay Nagar', status: 'Planning', materialsNeeded: ['Cement', 'Paint', 'Tiles'] },
    { id: 3, name: 'Highway Bridge Project', location: 'Ring Road', status: 'Active', materialsNeeded: ['Steel', 'Cement', 'Sand'] },
];

export default function ProjectsPage() {
    const [projects, setProjects] = useState(initialProjects);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        status: 'Planning',
        materialsNeeded: []
    });
    const [materialInput, setMaterialInput] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddMaterial = () => {
        if (materialInput.trim()) {
            setFormData(prev => ({
                ...prev,
                materialsNeeded: [...prev.materialsNeeded, materialInput.trim()]
            }));
            setMaterialInput('');
        }
    };

    const handleRemoveMaterial = (index) => {
        setFormData(prev => ({
            ...prev,
            materialsNeeded: prev.materialsNeeded.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = () => {
        if (formData.name && formData.location) {
            const newProject = {
                id: projects.length + 1,
                ...formData
            };
            setProjects([...projects, newProject]);
            setShowModal(false);
            setFormData({
                name: '',
                location: '',
                status: 'Planning',
                materialsNeeded: []
            });
            setMaterialInput('');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        style={{
                            width: '100%',
                            padding: '10px 10px 10px 42px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <button className="filter-btn">
                    <Filter size={18} />
                    Filter by Status
                </button>
                <button className="add-btn" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    Add Project
                </button>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
                {projects.map(project => (
                    <div key={project.id} style={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '20px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                            <div>
                                <div className="project-name">🏗️ {project.name}</div>
                                <div className="project-location">📍 {project.location}</div>
                            </div>
                            <span className={`project-status ${project.status.toLowerCase()}`}>{project.status}</span>
                        </div>
                        <div>
                            <strong style={{ color: '#6b7280', fontSize: '14px' }}>Materials Required:</strong>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                                {project.materialsNeeded.map((material, idx) => (
                                    <span key={idx} style={{
                                        background: '#fef3c7',
                                        color: '#92400e',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '13px',
                                        fontWeight: '500'
                                    }}>
                                        📦 {material}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        maxWidth: '500px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                                🏗️ Add New Project
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#6b7280',
                                    padding: '4px'
                                }}
                            >
                                {/* <X size={24} /> */}
                            </button>
                        </div>

                        <div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                    Project Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter project name"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="Enter location"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        boxSizing: 'border-box',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="Planning">Planning</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                    <option value="On Hold">On Hold</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                    Materials Needed
                                </label>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <input
                                        type="text"
                                        value={materialInput}
                                        onChange={(e) => setMaterialInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddMaterial()}
                                        placeholder="Enter material name"
                                        style={{
                                            flex: 1,
                                            padding: '10px 12px',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddMaterial}
                                        style={{
                                            padding: '10px 16px',
                                            background: '#1e293b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {formData.materialsNeeded.map((material, idx) => (
                                        <span key={idx} style={{
                                            background: '#fef3c7',
                                            color: '#92400e',
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            📦 {material}
                                            <button
                                                onClick={() => handleRemoveMaterial(idx)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '0',
                                                    color: '#92400e',
                                                    fontSize: '16px',
                                                    lineHeight: '1'
                                                }}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={cancelBtn}>
                                    Cancel
                                </button>
                                <button type="button" onClick={handleSubmit} style={addBtn}>
                                    Add Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const cancelBtn = {
    flex: 1,
    padding: '12px',
    background: 'white',
    color: '#374151',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600'
};

const addBtn = {
    flex: 1,
    padding: '12px',
    background: '#1e293b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600'
    
};
// final page
