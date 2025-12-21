import { useState } from 'react';
import API from '../api';

export default function Register({ onNavigate }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', mobile: '', address: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/users/register', formData);
            alert('Registration successful! Please login.');
            onNavigate('login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Mobile</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account?{' '}
                    <button className="btn btn-link p-0" onClick={() => onNavigate('login')}>
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
