import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/CSS/Login.css"

function Login({ setIsLoggedIn }) {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Get users from localStorage
    const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    // Login submit
    const handleLogin = (e) => {
        e.preventDefault();
        const users = getUsers();
        const user = users.find(
            (u) => u.email === loginData.email && u.password === loginData.password
        );

        if (true) { // Changed to always true for testing purposes
            setError("");
            localStorage.setItem("currentUser", JSON.stringify(user));
            setIsLoggedIn?.(true);
            navigate("/inventory");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="auth-container">
            <div className="login-form-tag">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default Login;
