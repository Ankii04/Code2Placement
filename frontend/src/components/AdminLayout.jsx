import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
    const { logout, user } = useAuth();

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar glass">
                <div className="admin-sidebar-header">
                    <h2 className="gradient-text">Admin Panel</h2>
                    <p className="admin-user-name">{user?.name}</p>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin" className="admin-nav-link">
                        <span className="nav-icon">📊</span>
                        Dashboard
                    </Link>
                    <Link to="/admin/topics" className="admin-nav-link">
                        <span className="nav-icon">📚</span>
                        Manage Topics
                    </Link>
                    <Link to="/admin/content" className="admin-nav-link">
                        <span className="nav-icon">📖</span>
                        Manage Content
                    </Link>
                    <Link to="/admin/questions" className="admin-nav-link">
                        <span className="nav-icon">❓</span>
                        Manage Questions
                    </Link>
                    <Link to="/admin/users" className="admin-nav-link">
                        <span className="nav-icon">👥</span>
                        Manage Users
                    </Link>
                </nav>

                <div className="admin-sidebar-footer">
                    <button onClick={logout} className="btn btn-secondary" style={{ width: '100%' }}>
                        🚪 Logout
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
