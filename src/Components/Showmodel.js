import React, { useState } from 'react';

function AddForm(){
    const [showModal, setShowModal] = useState(true);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: '',
        category: '',
        project: '',
        type: 'one-time',
    });
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
            alert('Please fill all required fields!');
            return;
        }
        console.log('Expense Added:', formData);
        alert('Expense Added Successfully!');
        setShowModal(false);
        setFormData({
            description: '',
            amount: '',
            date: '',
            category: '',
            project: '',
            type: 'one-time',
        });
    };

    return(
        showModal && (
            <div onClick={() => setShowModal(false)} style={{
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
                    borderRadius: '20px',
                    padding: '32px',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>
                            ➕
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                            Add New Expense
                        </h2>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                            Description *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter expense description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '10px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                Amount (₹) *
                            </label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                                Date *
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                            Category *
                        </label>
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
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                            Project *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter project name"
                            value={formData.project}
                            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '10px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                            Expense Type
                        </label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <label style={{
                                flex: 1,
                                padding: '12px',
                                border: `2px solid ${formData.type === 'one-time' ? '#667eea' : '#e5e7eb'}`,
                                borderRadius: '10px',
                                background: formData.type === 'one-time' ? '#f0f4ff' : 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: formData.type === 'one-time' ? '#667eea' : '#64748b'
                            }}>
                                <input
                                    type="radio"
                                    name="type"
                                    value="one-time"
                                    checked={formData.type === 'one-time'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    style={{ accentColor: '#667eea' }}
                                />
                                One-time
                            </label>
                            <label style={{
                                flex: 1,
                                padding: '12px',
                                border: `2px solid ${formData.type === 'recurring' ? '#667eea' : '#e5e7eb'}`,
                                borderRadius: '10px',
                                background: formData.type === 'recurring' ? '#f0f4ff' : 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: formData.type === 'recurring' ? '#667eea' : '#64748b'
                            }}>
                                <input
                                    type="radio"
                                    name="type"
                                    value="recurring"
                                    checked={formData.type === 'recurring'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    style={{ accentColor: '#667eea' }}
                                />
                                Recurring
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            style={{
                                flex: 1,
                                padding: '14px',
                                background: 'white',
                                color: '#374151',
                                border: '2px solid #e5e7eb',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            style={{
                                flex: 1,
                                padding: '14px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: '600',
                                boxShadow: '0 4px 6px rgba(102, 126, 234, 0.4)',
                                transition: 'all 0.2s'
                            }}
                        >
                            Add Expense
                        </button>
                    </div>
                </div>
            </div>
     ) );

}
export default AddForm;
    