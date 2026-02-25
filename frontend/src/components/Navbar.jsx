import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [practiceDropdownOpen, setPracticeDropdownOpen] = useState(false);
    const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
    const userDropdownRef = useRef(null);
    const practiceDropdownRef = useRef(null);
    const toolsDropdownRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
            if (practiceDropdownRef.current && !practiceDropdownRef.current.contains(event.target)) {
                setPracticeDropdownOpen(false);
            }
            if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target)) {
                setToolsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navbar glass">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        <span className="gradient-text">Code2Placement</span>
                    </Link>

                    <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                                    <span className="nav-icon">📊</span>
                                    <span>Dashboard</span>
                                </Link>

                                {/* Practice Dropdown */}
                                <div
                                    className="nav-dropdown"
                                    ref={practiceDropdownRef}
                                    onMouseEnter={() => !window.matchMedia('(max-width: 768px)').matches && setPracticeDropdownOpen(true)}
                                    onMouseLeave={() => !window.matchMedia('(max-width: 768px)').matches && setPracticeDropdownOpen(false)}
                                >
                                    <button
                                        className="nav-link dropdown-trigger"
                                        onClick={() => window.matchMedia('(max-width: 768px)').matches && setPracticeDropdownOpen(!practiceDropdownOpen)}
                                    >
                                        <span className="nav-icon">💻</span>
                                        <span>Practice</span>
                                        <span className="dropdown-arrow">{practiceDropdownOpen ? '▲' : '▼'}</span>
                                    </button>
                                    {practiceDropdownOpen && (
                                        <div className="nav-dropdown-menu active">
                                            <Link to="/topics" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setPracticeDropdownOpen(false); }}>
                                                <span className="item-icon">📚</span>
                                                DSA Topics
                                            </Link>
                                            <Link to="/questions" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setPracticeDropdownOpen(false); }}>
                                                <span className="item-icon">❓</span>
                                                Questions
                                            </Link>
                                            <Link to="/interview-qa" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setPracticeDropdownOpen(false); }}>
                                                <span className="item-icon">💬</span>
                                                Interview Q&A
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Tools Dropdown */}
                                <div
                                    className="nav-dropdown"
                                    ref={toolsDropdownRef}
                                    onMouseEnter={() => !window.matchMedia('(max-width: 768px)').matches && setToolsDropdownOpen(true)}
                                    onMouseLeave={() => !window.matchMedia('(max-width: 768px)').matches && setToolsDropdownOpen(false)}
                                >
                                    <button
                                        className="nav-link dropdown-trigger"
                                        onClick={() => window.matchMedia('(max-width: 768px)').matches && setToolsDropdownOpen(!toolsDropdownOpen)}
                                    >
                                        <span className="nav-icon">🛠️</span>
                                        <span>Tools</span>
                                        <span className="dropdown-arrow">{toolsDropdownOpen ? '▲' : '▼'}</span>
                                    </button>
                                    {toolsDropdownOpen && (
                                        <div className="nav-dropdown-menu active">
                                            <Link to="/skill-dashboard" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setToolsDropdownOpen(false); }}>
                                                <span className="item-icon">📈</span>
                                                Skill Dashboard
                                            </Link>
                                            <Link to="/mock-interview" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setToolsDropdownOpen(false); }}>
                                                <span className="item-icon">🎤</span>
                                                Mock Interview
                                            </Link>
                                            <Link to="/resume-analysis" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setToolsDropdownOpen(false); }}>
                                                <span className="item-icon">📄</span>
                                                Resume Analysis
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Link to="/courses" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                                    <span className="nav-icon">🎓</span>
                                    <span>Courses</span>
                                </Link>
                                <Link to="/forum" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                                    <span className="nav-icon">👥</span>
                                    <span>Forum</span>
                                </Link>

                                {user?.role === 'ADMIN' && (
                                    <Link to="/admin" className="nav-link admin-link" onClick={() => setMobileMenuOpen(false)}>
                                        <span className="nav-icon">🛡️</span>
                                        <span>Admin</span>
                                    </Link>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/roadmaps" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Roadmaps</Link>
                                <Link to="/resources" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
                            </>
                        )}
                    </div>

                    <div className="navbar-actions">
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label="Toggle theme"
                            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        {isAuthenticated ? (
                            <div
                                className="user-dropdown"
                                ref={userDropdownRef}
                                onMouseEnter={() => setUserDropdownOpen(true)}
                                onMouseLeave={() => setUserDropdownOpen(false)}
                            >
                                <button className="user-button">
                                    <div className="user-avatar">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className="user-name">{user?.name || 'User'}</span>
                                    <span className="dropdown-arrow-sm">{userDropdownOpen ? '▲' : '▼'}</span>
                                </button>
                                {userDropdownOpen && (
                                    <div className="user-dropdown-menu active">
                                        <div className="user-info">
                                            <div className="user-avatar-large">
                                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <div className="user-details">
                                                <div className="user-name-large">{user?.name || 'User'}</div>
                                                <div className="user-email">{user?.email}</div>
                                            </div>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link
                                            to="/profile"
                                            className="dropdown-item"
                                        >
                                            <span className="item-icon">👤</span>
                                            Profile
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setUserDropdownOpen(false);
                                            }}
                                            className="dropdown-item logout-item"
                                        >
                                            <span className="item-icon">🚪</span>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <Link to="/login" className="btn-login">Login</Link>
                                <Link to="/register" className="btn-signup">Sign Up</Link>
                            </div>
                        )}

                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
