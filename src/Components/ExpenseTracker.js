// ExpenseTracker.jsx
import React, { useState } from 'react';
import '../Assets/CSS/ExpenseTrake.css'

function ExpenseTracker  ()  {
    const [activeTab, setActiveTab] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        project: '',
        type: 'one-time'
    });

    const expenses = [
        {
            id: 1,
            description: 'Labor Cost - Site A',
            amount: 45000,
            category: 'Labor',
            project: 'Residential Complex',
            date: '2025-09-28',
            status: 'approved',
            type: 'one-time',
            approvedBy: 'Site Manager'
        },
        {
            id: 2,
            description: 'Crane Rental',
            amount: 12000,
            category: 'Equipment',
            project: 'Commercial Tower',
            date: '2025-09-27',
            status: 'pending',
            type: 'one-time',
            approvedBy: null
        },
        {
            id: 3,
            description: 'Material Transport',
            amount: 8500,
            category: 'Transport',
            project: 'Residential Complex',
            date: '2025-09-26',
            status: 'approved',
            type: 'one-time',
            approvedBy: 'Project Manager'
        },
        {
            id: 4,
            description: 'Site Supervisor Salary',
            amount: 35000,
            category: 'Salary',
            project: 'All Projects',
            date: '2025-09-25',
            status: 'approved',
            type: 'recurring',
            approvedBy: 'HR Manager'
        },
        {
            id: 5,
            description: 'Safety Equipment',
            amount: 15000,
            category: 'Miscellaneous',
            project: 'Commercial Tower',
            date: '2025-09-24',
            status: 'rejected',
            type: 'one-time',
            approvedBy: 'Finance Head'
        },
        {
            id: 6,
            description: 'Electricity Bill',
            amount: 8900,
            category: 'Utilities',
            project: 'Site Office',
            date: '2025-09-23',
            status: 'approved',
            type: 'recurring',
            approvedBy: 'Admin'
        }
    ];

    const categories = [
        { name: 'Labor', icon: '👥', color: 'blue' },
        { name: 'Equipment', icon: '📦', color: 'purple' },
        { name: 'Transport', icon: '🚚', color: 'orange' },
        { name: 'Salary', icon: '💵', color: 'green' },
        { name: 'Utilities', icon: '⚡', color: 'yellow' },
        { name: 'Miscellaneous', icon: '📈', color: 'pink' }
    ];

    const stats = [
        { label: 'TOTAL EXPENSES', value: '₹1,24,400', icon: '💵', gradient: 'violet' },
        { label: 'PENDING APPROVAL', value: '₹12,000', icon: '⏰', gradient: 'amber' },
        { label: 'APPROVED THIS MONTH', value: '₹1,04,900', icon: '✅', gradient: 'emerald' },
        { label: 'RECURRING MONTHLY', value: '₹43,900', icon: '📅', gradient: 'blue' }
    ];

    const handleSubmit = () => {
        if (!formData.description || !formData.amount || !formData.date || !formData.category || !formData.project) {
            alert('Please fill in all fields');
            return;
        }
        console.log('Expense added:', formData);
        alert('Expense added successfully!');
        setShowModal(false);
        setFormData({
            description: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            category: '',
            project: '',
            type: 'one-time'
        });
    };

    const getCategoryColor = (category) => {
        const cat = categories.find(c => c.name === category);
        return cat ? cat.color : 'gray';
    };

    const getCategoryIcon = (category) => {
        const cat = categories.find(c => c.name === category);
        return cat ? cat.icon : '📊';
    };

    const filteredExpenses = expenses.filter(expense => {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.project.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'pending') return matchesSearch && expense.status === 'pending';
        if (activeTab === 'approved') return matchesSearch && expense.status === 'approved';
        if (activeTab === 'recurring') return matchesSearch && expense.type === 'recurring';
        return matchesSearch;
    });

    return (
        <div className="expense-tracker-container">
            {/* Header */}
            <div className="expense-header">
                <div className="expense-header-content">
                    <div className="expense-header-title">
                        <div className="expense-header-icon">💰</div>
                        <h1 className="expense-h1">Expense Tracker</h1>
                    </div>
                    <p className="expense-header-subtitle">Indore, Madhya Pradesh | Track & Manage Construction Expenses</p>
                </div>
            </div>

            <div className="expense-main-content">
                {/* Stats Cards */}
                <div className="expense-stats-grid">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="expense-stat-card">
                            <div className={`expense-stat-icon ${stat.gradient}`}>{stat.icon}</div>
                            <p className="expense-stat-label">{stat.label}</p>
                            <p className="expense-stat-value">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Categories */}
                <div className="expense-categories-section">
                    <h2 className="expense-section-title">📊 Expense Categories</h2>
                    <div className="expense-categories-grid">
                        {categories.map((category, idx) => (
                            <button key={idx} className={`expense-category-btn ${category.color}`}>
                                <span className="expense-category-icon">{category.icon}</span>
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Bar */}
                <div className="expense-action-bar">
                    <div className="expense-search-box">
                        <span className="expense-search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search expenses..."
                            className="expense-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="expense-btn expense-btn-secondary">
                        <span>🔽</span>
                        <span>Filter</span>
                    </button>
                    <button className="expense-btn expense-btn-primary" onClick={() => setShowModal(true)}>
                        <span>➕</span>
                        <span>Add Expense</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="expense-tabs">
                    {['all', 'pending', 'approved', 'recurring'].map(tab => (
                        <button
                            key={tab}
                            className={`expense-tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="expense-table-container">
                    <div className="expense-table-wrapper">
                        <table className="expense-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Project</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.map((expense) => (
                                    <tr key={expense.id}>
                                        <td>
                                            <div className="expense-desc">{expense.description}</div>
                                            {expense.approvedBy && (
                                                <div className="expense-approver">By: {expense.approvedBy}</div>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`expense-category-badge ${getCategoryColor(expense.category)}`}>
                                                <span>{getCategoryIcon(expense.category)}</span>
                                                <span>{expense.category}</span>
                                            </span>
                                        </td>
                                        <td>{expense.project}</td>
                                        <td>
                                            <span className="expense-amount">₹{expense.amount.toLocaleString()}</span>
                                        </td>
                                        <td>{new Date(expense.date).toLocaleDateString('en-IN')}</td>
                                        <td>
                                            <span className={`expense-type-badge ${expense.type}`}>
                                                {expense.type}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`expense-status-badge ${expense.status}`}>
                                                {expense.status === 'approved' && '✅ '}
                                                {expense.status === 'pending' && '⏰ '}
                                                {expense.status === 'rejected' && '❌ '}
                                                {expense.status}
                                            </span>
                                        </td>
                                        <td>
                                            <a href="#" className="expense-action-link">View Details</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="expense-modal" onClick={(e) => e.target.className === 'expense-modal' && setShowModal(false)}>
                    <div className="expense-modal-content">
                        <div className="expense-modal-header">
                            <span>➕</span>
                            <h2 className="expense-modal-title">Add New Expense</h2>
                        </div>
                        <div className="expense-modal-body">
                            <div className="expense-form-group">
                                <label className="expense-form-label">Description</label>
                                <input
                                    type="text"
                                    className="expense-form-input"
                                    placeholder="Enter expense description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="expense-form-row">
                                <div className="expense-form-group">
                                    <label className="expense-form-label">Amount (₹)</label>
                                    <input
                                        type="number"
                                        className="expense-form-input"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                                <div className="expense-form-group">
                                    <label className="expense-form-label">Date</label>
                                    <input
                                        type="date"
                                        className="expense-form-input"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="expense-form-row">
                                <div className="expense-form-group">
                                    <label className="expense-form-label">Category</label>
                                    <select
                                        className="expense-form-input"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="expense-form-group">
                                    <label className="expense-form-label">Project</label>
                                    <input
                                        type="text"
                                        className="expense-form-input"
                                        placeholder="Enter project name"
                                        value={formData.project}
                                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="expense-form-group">
                                <label className="expense-form-label">Expense Type</label>
                                <div className="expense-radio-group">
                                    <label className="expense-radio-label">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="one-time"
                                            checked={formData.type === 'one-time'}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="expense-radio-input"
                                        />
                                        <span>One-time</span>
                                    </label>
                                    <label className="expense-radio-label">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="recurring"
                                            checked={formData.type === 'recurring'}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="expense-radio-input"
                                        />
                                        <span>Recurring</span>
                                    </label>
                                </div>
                            </div>

                            <div className="expense-modal-footer">
                                <button className="expense-btn expense-btn-submit" onClick={handleSubmit}>
                                    Add Expense
                                </button>
                                <button className="expense-btn expense-btn-cancel" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseTracker;