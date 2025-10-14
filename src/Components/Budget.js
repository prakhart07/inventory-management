import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, PlusCircle, Search, Filter, BarChart3, PieChart, Building2, Wrench, Users, Package, X } from 'lucide-react';
import '../Assets/CSS/budget.css'

function BudgetManagement() {
    const [activeTab, setActiveTab] = useState('projects');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    // Budget entries state
    const [budgetEntries, setBudgetEntries] = useState([
        { id: 1, project: 'Downtown Office Complex', category: 'Material', amount: 2000000, date: '2024-10-01', description: 'Steel and cement purchase' },
        { id: 2, project: 'Residential Tower - Phase 2', category: 'Labor', amount: 1500000, date: '2024-10-05', description: 'Monthly labor payment' }
    ]);

    // Form state
    const [budgetForm, setBudgetForm] = useState({
        clientName: '',
        project: '',
        category: '',
        amount: '',
        date: '',
        description: ''
    });

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
        setBudgetForm({
            clientName: '',
            project: '',
            category: '',
            amount: '',
            date: '',
            description: ''
        });
    };

    const handleFormChange = (e) => {
        setBudgetForm({
            ...budgetForm,
            [e.target.name]: e.target.value
        });
    };

    const handleAddBudget = (e) => {
        e.preventDefault();

        if (!budgetForm.project || !budgetForm.category || !budgetForm.amount || !budgetForm.date) {
            showAlert('Please fill all required fields', 'warning');
            return;
        }

        const newEntry = {
            id: Date.now(),
            project: budgetForm.project,
            category: budgetForm.category,
            amount: parseFloat(budgetForm.amount),
            date: budgetForm.date,
            description: budgetForm.description
        };

        setBudgetEntries([newEntry, ...budgetEntries]);
        showAlert('Budget entry added successfully!', 'success');
        closeModal();
    };

    const showAlert = (message, type) => {
        setAlertMessage({ message, type });
        setTimeout(() => setAlertMessage(null), 4000);
    };

    return (
        <div className="budget-container">
            {/* Alert Message */}
            {alertMessage && (
                <div className={`alert-message alert-${alertMessage.type}`}>
                    <CheckCircle size={20} />
                    <span>{alertMessage.message}</span>
                    <button onClick={() => setAlertMessage(null)} className="alert-close-btn">
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Main Content */}
            <div className="main-content">
                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-purple">
                                <DollarSign size={28} />
                            </div>
                            <div>
                                <div className="stat-label">Total Budget</div>
                                <div className="stat-value">{formatCurrency(totalBudget)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-orange">
                                <TrendingUp size={28} />
                            </div>
                            <div>
                                <div className="stat-label">Total Spent</div>
                                <div className="stat-value">{formatCurrency(totalSpent)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-green">
                                <CheckCircle size={28} />
                            </div>
                            <div>
                                <div className="stat-label">Active Projects</div>
                                <div className="stat-value">{activeProjects}</div>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-blue">
                                <AlertTriangle size={28} />
                            </div>
                            <div>
                                <div className="stat-label">Critical Alerts</div>
                                <div className="stat-value">{criticalProjects}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs-container">
                    {['projects', 'allocation', 'comparison', 'alerts'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`tab-button ${activeTab === tab ? 'tab-active' : ''}`}
                        >
                            {tab === 'projects' ? 'Project List' : tab === 'allocation' ? 'Budget Allocation' : tab === 'comparison' ? 'Budget vs Actual' : 'Alerts'}
                        </button>
                    ))}
                </div>

                {/* Action Bar */}
                <div className="action-bar">
                    <div className="search-wrapper">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button className="filter-btn">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button onClick={() => openModal('addBudget')} className="add-budget-btn">
                        <PlusCircle size={18} />
                        Received Money
                    </button>
                </div>

                {/* Budget Entries Section */}
                {activeTab === 'projects' && budgetEntries.length > 0 && (
                    <div className="budget-entries-section">
                        <h3 className="section-title">Recent Budget Entries</h3>
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budgetEntries.map((entry) => (
                                        <tr key={entry.id}>
                                            <td className="entry-project">{entry.project}</td>
                                            <td>
                                                <span className="category-badge">
                                                    {entry.category}
                                                </span>
                                            </td>
                                            <td className="entry-amount">{formatCurrency(entry.amount)}</td>
                                            <td className="entry-date">{entry.date}</td>
                                            <td className="entry-description">{entry.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Projects Table */}
                {activeTab === 'projects' && (
                    <div className="projects-table-container">
                        <div className="table-wrapper">
                            <table className="data-table">
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
                                                    <div className="project-name">{project.name}</div>
                                                    <div className="project-start-date">Start: {project.startDate}</div>
                                                </td>
                                                <td className="project-location">{project.location}</td>
                                                <td className="project-manager">{project.manager}</td>
                                                <td className="project-budget">{formatCurrency(project.totalBudget)}</td>
                                                <td>
                                                    <div className="project-spent">{formatCurrency(project.spent)}</div>
                                                    <div className="project-percentage">{percentage}%</div>
                                                </td>
                                                <td>
                                                    <div className="progress-container">
                                                        <div className="progress-bar-bg">
                                                            <div className="progress-bar-fill" style={{ width: `${project.progress}%` }}></div>
                                                        </div>
                                                        <span className="progress-text">{project.progress}%</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`status-badge status-${statusColor}`}>
                                                        {statusColor === 'critical' || statusColor === 'warning' ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                                                        {statusColor}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button onClick={() => openModal('view', project)} className="view-details-btn">View Details</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Budget Allocation Tab */}
                {activeTab === 'allocation' && (
                    <div className="allocation-grid">
                        <div className="allocation-card">
                            <h3 className="allocation-title">
                                <Building2 size={24} />
                                {projects[0].name}
                            </h3>
                            {budgetAllocations.map((allocation) => {
                                const Icon = allocation.icon;
                                const percentage = calculatePercentage(allocation.spent, allocation.allocated);

                                return (
                                    <div key={allocation.id} className="allocation-item">
                                        <div className="allocation-header">
                                            <div className="allocation-info">
                                                <div className={`allocation-icon allocation-icon-${allocation.color}`}>
                                                    <Icon size={20} />
                                                </div>
                                                <div>
                                                    <div className="allocation-category">{allocation.category}</div>
                                                    <div className="allocation-allocated">{formatCurrency(allocation.allocated)}</div>
                                                </div>
                                            </div>
                                            <div className="allocation-spent-info">
                                                <div className="allocation-spent-label">Spent</div>
                                                <div className="allocation-spent-value">{formatCurrency(allocation.spent)}</div>
                                            </div>
                                        </div>
                                        <div className="allocation-progress">
                                            <div className="allocation-progress-bar">
                                                <div
                                                    className={`allocation-progress-fill ${percentage > 90 ? 'progress-critical' :
                                                            percentage > 75 ? 'progress-warning' :
                                                                'progress-healthy'
                                                        }`}
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="allocation-progress-text">{percentage}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Alerts Tab */}
                {activeTab === 'alerts' && (
                    <div className="alerts-container">
                        {alerts.map((alert) => (
                            <div key={alert.id} className={`alert-card alert-card-${alert.severity}`}>
                                <div className="alert-content">
                                    <div className={`alert-icon alert-icon-${alert.severity}`}>
                                        <AlertTriangle size={24} />
                                    </div>
                                    <div className="alert-info">
                                        <h4 className="alert-project-name">{alert.projectName}</h4>
                                        <p className="alert-message">{alert.message}</p>
                                    </div>
                                    <span className={`alert-severity-badge alert-severity-${alert.severity}`}>
                                        {alert.severity}
                                    </span>
                                </div>
                                <div className="alert-footer">
                                    <span>Category: {alert.category}</span>
                                    <span>{alert.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div onClick={closeModal} className="modal-overlay">
                    <div onClick={(e) => e.stopPropagation()} className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {modalType === 'addBudget' && 'Add Budget Entry'}
                                {modalType === 'view' && 'Project Details'}
                                {modalType === 'filter' && 'Filter Projects'}
                            </h2>
                        </div>

                        <div className="modal-body">
                            {modalType === 'addBudget' && (
                                <form onSubmit={handleAddBudget} className="budget-form">
                                    <div className="form-group">
                                        <label className="form-label">Client Name *</label>
                                        <input
                                            type="text"
                                            name="clientName"
                                            value={budgetForm.clientName}
                                            onChange={handleFormChange}
                                            required
                                            placeholder="Enter client name"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Select Project *</label>
                                        <select
                                            name="project"
                                            value={budgetForm.project}
                                            onChange={handleFormChange}
                                            required
                                            className="form-input"
                                        >
                                            <option value="">Choose a project</option>
                                            {projects.map(p => (
                                                <option key={p.id} value={p.name}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">Category *</label>
                                            <select
                                                name="category"
                                                value={budgetForm.category}
                                                onChange={handleFormChange}
                                                required
                                                className="form-input"
                                            >
                                                <option value="">Select category</option>
                                                <option value="Material">Material</option>
                                                <option value="Labor">Labor</option>
                                                <option value="Equipment">Equipment</option>
                                                <option value="Miscellaneous">Miscellaneous</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Received Amount *</label>
                                            <input
                                                type="number"
                                                name="amount"
                                                value={budgetForm.amount}
                                                onChange={handleFormChange}
                                                placeholder="₹ 0"
                                                required
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Date *</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={budgetForm.date}
                                            onChange={handleFormChange}
                                            required
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            value={budgetForm.description}
                                            onChange={handleFormChange}
                                            placeholder="Enter budget description..."
                                            rows="3"
                                            className="form-textarea"
                                        />
                                    </div>

                                    <div className="form-actions">
                                        <button type="button" onClick={closeModal} className="btn-cancel">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn-submit">
                                            <PlusCircle size={18} />
                                            Add Entry
                                        </button>
                                    </div>
                                </form>
                            )}

                            {modalType === 'view' && selectedProject && (
                                <div className="project-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Project Name:</span>
                                        <span className="detail-value">{selectedProject.name}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Location:</span>
                                        <span className="detail-value">{selectedProject.location}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Manager:</span>
                                        <span className="detail-value">{selectedProject.manager}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Total Budget:</span>
                                        <span className="detail-value">{formatCurrency(selectedProject.totalBudget)}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Amount Spent:</span>
                                        <span className="detail-value">{formatCurrency(selectedProject.spent)}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Progress:</span>
                                        <span className="detail-value">{selectedProject.progress}%</span>
                                    </div>

                                    <div className="modal-footer">
                                        <button onClick={closeModal} className="btn-close">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}

                            {modalType === 'filter' && (
                                <div className="filter-placeholder">
                                    <Filter size={48} className="filter-icon" />
                                    <h3 className="filter-title">Filter Feature</h3>
                                    <p className="filter-description">Filter functionality coming soon!</p>
                                    <button onClick={closeModal} className="btn-close">
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BudgetManagement;