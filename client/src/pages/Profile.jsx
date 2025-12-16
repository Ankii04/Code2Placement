import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [githubUsername, setGithubUsername] = useState('');
    const [showGithubModal, setShowGithubModal] = useState(false);

    useEffect(() => {
        fetchProfile();
        fetchStats();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/users/profile');
            setProfile(response.data);
            setEditedName(response.data.name);
            setGithubUsername(response.data.githubUsername || '');
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

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

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put('/users/profile', { name: editedName });
            setProfile(response.data);
            updateUser(response.data);
            setEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const handleConnectGithub = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/github-connect', { githubUsername });
            setShowGithubModal(false);
            fetchProfile();
        } catch (error) {
            console.error('Failed to connect GitHub:', error);
            alert('Failed to connect GitHub. Please try again.');
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-header">
                    <h1>Your Profile 👤</h1>
                    <p>Manage your account and track your progress</p>
                </div>

                <div className="profile-grid">
                    {/* Profile Info Card */}
                    <div className="profile-card glass-card">
                        <div className="profile-avatar">
                            <div className="avatar-circle">
                                {profile?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>

                        {editing ? (
                            <form onSubmit={handleUpdateProfile} className="edit-form">
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="edit-input"
                                    required
                                />
                                <div className="edit-actions">
                                    <button type="submit" className="btn btn-primary btn-sm">Save</button>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <h2>{profile?.name}</h2>
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
                                    ✏️ Edit Name
                                </button>
                            </>
                        )}

                        <div className="profile-info">
                            <div className="info-item">
                                <span className="info-label">📧 Email</span>
                                <span className="info-value">{profile?.email}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">👑 Role</span>
                                <span className="info-value">{profile?.role}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">📅 Joined</span>
                                <span className="info-value">{formatDate(profile?.createdAt)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">🔗 GitHub</span>
                                {profile?.githubConnected ? (
                                    <span className="info-value github-connected">
                                        ✓ {profile?.githubUsername}
                                    </span>
                                ) : (
                                    <button className="btn btn-primary btn-sm" onClick={() => setShowGithubModal(true)}>
                                        Connect GitHub
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="stats-card glass-card">
                        <h3>📊 Your Statistics</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-icon">📚</div>
                                <div className="stat-details">
                                    <div className="stat-value">{stats?.topicsCompleted || 0}</div>
                                    <div className="stat-label">Topics Completed</div>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">💻</div>
                                <div className="stat-details">
                                    <div className="stat-value">{stats?.questionsCompleted || 0}</div>
                                    <div className="stat-label">Questions Solved</div>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">⭐</div>
                                <div className="stat-details">
                                    <div className="stat-value">{stats?.totalScore || 0}</div>
                                    <div className="stat-label">Total Score</div>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">🏆</div>
                                <div className="stat-details">
                                    <div className="stat-value">{stats?.badges || 0}</div>
                                    <div className="stat-label">Badges Earned</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Badges Card */}
                    <div className="badges-card glass-card">
                        <h3>🏆 Achievements</h3>
                        {profile?.badges?.length > 0 ? (
                            <div className="badges-grid">
                                {profile.badges.map((badge, idx) => (
                                    <div key={idx} className="badge-item">
                                        <div className="badge-icon">🏅</div>
                                        <div className="badge-name">{badge.name || 'Badge'}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>No badges earned yet. Keep learning to unlock achievements!</p>
                            </div>
                        )}
                    </div>

                    {/* Progress Card */}
                    <div className="progress-card glass-card">
                        <h3>📈 Learning Progress</h3>
                        <div className="progress-items">
                            <div className="progress-item">
                                <div className="progress-header">
                                    <span>Topics Mastery</span>
                                    <span>{stats?.topicsCompleted || 0} completed</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${Math.min((stats?.topicsCompleted || 0) * 10, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="progress-item">
                                <div className="progress-header">
                                    <span>Problem Solving</span>
                                    <span>{stats?.questionsCompleted || 0} solved</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${Math.min((stats?.questionsCompleted || 0) * 5, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* GitHub Connect Modal */}
            {showGithubModal && (
                <div className="modal-overlay" onClick={() => setShowGithubModal(false)}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <h2>Connect GitHub Account</h2>
                        <form onSubmit={handleConnectGithub}>
                            <div className="form-group">
                                <label>GitHub Username</label>
                                <input
                                    type="text"
                                    value={githubUsername}
                                    onChange={(e) => setGithubUsername(e.target.value)}
                                    placeholder="Enter your GitHub username"
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowGithubModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Connect
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
