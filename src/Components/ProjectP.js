import React, { useState } from 'react';
import { Search, Filter, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

const initialProjects = [
    {
        id: 1,
        name: 'Residential Complex - Phase 1',
        location: 'Indore North',
        status: 'Active',
        clientName: 'ABC Builders',
        plotSize: 2500,
        budget: 5000000,
        constructionRate: 2000,
        constructionType: 'Turnkey'
    },
    {
        id: 2,
        name: 'Commercial Plaza',
        location: 'Vijay Nagar',
        status: 'Planning',
        clientName: 'XYZ Constructions',
        plotSize: 5000,
        budget: 12000000,
        constructionRate: 2200,
        constructionType: 'Gray Box'
    },
    {
        id: 3,
        name: 'Shopping Mall Project',
        location: 'Bhanwarkuan',
        status: 'Active',
        clientName: 'Mall Developers Ltd',
        plotSize: 8000,
        budget: 25000000,
        constructionRate: 2500,
        constructionType: 'Turnkey'
    }
];

export default function ProjectsPage() {
    const [projects, setProjects] = useState(initialProjects);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        status: 'Planning',
        clientName: '',
        plotSize: '',
        budget: '',
        constructionRate: '',
        constructionType: 'Turnkey'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            location: project.location,
            status: project.status,
            clientName: project.clientName,
            plotSize: project.plotSize.toString(),
            budget: project.budget.toString(),
            constructionRate: project.constructionRate.toString(),
            constructionType: project.constructionType
        });
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (formData.name && formData.location) {
            if (editingProject) {
                // Update existing project
                const updatedProjects = projects.map(p =>
                    p.id === editingProject.id
                        ? {
                            ...p,
                            ...formData,
                            plotSize: formData.plotSize ? parseInt(formData.plotSize) : 0,
                            budget: formData.budget ? parseInt(formData.budget) : 0,
                            constructionRate: formData.constructionRate ? parseInt(formData.constructionRate) : 0
                        }
                        : p
                );
                setProjects(updatedProjects);
            } else {
                // Add new project
                const newProject = {
                    id: projects.length + 1,
                    ...formData,
                    plotSize: formData.plotSize ? parseInt(formData.plotSize) : 0,
                    budget: formData.budget ? parseInt(formData.budget) : 0,
                    constructionRate: formData.constructionRate ? parseInt(formData.constructionRate) : 0
                };
                setProjects([...projects, newProject]);
            }
            setShowModal(false);
            setEditingProject(null);
            setFormData({
                name: '',
                location: '',
                status: 'Planning',
                clientName: '',
                plotSize: '',
                budget: '',
                constructionRate: '',
                constructionType: 'Turnkey'
            });
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
            {/* Header */}
            {/* <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
                    🏗️ Projects Management
                </h1>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    Manage and track all your construction projects
                </p>
            </div> */}

            {/* Top Bar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '500px', minWidth: '250px' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        style={{
                            width: '100%',
                            padding: '10px 10px 10px 42px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '14px',
                            background: 'white'
                        }}
                    />
                </div>
                <button style={{
                    padding: '10px 18px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                }}>
                    <Filter size={18} />
                    Filter
                </button>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        padding: '10px 18px',
                        background: '#1e293b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                    <Plus size={18} />
                    Add Project
                </button>
            </div>

            {/* Project Cards */}
            <div style={{ display: 'grid', gap: '20px' }}>
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} onEdit={handleEdit} />
                ))}
            </div>

            {/* Modal */}
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
                                🏗️ {editingProject ? 'Edit Project' : 'Add New Project'}
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
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div>
                            <Field label="Project Name *" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter project name" />
                            <Field label="Location *" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter location" />
                            <Field label="Client Name" name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Enter client name" />
                            <Field label="Plot Size (sq ft)" name="plotSize" type="number" value={formData.plotSize} onChange={handleInputChange} placeholder="Enter plot size" />
                            <Field label="Budget (₹)" name="budget" type="number" value={formData.budget} onChange={handleInputChange} placeholder="Enter budget" />
                            <Field label="Construction Rate (₹/sq ft)" name="constructionRate" type="number" value={formData.constructionRate} onChange={handleInputChange} placeholder="Enter rate per sq ft" />

                            <div style={{ marginBottom: '20px' }}>
                                <label style={labelStyle}>Construction Type</label>
                                <select
                                    name="constructionType"
                                    value={formData.constructionType}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                >
                                    <option value="Turnkey">Turnkey</option>
                                    <option value="Gray Box">Gray Box</option>
                                    <option value="Labor Only">Labor Only</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={labelStyle}>Status *</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                >
                                    <option value="Planning">Planning</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                    <option value="On Hold">On Hold</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={cancelBtn}>
                                    Cancel
                                </button>
                                <button type="button" onClick={handleSubmit} style={addBtn}>
                                    {editingProject ? 'Update Project' : 'Add Project'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Project Card Component with Hover and Click
const ProjectCard = ({ project, onEdit }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleEditClick = (e) => {
        e.stopPropagation();
        onEdit(project);
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isHovered || isExpanded ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: isExpanded ? '20px' : '0' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '6px' }}>
                        🏗️ {project.name}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '14px' }}>
                        📍 {project.location}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '500',
                        background: project.status === 'Active' ? '#d1fae5' : project.status === 'Completed' ? '#e0e7ff' : project.status === 'On Hold' ? '#fee2e2' : '#dbeafe',
                        color: project.status === 'Active' ? '#065f46' : project.status === 'Completed' ? '#3730a3' : project.status === 'On Hold' ? '#991b1b' : '#1e40af'
                    }}>
                        {project.status}
                    </span>
                    {isExpanded ? <ChevronUp size={20} color="#6b7280" /> : <ChevronDown size={20} color="#6b7280" />}
                </div>
            </div>

            {/* Expanded Details */}
            <div style={{
                maxHeight: isExpanded ? '1000px' : '0',
                opacity: isExpanded ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.4s ease'
            }}>
                <div style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '20px',
                    marginTop: '16px'
                }}>
                    {/* Basic Info Section */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            📋 Basic Information
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '12px'
                        }}>
                            <InfoBox icon="👤" label="Client Name" value={project.clientName || 'N/A'} />
                            <InfoBox icon="📐" label="Plot Size" value={project.plotSize ? `${project.plotSize.toLocaleString('en-IN')} sq ft` : 'N/A'} />
                            <InfoBox icon="🏗️" label="Construction Type" value={project.constructionType} />
                        </div>
                    </div>

                    {/* Financial Info Section */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            💰 Financial Details
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '12px'
                        }}>
                            <InfoBox
                                icon="💵"
                                label="Total Budget"
                                value={project.budget ? `₹${project.budget.toLocaleString('en-IN')}` : 'N/A'}
                                highlight={true}
                            />
                            <InfoBox
                                icon="📊"
                                label="Construction Rate"
                                value={project.constructionRate ? `₹${project.constructionRate.toLocaleString('en-IN')}/sq ft` : 'N/A'}
                            />
                            <InfoBox
                                icon="🧮"
                                label="Estimated Total"
                                value={project.plotSize && project.constructionRate ? `₹${(project.plotSize * project.constructionRate).toLocaleString('en-IN')}` : 'N/A'}
                                highlight={true}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                background: '#1e293b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>
                            View Details
                        </button>
                        <button
                            onClick={handleEditClick}
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                background: 'white',
                                color: '#374151',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>
                            Edit Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Info Box Component
const InfoBox = ({ icon, label, value, highlight }) => (
    <div style={{
        background: highlight ? '#fef3c7' : '#f9fafb',
        padding: '14px',
        borderRadius: '10px',
        border: `1px solid ${highlight ? '#fbbf24' : '#e5e7eb'}`,
        transition: 'all 0.2s ease'
    }}>
        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', fontWeight: '500' }}>
            {icon} {label}
        </div>
        <div style={{ fontSize: '15px', fontWeight: '700', color: '#1f2937', wordBreak: 'break-word' }}>
            {value}
        </div>
    </div>
);

// Reusable field component
const Field = ({ label, name, value, onChange, placeholder, type = 'text' }) => (
    <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={inputStyle}
        />
    </div>
);

// Styles
const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box'
};

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
    fontSize: '14px'
};

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