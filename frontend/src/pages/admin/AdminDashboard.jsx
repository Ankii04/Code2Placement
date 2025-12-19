import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminStats } from '../../services/adminService';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const data = await getAdminStats();
            setStats(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load statistics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
                    <div className="spinner"></div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="alert alert-error">{error}</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1>Dashboard</h1>
                <p>Platform statistics and overview</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card glass-card">
                    <h3>Total Users</h3>
                    <div className="stat-value">{stats?.totalUsers || 0}</div>
                </div>
                <div className="stat-card glass-card">
                    <h3>Total Topics</h3>
                    <div className="stat-value">{stats?.totalTopics || 0}</div>
                </div>
                <div className="stat-card glass-card">
                    <h3>Total Questions</h3>
                    <div className="stat-value">{stats?.totalQuestions || 0}</div>
                </div>
                <div className="stat-card glass-card">
                    <h3>Active Users (7d)</h3>
                    <div className="stat-value">{stats?.activeUsers || 0}</div>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Quick Actions</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <a href="/admin/topics" className="btn btn-primary">
                        📚 Manage Topics
                    </a>
                    <a href="/admin/questions" className="btn btn-primary">
                        ❓ Manage Questions
                    </a>
                    <a href="/admin/users" className="btn btn-primary">
                        👥 Manage Users
                    </a>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
