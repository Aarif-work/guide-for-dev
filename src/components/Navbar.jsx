import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, UserCircle, MessageSquare, Terminal } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ isAuthenticated }) {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Learning', path: '/learning', icon: <BookOpen size={18} /> },
        { name: 'Interview', path: '/interview', icon: <Terminal size={18} /> },
        { name: 'Ask Doubt', path: '/ask-doubt', icon: <MessageSquare size={18} /> },
        { name: 'Profile', path: '/profile', icon: <UserCircle size={18} /> },
    ];

    return (
        <nav className="navbar-container">
            <Link to="/" className="brand-logo">
                DevGuide.
            </Link>

            <div className="nav-center">
                <div className="nav-links">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{link.icon}</span>
                                <span className="nav-text">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="nav-actions">
                {isAuthenticated ? (
                    <button
                        onClick={() => {
                            localStorage.removeItem('devguide_auth');
                            window.location.href = '/login';
                        }}
                        className="btn btn-secondary border-danger/20 text-danger hover:bg-danger/5"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="btn btn-primary">
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}
