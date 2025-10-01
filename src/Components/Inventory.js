import React, { useState } from 'react';
import { Package, AlertTriangle, Calendar, TrendingUp, Search, Filter, Plus, Check, ChevronLeft, ChevronRight, Truck, HardHat, Hammer } from 'lucide-react';
import "../Assets/CSS/Inventory.css"
import ExpenseTracker from './ExpenseTracker';

   function InventoryTracke() {
    const [activeTab, setActiveTab] = useState('inventory');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1));

    const [inventory, setInventory] = useState([
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

    const [suppliers] = useState([
        { id: 1, name: 'ABC Cement Suppliers', materials: ['Cement Bags (50kg)'], email: 'sales@abccement.com', phone: '(555) 123-4567', notes: 'Reliable, 7 days delivery' },
        { id: 2, name: 'Steel & Iron Co.', materials: ['Steel Rods (12mm)', 'Steel Rods (16mm)'], email: 'orders@steeliron.com', phone: '(555) 891-1234', notes: 'Bulk orders only' },
        { id: 3, name: 'BuildMart Suppliers', materials: ['Bricks (Red Clay)', 'Sand (River)', 'Tiles (Ceramic)'], email: 'info@buildmart.com', phone: '(555) 456-7890', notes: 'Same day delivery available' },
        { id: 4, name: 'Premium Paints Ltd', materials: ['Paint (White)', 'Paint (Colors)'], email: 'contact@premiumpaints.com', phone: '(555) 789-0123', notes: 'Quality certified' },
    ]);

    const [projects] = useState([
        { id: 1, name: 'Residential Complex - Phase 1', location: 'Indore North', status: 'Active', materialsNeeded: ['Cement', 'Steel', 'Bricks'] },
        { id: 2, name: 'Commercial Plaza', location: 'Vijay Nagar', status: 'Planning', materialsNeeded: ['Cement', 'Paint', 'Tiles'] },
        { id: 3, name: 'Highway Bridge Project', location: 'Ring Road', status: 'Active', materialsNeeded: ['Steel', 'Cement', 'Sand'] },
    ]);

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

    const stockAlertCounts = inventory.reduce((acc, item) => {
        acc[item.stockAlert] = (acc[item.stockAlert] || 0) + 1;
        return acc;
    }, {});

    const totalOnHand = inventory.reduce((sum, item) => sum + item.onHand, 0);
    const totalOnOrder = inventory.reduce((sum, item) => sum + item.onOrder, 0);
    const totalInventoryCost = inventory.reduce((sum, item) => sum + (item.onHand * item.pricePerUnit), 0);

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, month, year };
    };

    const renderCalendar = () => {
        const { daysInMonth, startingDayOfWeek, month, year } = getDaysInMonth(currentMonth);
        const days = [];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === 30 && month === 8;
            days.push(
                <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                    {day}
                </div>
            );
        }

        return (
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="calendar-nav">
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="calendar-month">{monthNames[month]} {year}</h3>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="calendar-nav">
                        <ChevronRight size={20} />
                    </button>
                </div>
                <div className="calendar-grid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="calendar-weekday">{day}</div>
                    ))}
                    {days}
                </div>
            </div>
        );
    };

    return (
        <div className="app-container">
            <div className="main-card">
                <div className="header">
                    <div className="header-content">
                        <h1>
                            <HardHat size={36} />
                            Construction Inventory Management
                        </h1>
                        <p className="header-subtitle">📍 Indore, Madhya Pradesh | Track & Manage Construction Materials</p>
                        <div className="tabs">
                            <button className={`tab ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
                                <Package size={18} />
                                Material Inventory
                            </button>
                            <button className={`tab ${activeTab === 'alert' ? 'active' : ''}`} onClick={() => setActiveTab('alert')}>
                                <AlertTriangle size={18} />
                                Stock Alerts
                            </button>
                            <button className={`tab ${activeTab === 'delivery' ? 'active' : ''}`} onClick={() => setActiveTab('delivery')}>
                                <Calendar size={18} />
                                Delivery Schedule
                            </button>
                            <button className={`tab ${activeTab === 'suppliers' ? 'active' : ''}`} onClick={() => setActiveTab('suppliers')}>
                                <Truck size={18} />
                                Suppliers
                            </button>
                            <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
                                <Hammer size={18} />
                                Projects
                            </button>
                            <button className={`tab ${activeTab === 'ExpenseTracker' ? 'active' : ''}`} onClick={() => setActiveTab('ExpenseTracker')}>
                                <Hammer size={18} />
                                ExpenseTracker
                            </button>
                        </div>
                    </div>
                </div>

                <div className="content">
                    {activeTab === 'inventory' && (
                        <>
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

                            <div className="search-bar">
                                <div className="search-input-container">
                                    <Search className="search-icon" size={20} />
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search construction materials..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="filter-btn">
                                    <Filter size={18} />
                                    Filter
                                </button>
                                <button className="add-btn">
                                    <Plus size={18} />
                                    Add Material
                                </button>
                            </div>

                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>🏗️ Material Name</th>
                                            <th>📏 Unit</th>
                                            <th>🆔 SKU</th>
                                            <th>📂 Category</th>
                                            <th>📦 On Hand</th>
                                            <th>🚚 On Order</th>
                                            <th>⚠️ Stock Alert</th>
                                            <th>📊 Status</th>
                                            <th>📅 Shipped On</th>
                                            <th>🎯 Expected Delivery</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventory.map((item) => (
                                            <tr key={item.id}>
                                                <td><strong>{item.material}</strong></td>
                                                <td><span className="unit-badge">{item.unit}</span></td>
                                                <td>{item.sku}</td>
                                                <td>
                                                    <span className="category-badge">
                                                        {getCategoryIcon(item.category)} {item.category}
                                                    </span>
                                                </td>
                                                <td><strong>{item.onHand.toLocaleString()}</strong></td>
                                                <td>{item.onOrder.toLocaleString()}</td>
                                                <td>
                                                    <span className={`status-badge ${getStockAlertColor(item.stockAlert)}`}>
                                                        {item.stockAlert}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${getStatusColor(item.status)}`}>
                                                        {getStatusIcon(item.status)} {item.status}
                                                    </span>
                                                </td>
                                                <td>{item.shippedOn}</td>
                                                <td>{item.expectedDelivery}</td>
                                            </tr>
                                        ))}
                                        <tr className="summary-row">
                                            <td colSpan="4">TOTAL</td>
                                            <td>{totalOnHand.toLocaleString()}</td>
                                            <td>{totalOnOrder.toLocaleString()}</td>
                                            <td colSpan="4"></td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                                    <th>🏗️ Material</th>
                                                    <th>📏 Unit</th>
                                                    <th>🆔 SKU</th>
                                                    <th>💰 Price/Unit</th>
                                                    <th>📦 On Hand</th>
                                                    <th>💵 Total Cost</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inventory.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.material}</td>
                                                        <td><span className="unit-badge">{item.unit}</span></td>
                                                        <td>{item.sku}</td>
                                                        <td>₹{item.pricePerUnit.toFixed(2)}</td>
                                                        <td>{item.onHand.toLocaleString()}</td>
                                                        <td><strong>₹{(item.onHand * item.pricePerUnit).toLocaleString()}</strong></td>
                                                    </tr>
                                                ))}
                                                <tr className="summary-row">
                                                    <td colSpan="4">TOTAL VALUE</td>
                                                    <td>{totalOnHand.toLocaleString()}</td>
                                                    <td><strong>₹{totalInventoryCost.toLocaleString()}</strong></td>
                                                </tr>
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
                                        {todos.map((todo) => (
                                            <div key={todo.id} className="todo-item">
                                                <div
                                                    className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                                                    onClick={() => toggleTodo(todo.id)}
                                                >
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
                        </>
                    )}

                    {activeTab === 'alert' && (
                        <>
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
                                <div className="alert-card">
                                    <div className="alert-header">
                                        <span className="alert-badge stock-out">🔴 Out of Stock</span>
                                        <span className="alert-count">{stockAlertCounts['Out of Stock'] || 0}</span>
                                    </div>
                                    <div className="alert-items">
                                        {inventory.filter(item => item.stockAlert === 'Out of Stock').map(item => (
                                            <div key={item.id} className="alert-item">
                                                <strong>{item.material}</strong> - {item.unit}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="alert-card">
                                    <div className="alert-header">
                                        <span className="alert-badge stock-low">🟡 Low in Stock</span>
                                        <span className="alert-count">{stockAlertCounts['Low in Stock'] || 0}</span>
                                    </div>
                                    <div className="alert-items">
                                        {inventory.filter(item => item.stockAlert === 'Low in Stock').map(item => (
                                            <div key={item.id} className="alert-item">
                                                <strong>{item.material}</strong> - {item.onHand} {item.unit}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="alert-card">
                                    <div className="alert-header">
                                        <span className="alert-badge stock-in">🟢 In Stock</span>
                                        <span className="alert-count">{stockAlertCounts['In Stock'] || 0}</span>
                                    </div>
                                    <div className="alert-items">
                                        {inventory.filter(item => item.stockAlert === 'In Stock').map(item => (
                                            <div key={item.id} className="alert-item">
                                                <strong>{item.material}</strong> - {item.onHand} {item.unit}
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                                                    <th>🏗️ Material</th>
                                                    <th>📏 Unit</th>
                                                    <th>🆔 SKU</th>
                                                    <th>💰 Price/Unit</th>
                                                    <th>📦 On Hand</th>
                                                    <th>💵 Total Cost</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inventory.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.material}</td>
                                                        <td><span className="unit-badge">{item.unit}</span></td>
                                                        <td>{item.sku}</td>
                                                        <td>₹{item.pricePerUnit.toFixed(2)}</td>
                                                        <td>{item.onHand.toLocaleString()}</td>
                                                        <td><strong>₹{(item.onHand * item.pricePerUnit).toLocaleString()}</strong></td>
                                                    </tr>
                                                ))}
                                                <tr className="summary-row">
                                                    <td colSpan="4">TOTAL VALUE</td>
                                                    <td>{totalOnHand.toLocaleString()}</td>
                                                    <td><strong>₹{totalInventoryCost.toLocaleString()}</strong></td>
                                                </tr>
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
                                        {todos.map((todo) => (
                                            <div key={todo.id} className="todo-item">
                                                <div
                                                    className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                                                    onClick={() => toggleTodo(todo.id)}
                                                >
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
                        </>
                    )}

                    {activeTab === 'delivery' && (
                        <div>
                            <h2 className="section-title">
                                <Calendar size={32} />
                                Material Delivery Calendar
                            </h2>
                            {renderCalendar()}

                            <div style={{ marginTop: '30px' }}>
                                <h3 className="subsection-title">📋 Upcoming Deliveries</h3>
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>🏗️ Material</th>
                                                <th>📦 Quantity</th>
                                                <th>📊 Status</th>
                                                <th>📅 Expected Delivery</th>
                                                <th>🚚 Shipped On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inventory.filter(item => item.expectedDelivery).map((item) => (
                                                <tr key={item.id}>
                                                    <td><strong>{item.material}</strong></td>
                                                    <td>{item.onOrder} {item.unit}</td>
                                                    <td>
                                                        <span className={`status-badge ${getStatusColor(item.status)}`}>
                                                            {getStatusIcon(item.status)} {item.status}
                                                        </span>
                                                    </td>
                                                    <td><strong>{item.expectedDelivery}</strong></td>
                                                    <td>{item.shippedOn}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'suppliers' && (
                        <>
                            <div className="search-bar">
                                <div className="search-input-container">
                                    <Search className="search-icon" size={20} />
                                    <input type="text" className="search-input" placeholder="Search suppliers..." />
                                </div>
                                <button className="filter-btn">
                                    <Filter size={18} />
                                    Filter
                                </button>
                                <button className="add-btn">
                                    <Plus size={18} />
                                    Add Supplier
                                </button>
                            </div>

                            <div className="supplier-grid">
                                {suppliers.map((supplier) => (
                                    <div key={supplier.id} className="supplier-card">
                                        <div className="supplier-header">
                                            <div className="supplier-icon">
                                                <Truck size={20} />
                                            </div>
                                            <span className="supplier-name">{supplier.name}</span>
                                        </div>
                                        <div className="supplier-materials">
                                            {supplier.materials.map((material, idx) => (
                                                <span key={idx} className="material-tag">
                                                    🏗️ {material}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="supplier-contact">
                                            <div>📧 {supplier.email}</div>
                                            <div>📞 {supplier.phone}</div>
                                        </div>
                                        {supplier.notes && (
                                            <div className="supplier-notes">
                                                💡 {supplier.notes}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'projects' && (
                        <>
                            <div className="search-bar">
                                <div className="search-input-container">
                                    <Search className="search-icon" size={20} />
                                    <input type="text" className="search-input" placeholder="Search projects..." />
                                </div>
                                <button className="filter-btn">
                                    <Filter size={18} />
                                    Filter by Status
                                </button>
                                <button className="add-btn">
                                    <Plus size={18} />
                                    Add Project
                                </button>
                            </div>

                            {projects.map((project) => (
                                <div key={project.id} className="project-card">
                                    <div className="project-header">
                                        <div>
                                            <div className="project-name">
                                                🏗️ {project.name}
                                            </div>
                                            <div className="project-location">
                                                📍 {project.location}
                                            </div>
                                        </div>
                                        <span className={`project-status ${project.status.toLowerCase()}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div>
                                        <strong style={{ color: '#6b7280', fontSize: '14px' }}>Materials Required:</strong>
                                        <div className="project-materials">
                                            {project.materialsNeeded.map((material, idx) => (
                                                <span key={idx} className="material-tag">
                                                    📦 {material}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    {activeTab === 'ExpenseTracker' && <ExpenseTracker/> }
                </div>
            </div>
        </div>
    );
}
export default InventoryTracke;