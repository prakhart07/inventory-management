import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, PlusCircle, Search, Filter, BarChart3, PieChart, Building2, Wrench, Users, Package, X } from 'lucide-react';

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
        Client_name:'',
        project: '',
        category: '',
        Recieved_amount: '',
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
        <div style={{ minHeight: '100vh', background: '#f3f4f6', padding: '20px' }}>
            {/* Alert Message */}
            {alertMessage && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000,
                    background: alertMessage.type === 'success' ? '#10b981' : alertMessage.type === 'warning' ? '#f59e0b' : '#ef4444',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <CheckCircle size={20} />
                    <span>{alertMessage.message}</span>
                    <button onClick={() => setAlertMessage(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Main Content */}
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                    <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ background: '#7c3aed', padding: '14px', borderRadius: '12px', color: 'white', width: 'fit-content' }}>
                                <DollarSign size={28} />
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '500' }}>Total Budget</div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{formatCurrency(totalBudget)}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ background: '#ea580c', padding: '14px', borderRadius: '12px', color: 'white', width: 'fit-content' }}>
                                <TrendingUp size={28} />
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '500' }}>Total Spent</div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{formatCurrency(totalSpent)}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ background: '#059669', padding: '14px', borderRadius: '12px', color: 'white', width: 'fit-content' }}>
                                <CheckCircle size={28} />
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '500' }}>Active Projects</div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{activeProjects}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ background: '#2563eb', padding: '14px', borderRadius: '12px', color: 'white', width: 'fit-content' }}>
                                <AlertTriangle size={28} />
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '500' }}>Critical Alerts</div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{criticalProjects}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', padding: '8px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    {['projects', 'allocation', 'comparison', 'alerts'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '12px 24px',
                                border: 'none',
                                background: activeTab === tab ? 'rgb(71, 85, 105)' : 'transparent',
                                color: activeTab === tab ? 'white' : '#6b7280',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab === 'projects' ? 'Project List' : tab === 'allocation' ? 'Budget Allocation' : tab === 'comparison' ? 'Budget vs Actual' : 'Alerts'}
                        </button>
                    ))}
                </div>

                {/* Action Bar */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '12px 12px 12px 44px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                        />
                    </div>
                     <button style={{ padding: '14px 24px', background: '#8b5cf6', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '14px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Filter size={18} />
                                            Filter
                                        </button>
                    <button onClick={() => openModal('addBudget')} style={{ padding: '12px 20px', background: 'rgb(71, 85, 105)', color: 'white', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                        <PlusCircle size={18} />
                        Recieved_Money
                    </button>
                </div>

                {/* Budget Entries Section */}
                {activeTab === 'projects' && budgetEntries.length > 0 && (
                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Recent Budget Entries</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Project</th>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Category</th>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Amount</th>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budgetEntries.map((entry) => (
                                        <tr key={entry.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <td style={{ padding: '16px 12px', fontSize: '14px', color: '#111827', fontWeight: '500' }}>{entry.project}</td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                                                    {entry.category}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 12px', fontSize: '14px', color: '#059669', fontWeight: '600' }}>{formatCurrency(entry.amount)}</td>
                                            <td style={{ padding: '16px 12px', fontSize: '14px', color: '#6b7280' }}>{entry.date}</td>
                                            <td style={{ padding: '16px 12px', fontSize: '14px', color: '#6b7280' }}>{entry.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Projects Table */}
                {activeTab === 'projects' && (
                    <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f9fafb' }}>
                                    <tr>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Project Name</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Location</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Manager</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Budget</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Spent</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Progress</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => {
                                        const percentage = calculatePercentage(project.spent, project.totalBudget);
                                        const statusColor = getStatusColor(parseFloat(percentage));
                                        const statusBg = statusColor === 'critical' ? '#fee2e2' : statusColor === 'warning' ? '#fef3c7' : '#d1fae5';
                                        const statusTextColor = statusColor === 'critical' ? '#dc2626' : statusColor === 'warning' ? '#d97706' : '#059669';

                                        return (
                                            <tr key={project.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                                <td style={{ padding: '16px' }}>
                                                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>{project.name}</div>
                                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Start: {project.startDate}</div>
                                                </td>
                                                <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>{project.location}</td>
                                                <td style={{ padding: '16px', fontSize: '14px', color: '#111827' }}>{project.manager}</td>
                                                <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>{formatCurrency(project.totalBudget)}</td>
                                                <td style={{ padding: '16px' }}>
                                                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{formatCurrency(project.spent)}</div>
                                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{percentage}%</div>
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ flex: 1, background: '#e5e7eb', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                                            <div style={{ width: `${project.progress}%`, height: '100%', background: '#3b82f6', borderRadius: '4px' }}></div>
                                                        </div>
                                                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280' }}>{project.progress}%</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    <span style={{ background: statusBg, color: statusTextColor, padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                        {statusColor === 'critical' || statusColor === 'warning' ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                                                        {statusColor}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    <button onClick={() => openModal('view', project)} style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>View Details</button>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
                                <Building2 size={24} />
                                {projects[0].name}
                            </h3>
                            {budgetAllocations.map((allocation) => {
                                const Icon = allocation.icon;
                                const percentage = calculatePercentage(allocation.spent, allocation.allocated);
                                const colors = { blue: '#3b82f6', purple: '#7c3aed', orange: '#f59e0b', green: '#10b981' };

                                return (
                                    <div key={allocation.id} style={{ marginBottom: '20px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ background: colors[allocation.color], padding: '8px', borderRadius: '8px', color: 'white' }}>
                                                    <Icon size={20} />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{allocation.category}</div>
                                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{formatCurrency(allocation.allocated)}</div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '12px', color: '#6b7280' }}>Spent</div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{formatCurrency(allocation.spent)}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ flex: 1, background: '#e5e7eb', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ width: `${percentage}%`, height: '100%', background: percentage > 90 ? '#ef4444' : percentage > 75 ? '#f59e0b' : '#10b981', borderRadius: '4px' }}></div>
                                            </div>
                                            <span style={{ fontSize: '12px', fontWeight: '500' }}>{percentage}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Alerts Tab */}
                {activeTab === 'alerts' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {alerts.map((alert) => {
                            const alertColors = {
                                critical: { bg: '#fee2e2', border: '#dc2626', text: '#7f1d1d' },
                                warning: { bg: '#fef3c7', border: '#f59e0b', text: '#78350f' },
                                info: { bg: '#dbeafe', border: '#3b82f6', text: '#1e3a8a' }
                            };
                            const colors = alertColors[alert.severity];

                            return (
                                <div key={alert.id} style={{ background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '20px' }}>
                                    <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                                        <div style={{ background: colors.border, padding: '12px', borderRadius: '8px', color: 'white', height: 'fit-content' }}>
                                            <AlertTriangle size={24} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, marginBottom: '4px' }}>{alert.projectName}</h4>
                                            <p style={{ fontSize: '14px', color: colors.text }}>{alert.message}</p>
                                        </div>
                                        <span style={{ background: colors.border, color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', height: 'fit-content' }}>
                                            {alert.severity}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: colors.text }}>
                                        <span>Category: {alert.category}</span>
                                        <span>{alert.date}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div onClick={closeModal} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }}>
                    <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '16px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                                {modalType === 'addBudget' && 'Add Budget Entry'}
                                {modalType === 'view' && 'Project Details'}
                                {modalType === 'filter' && 'Filter Projects'}
                            </h2>
                        </div>

                        <div style={{ padding: '24px' }}>
                            {modalType === 'addBudget' && (
                                <form onSubmit={handleAddBudget}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label
                                            style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            Client Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="clientName"
                                            value={budgetForm.clientName}
                                            onChange={handleFormChange}
                                            required
                                            placeholder="Enter client name"
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                            Select Project *
                                        </label>
                                        <select
                                            name="project"
                                            value={budgetForm.project}
                                            onChange={handleFormChange}
                                            required
                                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                                        >
                                            <option value="">Choose a project</option>
                                            {projects.map(p => (
                                                <option key={p.id} value={p.name}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                                Category *
                                            </label>
                                            <select
                                                name="category"
                                                value={budgetForm.category}
                                                onChange={handleFormChange}
                                                required
                                                style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                                            >
                                                <option value="">Select category</option>
                                                <option value="Material">Material</option>
                                                <option value="Labor">Labor</option>
                                                <option value="Equipment">Equipment</option>
                                                <option value="Miscellaneous">Miscellaneous</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                                Recieved_amount *
                                            </label>
                                            <input
                                                type="number"
                                                name="Recieved_amount"
                                                value={budgetForm.amount}
                                                onChange={handleFormChange}
                                                placeholder="₹ 0"
                                                required
                                                style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={budgetForm.date}
                                            onChange={handleFormChange}
                                            required
                                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={budgetForm.description}
                                            onChange={handleFormChange}
                                            placeholder="Enter budget description..."
                                            rows="3"
                                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit' }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            style={{ padding: '12px 24px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
                                        >
                                            Cancel
                                        </button>
                                        <button onClick={() => openModal('addBudget')} style={{ padding: '12px 20px', background: 'rgb(71, 85, 105)', color: 'white', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                                            <PlusCircle size={18} />
                                            Recieved_Money
                                        </button>
                                    </div>
                                </form>
                            )}

                            {modalType === 'view' && selectedProject && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Project Name:</span>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{selectedProject.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Location:</span>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{selectedProject.location}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Manager:</span>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{selectedProject.manager}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Total Budget:</span>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{formatCurrency(selectedProject.totalBudget)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Amount Spent:</span>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{formatCurrency(selectedProject.spent)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Progress:</span>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{selectedProject.progress}%</span>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                                        <button
                                            onClick={closeModal}
                                            style={{ padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}

                            {modalType === 'filter' && (
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <Filter size={48} style={{ color: '#9ca3af', marginBottom: '16px' }} />
                                    <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>Filter Feature</h3>
                                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Filter functionality coming soon!</p>
                                    <button
                                        onClick={closeModal}
                                        style={{ padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
                                    >
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