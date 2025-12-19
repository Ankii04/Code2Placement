import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DSATopicQuestions = ({ topicId, topicTitle }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState({ difficulty: '', search: '' });

    useEffect(() => {
        fetchQuestions();
    }, [topicId, filter]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filter.difficulty) params.append('difficulty', filter.difficulty);
            if (filter.search) params.append('search', filter.search);

            const response = await api.get(`/topics/${topicId}/questions?${params.toString()}`);
            setQuestions(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load questions');
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            Easy: '#10b981',
            Medium: '#f59e0b',
            Hard: '#ef4444'
        };
        return colors[difficulty] || '#6b7280';
    };

    const getPlatformIcon = (platform) => {
        const icons = {
            LeetCode: '🔶',
            HackerRank: '💚',
            CodeForces: '🔵',
            GeeksForGeeks: '🟢',
            Other: '🔗'
        };
        return icons[platform] || '🔗';
    };

    return (
        <div>
            {/* Filters */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Search questions..."
                        value={filter.search}
                        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    />
                    <select
                        className="input"
                        value={filter.difficulty}
                        onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
                    >
                        <option value="">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            {error && <div className="alert alert-error" style={{ marginBottom: '2rem' }}>{error}</div>}

            {loading ? (
                <div className="flex items-center justify-center" style={{ minHeight: '40vh' }}>
                    <div className="spinner"></div>
                </div>
            ) : questions.length === 0 ? (
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</p>
                    <h3 style={{ marginBottom: '0.5rem' }}>No Questions Yet</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Questions for this topic will be added soon. Check back later!
                    </p>
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0 }}>
                            {questions.length} Question{questions.length !== 1 ? 's' : ''} Found
                        </h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {questions.map((question, index) => (
                            <div key={question._id} className="glass-card" style={{
                                padding: '1.75rem',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                border: '1px solid var(--border-color)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                {/* Question Header */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                                    <span style={{
                                        background: 'var(--bg-secondary)',
                                        padding: '0.5rem 0.75rem',
                                        borderRadius: '8px',
                                        fontWeight: '700',
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        #{index + 1}
                                    </span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                            <Link
                                                to={`/questions/${question._id}`}
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                <h3 style={{
                                                    margin: 0,
                                                    fontSize: '1.25rem',
                                                    transition: 'color 0.2s ease'
                                                }}
                                                    onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'}
                                                    onMouseLeave={(e) => e.target.style.color = 'inherit'}>
                                                    {question.title}
                                                </h3>
                                            </Link>
                                            <span
                                                style={{
                                                    background: getDifficultyColor(question.difficulty),
                                                    color: 'white',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '12px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                {question.difficulty}
                                            </span>
                                        </div>
                                        <p style={{
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.6',
                                            margin: 0,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {question.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Question Meta */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                    {/* Tags */}
                                    {question.tags && question.tags.length > 0 && (
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {question.tags.slice(0, 3).map((tag, idx) => (
                                                <span key={idx} style={{
                                                    background: 'var(--bg-secondary)',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '0.8125rem',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Companies */}
                                    {question.companies && question.companies.length > 0 && (
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>🏢</span>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                                {question.companies.slice(0, 2).join(', ')}
                                                {question.companies.length > 2 && ` +${question.companies.length - 2}`}
                                            </span>
                                        </div>
                                    )}

                                    {/* External Links */}
                                    {question.externalLinks && question.externalLinks.length > 0 && (
                                        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                                            {question.externalLinks.map((link, idx) => (
                                                <a
                                                    key={idx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        background: 'var(--bg-secondary)',
                                                        borderRadius: '8px',
                                                        textDecoration: 'none',
                                                        fontSize: '0.875rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = 'var(--primary-color)';
                                                        e.currentTarget.style.color = 'white';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'var(--bg-secondary)';
                                                        e.currentTarget.style.color = 'inherit';
                                                    }}
                                                >
                                                    <span>{getPlatformIcon(link.platform)}</span>
                                                    <span>{link.platform}</span>
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {/* Solved Count */}
                                    {question.solvedCount > 0 && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            <span>✅</span>
                                            <span>{question.solvedCount} solved</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default DSATopicQuestions;
