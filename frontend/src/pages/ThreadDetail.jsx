import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './ThreadDetail.css';

const ThreadDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [thread, setThread] = useState(null);
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyContent, setReplyContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null); // ID of reply being replied to

    useEffect(() => {
        fetchThreadDetail();
    }, [id]);

    const fetchThreadDetail = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/forum/threads/${id}`);
            setThread(response.data.thread);
            setReplies(response.data.replies);
        } catch (error) {
            console.error('Failed to fetch thread detail:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmittingReply = async (e, parentId = null) => {
        if (e) e.preventDefault();
        const content = parentId ? nestedReplyContent[parentId] : replyContent;
        if (!content?.trim()) return;

        try {
            setSubmitting(true);
            await api.post(`/forum/threads/${id}/reply`, {
                content,
                parentReplyId: parentId
            });

            if (parentId) {
                setNestedReplyContent({ ...nestedReplyContent, [parentId]: '' });
                setReplyingTo(null);
            } else {
                setReplyContent('');
            }

            // Refresh thread and replies
            const response = await api.get(`/forum/threads/${id}`);
            setThread(response.data.thread);
            setReplies(response.data.replies);
        } catch (error) {
            console.error('Failed to submit reply:', error);
            alert('Failed to submit reply. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const [nestedReplyContent, setNestedReplyContent] = useState({});

    const handleNestedReplyChange = (replyId, value) => {
        setNestedReplyContent({
            ...nestedReplyContent,
            [replyId]: value
        });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    if (loading) {
        return <div className="flex items-center justify-center p-20"><div className="spinner"></div></div>;
    }

    if (!thread) {
        return (
            <div className="container p-20 text-center">
                <h2>Thread not found</h2>
                <Link to="/forum" className="btn btn-primary mt-4">Back to Forum</Link>
            </div>
        );
    }

    // Organize replies into a tree structure or just group them
    const rootReplies = replies.filter(r => !r.parentReplyId);
    const getNestedReplies = (parentId) => replies.filter(r => r.parentReplyId === parentId);

    return (
        <div className="thread-detail-page">
            <div className="container">
                <Link to="/forum" className="back-link">
                    ← Back to Forum
                </Link>

                <div className="thread-header">
                    <h1>{thread.title}</h1>
                    <div className="thread-meta">
                        <span className="category-badge">{thread.category}</span>
                        <span className="author">by {thread.userId?.name}</span>
                        <span className="time">{formatDate(thread.createdAt)}</span>
                        <span className="views">👁️ {thread.views} views</span>
                    </div>
                </div>

                <div className="thread-main-content glass-card">
                    <div className="thread-body">
                        {thread.content}
                    </div>
                    <div className="thread-tags">
                        {thread.tags?.map((tag, idx) => (
                            <span key={idx} className="tag-badge">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="replies-section">
                    <div className="replies-header">
                        <h3>{thread.replyCount} Replies</h3>
                    </div>

                    <div className="replies-list">
                        {rootReplies.map(reply => (
                            <div key={reply._id} className="reply-group">
                                <div className="reply-item">
                                    <div className="reply-header">
                                        <span className="reply-user">{reply.userId?.name}</span>
                                        <span className="reply-time">{formatDate(reply.createdAt)}</span>
                                    </div>
                                    <div className="reply-content">{reply.content}</div>
                                    <div className="reply-actions">
                                        <button className="reply-btn" onClick={() => setReplyingTo(replyingTo === reply._id ? null : reply._id)}>
                                            💬 Reply
                                        </button>
                                    </div>

                                    {replyingTo === reply._id && (
                                        <div className="reply-form nested">
                                            <textarea
                                                className="reply-textarea"
                                                placeholder="Write your reply..."
                                                value={nestedReplyContent[reply._id] || ''}
                                                onChange={(e) => handleNestedReplyChange(reply._id, e.target.value)}
                                            ></textarea>
                                            <div className="reply-form-actions">
                                                <button className="btn btn-secondary btn-sm" onClick={() => setReplyingTo(null)}>Cancel</button>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    disabled={submitting}
                                                    onClick={() => handleSubmittingReply(null, reply._id)}
                                                >
                                                    {submitting ? 'Sending...' : 'Post Reply'}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Nested Replies */}
                                {getNestedReplies(reply._id).map(nested => (
                                    <div key={nested._id} className="reply-item nested">
                                        <div className="reply-header">
                                            <span className="reply-user">{nested.userId?.name}</span>
                                            <span className="reply-time">{formatDate(nested.createdAt)}</span>
                                        </div>
                                        <div className="reply-content">{nested.content}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="add-reply-box glass-card">
                        <h3>Post a Reply</h3>
                        <form onSubmit={handleSubmittingReply}>
                            <textarea
                                className="reply-textarea"
                                placeholder="Share your thoughts..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                required
                            ></textarea>
                            <div className="reply-form-actions">
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? 'Submitting...' : 'Post Reply'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThreadDetail;
