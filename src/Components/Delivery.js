// DeliveryPage.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import '../Assets/CSS/Inventory.css';

const dummyInventory = [
    { id: 1, material: 'Cement Bags (50kg)', onOrder: 200, unit: 'Bags', status: 'In Transit', shippedOn: '15/09/2025', expectedDelivery: '05/10/2025' },
    { id: 2, material: 'Steel Rods (12mm)', onOrder: 5000, unit: 'Kg', status: 'Received', shippedOn: '20/09/2025', expectedDelivery: '30/09/2025' },
    { id: 3, material: 'Bricks (Red Clay)', onOrder: 10000, unit: 'Pieces', status: 'In Progress', shippedOn: '', expectedDelivery: '10/10/2025' },
    { id: 4, material: 'Sand (River)', onOrder: 500, unit: 'Cubic Ft', status: 'Need to Order', shippedOn: '', expectedDelivery: '12/10/2025' },
];

function getStatusColor(status) {
    switch(status) {
        case 'In Transit': return 'status-transit';
        case 'Received': return 'status-received';
        case 'In Progress': return 'status-progress';
        case 'Need to Order': return 'status-order';
        default: return 'status-default';
    }
}

function getStatusIcon(status) {
    switch(status) {
        case 'In Transit': return '🚚';
        case 'Received': return '✅';
        case 'In Progress': return '⏳';
        case 'Need to Order': return '❗';
        default: return '';
    }
}

export default function DeliveryPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1));

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
            days.push(
                <div key={day} className={`calendar-day`}>
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
        <div className="delivery-tab">
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
                                <th>Material</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Expected Delivery</th>
                                <th>Shipped On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyInventory.filter(item => item.expectedDelivery).map(item => (
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
    )
}
