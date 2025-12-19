import { useState, useEffect } from 'react';
import { getInterviewQA } from '../services/userService';
import './InterviewQA.css';

const InterviewQA = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const [expandedId, setExpandedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, [filter]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const data = await getInterviewQA(filter);
            setQuestions(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load interview questions');
        } finally {
            setLoading(false);
        }
    };

    const filteredQuestions = questions.filter(qa =>
        qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qa.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryIcon = (category) => {
        const icons = {
            'Technical': '💻',
            'HR': '👔',
            'Behavioral': '🗣️',
            'OS': '🖥️',
            'DBMS': '🗄️',
            'OOP': '🎯',
            'Networking': '🌐'
        };
        return icons[category] || '📝';
    };

    return (
        <div className="interview-qa-container">
            {/* Hero Section */}
            <div className="interview-hero">
                <div className="container">
                    <h1 className="interview-title">
                        <span className="gradient-text">Interview Q&A</span>
                    </h1>
                    <p className="interview-subtitle">
                        Master technical and HR interviews with comprehensive answers and real-world examples
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 0 4rem' }}>
                {/* Search and Filters */}
                <div className="interview-controls">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search questions or answers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-tabs">
                        <button
                            onClick={() => setFilter('')}
                            className={`filter-tab ${filter === '' ? 'active' : ''}`}
                        >
                            <span>📚</span> All Questions
                        </button>
                        <button
                            onClick={() => setFilter('Technical')}
                            className={`filter-tab ${filter === 'Technical' ? 'active' : ''}`}
                        >
                            <span>💻</span> Technical
                        </button>
                        <button
                            onClick={() => setFilter('HR')}
                            className={`filter-tab ${filter === 'HR' ? 'active' : ''}`}
                        >
                            <span>👔</span> HR
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading interview questions...</p>
                    </div>
                ) : filteredQuestions.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">🔍</span>
                        <h3>No questions found</h3>
                        <p>Try adjusting your search or filter</p>
                    </div>
                ) : (
                    <div className="qa-grid">
                        <div className="qa-stats">
                            <span className="stat-number">{filteredQuestions.length}</span>
                            <span className="stat-label">Questions Available</span>
                        </div>

                        {filteredQuestions.map((qa, index) => (
                            <div key={qa._id} className="qa-card">
                                <div
                                    className="qa-header"
                                    onClick={() => setExpandedId(expandedId === qa._id ? null : qa._id)}
                                >
                                    <div className="qa-number">Q{index + 1}</div>
                                    <div className="qa-question-section">
                                        <h3 className="qa-question">{qa.question}</h3>
                                        <div className="qa-meta">
                                            {qa.category && (
                                                <span className="qa-category">
                                                    {getCategoryIcon(qa.category)} {qa.category}
                                                </span>
                                            )}
                                            <span className={`qa-type ${qa.category === 'Technical' ? 'technical' : 'hr'}`}>
                                                {qa.category || 'General'}
                                            </span>
                                            {qa.difficulty && (
                                                <span className={`qa-difficulty ${qa.difficulty.toLowerCase()}`}>
                                                    {qa.difficulty}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="qa-toggle">
                                        <span className={`toggle-icon ${expandedId === qa._id ? 'expanded' : ''}`}>
                                            ▼
                                        </span>
                                    </div>
                                </div>

                                {expandedId === qa._id && (
                                    <div className="qa-answer-section">
                                        <div className="answer-label">
                                            <span>💡</span> Answer
                                        </div>
                                        <div className="qa-answer">
                                            {qa.answer}
                                        </div>

                                        {qa.example && (
                                            <div className="qa-example">
                                                <div className="example-label">
                                                    <span>📌</span> Example
                                                </div>
                                                <div className="example-content">
                                                    {qa.example}
                                                </div>
                                            </div>
                                        )}

                                        {qa.tags && qa.tags.length > 0 && (
                                            <div className="qa-tags">
                                                {qa.tags.map((tag, idx) => (
                                                    <span key={idx} className="qa-tag">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewQA;
