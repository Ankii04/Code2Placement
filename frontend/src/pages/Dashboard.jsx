import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/users/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dashboard-header">
                    <h1>Welcome back, {user?.name}! 👋</h1>
                    <p>Continue your learning journey</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-cards">
                    <div className="stat-card glass-card">
                        <div className="stat-icon">📚</div>
                        <div className="stat-info">
                            <div className="stat-value">{stats?.topicsCompleted || 0}</div>
                            <div className="stat-label">Topics Completed</div>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">💻</div>
                        <div className="stat-info">
                            <div className="stat-value">{stats?.questionsCompleted || 0}</div>
                            <div className="stat-label">Questions Solved</div>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-info">
                            <div className="stat-value">{stats?.totalScore || 0}</div>
                            <div className="stat-label">Total Score</div>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">🏆</div>
                        <div className="stat-info">
                            <div className="stat-value">{stats?.badges || 0}</div>
                            <div className="stat-label">Badges Earned</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <Link to="/daily-challenge" className="action-card glass-card">
                            <div className="action-icon">🎯</div>
                            <h3>Daily Challenge</h3>
                            <p>Solve today's coding challenge</p>
                        </Link>

                        <Link to="/topics" className="action-card glass-card">
                            <div className="action-icon">📖</div>
                            <h3>Learn DSA</h3>
                            <p>Explore data structures and algorithms</p>
                        </Link>

                        <Link to="/questions" className="action-card glass-card">
                            <div className="action-icon">💡</div>
                            <h3>Practice Problems</h3>
                            <p>Solve coding questions</p>
                        </Link>

                        <Link to="/interview-qa" className="action-card glass-card">
                            <div className="action-icon">💼</div>
                            <h3>Interview Prep</h3>
                            <p>Prepare for technical interviews</p>
                        </Link>

                        <Link to="/forum" className="action-card glass-card">
                            <div className="action-icon">👥</div>
                            <h3>Community</h3>
                            <p>Connect with other learners</p>
                        </Link>

                        <Link to="/profile" className="action-card glass-card">
                            <div className="action-icon">⚙️</div>
                            <h3>Profile</h3>
                            <p>Manage your account</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
