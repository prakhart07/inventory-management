// AlertsPage.jsx
import React from 'react';
import { Search, Filter, TrendingUp, AlertTriangle, Check } from 'lucide-react';
import '../Assets/CSS/Inventory.css';

const dummyInventory = [
    { id: 1, material: 'Cement Bags (50kg)', unit: 'Bags', stockAlert: 'In Stock', onHand: 500 },
    { id: 2, material: 'Steel Rods (12mm)', unit: 'Kg', stockAlert: 'Out of Stock', onHand: 0 },
    { id: 3, material: 'Bricks (Red Clay)', unit: 'Pieces', stockAlert: 'Low in Stock', onHand: 15000 },
    { id: 4, material: 'Sand (River)', unit: 'Cubic Ft', stockAlert: 'Low in Stock', onHand: 200 },
];

const dummyTodos = [
    { id: 1, text: 'Order more steel rods for foundation work', completed: false },
    { id: 2, text: 'Schedule delivery of bricks for Site A', completed: true },
];

function getStockAlertColor(alert) {
    switch(alert) {
        case 'In Stock': return 'stock-in';
        case 'Out of Stock': return 'stock-out';
        case 'Low in Stock': return 'stock-low';
        default: return 'stock-na';
    }
}

export default function AlertsPage() {
    return (
        <div className="alerts-tab">
            <div className="search-bar">
                <div className="search-input-container">
                    <Search className="search-icon" size={20} />
                    <input type="text" className="search-input" placeholder="Search stock alerts..." />
                </div>
                <button className="filter-btn">
                    <Filter size={18} />
                    Filter by Status
                </button>
            </div>

            <div className="stock-alerts">
                {['Out of Stock', 'Low in Stock', 'In Stock'].map(status => (
                    <div key={status} className="alert-card">
                        <div className="alert-header">
                            <span className={`alert-badge ${getStockAlertColor(status)}`}>
                                {status === 'Out of Stock' ? '🔴' : status === 'Low in Stock' ? '🟡' : '🟢'} {status}
                            </span>
                            <span className="alert-count">{dummyInventory.filter(item => item.stockAlert === status).length}</span>
                        </div>
                        <div className="alert-items">
                            {dummyInventory.filter(item => item.stockAlert === status).map(item => (
                                <div key={item.id} className="alert-item">
                                    <strong>{item.material}</strong> - {item.onHand} {item.unit}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="two-column-layout">
                <div>
                    <h2 className="section-title">
                        <TrendingUp size={28} />
                        Material Cost Analysis
                    </h2>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Material</th>
                                    <th>Unit</th>
                                    <th>On Hand</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyInventory.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.material}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.onHand}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="todo-section">
                    <div className="todo-header">
                        <AlertTriangle className="pin-icon" size={28} />
                        <h3>Action Items</h3>
                    </div>
                    <div className="todo-list">
                        {dummyTodos.map(todo => (
                            <div key={todo.id} className="todo-item">
                                <div className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}>
                                    {todo.completed && <Check size={16} color="white" />}
                                </div>
                                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                    {todo.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
