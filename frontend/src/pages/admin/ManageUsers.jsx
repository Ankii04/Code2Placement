import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAllUsers, updateUserRole } from '../../services/adminService';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

        try {
            await updateUserRole(userId, newRole);
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update user role');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1>Manage Users</h1>
                <p>View and manage user accounts</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <div className="flex items-center justify-center" style={{ minHeight: '40vh' }}>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role === 'ADMIN' ? 'badge-primary' : 'badge-secondary'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{formatDate(user.createdAt)}</td>
                                    <td>{user.progress?.totalScore || 0}</td>
                                    <td>
                                        <select
                                            className="input"
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            style={{ padding: '0.5rem', fontSize: '0.875rem' }}
                                        >
                                            <option value="USER">User</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="glass-card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>User Statistics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Users</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{users.length}</p>
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Admins</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {users.filter(u => u.role === 'ADMIN').length}
                        </p>
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Regular Users</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {users.filter(u => u.role === 'USER').length}
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageUsers;
