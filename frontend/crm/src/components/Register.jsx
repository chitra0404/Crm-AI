import React, { useState } from 'react';
import axios from 'axios'; 
import { Base_Url } from '../config/api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(''); // Optional: To handle error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Base_Url}/api/register`, {
                name,
                email,
                password,
                role
            });
            if (res?.status === 200) {
                // Reset all fields
                setName('');
                setEmail('');
                setPassword('');
                setRole('');
                // Optionally handle success messages or redirects here
                console.log('Registration successful:', res.data);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Registration failed. Please try again.'); // Optional: Display error message
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
                    <h2 className="h4">Register for an account</h2>
                </div>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <input
                            id="role"
                            name="role"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="text-center text-muted">
                    Already a member?{' '}
                    <a href="/login" className="text-primary">Sign in</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
