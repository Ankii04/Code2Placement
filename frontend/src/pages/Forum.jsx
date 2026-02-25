import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Forum.css';

const Forum = () => {
    const { user } = useAuth();
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newThread, setNewThread] = useState({
        title: '',
        content: '',
        category: 'General',
        tags: ''
    });

    const categories = ['All', 'DSA', 'Interview', 'Career', 'Technical', 'General', 'Other'];

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchThreads();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [selectedCategory, searchQuery]);

    const fetchThreads = async () => {
        try {
            setLoading(true);
            const params = {};
            if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
            if (searchQuery) params.search = searchQuery;

            const response = await api.get('/forum/threads', { params });
            setThreads(response.data);
        } catch (error) {
            console.error('Failed to fetch threads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateThread = async (e) => {
        e.preventDefault();
        try {
            const threadData = {
                ...newThread,
                tags: newThread.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            };
            await api.post('/forum/threads', threadData);
            setShowCreateModal(false);
            setNewThread({ title: '', content: '', category: 'General', tags: '' });
            fetchThreads();
        } catch (error) {
            console.error('Failed to create thread:', error);
            alert('Failed to create thread. Please try again.');
        }
    };

    const handleLikeThread = async (threadId) => {
        try {
            await api.put(`/forum/threads/${threadId}/like`);
            fetchThreads();
        } catch (error) {
            console.error('Failed to like thread:', error);
        }
    };

    const formatDate = (date) => {
        const now = new Date();
        const threadDate = new Date(date);
        const diffMs = now - threadDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return threadDate.toLocaleDateString();
    };

    return (
        <div className="forum-page">
            <div className="container">
                <div className="forum-header">
                    <div>
                        <h1>Community Forum 💬</h1>
                        <p>Connect with other learners and share knowledge</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowCreateModal(!showCreateModal)}>
                        {showCreateModal ? '✕ Close Form' : '➕ New Thread'}
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="forum-controls glass-card">
                    <input
                        type="text"
                        placeholder="🔍 Search threads..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <div className="category-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`category-btn ${selectedCategory === cat || (cat === 'All' && !selectedCategory) ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Thread Creation Form (In-page) */}
                {showCreateModal && (
                    <div className="create-thread-section glass-card animate-fade-in">
                        <div className="section-header">
                            <h2>Create New Thread</h2>
                            <button className="btn-close" onClick={() => setShowCreateModal(false)}>✕</button>
                        </div>
                        <form onSubmit={handleCreateThread}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={newThread.title}
                                        onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                                        required
                                        maxLength={200}
                                        placeholder="What's on your mind?"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={newThread.category}
                                        onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
                                    >
                                        {categories.filter(c => c !== 'All').map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <textarea
                                    value={newThread.content}
                                    onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                                    required
                                    rows={5}
                                    placeholder="Describe your discussion in detail..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={newThread.tags}
                                    onChange={(e) => setNewThread({ ...newThread, tags: e.target.value })}
                                    placeholder="e.g., dsa, interview, amazon"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Publish Thread
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Threads List */}
                <div className="threads-list">
                    {loading ? (
                        <div className="flex items-center justify-center" style={{ minHeight: '20vh' }}>
                            <div className="spinner"></div>
                        </div>
                    ) : threads.length === 0 ? (
                        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>No threads found. Be the first to start a discussion!</p>
                        </div>
                    ) : (
                        threads.map(thread => (
                            <div key={thread._id} className="thread-card glass-card">
                                <div className="thread-main">
                                    <div className="thread-info">
                                        {thread.isPinned && <span className="pinned-badge">📌 Pinned</span>}
                                        <Link to={`/forum/${thread._id}`} className="thread-title">
                                            {thread.title}
                                        </Link>
                                        <p className="thread-preview">{thread.content.substring(0, 150)}...</p>
                                        <div className="thread-meta">
                                            <span className="category-badge">{thread.category}</span>
                                            {thread.tags?.map((tag, idx) => (
                                                <span key={idx} className="tag-badge">{tag}</span>
                                            ))}
                                            <span className="author">by {thread.userId?.name || 'Anonymous'}</span>
                                            <span className="time">{formatDate(thread.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="thread-stats">
                                        <div className="stat">
                                            <span className="stat-value">{thread.views || 0}</span>
                                            <span className="stat-label">👁️ Views</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-value">{thread.replyCount || 0}</span>
                                            <span className="stat-label">💬 Replies</span>
                                        </div>
                                        <button
                                            className={`like-btn ${thread.likes?.includes(user?._id) ? 'liked' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLikeThread(thread._id);
                                            }}
                                        >
                                            ❤️ {thread.likes?.length || 0}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Forum;
