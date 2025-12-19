import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicById } from '../services/userService';
import './SubtopicsList.css';

const SubtopicsList = () => {
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    const [subtopics, setSubtopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTopicAndSubtopics();
    }, [topicId]);

    const fetchTopicAndSubtopics = async () => {
        try {
            setLoading(true);
            const data = await getTopicById(topicId);
            console.log('Topic data received:', data);
            console.log('Subtopics:', data.subtopics);
            setTopic(data);
            setSubtopics(data.subtopics || []);
        } catch (err) {
            console.error('Error fetching topic:', err);
            setError(err.response?.data?.message || 'Failed to load subtopics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="subtopics-page">
                <div className="container">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading subtopics...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !topic) {
        return (
            <div className="subtopics-page">
                <div className="container">
                    <div className="error-container">
                        <span className="error-icon">⚠️</span>
                        <h2>Topic Not Found</h2>
                        <p>{error || 'The requested topic could not be found.'}</p>
                        <Link to="/topics" className="btn-back">
                            ← Back to Topics
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="subtopics-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="separator">→</span>
                    <Link to="/topics">DSA Topics</Link>
                    <span className="separator">→</span>
                    <span className="current">{topic.title}</span>
                </nav>

                {/* Topic Header */}
                <div className="topic-header">
                    <span className="topic-icon">{topic.icon || '📚'}</span>
                    <div className="topic-info">
                        <h1 className="topic-title">{topic.title}</h1>
                        <p className="topic-description">{topic.description}</p>
                        <div className="topic-meta">
                            <span className="meta-badge">
                                <span className="badge-icon">📖</span>
                                {subtopics.length} Subtopics
                            </span>
                        </div>
                    </div>
                </div>

                {/* Subtopics List */}
                <div className="subtopics-section">
                    <h2 className="section-title">Choose a Subtopic to Learn</h2>

                    {subtopics.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📚</span>
                            <h3>No Subtopics Available</h3>
                            <p>This topic doesn't have any subtopics yet.</p>
                        </div>
                    ) : (
                        <div className="subtopics-list">
                            {subtopics.map((subtopic, index) => (
                                <Link
                                    key={subtopic._id}
                                    to={`/topics/${topicId}/subtopics/${subtopic._id}`}
                                    className="subtopic-item"
                                >
                                    <div className="subtopic-number">{index + 1}</div>
                                    <div className="subtopic-content">
                                        <h3 className="subtopic-title">{subtopic.title}</h3>
                                        <p className="subtopic-description">{subtopic.description}</p>
                                    </div>
                                    <div className="subtopic-arrow">→</div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubtopicsList;
