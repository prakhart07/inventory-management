import React, { useState } from 'react';
import { Plus, Search, Filter, X, Check, Clock, XCircle, Eye } from 'lucide-react';
import '../Assets/CSS/ExpenseTrake.css';

function ExpenseTracker() {
    const [activeTab, setActiveTab] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        project: '',
        type: 'one-time'
    });

    const [expenses, setExpenses] = useState([
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
    ]);

    const categories = [
        { name: 'Labor', icon: '👥', color: '#60a5fa', bg: '#dbeafe', className: 'blue' },
        { name: 'Equipment', icon: '📦', color: '#a78bfa', bg: '#e9d5ff', className: 'purple' },
        { name: 'Transport', icon: '🚚', color: '#fb923c', bg: '#fed7aa', className: 'orange' },
        { name: 'Salary', icon: '💵', color: '#34d399', bg: '#d1fae5', className: 'green' },
        { name: 'Utilities', icon: '⚡', color: '#fbbf24', bg: '#fef3c7', className: 'yellow' },
        { name: 'Miscellaneous', icon: '📈', color: '#f472b6', bg: '#fce7f3', className: 'pink' }
    ];

    const handleSubmit = () => {
        if (!formData.description || !formData.amount || !formData.date || !formData.category || !formData.project) {
            alert('Please fill in all fields');
            return;
        }

        const newExpense = {
            id: expenses.length + 1,
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: formData.category,
            project: formData.project,
            date: formData.date,
            status: 'pending',
            type: formData.type,
            approvedBy: null
        };

        setExpenses([newExpense, ...expenses]);
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

    const getCategoryData = (categoryName) => {
        return categories.find(c => c.name === categoryName);
    };

    const calculateStats = () => {
        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const pending = expenses.filter(e => e.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0);
        const approved = expenses.filter(e => e.status === 'approved').reduce((sum, exp) => sum + exp.amount, 0);
        const recurring = expenses.filter(e => e.type === 'recurring').reduce((sum, exp) => sum + exp.amount, 0);

        return { total, pending, approved, recurring };
    };

    const stats = calculateStats();

    const filteredExpenses = expenses.filter(expense => {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.project.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;

        let matchesTab = true;
        if (activeTab === 'pending') matchesTab = expense.status === 'pending';
        if (activeTab === 'approved') matchesTab = expense.status === 'approved';
        if (activeTab === 'recurring') matchesTab = expense.type === 'recurring';

        return matchesSearch && matchesCategory && matchesTab;
    });

    const getCategoryExpenses = (categoryName) => {
        return expenses.filter(e => e.category === categoryName).reduce((sum, exp) => sum + exp.amount, 0);
    };

    return (
        <div className="expense-tracker-container">
            <div className="expense-main-content">
                {/* Stats Cards */}
                <div className="expense-stats-grid">
                    <div className="expense-stat-card">
                        <div className="expense-stat-icon violet">💵</div>
                        <div className="expense-stat-label">TOTAL EXPENSES</div>
                        <div className="expense-stat-value">₹{stats.total.toLocaleString()}</div>
                    </div>

                    <div className="expense-stat-card">
                        <div className="expense-stat-icon amber">⏰</div>
                        <div className="expense-stat-label">PENDING APPROVAL</div>
                        <div className="expense-stat-value">₹{stats.pending.toLocaleString()}</div>
                    </div>

                    <div className="expense-stat-card">
                        <div className="expense-stat-icon emerald">✅</div>
                        <div className="expense-stat-label">APPROVED THIS MONTH</div>
                        <div className="expense-stat-value">₹{stats.approved.toLocaleString()}</div>
                    </div>

                    <div className="expense-stat-card">
                        <div className="expense-stat-icon blue">📅</div>
                        <div className="expense-stat-label">RECURRING MONTHLY</div>
                        <div className="expense-stat-value">₹{stats.recurring.toLocaleString()}</div>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="expense-categories-section">
                    <h2 className="expense-section-title">📊 Expense Categories</h2>
                    <div className="expense-categories-grid">
                        {categories.map((category) => {
                            const categoryTotal = getCategoryExpenses(category.name);
                            return (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(selectedCategory === category.name ? 'all' : category.name)}
                                    className={`expense-category-btn ${category.className}`}
                                >
                                    <span className="expense-category-icon">{category.icon}</span>
                                    <span>{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Action Bar */}
                <div className="expense-action-bar">
                    <div className="expense-search-box">
                        <Search className="expense-search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search expenses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="expense-search-input"
                        />
                    </div>
                    <button className="expense-btn expense-btn-secondary">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button onClick={() => setShowModal(true)} className="expense-btn expense-btn-primary">
                        <Plus size={18} />
                        Add Expense
                    </button>
                </div>

                {/* Tabs */}
                <div className="expense-tabs">
                    {['all', 'pending', 'approved', 'recurring'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`expense-tab-btn ${activeTab === tab ? 'active' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="expense-table-container">
                    <div className="expense-table-wrapper">
                        <table className="expense-table">
                            <thead>
                                <tr>
                                    <th>DESCRIPTION</th>
                                    <th>CATEGORY</th>
                                    <th>PROJECT</th>
                                    <th>AMOUNT</th>
                                    <th>DATE</th>
                                    <th>TYPE</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.map((expense) => {
                                    const catData = getCategoryData(expense.category);
                                    return (
                                        <tr key={expense.id}>
                                            <td>
                                                <div className="expense-desc">{expense.description}</div>
                                                {expense.approvedBy && (
                                                    <div className="expense-approver">By: {expense.approvedBy}</div>
                                                )}
                                            </td>
                                            <td>
                                                <span className={`expense-category-badge ${catData?.className}`}>
                                                    <span>{catData?.icon}</span>
                                                    <span>{expense.category}</span>
                                                </span>
                                            </td>
                                            <td>{expense.project}</td>
                                            <td className="expense-amount">₹{expense.amount.toLocaleString()}</td>
                                            <td>{new Date(expense.date).toLocaleDateString('en-IN')}</td>
                                            <td>
                                                <span className={`expense-type-badge ${expense.type === 'recurring' ? 'recurring' : 'one-time'}`}>
                                                    {expense.type}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`expense-status-badge ${expense.status}`}>
                                                    {expense.status === 'approved' && <Check size={14} />}
                                                    {expense.status === 'pending' && <Clock size={14} />}
                                                    {expense.status === 'rejected' && <XCircle size={14} />}
                                                    {expense.status}
                                                </span>
                                            </td>
                                            <td>
                                                <a href="#" className="expense-action-link">
                                                    <Eye size={16} style={{ display: 'inline', marginRight: '4px' }} />
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Expense Modal */}
                {showModal && (
                    <div onClick={() => setShowModal(false)} className="expense-modal">
                        <div onClick={(e) => e.stopPropagation()} className="expense-modal-content">
                            <div className="expense-modal-header">
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    background: 'rgba(255, 255, 255, 0.2)'
                                }}>
                                    ➕
                                </div>
                                <h2 className="expense-modal-title">Add New Expense</h2>
                            </div>

                            <div className="expense-modal-body">
                                <div className="expense-form-group">
                                    <label className="expense-form-label">Description *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter expense description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="expense-form-input"
                                    />
                                </div>

                                <div className="expense-form-row">
                                    <div className="expense-form-group">
                                        <label className="expense-form-label">Amount (₹) *</label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="expense-form-input"
                                        />
                                    </div>
                                    <div className="expense-form-group">
                                        <label className="expense-form-label">Date *</label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="expense-form-input"
                                        />
                                    </div>
                                </div>

                                <div className="expense-form-group">
                                    <label className="expense-form-label">Category *</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                        {categories.map(cat => (
                                            <button
                                                key={cat.name}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, category: cat.name })}
                                                style={{
                                                    padding: '12px',
                                                    border: `2px solid ${formData.category === cat.name ? cat.color : '#e5e7eb'}`,
                                                    borderRadius: '10px',
                                                    background: formData.category === cat.name ? cat.bg : 'white',
                                                    cursor: 'pointer',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    color: formData.category === cat.name ? cat.color : '#64748b',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <span style={{ fontSize: '24px' }}>{cat.icon}</span>
                                                <span>{cat.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="expense-form-group">
                                    <label className="expense-form-label">Project *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter project name"
                                        value={formData.project}
                                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                        className="expense-form-input"
                                    />
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
                                            One-time
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
                                            Recurring
                                        </label>
                                    </div>
                                </div>

                                <div className="expense-modal-footer">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="expense-btn expense-btn-cancel"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="expense-btn expense-btn-submit"
                                    >
                                        Add Expense
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExpenseTracker;