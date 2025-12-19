import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTopicById } from '../services/userService';
import DSATopicNotes from '../components/DSATopicNotes';
import './DSATopicDetail.css';

const DSATopicDetail = () => {
    const { topicId, subtopicId } = useParams();
    const navigate = useNavigate();
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Use subtopicId if available, otherwise use topicId (for backward compatibility)
    const currentId = subtopicId || topicId;

    useEffect(() => {
        fetchTopic();
    }, [currentId]);

    const fetchTopic = async () => {
        try {
            setLoading(true);
            const data = await getTopicById(currentId);
            setTopic(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load topic');
        } finally {
            setLoading(false);
        }
    };

    const goToPracticeQuestions = () => {
        const params = new URLSearchParams();
        params.append('topic', topicId || currentId);
        if (subtopicId) {
            params.append('subtopic', subtopicId);
        }
        params.append('topicName', encodeURIComponent(topic.title));
        navigate(`/questions?${params.toString()}`);
    };

    if (loading) {
        return (
            <div className="topic-detail-page">
                <div className="container">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading topic...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !topic) {
        return (
            <div className="topic-detail-page">
                <div className="container">
                    <div className="error-container">
                        <span className="error-icon">⚠️</span>
                        <h2>Topic Not Found</h2>
                        <p>{error || 'The requested topic could not be found.'}</p>
                        <Link to="/topics" className="btn-primary">
                            ← Back to Topics
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="topic-detail-page">
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
                    <div className="header-main">
                        <span className="topic-icon-large">{topic.icon || '📚'}</span>
                        <div className="header-text">
                            <h1 className="topic-title-large">{topic.title}</h1>
                            <p className="topic-description-large">{topic.description}</p>
                        </div>
                    </div>
                </div>

                {/* Teaching Content - This is the main content */}
                <div className="teaching-content">
                    <DSATopicNotes topic={topic} />
                </div>

                {/* Single Practice Button - Only at bottom after learning */}
                <div className="practice-section">
                    <button
                        className="btn-practice-main"
                        onClick={goToPracticeQuestions}
                    >
                        <span className="btn-icon">💡</span>
                        <span>Practice Questions</span>
                        <span className="btn-count">({topic.questionCount || 0})</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DSATopicDetail;
