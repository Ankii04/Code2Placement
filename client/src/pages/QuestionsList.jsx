import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { getQuestions, getTopics } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Questions.css';

const QuestionsList = () => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [questions, setQuestions] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState({ difficulty: '', topic: '', subtopic: '', search: '' });
    const [completedQuestions, setCompletedQuestions] = useState(new Set());
    const [expandedTopics, setExpandedTopics] = useState({});
    const [showFilters, setShowFilters] = useState(false);
    const [activeTopicName, setActiveTopicName] = useState('');
    const [activeSubtopicName, setActiveSubtopicName] = useState('');

    useEffect(() => {
        // Read URL parameters
        const topicParam = searchParams.get('topic');
        const subtopicParam = searchParams.get('subtopic');
        const topicNameParam = searchParams.get('topicName');

        if (topicParam) {
            setFilter(prev => ({ ...prev, topic: topicParam, subtopic: subtopicParam || '' }));
            setActiveTopicName(topicNameParam || '');
            setExpandedTopics({ [topicParam]: true });
        }

        fetchData();
        loadProgress();
    }, []);

    useEffect(() => {
        fetchQuestions();
    }, [filter]);

    const fetchData = async () => {
        try {
            const topicsData = await getTopics({});
            const mainTopics = topicsData.filter(t => t.isMainCategory);
            setTopics(mainTopics);

            // Expand first topic by default
            if (mainTopics.length > 0 && !filter.topic) {
                setExpandedTopics({ [mainTopics[0]._id]: true });
            }
        } catch (err) {
            console.error('Failed to load topics:', err);
        }
    };

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const data = await getQuestions(filter);
            setQuestions(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load questions');
        } finally {
            setLoading(false);
        }
    };

    const loadProgress = async () => {
        if (isAuthenticated) {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/progress`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setCompletedQuestions(new Set(data.completedQuestions || []));
            } catch (err) {
                console.error('Failed to load progress:', err);
            }
        }
    };

    const toggleTopic = (topicId) => {
        setExpandedTopics(prev => ({
            ...prev,
            [topicId]: !prev[topicId]
        }));
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            Easy: '#10b981',
            Medium: '#f59e0b',
            Hard: '#ef4444'
        };
        return colors[difficulty] || '#6b7280';
    };

    const groupQuestionsByTopic = () => {
        const grouped = {};

        questions.forEach(question => {
            const topicId = question.topic?._id || 'other';
            if (!grouped[topicId]) {
                grouped[topicId] = {
                    topic: question.topic || { title: 'Other', _id: 'other' },
                    questions: []
                };
            }
            grouped[topicId].questions.push(question);
        });

        return grouped;
    };

    const calculateProgress = () => {
        const total = questions.length;
        const solved = questions.filter(q => completedQuestions.has(q._id)).length;
        const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
        return { total, solved, percentage };
    };

    const groupedQuestions = groupQuestionsByTopic();
    const progress = calculateProgress();

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
            {/* Header */}
            <div className="questions-header">
                <div>
                    <h1>Practice Questions</h1>
                    <p>Solve problems to master DSA concepts</p>
                </div>
                <button
                    className="filter-toggle-btn"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    {showFilters ? '✕ Hide Filters' : '⚙️ Filters'}
                </button>
            </div>

            {/* Active Filter Banner */}
            {(activeTopicName || activeSubtopicName) && (
                <div className="glass-card" style={{
                    padding: '1rem 1.5rem',
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                    borderLeft: '4px solid var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Filtering by:</span>
                        <h3 style={{ margin: '0.25rem 0 0 0', color: 'var(--primary-color)' }}>
                            📚 {activeTopicName}
                            {activeSubtopicName && ` → ${activeSubtopicName}`}
                        </h3>
                    </div>
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            setFilter({ ...filter, topic: '', subtopic: '' });
                            setActiveTopicName('');
                            setActiveSubtopicName('');
                            setSearchParams({});
                        }}
                    >
                        ✕ Clear Filter
                    </button>
                </div>
            )}

            {/* Progress Bar */}
            <div className="progress-card glass-card">
                <div className="progress-header">
                    <h3>Your Progress</h3>
                    <span className="progress-stats">
                        {progress.solved} / {progress.total} Solved
                    </span>
                </div>
                <div className="progress-bar-container">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${progress.percentage}%` }}
                    >
                        <span className="progress-percentage">{progress.percentage}%</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            {showFilters && (
                <div className="filters-card glass-card">
                    <div className="filters-grid">
                        <input
                            type="text"
                            className="input"
                            placeholder="🔍 Search questions..."
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
                        <select
                            className="input"
                            value={filter.topic}
                            onChange={(e) => setFilter({ ...filter, topic: e.target.value })}
                        >
                            <option value="">All Topics</option>
                            {topics.map((topic) => (
                                <option key={topic._id} value={topic._id}>{topic.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <div className="flex items-center justify-center" style={{ minHeight: '40vh' }}>
                    <div className="spinner"></div>
                </div>
            ) : questions.length === 0 ? (
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No questions found. Try adjusting your filters.</p>
                </div>
            ) : (
                <div className="questions-table-container">
                    {Object.entries(groupedQuestions).map(([topicId, data], index) => (
                        <div key={topicId} className="topic-section glass-card">
                            {/* Topic Header */}
                            <div
                                className="topic-section-header"
                                onClick={() => toggleTopic(topicId)}
                            >
                                <div className="topic-info">
                                    <span className="topic-number">{index + 1}.</span>
                                    <h2>{data.topic.title}</h2>
                                    <span className="question-count-badge">
                                        {data.questions.length} questions
                                    </span>
                                </div>
                                <span className={`expand-icon ${expandedTopics[topicId] ? 'expanded' : ''}`}>
                                    ▼
                                </span>
                            </div>

                            {/* Questions Table */}
                            {expandedTopics[topicId] && (
                                <div className="questions-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="number-col">#</th>
                                                <th className="title-col">Problem</th>
                                                <th className="difficulty-col">Difficulty</th>
                                                <th className="action-col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.questions.map((question, qIndex) => (
                                                <tr
                                                    key={question._id}
                                                    className={completedQuestions.has(question._id) ? 'completed' : ''}
                                                >
                                                    <td className="number-col">{qIndex + 1}</td>
                                                    <td className="title-col">
                                                        <div className="question-title-cell">
                                                            {completedQuestions.has(question._id) && (
                                                                <span className="completed-badge">✓</span>
                                                            )}
                                                            <span>{question.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="difficulty-col">
                                                        <span
                                                            className="difficulty-badge"
                                                            style={{ background: getDifficultyColor(question.difficulty) }}
                                                        >
                                                            {question.difficulty}
                                                        </span>
                                                    </td>
                                                    <td className="action-col">
                                                        <Link
                                                            to={`/problems/${question._id}`}
                                                            className="btn-solve"
                                                        >
                                                            Solve
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuestionsList;
