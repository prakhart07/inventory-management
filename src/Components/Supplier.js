// SuppliersPage.jsx
import React from 'react';
import { Search, Filter, Plus, Truck } from 'lucide-react';
import '../Assets/CSS/Inventory.css';

const dummySuppliers = [
    { id: 1, name: 'ABC Cement Suppliers', materials: ['Cement Bags (50kg)'], email: 'sales@abccement.com', phone: '(555) 123-4567', notes: 'Reliable, 7 days delivery' },
    { id: 2, name: 'Steel & Iron Co.', materials: ['Steel Rods (12mm)', 'Steel Rods (16mm)'], email: 'orders@steeliron.com', phone: '(555) 891-1234', notes: 'Bulk orders only' },
    { id: 3, name: 'BuildMart Suppliers', materials: ['Bricks (Red Clay)', 'Sand (River)', 'Tiles (Ceramic)'], email: 'info@buildmart.com', phone: '(555) 456-7890', notes: 'Same day delivery available' },
    { id: 4, name: 'Premium Paints Ltd', materials: ['Paint (White)', 'Paint (Colors)'], email: 'contact@premiumpaints.com', phone: '(555) 789-0123', notes: 'Quality certified' },
];

export default function SuppliersPage() {
    return (
        <div className="suppliers-tab">
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
                {dummySuppliers.map(supplier => (
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
        </div>
    )
}
