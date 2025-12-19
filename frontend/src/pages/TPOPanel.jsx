import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './TPOPanel.css';

const TPOPanel = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('announcements');
    const [announcements, setAnnouncements] = useState([]);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (activeTab === 'announcements') {
            fetchAnnouncements();
        } else {
            fetchExams();
        }
    }, [activeTab]);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/tpo/announcements');
            setAnnouncements(data);
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExams = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/tpo/exams');
            setExams(data);
        } catch (error) {
            console.error('Failed to fetch exams:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnnouncement = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tpo/announcements', formData);
            setShowForm(false);
            setFormData({});
            fetchAnnouncements();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create announcement');
        }
    };

    const handleSubmitExam = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tpo/exams', formData);
            setShowForm(false);
            setFormData({});
            fetchExams();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create exam');
        }
    };

    const handleDelete = async (id, type) => {
        if (!confirm('Are you sure you want to delete this?')) return;

        try {
            await api.delete(`/tpo/${type}/${id}`);

            if (type === 'announcements') {
                fetchAnnouncements();
            } else {
                fetchExams();
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete');
        }
    };

    const isTpo = user?.role === 'tpo' || user?.role === 'admin';

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div className="page-header">
                <h1>TPO Panel</h1>
                <p>Manage placement announcements and company exam patterns</p>
            </div>

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'announcements' ? 'active' : ''}`}
                    onClick={() => setActiveTab('announcements')}
                >
                    📢 Announcements
                </button>
                <button
                    className={`tab ${activeTab === 'exams' ? 'active' : ''}`}
                    onClick={() => setActiveTab('exams')}
                >
                    📝 Company Exams
                </button>
            </div>

            {/* Add Button */}
            {isTpo && (
                <div style={{ marginBottom: '2rem' }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        + Add {activeTab === 'announcements' ? 'Announcement' : 'Exam Pattern'}
                    </button>
                </div>
            )}

            {/* Form */}
            {showForm && isTpo && (
                <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>
                        {activeTab === 'announcements' ? 'New Announcement' : 'New Exam Pattern'}
                    </h2>

                    {activeTab === 'announcements' ? (
                        <form onSubmit={handleSubmitAnnouncement}>
                            <input
                                type="text"
                                className="input"
                                placeholder="Title"
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                style={{ marginBottom: '1rem' }}
                            />
                            <textarea
                                className="input"
                                rows="5"
                                placeholder="Content"
                                value={formData.content || ''}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                                style={{ marginBottom: '1rem' }}
                            />
                            <select
                                className="input"
                                value={formData.type || 'GENERAL'}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                style={{ marginBottom: '1rem' }}
                            >
                                <option value="GENERAL">General</option>
                                <option value="PLACEMENT">Placement</option>
                                <option value="EXAM">Exam</option>
                                <option value="URGENT">Urgent</option>
                            </select>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary">Create</button>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmitExam}>
                            <input
                                type="text"
                                className="input"
                                placeholder="Company Name"
                                value={formData.company || ''}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                required
                                style={{ marginBottom: '1rem' }}
                            />
                            <textarea
                                className="input"
                                rows="5"
                                placeholder="Exam Pattern"
                                value={formData.pattern || ''}
                                onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                                required
                                style={{ marginBottom: '1rem' }}
                            />
                            <input
                                type="date"
                                className="input"
                                placeholder="Exam Date"
                                value={formData.examDate || ''}
                                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                                style={{ marginBottom: '1rem' }}
                            />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary">Create</button>
                                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {/* Content */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div className="spinner"></div>
                </div>
            ) : activeTab === 'announcements' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {announcements.length === 0 ? (
                        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>No announcements yet</p>
                        </div>
                    ) : (
                        announcements.map((announcement) => (
                            <div key={announcement._id} className="glass-card announcement-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <div>
                                        <span className={`type-badge ${announcement.type.toLowerCase()}`}>
                                            {announcement.type}
                                        </span>
                                        {announcement.isPinned && (
                                            <span className="pinned-badge">📌 Pinned</span>
                                        )}
                                    </div>
                                    {isTpo && (
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => handleDelete(announcement._id, 'announcements')}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <h3>{announcement.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                    {announcement.content}
                                </p>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                                    Posted by {announcement.postedBy?.name} • {new Date(announcement.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {exams.length === 0 ? (
                        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>No exam patterns yet</p>
                        </div>
                    ) : (
                        exams.map((exam) => (
                            <div key={exam._id} className="glass-card exam-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <h3>{exam.company}</h3>
                                    {isTpo && (
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => handleDelete(exam._id, 'exams')}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                                {exam.examDate && (
                                    <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                        📅 Exam Date: {new Date(exam.examDate).toLocaleDateString()}
                                    </div>
                                )}
                                <div style={{ marginBottom: '1rem' }}>
                                    <h4>Exam Pattern:</h4>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{exam.pattern}</p>
                                </div>
                                {exam.syllabus && exam.syllabus.length > 0 && (
                                    <div>
                                        <h4>Syllabus:</h4>
                                        <ul>
                                            {exam.syllabus.map((topic, idx) => (
                                                <li key={idx}>{topic}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default TPOPanel;
