import React, { useState } from 'react';
import { Plus, Search, Filter, X, Check, Clock, XCircle, Eye } from 'lucide-react';

function ExpenseTracker() {
    const [activeTab, setActiveTab] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
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

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        project: '',
        type: 'one-time'
    });

    const categories = [
        { name: 'Labor', icon: '👥', color: '#60a5fa', bg: '#dbeafe', className: 'blue' },
        { name: 'Equipment', icon: '📦', color: '#a78bfa', bg: '#e9d5ff', className: 'purple' },
        { name: 'Transport', icon: '🚚', color: '#fb923c', bg: '#fed7aa', className: 'orange' },
        { name: 'Salary', icon: '💵', color: '#34d399', bg: '#d1fae5', className: 'green' },
        { name: 'Utilities', icon: '⚡', color: '#fbbf24', bg: '#fef3c7', className: 'yellow' },
        { name: 'Miscellaneous', icon: '📈', color: '#f472b6', bg: '#fce7f3', className: 'pink' }
    ];

    const stats = {
        total: expenses.reduce((sum, exp) => sum + exp.amount, 0),
        pending: expenses.filter(e => e.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0),
        approved: expenses.filter(e => e.status === 'approved').reduce((sum, exp) => sum + exp.amount, 0),
        recurring: expenses.filter(e => e.type === 'recurring').reduce((sum, exp) => sum + exp.amount, 0)
    };

    const getCategoryData = (categoryName) => {
        return categories.find(c => c.name === categoryName);
    };

    const getCategoryExpenses = (categoryName) => {
        return expenses.filter(e => e.category === categoryName).reduce((sum, exp) => sum + exp.amount, 0);
    };

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

    const filteredExpenses = expenses.filter(expense => {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.project.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;

        if (activeTab === 'all') return matchesSearch && matchesCategory;
        if (activeTab === 'pending') return matchesSearch && matchesCategory && expense.status === 'pending';
        if (activeTab === 'approved') return matchesSearch && matchesCategory && expense.status === 'approved';
        if (activeTab === 'recurring') return matchesSearch && matchesCategory && expense.type === 'recurring';
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                        💰 Expense Tracker
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                        Manage and track all your construction expenses
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>💵</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', letterSpacing: '0.5px' }}>TOTAL EXPENSES</div>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>₹{stats.total.toLocaleString()}</div>
                    </div>

                    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>⏰</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', letterSpacing: '0.5px' }}>PENDING APPROVAL</div>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>₹{stats.pending.toLocaleString()}</div>
                    </div>

                    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✅</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', letterSpacing: '0.5px' }}>APPROVED THIS MONTH</div>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>₹{stats.approved.toLocaleString()}</div>
                    </div>

                    <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📅</div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', letterSpacing: '0.5px' }}>RECURRING MONTHLY</div>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>₹{stats.recurring.toLocaleString()}</div>
                    </div>
                </div>

                {/* Categories Section */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '28px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        📊 Expense Categories
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px' }}>
                        {categories.map((category) => {
                            const categoryTotal = getCategoryExpenses(category.name);
                            const isSelected = selectedCategory === category.name;
                            return (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(isSelected ? 'all' : category.name)}
                                    style={{
                                        padding: '16px',
                                        border: `2px solid ${isSelected ? category.color : '#e5e7eb'}`,
                                        borderRadius: '12px',
                                        background: isSelected ? category.bg : 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <span style={{ fontSize: '32px' }}>{category.icon}</span>
                                    <span style={{ fontSize: '14px', fontWeight: '600', color: isSelected ? category.color : '#64748b' }}>{category.name}</span>
                                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>₹{categoryTotal.toLocaleString()}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Action Bar */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                        <input
                            type="text"
                            placeholder="Search expenses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '12px 12px 12px 44px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                        />
                    </div>
                    <button style={{ padding: '12px 20px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '14px', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Filter size={18} />
                        Filter
                    </button>
                    <button onClick={() => setShowModal(true)} style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '14px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} />
                        Add Expense
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '8px', marginBottom: '24px', display: 'flex', gap: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    {['all', 'pending', 'approved', 'recurring'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: 'none',
                                borderRadius: '10px',
                                background: activeTab === tab ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                                color: activeTab === tab ? 'white' : '#64748b',
                                fontWeight: '600',
                                fontSize: '14px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>DESCRIPTION</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>CATEGORY</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>PROJECT</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>AMOUNT</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>DATE</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>TYPE</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>STATUS</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.map((expense) => {
                                    const catData = getCategoryData(expense.category);
                                    return (
                                        <tr key={expense.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px' }}>
                                                <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{expense.description}</div>
                                                {expense.approvedBy && (
                                                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>By: {expense.approvedBy}</div>
                                                )}
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    background: catData?.bg,
                                                    color: catData?.color,
                                                    fontSize: '13px',
                                                    fontWeight: '600'
                                                }}>
                                                    <span>{catData?.icon}</span>
                                                    <span>{expense.category}</span>
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{expense.project}</td>
                                            <td style={{ padding: '16px', fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>₹{expense.amount.toLocaleString()}</td>
                                            <td style={{ padding: '16px', color: '#64748b', fontSize: '14px' }}>{new Date(expense.date).toLocaleDateString('en-IN')}</td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    background: expense.type === 'recurring' ? '#e0e7ff' : '#fef3c7',
                                                    color: expense.type === 'recurring' ? '#4f46e5' : '#d97706'
                                                }}>
                                                    {expense.type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    background: expense.status === 'approved' ? '#d1fae5' : expense.status === 'pending' ? '#fef3c7' : '#fee2e2',
                                                    color: expense.status === 'approved' ? '#059669' : expense.status === 'pending' ? '#d97706' : '#dc2626'
                                                }}>
                                                    {expense.status === 'approved' && <Check size={14} />}
                                                    {expense.status === 'pending' && <Clock size={14} />}
                                                    {expense.status === 'rejected' && <XCircle size={14} />}
                                                    {expense.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <a href="#" style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Eye size={16} />
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
            </div>

                {/* Add Expense Modal */}
                {showModal && (
                    <div onClick={() => setShowModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '20px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px', borderRadius: '20px 20px 0 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', background: 'rgba(255, 255, 255, 0.2)' }}>
                                        ➕
                                    </div>
                                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Add New Expense</h2>
                                </div>
                            </div>

                            <div style={{ padding: '24px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Description *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter expense description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Amount (₹) *</label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Date *</label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Category *</label>
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

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Project *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter project name"
                                        value={formData.project}
                                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                        style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Expense Type</label>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="type"
                                                value="one-time"
                                                checked={formData.type === 'one-time'}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                            />
                                            <span style={{ fontSize: '14px', color: '#475569' }}>One-time</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="type"
                                                value="recurring"
                                                checked={formData.type === 'recurring'}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                            />
                                            <span style={{ fontSize: '14px', color: '#475569' }}>Recurring</span>
                                        </label>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        style={{ padding: '12px 24px', background: '#f1f5f9', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '14px', color: '#475569', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '14px', color: 'white', cursor: 'pointer' }}
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
// final page