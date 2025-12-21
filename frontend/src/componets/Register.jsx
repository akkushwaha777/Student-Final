import { useState } from 'react';
import API from '../api';

export default function Register({ onNavigate }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', mobile: '', address: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await API.post('/users/register', formData);
            // Optional: Success message could be handled better, but alert is fine for now as per original
            alert('Registration successful! Please login.');
            onNavigate('login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please check your inputs.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join us to manage your student profile</p>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="auth-label">Full Name</label>
                        <input
                            type="text"
                            className="auth-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="auth-label">Email Address</label>
                        <input
                            type="email"
                            className="auth-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="auth-label">Mobile Number</label>
                        <input
                            type="text"
                            className="auth-input"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="auth-label">Address</label>
                        <input
                            type="text"
                            className="auth-input"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="auth-label">Password</label>
                        <input
                            type="password"
                            className="auth-input"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Register Now'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account?
                    <button className="auth-link" onClick={() => onNavigate('login')}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}
