// InventoryTracke.jsx (Updated with BudgetManagement Tab)
import React, { useState } from 'react';
import {
    Package, AlertTriangle, Calendar, Truck, Hammer, Check, ChevronLeft, ChevronRight, HardHat,DollarSign
} from 'lucide-react';
import "../Assets/CSS/Inventory.css"

// Import individual tab components
import AlertsPage from './StockAlerts';
import DeliveryPage from './Delivery';
import SuppliersPage from './Supplier';
import ProjectsPage from './Project';
import ExpenseTracker from './ExpenseTracker';
import BudgetManagement from './Budget'; // <-- Added
import DataTable from 'react-data-table-component';

function InventoryTracke() {
    const [activeTab, setActiveTab] = useState('inventory');

    // ======= Inventory Tab Data =======
    const [inventory] = useState([
        { id: 1, material: 'Cement Bags (50kg)', unit: 'Bags', sku: 'CEM-001', category: 'Building Materials', onHand: 500, onOrder: 200, stockAlert: 'In Stock', status: 'In Transit', shippedOn: '15/09/2025', expectedDelivery: '05/10/2025', pricePerUnit: 450 },
        { id: 2, material: 'Steel Rods (12mm)', unit: 'Kg', sku: 'STL-012', category: 'Steel & Iron', onHand: 0, onOrder: 5000, stockAlert: 'Out of Stock', status: 'Received', shippedOn: '20/09/2025', expectedDelivery: '30/09/2025', pricePerUnit: 65 },
        { id: 3, material: 'Bricks (Red Clay)', unit: 'Pieces', sku: 'BRK-001', category: 'Building Materials', onHand: 15000, onOrder: 10000, stockAlert: 'Low in Stock', status: 'In Progress', shippedOn: '', expectedDelivery: '10/10/2025', pricePerUnit: 8 },
        { id: 4, material: 'Sand (River)', unit: 'Cubic Ft', sku: 'SND-001', category: 'Aggregates', onHand: 200, onOrder: 500, stockAlert: 'Low in Stock', status: 'Need to Order', shippedOn: '', expectedDelivery: '12/10/2025', pricePerUnit: 35 },
        { id: 5, material: 'Paint (White)', unit: 'Liters', sku: 'PNT-001', category: 'Finishing Materials', onHand: 150, onOrder: 0, stockAlert: 'In Stock', status: 'Received', shippedOn: '', expectedDelivery: '', pricePerUnit: 280 },
        { id: 6, material: 'Tiles (Ceramic)', unit: 'Sq Ft', sku: 'TIL-001', category: 'Finishing Materials', onHand: 800, onOrder: 1200, stockAlert: 'In Stock', status: 'In Transit', shippedOn: '18/09/2025', expectedDelivery: '08/10/2025', pricePerUnit: 45 },
        { id: 7, material: 'Plywood Sheets', unit: 'Sheets', sku: 'PLY-001', category: 'Wood Materials', onHand: 50, onOrder: 100, stockAlert: 'Low in Stock', status: 'In Progress', shippedOn: '', expectedDelivery: '15/10/2025', pricePerUnit: 1200 },
        { id: 8, material: 'PVC Pipes (4 inch)', unit: 'Meters', sku: 'PVC-004', category: 'Plumbing', onHand: 300, onOrder: 0, stockAlert: 'In Stock', status: 'Received', shippedOn: '', expectedDelivery: '', pricePerUnit: 85 },
    ]);

    const [todos, setTodos] = useState([
        { id: 1, text: 'Order more steel rods for foundation work', completed: false },
        { id: 2, text: 'Schedule delivery of bricks for Site A', completed: false },
        { id: 3, text: 'Check quality of received cement bags', completed: false },
        { id: 4, text: 'Update supplier contact for sand delivery', completed: false },
    ]);

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const getStockAlertColor = (alert) => {
        switch (alert) {
            case 'In Stock': return 'stock-in';
            case 'Out of Stock': return 'stock-out';
            case 'Low in Stock': return 'stock-low';
            default: return 'stock-na';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Transit': return 'status-transit';
            case 'Received': return 'status-received';
            case 'In Progress': return 'status-progress';
            case 'Need to Order': return 'status-order';
            default: return 'status-default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'In Transit': return '🚚';
            case 'Received': return '✅';
            case 'In Progress': return '⏳';
            case 'Need to Order': return '❗';
            default: return '';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Building Materials': return '🏗️';
            case 'Steel & Iron': return '⚙️';
            case 'Aggregates': return '🪨';
            case 'Finishing Materials': return '🎨';
            case 'Wood Materials': return '🪵';
            case 'Plumbing': return '🔧';
            default: return '📦';
        }
    };


    const columns = [
	{
		name: '🏗️ Material Name',
		selector: row => row.material,
	},
    {
		name: '📏 Unit',
		selector: row => row.unit,
	},
    {
		name: '🆔 SKU',
		selector: row => row.sku,
	},
    {
		name: '📂 Category',
		cell: row => {row.catagory = getCategoryIcon(row.category) + ' ' + row.category; return row.catagory},
	},
    {
		name: '📦 On Hand',
		selector: row => {row.onHand = row.onHand.toLocaleString(); return row.onHand},
	},
    {
		name: '🚚 On Order',
		selector: row => {row.onOrder = row.onOrder.toLocaleString(); return row.onOrder},
	},
    {
		name: '⚠️ Stock Alert',
		selector: row => <span className={`status-badge ${getStockAlertColor(row.stockAlert)}`}>{row.stockAlert}</span>,
	},
    {
		name: '📊 Status',
		selector: row => <span className={`status-badge ${getStatusColor(row.status)}`}>{getStatusIcon(row.status)} {row.status}</span>,
	},
    {
		name: '📅 Shipped On',
		selector: row => row.shippedOn,
	},
    {
		name: '🎯 Expected Delivery',
		selector: row => row.expectedDelivery,
	},
    // {
    //   name: 'Complete',
    //   cell: row => <button className='btn btn-success' onClick={() => edit(row.task)}>Done</button>
    // },
    // {
    //     name: 'Transfer',
    //     cell: row => <button className='btn btn-warning' onClick={() => edit(row.task)}>Transfer</button>
    //   },
    //   {
    //     name: 'Action delete',
    //     cell: row => {
    //       return <button className='btn btn-danger'  onClick={() => deleteTask(row.task)}>Delete</button>
    //     }
    //   },
];

                                            

    const totalOnHand = inventory.reduce((sum, item) => sum + item.onHand, 0);
    const totalOnOrder = inventory.reduce((sum, item) => sum + item.onOrder, 0);
    const totalInventoryCost = inventory.reduce((sum, item) => sum + (item.onHand * item.pricePerUnit), 0);

    return (
        <div className="app-container">
            <div className="main-card">
                <div className="header">
                    <div className="header-content">
                        <h1>
                            <Hammer size={36} />
                            Construction Planning & Management Tool
                        </h1>
                        <p className="header-subtitle">📍 Indore, Madhya Pradesh | Track & Manage Construction Materials</p>
                        <div className="tabs">
                             <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
                                <Hammer size={18} />
                                Projects
                            </button>
                            <button className={`tab ${activeTab === 'budget' ? 'active' : ''}`} onClick={() => setActiveTab('budget')}>
                                <DollarSign size={18} />
                                Budget Management
                            </button>
                            <button className={`tab ${activeTab === 'ExpenseTracker' ? 'active' : ''}`} onClick={() => setActiveTab('ExpenseTracker')}>
                                <Hammer size={18} />
                                Expense Tracker
                            </button>
                              <button className={`tab ${activeTab === 'alert' ? 'active' : ''}`} onClick={() => setActiveTab('alert')}>
                                <AlertTriangle size={18} />
                                Stock Alerts
                            </button>
                            <button className={`tab ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
                                <Package size={18} />
                                Material Inventory
                            </button>
                            
                            <button className={`tab ${activeTab === 'delivery' ? 'active' : ''}`} onClick={() => setActiveTab('delivery')}>
                                <Calendar size={18} />
                                Delivery Schedule
                            </button>
                            <button className={`tab ${activeTab === 'suppliers' ? 'active' : ''}`} onClick={() => setActiveTab('suppliers')}>
                                <Truck size={18} />
                                Suppliers
                            </button>
                           
                            
                           
                        </div>
                    </div>
                </div>

                <div className="content">
                    {activeTab === 'inventory' && (
                        <div>
                            {/* ===== Inventory Stats & Table ===== */}
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon">📦</div>
                                    <div className="stat-label">Total Materials</div>
                                    <div className="stat-value">{inventory.length}</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">📊</div>
                                    <div className="stat-label">On Hand Total</div>
                                    <div className="stat-value">{totalOnHand.toLocaleString()}</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">🚚</div>
                                    <div className="stat-label">On Order Total</div>
                                    <div className="stat-value">{totalOnOrder.toLocaleString()}</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">💰</div>
                                    <div className="stat-label">Inventory Value</div>
                                    <div className="stat-value">₹{totalInventoryCost.toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="table-container">
                                <DataTable
                                    columns={columns}
                                    data={inventory}/>  {/* Dependency - npm i react-data-table-component */}  
                            </div>
   
                            {/* ===== Todo / Action Items ===== */}
                            <div className="todo-section">
                                <h3>Action Items</h3>
                                {todos.map(todo => (
                                    <div key={todo.id} className="todo-item">
                                        <div className={`todo-checkbox ${todo.completed ? 'checked' : ''}`} onClick={() => toggleTodo(todo.id)}>
                                            {todo.completed && <Check size={16} color="white" />}
                                        </div>
                                        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'alert' && <AlertsPage />}
                    {activeTab === 'delivery' && <DeliveryPage />}
                    {activeTab === 'suppliers' && <SuppliersPage />}
                    {activeTab === 'projects' && <ProjectsPage />}
                    {activeTab === 'ExpenseTracker' && <ExpenseTracker />}
                    {activeTab === 'budget' && <BudgetManagement />} {/* <-- Added */}
                </div>
            </div>
        </div>
    );
}

export default InventoryTracke;
