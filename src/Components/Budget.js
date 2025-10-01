import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, PlusCircle, Search, Filter, BarChart3, PieChart, Building2, Wrench, Users, Package } from 'lucide-react';
import '../Assets/CSS/budget.css'
const BudgetManagement = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    // Sample data
    const projects = [
        {
            id: 1,
            name: 'Downtown Office Complex',
            location: 'Mumbai, Maharashtra',
            totalBudget: 50000000,
            spent: 32500000,
            status: 'in-progress',
            startDate: '2024-01-15',
            endDate: '2025-06-30',
            manager: 'Rajesh Kumar',
            progress: 65
        },
        {
            id: 2,
            name: 'Residential Tower - Phase 2',
            location: 'Pune, Maharashtra',
            totalBudget: 75000000,
            spent: 45000000,
            status: 'in-progress',
            startDate: '2024-03-01',
            endDate: '2025-12-31',
            manager: 'Priya Sharma',
            progress: 60
        },
        {
            id: 3,
            name: 'Highway Bridge Construction',
            location: 'Indore, Madhya Pradesh',
            totalBudget: 120000000,
            spent: 98000000,
            status: 'critical',
            startDate: '2023-09-01',
            endDate: '2025-03-31',
            manager: 'Amit Patel',
            progress: 82
        },
        {
            id: 4,
            name: 'Shopping Mall Development',
            location: 'Bangalore, Karnataka',
            totalBudget: 95000000,
            spent: 23750000,
            status: 'in-progress',
            startDate: '2024-06-01',
            endDate: '2026-05-31',
            manager: 'Neha Gupta',
            progress: 25
        }
    ];

    const budgetAllocations = [
        { id: 1, projectId: 1, category: 'Material', allocated: 20000000, spent: 14500000, icon: Package, color: 'blue' },
        { id: 2, projectId: 1, category: 'Labor', allocated: 15000000, spent: 10200000, icon: Users, color: 'purple' },
        { id: 3, projectId: 1, category: 'Equipment', allocated: 10000000, spent: 6300000, icon: Wrench, color: 'orange' },
        { id: 4, projectId: 1, category: 'Miscellaneous', allocated: 5000000, spent: 1500000, icon: Building2, color: 'green' }
    ];

    const alerts = [
        {
            id: 1,
            projectId: 3,
            projectName: 'Highway Bridge Construction',
            message: 'Budget exceeded by 8% - Immediate action required',
            severity: 'critical',
            category: 'Equipment',
            date: '2024-09-28'
        },
        {
            id: 2,
            projectId: 2,
            projectName: 'Residential Tower - Phase 2',
            message: 'Material costs approaching 85% of allocated budget',
            severity: 'warning',
            category: 'Material',
            date: '2024-09-29'
        },
        {
            id: 3,
            projectId: 1,
            projectName: 'Downtown Office Complex',
            message: 'Labor costs within acceptable range',
            severity: 'info',
            category: 'Labor',
            date: '2024-09-30'
        }
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const calculatePercentage = (spent, total) => {
        return ((spent / total) * 100).toFixed(1);
    };

    const getStatusColor = (percentage) => {
        if (percentage >= 90) return 'critical';
        if (percentage >= 75) return 'warning';
        return 'healthy';
    };

    const totalBudget = projects.reduce((sum, p) => sum + p.totalBudget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
    const criticalProjects = projects.filter(p => p.status === 'critical').length;
    const activeProjects = projects.filter(p => p.status === 'in-progress').length;

    const openModal = (type, project = null) => {
        setModalType(type);
        setSelectedProject(project);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
        setSelectedProject(null);
    };

    return (
        <div className="budget-container">
            {/* Header */}
            <div className="budget-header">
                <div className="budget-header-content">
                    <div className="budget-header-title">
                        <div className="budget-header-icon">
                            <DollarSign size={28} />
                        </div>
                        <h1 className="budget-h1">Budget Management System</h1>
                    </div>
                    <p className="budget-header-subtitle">Track and manage project budgets across all construction sites</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="budget-main-content">
                {/* Stats Grid */}
                <div className="budget-stats-grid">
                    <div className="budget-stat-card">
                        <div className="budget-stat-icon violet">
                            <DollarSign size={28} />
                        </div>
                        <div className="budget-stat-label">Total Budget</div>
                        <div className="budget-stat-value">{formatCurrency(totalBudget)}</div>
                    </div>

                    <div className="budget-stat-card">
                        <div className="budget-stat-icon amber">
                            <TrendingUp size={28} />
                        </div>
                        <div className="budget-stat-label">Total Spent</div>
                        <div className="budget-stat-value">{formatCurrency(totalSpent)}</div>
                    </div>

                    <div className="budget-stat-card">
                        <div className="budget-stat-icon emerald">
                            <CheckCircle size={28} />
                        </div>
                        <div className="budget-stat-label">Active Projects</div>
                        <div className="budget-stat-value">{activeProjects}</div>
                    </div>

                    <div className="budget-stat-card">
                        <div className="budget-stat-icon blue">
                            <AlertTriangle size={28} />
                        </div>
                        <div className="budget-stat-label">Critical Alerts</div>
                        <div className="budget-stat-value">{criticalProjects}</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="budget-tabs">
                    <button
                        className={`budget-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        Project List
                    </button>
                    <button
                        className={`budget-tab-btn ${activeTab === 'allocation' ? 'active' : ''}`}
                        onClick={() => setActiveTab('allocation')}
                    >
                        Budget Allocation
                    </button>
                    <button
                        className={`budget-tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
                        onClick={() => setActiveTab('comparison')}
                    >
                        Budget vs Actual
                    </button>
                    <button
                        className={`budget-tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('alerts')}
                    >
                        Alerts
                    </button>
                </div>

                {/* Action Bar */}
                <div className="budget-action-bar">
                    <div className="budget-search-box">
                        <Search size={20} className="budget-search-icon" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="budget-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="budget-btn budget-btn-secondary" onClick={() => openModal('filter')}>
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="budget-btn budget-btn-primary" onClick={() => openModal('add')}>
                        <PlusCircle size={18} />
                        Add Project
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'projects' && (
                    <div className="budget-table-container">
                        <div className="budget-table-wrapper">
                            <table className="budget-table">
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Location</th>
                                        <th>Manager</th>
                                        <th>Budget</th>
                                        <th>Spent</th>
                                        <th>Progress</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => {
                                        const percentage = calculatePercentage(project.spent, project.totalBudget);
                                        const statusColor = getStatusColor(parseFloat(percentage));

                                        return (
                                            <tr key={project.id}>
                                                <td>
                                                    <div className="budget-project-name">{project.name}</div>
                                                    <div className="budget-project-date">Start: {project.startDate}</div>
                                                </td>
                                                <td>{project.location}</td>
                                                <td>
                                                    <div className="budget-manager-name">{project.manager}</div>
                                                </td>
                                                <td>
                                                    <div className="budget-amount">{formatCurrency(project.totalBudget)}</div>
                                                </td>
                                                <td>
                                                    <div className="budget-amount">{formatCurrency(project.spent)}</div>
                                                    <div className="budget-percentage">{percentage}%</div>
                                                </td>
                                                <td>
                                                    <div className="budget-progress-container">
                                                        <div className="budget-progress-bar">
                                                            <div className="budget-progress-fill" style={{ width: `${project.progress}%` }}></div>
                                                        </div>
                                                        <span className="budget-progress-text">{project.progress}%</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`budget-status-badge ${statusColor}`}>
                                                        {statusColor === 'critical' && <AlertTriangle size={14} />}
                                                        {statusColor === 'warning' && <AlertTriangle size={14} />}
                                                        {statusColor === 'healthy' && <CheckCircle size={14} />}
                                                        {statusColor}
                                                    </span>
                                                </td>
                                                <td>
                                                    <a href="#" className="budget-action-link" onClick={(e) => { e.preventDefault(); openModal('view', project); }}>View Details</a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'allocation' && (
                    <div className="budget-allocation-grid">
                        <div className="budget-allocation-card">
                            <h3 className="budget-allocation-title">
                                <Building2 size={24} />
                                {projects[0].name}
                            </h3>
                            <div className="budget-allocation-stats">
                                {budgetAllocations.map((allocation) => {
                                    const Icon = allocation.icon;
                                    const percentage = calculatePercentage(allocation.spent, allocation.allocated);

                                    return (
                                        <div key={allocation.id} className="budget-allocation-item">
                                            <div className="budget-allocation-header">
                                                <div className="budget-allocation-info">
                                                    <div className={`budget-category-icon ${allocation.color}`}>
                                                        <Icon size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="budget-category-name">{allocation.category}</div>
                                                        <div className="budget-category-amount">{formatCurrency(allocation.allocated)}</div>
                                                    </div>
                                                </div>
                                                <div className="budget-spent-amount">
                                                    <div className="budget-spent-label">Spent</div>
                                                    <div className="budget-spent-value">{formatCurrency(allocation.spent)}</div>
                                                </div>
                                            </div>
                                            <div className="budget-allocation-progress">
                                                <div className="budget-allocation-progress-bar">
                                                    <div
                                                        className="budget-allocation-progress-fill"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            background: percentage > 90 ? '#ef4444' : percentage > 75 ? '#f59e0b' : '#10b981'
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="budget-allocation-percentage">{percentage}%</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="budget-chart-card">
                            <h3 className="budget-chart-title">
                                <PieChart size={24} />
                                Budget Distribution
                            </h3>
                            <div className="budget-chart-placeholder">
                                <div className="budget-pie-chart-container">
                                    {budgetAllocations.map((allocation, index) => {
                                        const total = budgetAllocations.reduce((sum, a) => sum + a.allocated, 0);
                                        const percentage = ((allocation.allocated / total) * 100).toFixed(1);
                                        const colors = ['#3b82f6', '#7c3aed', '#f59e0b', '#10b981'];

                                        return (
                                            <div key={allocation.id} className="budget-pie-item">
                                                <div className="budget-pie-color" style={{ background: colors[index] }}></div>
                                                <div className="budget-pie-label">{allocation.category}</div>
                                                <div className="budget-pie-value">{percentage}%</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'comparison' && (
                    <div className="budget-comparison-container">
                        <div className="budget-comparison-header">
                            <h3 className="budget-comparison-title">
                                <BarChart3 size={24} />
                                Budget vs Actual Spending Analysis
                            </h3>
                        </div>
                        {projects.map((project) => {
                            const percentage = calculatePercentage(project.spent, project.totalBudget);
                            const remaining = project.totalBudget - project.spent;
                            const status = getStatusColor(parseFloat(percentage));

                            return (
                                <div key={project.id} className="budget-comparison-card">
                                    <div className="budget-comparison-card-header">
                                        <div>
                                            <h4 className="budget-comparison-project-name">{project.name}</h4>
                                            <p className="budget-comparison-project-manager">Manager: {project.manager}</p>
                                        </div>
                                        <span className={`budget-status-badge ${status}`}>
                                            {status === 'critical' && <AlertTriangle size={14} />}
                                            {status === 'warning' && <AlertTriangle size={14} />}
                                            {status === 'healthy' && <CheckCircle size={14} />}
                                            {status}
                                        </span>
                                    </div>

                                    <div className="budget-comparison-bars">
                                        <div className="budget-comparison-bar-row">
                                            <span className="budget-comparison-bar-label">Allocated Budget</span>
                                            <div className="budget-comparison-bar-container">
                                                <div className="budget-comparison-bar allocated">
                                                    {formatCurrency(project.totalBudget)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="budget-comparison-bar-row">
                                            <span className="budget-comparison-bar-label">Actual Spending</span>
                                            <div className="budget-comparison-bar-container">
                                                <div
                                                    className={`budget-comparison-bar spent ${status}`}
                                                    style={{ width: `${percentage}%` }}
                                                >
                                                    {formatCurrency(project.spent)} ({percentage}%)
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="budget-comparison-footer">
                                        <div className="budget-comparison-stat">
                                            <span className="budget-comparison-stat-label">Remaining Budget</span>
                                            <span className={`budget-comparison-stat-value ${remaining > 0 ? 'positive' : 'negative'}`}>
                                                {formatCurrency(Math.abs(remaining))}
                                            </span>
                                        </div>
                                        <div className="budget-comparison-stat">
                                            <span className="budget-comparison-stat-label">Budget Variance</span>
                                            <span className={`budget-comparison-stat-value ${remaining > 0 ? 'positive' : 'negative'}`}>
                                                {remaining > 0 ? '+' : ''}{((remaining / project.totalBudget) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {activeTab === 'alerts' && (
                    <div className="budget-alerts-container">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`budget-alert-card ${alert.severity}`}
                            >
                                <div className="budget-alert-header">
                                    <div className={`budget-alert-icon ${alert.severity}`}>
                                        <AlertTriangle size={24} />
                                    </div>
                                    <div className="budget-alert-content">
                                        <h4 className="budget-alert-title">{alert.projectName}</h4>
                                        <p className="budget-alert-message">{alert.message}</p>
                                    </div>
                                    <span className={`budget-alert-badge ${alert.severity}`}>
                                        {alert.severity}
                                    </span>
                                </div>
                                <div className="budget-alert-footer">
                                    <span className="budget-alert-category">Category: {alert.category}</span>
                                    <span className="budget-alert-date">{alert.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="budget-modal" onClick={closeModal}>
                    <div className="budget-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="budget-modal-header">
                            <h2 className="budget-modal-title">
                                {modalType === 'add' && 'Add New Project'}
                                {modalType === 'view' && 'Project Details'}
                                {modalType === 'filter' && 'Filter Projects'}
                            </h2>
                        </div>
                        <div className="budget-modal-body">
                            {modalType === 'add' && (
                                <div>
                                    <div className="budget-form-group">
                                        <label className="budget-form-label">Project Name</label>
                                        <input type="text" className="budget-form-input" placeholder="Enter project name" />
                                    </div>
                                    <div className="budget-form-row">
                                        <div className="budget-form-group">
                                            <label className="budget-form-label">Total Budget</label>
                                            <input type="number" className="budget-form-input" placeholder="₹ 0" />
                                        </div>
                                        <div className="budget-form-group">
                                            <label className="budget-form-label">Project Manager</label>
                                            <input type="text" className="budget-form-input" placeholder="Manager name" />
                                        </div>
                                    </div>
                                    <div className="budget-form-row">
                                        <div className="budget-form-group">
                                            <label className="budget-form-label">Start Date</label>
                                            <input type="date" className="budget-form-input" />
                                        </div>
                                        <div className="budget-form-group">
                                            <label className="budget-form-label">End Date</label>
                                            <input type="date" className="budget-form-input" />
                                        </div>
                                    </div>
                                    <div className="budget-form-group">
                                        <label className="budget-form-label">Location</label>
                                        <input type="text" className="budget-form-input" placeholder="Project location" />
                                    </div>
                                </div>
                            )}
                            {modalType === 'view' && selectedProject && (
                                <div>
                                    <div className="budget-detail-row">
                                        <span className="budget-detail-label">Project Name:</span>
                                        <span className="budget-detail-value">{selectedProject.name}</span>
                                    </div>
                                    <div className="budget-detail-row">
                                        <span className="budget-detail-label">Location:</span>
                                        <span className="budget-detail-value">{selectedProject.location}</span>
                                    </div>
                                    <div className="budget-detail-row">
                                        <span className="budget-detail-label">Manager:</span>
                                        <span className="budget-detail-value">{selectedProject.manager}</span>
                                    </div>
                                    <div className="budget-detail-row">
                                        <span className="budget-detail-label">Total Budget:</span>
                                        <span className="budget-detail-value">{formatCurrency(selectedProject.totalBudget)}</span>
                                    </div>
                                    <div className="budget-detail-row">
                                        <span className="budget-detail-label">Amount Spent:</span>
                                        <span className="budget-detail-value">{formatCurrency(selectedProject.spent)}</span>
                                    </div>
                                    <div className="budget-detail-row">
                                        <span className="budget-detail-label">Progress:</span>
                                        <span className="budget-detail-value">{selectedProject.progress}%</span>
                                    </div>
                                </div>
                            )}
                            <div className="budget-modal-footer">
                                <button className="budget-btn budget-btn-cancel" onClick={closeModal}>
                                    {modalType === 'view' ? 'Close' : 'Cancel'}
                                </button>
                                {modalType !== 'view' && (
                                    <button className="budget-btn budget-btn-submit">
                                        {modalType === 'add' ? 'Create Project' : 'Apply Filters'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetManagement;