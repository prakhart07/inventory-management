import React from "react";
import "../Assests/CSS/expense.css";

const Dashboard = () => {
    const todayExpenses = [
        { id: 1, color: "#2D9CDB", icon: "🛒", category: "Grocery", desc: "Belanja di pasar", amount: -326800 },
        { id: 2, color: "#BB6BD9", icon: "🚌", category: "Transportation", desc: "Naik bus umum", amount: -15000 },
        { id: 3, color: "#F2994A", icon: "🏠", category: "Housing", desc: "Bayar Listrik", amount: -185750 },
    ];

    const pastExpenses = [
        { id: 4, color: "#EB5757", icon: "🍽️", category: "Food and Drink", desc: "Makan Steak", amount: -156000 },
        { id: 5, color: "#27AE60", icon: "🎬", category: "Entertainment", desc: "Nonton Bioskop", amount: -35200 },
    ];

    const summary = [
        { label: "Food and Drinks", value: 872400 },
        { label: "Shopping", value: 1378200 },
        { label: "Housing", value: 928500 },
        { label: "Transportation", value: 420700 },
        { label: "Vehicle", value: 520000 },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="profile">
                    <div className="avatar">
                        <img src="https://via.placeholder.com/60" alt="profile" />
                        <span className="notification">4</span>
                    </div>
                    <h3>Samantha</h3>
                    <p className="email">samantha@email.com</p>
                </div>

                <ul className="menu">
                    <li>Dashboard</li>
                    <li className="active">Expenses</li>
                    <li>Wallets</li>
                    <li>Summary</li>
                    <li>Accounts</li>
                    <li>Settings</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="header">
                    <h2>Expenses</h2>
                    <p className="date-range">01 - 25 March, 2020</p>
                    <div className="avatars">
                        <img src="https://via.placeholder.com/30" alt="user1" />
                        <img src="https://via.placeholder.com/30" alt="user2" />
                        <img src="https://via.placeholder.com/30" alt="user3" />
                        <button className="add-user">+</button>
                    </div>
                </div>

                <div className="chart">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="bar" style={{ height: `${30 + (i % 7) * 10}px` }}></div>
                    ))}
                </div>

                <div className="expenses-list">
                    <h4>Today</h4>
                    {todayExpenses.map((exp) => (
                        <div key={exp.id} className="expense-row">
                            <span className="icon" style={{ background: exp.color }}>
                                {exp.icon}
                            </span>
                            <div className="details">
                                <p className="category">{exp.category}</p>
                                <p className="desc">5:12 pm • {exp.desc}</p>
                            </div>
                            <p className="amount">{exp.amount.toLocaleString()}</p>
                        </div>
                    ))}

                    <h4>Monday, 23 March 2020</h4>
                    {pastExpenses.map((exp) => (
                        <div key={exp.id} className="expense-row">
                            <span className="icon" style={{ background: exp.color }}>
                                {exp.icon}
                            </span>
                            <div className="details">
                                <p className="category">{exp.category}</p>
                                <p className="desc">5:12 pm • {exp.desc}</p>
                            </div>
                            <p className="amount">{exp.amount.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="right-panel">
                <h3>Where your money go?</h3>
                <div className="summary">
                    {summary.map((item, idx) => (
                        <div key={idx} className="summary-item">
                            <span>{item.label}</span>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${Math.min(item.value / 15000, 100)}%` }}
                                ></div>
                            </div>
                            <span className="value">{item.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="tips-card">
                    <img
                        src="https://via.placeholder.com/80"
                        alt="illustration"
                        className="illustration"
                    />
                    <h4>Save more money</h4>
                    <p>
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
                    </p>
                    <button className="btn">VIEW TIPS</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
