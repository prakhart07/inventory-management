import React, { useState } from 'react';
import { Plus, Search, Filter, X, Check, Clock, XCircle, Eye } from 'lucide-react';
import AddForm from './Showmodel';

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
        { name: 'Labor', icon: '👥', color: '#60a5fa', bg: '#dbeafe' },
        { name: 'Equipment', icon: '📦', color: '#a78bfa', bg: '#e9d5ff' },
        { name: 'Transport', icon: '🚚', color: '#fb923c', bg: '#fed7aa' },
        { name: 'Salary', icon: '💵', color: '#34d399', bg: '#d1fae5' },
        { name: 'Utilities', icon: '⚡', color: '#fbbf24', bg: '#fef3c7' },
        { name: 'Miscellaneous', icon: '📈', color: '#f472b6', bg: '#fce7f3' }
    ];

    const handleSubmit = () => {
        if (!formData.description || !formData.amount || !formData.date || !formData.category || !formData.project) {
            alert(' Please fill in all fields');
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
        alert(' Expense added successfully!');
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
        <div style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px', borderRadius: '16px', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: '40px', marginBottom: '8px' }}>💵</div>
                    <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px', fontWeight: '600', margin: 0 }}>TOTAL EXPENSES</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', margin: 0 }}>₹{stats.total.toLocaleString()}</p>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '24px', borderRadius: '16px', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: '40px', marginBottom: '8px' }}>⏰</div>
                    <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px', fontWeight: '600', margin: 0 }}>PENDING APPROVAL</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', margin: 0 }}>₹{stats.pending.toLocaleString()}</p>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '24px', borderRadius: '16px', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: '40px', marginBottom: '8px' }}>✅</div>
                    <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px', fontWeight: '600', margin: 0 }}>APPROVED THIS MONTH</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', margin: 0 }}>₹{stats.approved.toLocaleString()}</p>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', padding: '24px', borderRadius: '16px', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: '40px', marginBottom: '8px' }}>📅</div>
                    <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px', fontWeight: '600', margin: 0 }}>RECURRING MONTHLY</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', margin: 0 }}>₹{stats.recurring.toLocaleString()}</p>
                </div>
            </div>

            {/* Categories Section */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 20px 0' }}>
                    📊 Expense Categories
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    {categories.map((category) => {
                        const categoryTotal = getCategoryExpenses(category.name);
                        return (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(selectedCategory === category.name ? 'all' : category.name)}
                                style={{
                                    background: selectedCategory === category.name ? category.bg : 'white',
                                    border: `2px solid ${selectedCategory === category.name ? category.color : '#e2e8f0'}`,
                                    borderRadius: '12px',
                                    padding: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{category.icon}</div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: category.color, marginBottom: '4px' }}>{category.name}</div>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>₹{categoryTotal.toLocaleString()}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 12px 12px 42px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none'
                        }}
                    />
                </div>
                {selectedCategory !== 'all' && (
                    <button
                        onClick={() => setSelectedCategory('all')}
                        style={{
                            padding: '12px 20px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <X size={18} />
                        Clear Filter
                    </button>
                )}
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 6px rgba(102, 126, 234, 0.4)'
                    }}
                >
                    <Plus size={18} />
                    Add Expense
                </button>
            </div>

            {/* Tabs */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '8px', marginBottom: '20px', display: 'flex', gap: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                {['all', 'pending', 'approved', 'recurring'].map(tab => (
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
                            transition: 'all 0.2s',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>DESCRIPTION</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>CATEGORY</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>PROJECT</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>AMOUNT</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>DATE</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>TYPE</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>STATUS</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExpenses.map((expense) => {
                                const catData = getCategoryData(expense.category);
                                return (
                                    <tr key={expense.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{expense.description}</div>
                                            {expense.approvedBy && (
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>By: {expense.approvedBy}</div>
                                            )}
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
                                                background: catData?.bg,
                                                color: catData?.color
                                            }}>
                                                <span>{catData?.icon}</span>
                                                <span>{expense.category}</span>
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', color: '#475569' }}>{expense.project}</td>
                                        <td style={{ padding: '16px', fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>
                                            ₹{expense.amount.toLocaleString()}
                                        </td>
                                        <td style={{ padding: '16px', color: '#64748b', fontSize: '14px' }}>
                                            {new Date(expense.date).toLocaleDateString('en-IN')}
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                background: expense.type === 'recurring' ? '#dbeafe' : '#f1f5f9',
                                                color: expense.type === 'recurring' ? '#1e40af' : '#475569'
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
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                background: expense.status === 'approved' ? '#d1fae5' : expense.status === 'pending' ? '#fef3c7' : '#fee2e2',
                                                color: expense.status === 'approved' ? '#065f46' : expense.status === 'pending' ? '#92400e' : '#991b1b'
                                            }}>
                                                {expense.status === 'approved' && <Check size={14} />}
                                                {expense.status === 'pending' && <Clock size={14} />}
                                                {expense.status === 'rejected' && <XCircle size={14} />}
                                                {expense.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <button style={{
                                                color: '#3b82f6',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <Eye size={16} />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Expense Modal */}
            {showModal && <AddForm/>}
        </div>
    );
}

export default ExpenseTracker;