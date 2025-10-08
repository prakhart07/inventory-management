import React, { useState } from 'react';
import { Search, Filter, Plus, X } from 'lucide-react';

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
        constructionType: 'With Material'
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
        constructionType: 'Without Material'
    }
];

export default function ProjectsPage() {
    const [projects, setProjects] = useState(initialProjects);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        status: 'Planning',
        clientName: '',
        plotSize: '',
        budget: '',
        constructionRate: '',
        constructionType: 'With Material'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
                clientName: '',
                plotSize: '',
                budget: '',
                constructionRate: '',
                constructionType: 'With Material'
            });
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* Top Bar */}
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
                <button style={{
                    padding: '10px 18px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}>
                    <Filter size={18} />
                    Filter by Status
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
                        fontSize: '14px'
                    }}>
                    <Plus size={18} />
                    Add Project
                </button>
            </div>

            {/* Project Cards */}
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
                                <div style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '6px' }}>
                                    🏗️ {project.name}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '14px' }}>
                                    📍 {project.location}
                                </div>
                            </div>
                            <span style={{
                                padding: '6px 16px',
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '500',
                                background: project.status === 'Active' ? '#d1fae5' : '#dbeafe',
                                color: project.status === 'Active' ? '#065f46' : '#1e40af'
                            }}>
                                {project.status}
                            </span>
                        </div>

                        {/* Advanced Info Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px',
                            marginTop: '16px'
                        }}>
                            <div style={{
                                background: '#f9fafb',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb'
                            }}>
                                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>👤 Client</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                                    {project.clientName || 'N/A'}
                                </div>
                            </div>

                            <div style={{
                                background: '#f9fafb',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb'
                            }}>
                                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>📐 Plot Size</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                                    {project.plotSize ? `${project.plotSize} sq ft` : '-'}
                                </div>
                            </div>

                            <div style={{
                                background: '#f9fafb',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb'
                            }}>
                                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>🏗️ Type</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                                    {project.constructionType}
                                </div>
                            </div>
                        </div>
                    </div>
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
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div>
                            {/* Project Name */}
                            <Field label="Project Name *" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter project name" />

                            {/* Location */}
                            <Field label="Location *" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter location" />

                            {/* Client Name */}
                            <Field label="Client Name" name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Enter client name" />

                            {/* Plot Size */}
                            <Field label="Plot Size (sq ft)" name="plotSize" type="number" value={formData.plotSize} onChange={handleInputChange} placeholder="Enter plot size" />

                            {/* Budget */}
                            <Field label="Budget (₹)" name="budget" type="number" value={formData.budget} onChange={handleInputChange} placeholder="Enter budget" />

                            {/* Construction Rate */}
                            <Field label="Construction Rate (₹/sq ft)" name="constructionRate" type="number" value={formData.constructionRate} onChange={handleInputChange} placeholder="Enter rate per sq ft" />

                            {/* Construction Type */}
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

                            {/* Status */}
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

                            {/* Buttons */}
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