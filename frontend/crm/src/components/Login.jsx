import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Base_Url } from '../config/api';

function Login() {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Base_Url}/api/login`, user);
            console.log(res);
            if (res?.status === 200) {
                setUser({ email: "", password: "" });
                localStorage.setItem("tokenAuth", res.data.token);
                localStorage.setItem("email", res.data.email);
                const userRole = res.data.role;
console.log(userRole)
                if (userRole === 'company') {
                    navigate("/company");
                } else {
                    navigate("/user");
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center py-4">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <img
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                        className="mb-3"
                        style={{ height: '40px', width: 'auto' }}
                    />
                    <h2 className="h4">Sign in to your account</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                            autoComplete="email"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <label htmlFor="password" className="form-label">Password</label>
                            <a href="#" className="text-primary">Forgot password?</a>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                            autoComplete="current-password"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="text-center text-muted">
                    Not a member?{' '}
                    <a href="/register" className="text-primary">signup</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
