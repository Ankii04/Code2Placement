import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../services/userService';
import './DSATopics.css';

const DSATopicsList = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const data = await getTopics({});
            // Filter only main categories
            const mainCategories = data.filter(topic => topic.isMainCategory);
            setTopics(mainCategories);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load topics');
        } finally {
            setLoading(false);
        }
    };

    const filteredTopics = topics.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDifficultyColor = (difficulty) => {
        const colors = {
            Easy: '#10b981',
            Medium: '#f59e0b',
            Hard: '#ef4444'
        };
        return colors[difficulty] || '#6b7280';
    };

    return (
        <div className="dsa-topics-page">
            <div className="container">
                {/* Header */}
                <div className="topics-header">
                    <div className="header-content">
                        <h1 className="page-title">DSA Topics</h1>
                        <p className="page-subtitle">Master Data Structures & Algorithms with structured learning paths</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <div className="search-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search topics..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading topics...</p>
                    </div>
                ) : filteredTopics.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">📚</span>
                        <h3>No topics found</h3>
                        <p>Try adjusting your search or browse all topics</p>
                    </div>
                ) : (
                    <div className="topics-grid">
                        {filteredTopics.map((topic) => (
                            <Link
                                key={topic._id}
                                to={`/topics/${topic._id}/subtopics`}
                                className="topic-card"
                            >
                                <div className="topic-icon">
                                    {topic.icon || '📚'}
                                </div>
                                <div className="topic-content">
                                    <h3 className="topic-title">{topic.title}</h3>
                                    <p className="topic-description">{topic.description}</p>

                                    <div className="topic-meta">
                                        {topic.subtopics && topic.subtopics.length > 0 && (
                                            <span className="meta-item">
                                                <span className="meta-icon">📖</span>
                                                {topic.subtopics.length} Subtopics
                                            </span>
                                        )}
                                        {topic.questionCount > 0 && (
                                            <span className="meta-item">
                                                <span className="meta-icon">❓</span>
                                                {topic.questionCount} Questions
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="topic-arrow">→</div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Info Banner */}
                <div className="info-banner">
                    <div className="banner-icon">💡</div>
                    <div className="banner-content">
                        <h4>How to use this section</h4>
                        <p>Click on any topic to learn concepts, view examples, and understand algorithms. Use the "Practice Questions" button on each topic page to solve related problems.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DSATopicsList;
