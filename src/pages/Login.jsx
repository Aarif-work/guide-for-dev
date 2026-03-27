import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network request
        setTimeout(() => {
            localStorage.setItem('devguide_auth', 'true');
            // Dispatch storage event to update App.jsx state
            window.dispatchEvent(new Event('storage'));
            navigate('/');
        }, 1000);
    };

    const handleSkip = () => {
        navigate('/');
    };

    return (
        <div className="login-overlay">
            {/* Dark semi-transparent background that closes on click */}
            <motion.div
                className="login-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleSkip}
            />

            <motion.div
                className="login-drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
                <div className="login-drawer-inner glass-panel">
                    <div className="login-header">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="login-brand-small">DevGuide<span className="text-accent-primary">.</span></h1>
                            <button onClick={handleSkip} className="close-btn">
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <h2>Unlock full access</h2>
                        <p className="text-muted">Sign in to track progress and use AI features.</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <div className="input-with-icon">
                                <svg className="input-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <input
                                    type="email"
                                    id="email"
                                    className="input-field"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="password-header">
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="input-with-icon">
                                <svg className="input-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input
                                    type="password"
                                    id="password"
                                    className="input-field"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary login-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="loader"></div>
                            ) : (
                                <>
                                    Sign in to your account
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-login-grid">
                        <button type="button" className="btn btn-secondary social-btn-mini">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </button>
                        <button type="button" className="btn btn-secondary social-btn-mini">
                            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            </svg>
                        </button>
                    </div>

                    <div className="login-drawer-footer">
                        <button onClick={handleSkip} className="skip-btn">
                            Skip for later
                        </button>
                        <p className="login-footer-text">
                            First time here? <a href="#">Join now</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
