import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, PlusCircle, Search, Filter, BarChart3, PieChart, Building2, Wrench, Users, Package, X } from 'lucide-react';

function BudgetManagement() {
    const [activeTab, setActiveTab] = useState('projects');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');

    const [expenseForm, setExpenseForm] = useState({
        projectName: '',
        category: 'Material',
        amount: '',
        description: '',
        date: '',
        vendor: '',
        paymentStatus: 'Pending'
    });

    const [projects, setProjects] = useState([
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
    ]);

    const [expenses, setExpenses] = useState([
        {
            id: 1,
            projectName: 'Downtown Office Complex',
            category: 'Material',
            amount: 2500000,
            description: 'Cement and Steel Purchase',
            date: '2024-09-15',
            vendor: 'ABC Suppliers',
            paymentStatus: 'Paid'
        },
        {
            id: 2,
            projectName: 'Residential Tower - Phase 2',
            category: 'Labor',
            amount: 1800000,
            description: 'Monthly Labor Payment',
            date: '2024-09-20',
            vendor: 'XYZ Contractors',
            paymentStatus: 'Paid'
        },
        {
            id: 3,
            projectName: 'Highway Bridge Construction',
            category: 'Equipment',
            amount: 4500000,
            description: 'Crane Rental',
            date: '2024-09-25',
            vendor: 'Equipment Hub',
            paymentStatus: 'Pending'
        }
    ]);

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

    const handleExpenseInputChange = (e) => {
        const { name, value } = e.target;
        setExpenseForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddExpense = () => {
        if (expenseForm.projectName && expenseForm.amount && expenseForm.date) {
            const newExpense = {
                id: expenses.length + 1,
                ...expenseForm,
                amount: parseFloat(expenseForm.amount)
            };
            setExpenses([newExpense, ...expenses]);

            const projectToUpdate = projects.find(p => p.name === expenseForm.projectName);
            if (projectToUpdate) {
                const updatedProjects = projects.map(p =>
                    p.name === expenseForm.projectName
                        ? { ...p, spent: p.spent + parseFloat(expenseForm.amount) }
                        : p
                );
                setProjects(updatedProjects);
            }

            setShowModal(false);
            setExpenseForm({
                projectName: '',
                category: 'Material',
                amount: '',
                description: '',
                date: '',
                vendor: '',
                paymentStatus: 'Pending'
            });
        }
    };

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

    const applyFilters = () => {
        setShowFilterModal(false);
    };

    const resetFilters = () => {
        setFilterStatus('all');
        setFilterCategory('all');
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const filteredExpenses = expenses.filter(expense => {
        const matchesSearch = expense.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expense.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ background: '#8b5cf6', padding: '12px', borderRadius: '10px', color: 'white' }}>
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <div style={{ color: '#64748b', fontSize: '14px' }}>Total Budget</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{formatCurrency(totalBudget)}</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ background: '#f59e0b', padding: '12px', borderRadius: '10px', color: 'white' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <div style={{ color: '#64748b', fontSize: '14px' }}>Total Spent</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{formatCurrency(totalSpent)}</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ background: '#10b981', padding: '12px', borderRadius: '10px', color: 'white' }}>
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <div style={{ color: '#64748b', fontSize: '14px' }}>Active Projects</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{activeProjects}</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ background: '#3b82f6', padding: '12px', borderRadius: '10px', color: 'white' }}>
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <div style={{ color: '#64748b', fontSize: '14px' }}>Critical Alerts</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{criticalProjects}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '8px', marginBottom: '20px', display: 'flex', gap: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                {['projects', 'expenses', 'allocation', 'comparison', 'alerts'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            background: activeTab === tab ? '#1e293b' : 'transparent',
                            color: activeTab === tab ? 'white' : '#64748b',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab === 'projects' && 'Project List'}
                        {tab === 'expenses' && 'Expenses'}
                        {tab === 'allocation' && 'Budget Allocation'}
                        {tab === 'comparison' && 'Budget vs Actual'}
                        {tab === 'alerts' && 'Alerts'}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                    <input
                        type="text"
                        placeholder={activeTab === 'expenses' ? "Search expenses..." : "Search projects..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 10px 10px 42px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <button
                    onClick={() => setShowFilterModal(true)}
                    style={{
                        padding: '10px 18px',
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}
                >
                    <Filter size={18} />
                    Filter
                </button>
                {activeTab === 'expenses' && (
                    <button
                        onClick={() => openModal('addExpense')}
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
                        }}
                    >
                        <PlusCircle size={18} />
                        Add Budget Expense
                    </button>
                )}
            </div>

            {activeTab === 'projects' && (
                <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Project Name</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Location</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Manager</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Budget</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Spent</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Progress</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Status</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((project) => {
                                    const percentage = calculatePercentage(project.spent, project.totalBudget);
                                    const statusColor = getStatusColor(parseFloat(percentage));

                                    return (
                                        <tr key={project.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '16px' }}>
                                                <div style={{ fontWeight: '600', color: '#1e293b' }}>{project.name}</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>Start: {project.startDate}</div>
                                            </td>
                                            <td style={{ padding: '16px', color: '#475569' }}>{project.location}</td>
                                            <td style={{ padding: '16px', color: '#475569' }}>{project.manager}</td>
                                            <td style={{ padding: '16px', fontWeight: '600', color: '#1e293b' }}>{formatCurrency(project.totalBudget)}</td>
                                            <td style={{ padding: '16px' }}>
                                                <div style={{ fontWeight: '600', color: '#1e293b' }}>{formatCurrency(project.spent)}</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>{percentage}%</div>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${project.progress}%`, height: '100%', background: '#3b82f6', borderRadius: '4px' }}></div>
                                                    </div>
                                                    <span style={{ fontSize: '12px', color: '#64748b', minWidth: '35px' }}>{project.progress}%</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    background: statusColor === 'critical' ? '#fee2e2' : statusColor === 'warning' ? '#fef3c7' : '#d1fae5',
                                                    color: statusColor === 'critical' ? '#dc2626' : statusColor === 'warning' ? '#f59e0b' : '#10b981'
                                                }}>
                                                    {statusColor === 'critical' && <AlertTriangle size={12} />}
                                                    {statusColor === 'warning' && <AlertTriangle size={12} />}
                                                    {statusColor === 'healthy' && <CheckCircle size={12} />}
                                                    {statusColor}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <button
                                                    onClick={() => openModal('view', project)}
                                                    style={{
                                                        color: '#3b82f6',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontWeight: '600',
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'expenses' && (
                <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Project Name</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Category</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Amount</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Description</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Vendor</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Date</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.map((expense) => (
                                    <tr key={expense.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px', fontWeight: '600', color: '#1e293b' }}>{expense.projectName}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                background: expense.category === 'Material' ? '#dbeafe' : expense.category === 'Labor' ? '#e9d5ff' : '#fed7aa',
                                                color: expense.category === 'Material' ? '#1e40af' : expense.category === 'Labor' ? '#7c3aed' : '#ea580c'
                                            }}>
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>{formatCurrency(expense.amount)}</td>
                                        <td style={{ padding: '16px', color: '#475569' }}>{expense.description}</td>
                                        <td style={{ padding: '16px', color: '#475569' }}>{expense.vendor}</td>
                                        <td style={{ padding: '16px', color: '#64748b', fontSize: '14px' }}>{expense.date}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                background: expense.paymentStatus === 'Paid' ? '#d1fae5' : '#fef3c7',
                                                color: expense.paymentStatus === 'Paid' ? '#065f46' : '#92400e'
                                            }}>
                                                {expense.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'allocation' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
                            <Building2 size={24} />
                            {projects[0].name}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {budgetAllocations.map((allocation) => {
                                const Icon = allocation.icon;
                                const percentage = calculatePercentage(allocation.spent, allocation.allocated);

                                return (
                                    <div key={allocation.id} style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    background: allocation.color === 'blue' ? '#dbeafe' : allocation.color === 'purple' ? '#e9d5ff' : allocation.color === 'orange' ? '#fed7aa' : '#d1fae5',
                                                    color: allocation.color === 'blue' ? '#1e40af' : allocation.color === 'purple' ? '#7c3aed' : allocation.color === 'orange' ? '#ea580c' : '#065f46'
                                                }}>
                                                    <Icon size={20} />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{allocation.category}</div>
                                                    <div style={{ fontSize: '14px', color: '#64748b' }}>{formatCurrency(allocation.allocated)}</div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>Spent</div>
                                                <div style={{ fontWeight: '700', color: '#1e293b' }}>{formatCurrency(allocation.spent)}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ flex: 1, height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${percentage}%`,
                                                    height: '100%',
                                                    background: percentage > 90 ? '#ef4444' : percentage > 75 ? '#f59e0b' : '#10b981',
                                                    borderRadius: '5px'
                                                }}></div>
                                            </div>
                                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', minWidth: '45px' }}>{percentage}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
                            <PieChart size={24} />
                            Budget Distribution
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {budgetAllocations.map((allocation, index) => {
                                const total = budgetAllocations.reduce((sum, a) => sum + a.allocated, 0);
                                const percentage = ((allocation.allocated / total) * 100).toFixed(1);
                                const colors = ['#3b82f6', '#7c3aed', '#f59e0b', '#10b981'];

                                return (
                                    <div key={allocation.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: colors[index] }}></div>
                                            <span style={{ fontWeight: '600', color: '#1e293b' }}>{allocation.category}</span>
                                        </div>
                                        <span style={{ fontWeight: '700', color: '#64748b' }}>{percentage}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'comparison' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
                            <BarChart3 size={24} />
                            Budget vs Actual Spending Analysis
                        </h3>
                    </div>
                    {projects.map((project) => {
                        const percentage = calculatePercentage(project.spent, project.totalBudget);
                        const remaining = project.totalBudget - project.spent;
                        const status = getStatusColor(parseFloat(percentage));

                        return (
                            <div key={project.id} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <div>
                                        <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{project.name}</h4>
                                        <p style={{ fontSize: '14px', color: '#64748b' }}>Manager: {project.manager}</p>
                                    </div>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '6px 16px',
                                        borderRadius: '20px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        background: status === 'critical' ? '#fee2e2' : status === 'warning' ? '#fef3c7' : '#d1fae5',
                                        color: status === 'critical' ? '#dc2626' : status === 'warning' ? '#f59e0b' : '#10b981'
                                    }}>
                                        {status === 'critical' && <AlertTriangle size={14} />}
                                        {status === 'warning' && <AlertTriangle size={14} />}
                                        {status === 'healthy' && <CheckCircle size={14} />}
                                        {status}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Allocated Budget</span>
                                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{formatCurrency(project.totalBudget)}</span>
                                        </div>
                                        <div style={{ height: '32px', background: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '0 12px', fontWeight: '600', color: '#475569' }}>
                                            {formatCurrency(project.totalBudget)}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Actual Spending</span>
                                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{formatCurrency(project.spent)} ({percentage}%)</span>
                                        </div>
                                        <div style={{ height: '32px', background: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${percentage}%`,
                                                height: '100%',
                                                background: status === 'critical' ? '#ef4444' : status === 'warning' ? '#f59e0b' : '#10b981',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '0 12px',
                                                color: 'white',
                                                fontWeight: '600',
                                                fontSize: '13px'
                                            }}>
                                                {formatCurrency(project.spent)} ({percentage}%)
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Remaining Budget</div>
                                        <div style={{ fontSize: '18px', fontWeight: '700', color: remaining > 0 ? '#10b981' : '#ef4444' }}>
                                            {formatCurrency(Math.abs(remaining))}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Budget Variance</div>
                                        <div style={{ fontSize: '18px', fontWeight: '700', color: remaining > 0 ? '#10b981' : '#ef4444' }}>
                                            {remaining > 0 ? '+' : ''}{((remaining / project.totalBudget) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {activeTab === 'alerts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {alerts.map((alert) => (
                        <div key={alert.id} style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '20px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            borderLeft: `4px solid ${alert.severity === 'critical' ? '#ef4444' : alert.severity === 'warning' ? '#f59e0b' : '#3b82f6'}`
                        }}>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                                <div style={{
                                    padding: '12px',
                                    borderRadius: '10px',
                                    background: alert.severity === 'critical' ? '#fee2e2' : alert.severity === 'warning' ? '#fef3c7' : '#dbeafe',
                                    color: alert.severity === 'critical' ? '#dc2626' : alert.severity === 'warning' ? '#f59e0b' : '#3b82f6'
                                }}>
                                    <AlertTriangle size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                        <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>{alert.projectName}</h4>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            background: alert.severity === 'critical' ? '#fee2e2' : alert.severity === 'warning' ? '#fef3c7' : '#dbeafe',
                                            color: alert.severity === 'critical' ? '#dc2626' : alert.severity === 'warning' ? '#f59e0b' : '#3b82f6',
                                            textTransform: 'uppercase'
                                        }}>
                                            {alert.severity}
                                        </span>
                                    </div>
                                    <p style={{ color: '#475569', marginBottom: '12px' }}>{alert.message}</p>
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b' }}>
                                        <span>Category: <strong>{alert.category}</strong></span>
                                        <span>{alert.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && modalType === 'addExpense' && (
                <div onClick={closeModal} style={{
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
                    <div onClick={(e) => e.stopPropagation()} style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                                Add Budget Expense
                            </h2>
                            <button onClick={closeModal} style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#6b7280',
                                padding: '4px'
                            }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                    Project Name *
                                </label>
                                <select
                                    name="projectName"
                                    value={expenseForm.projectName}
                                    onChange={handleExpenseInputChange}
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
                                    <option value="">Select Project</option>
                                    {projects.map(project => (
                                        <option key={project.id} value={project.name}>{project.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={expenseForm.category}
                                        onChange={handleExpenseInputChange}
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
                                        <option value="Material">Material</option>
                                        <option value="Labor">Labor</option>
                                        <option value="Equipment">Equipment</option>
                                        <option value="Miscellaneous">Miscellaneous</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                        Amount (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={expenseForm.amount}
                                        onChange={handleExpenseInputChange}
                                        placeholder="Enter amount"
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
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={expenseForm.description}
                                    onChange={handleExpenseInputChange}
                                    placeholder="Enter expense description"
                                    rows="3"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        boxSizing: 'border-box',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                        Vendor Name
                                    </label>
                                    <input
                                        type="text"
                                        name="vendor"
                                        value={expenseForm.vendor}
                                        onChange={handleExpenseInputChange}
                                        placeholder="Enter vendor name"
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

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={expenseForm.date}
                                        onChange={handleExpenseInputChange}
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
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                    Payment Status
                                </label>
                                <select
                                    name="paymentStatus"
                                    value={expenseForm.paymentStatus}
                                    onChange={handleExpenseInputChange}
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
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: 'white',
                                        color: '#374151',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddExpense}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: '#1e293b',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Add Expense
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && modalType === 'view' && selectedProject && (
                <div onClick={closeModal} style={{
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
                    <div onClick={(e) => e.stopPropagation()} style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        maxWidth: '500px',
                        width: '100%',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                                Project Details
                            </h2>
                            <button onClick={closeModal} style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#6b7280',
                                padding: '4px'
                            }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                <span style={{ color: '#64748b', fontWeight: '600' }}>Project Name:</span>
                                <span style={{ color: '#1e293b', fontWeight: '700' }}>{selectedProject.name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                <span style={{ color: '#64748b', fontWeight: '600' }}>Location:</span>
                                <span style={{ color: '#1e293b', fontWeight: '700' }}>{selectedProject.location}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                <span style={{ color: '#64748b', fontWeight: '600' }}>Manager:</span>
                                <span style={{ color: '#1e293b', fontWeight: '700' }}>{selectedProject.manager}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                <span style={{ color: '#64748b', fontWeight: '600' }}>Total Budget:</span>
                                <span style={{ color: '#10b981', fontWeight: '700' }}>{formatCurrency(selectedProject.totalBudget)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                <span style={{ color: '#64748b', fontWeight: '600' }}>Amount Spent:</span>
                                <span style={{ color: '#ef4444', fontWeight: '700' }}>{formatCurrency(selectedProject.spent)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                <span style={{ color: '#64748b', fontWeight: '600' }}>Progress:</span>
                                <span style={{ color: '#1e293b', fontWeight: '700' }}>{selectedProject.progress}%</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '32px' }}>
                            <button
                                onClick={closeModal}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: '#1e293b',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    fontWeight: '600'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showFilterModal && (
                <div onClick={() => setShowFilterModal(false)} style={{
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
                    <div onClick={(e) => e.stopPropagation()} style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        maxWidth: '450px',
                        width: '100%',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                                Filter {activeTab === 'expenses' ? 'Expenses' : 'Projects'}
                            </h2>
                            <button onClick={() => setShowFilterModal(false)} style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#6b7280',
                                padding: '4px'
                            }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div>
                            {activeTab === 'projects' ? (
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                        Project Status
                                    </label>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
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
                                        <option value="all">All Status</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="critical">Critical</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            ) : (
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                        Expense Category
                                    </label>
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
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
                                        <option value="all">All Categories</option>
                                        <option value="Material">Material</option>
                                        <option value="Labor">Labor</option>
                                        <option value="Equipment">Equipment</option>
                                        <option value="Miscellaneous">Miscellaneous</option>
                                    </select>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: 'white',
                                        color: '#374151',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Reset
                                </button>
                                <button
                                    type="button"
                                    onClick={applyFilters}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: '#1e293b',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BudgetManagement;