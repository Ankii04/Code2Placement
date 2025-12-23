import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AptitudeTests.css';

const AptitudeTests = () => {
    const navigate = useNavigate();
    const [testPatterns, setTestPatterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myAttempts, setMyAttempts] = useState([]);

    useEffect(() => {
        fetchTestPatterns();
        fetchMyAttempts();
    }, []);

    const fetchTestPatterns = async () => {
        try {
            const { data } = await api.get('/aptitude/test-patterns');
            setTestPatterns(data);
        } catch (error) {
            console.error('Failed to fetch test patterns:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyAttempts = async () => {
        try {
            const { data } = await api.get('/aptitude/tests/my-attempts');
            setMyAttempts(data);
        } catch (error) {
            console.error('Failed to fetch attempts:', error);
        }
    };

    const startTest = async (patternId) => {
        try {
            const { data } = await api.post('/aptitude/tests/start', {
                testPatternId: patternId
            });
            navigate(`/aptitude/test/${data._id}`);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to start test');
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return '#10b981';
            case 'Medium': return '#f59e0b';
            case 'Hard': return '#ef4444';
            default: return '#6366f1';
        }
    };

    const getCompanyLogo = (company) => {
        const logos = {
            'AMCAT': '🎯',
            'CoCubes': '🧊',
            'TCS': '💼',
            'Infosys': '🏢',
            'Wipro': '⚡'
        };
        return logos[company] || '📝';
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="spinner" style={{ margin: '0 auto' }}></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading tests...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div className="page-header">
                <h1>Aptitude Tests</h1>
                <p>Practice with company-specific test patterns</p>
            </div>

            {/* Test Patterns Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                {testPatterns.length > 0 ? (
                    testPatterns.map((pattern) => (
                        <div key={pattern._id} className="glass-card test-pattern-card">
                            <div style={{ padding: '2rem' }}>
                                {/* Company Logo */}
                                <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                                    {getCompanyLogo(pattern.company)}
                                </div>

                                {/* Test Name */}
                                <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                                    {pattern.name}
                                </h3>
                                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                    {pattern.company}
                                </p>

                                {/* Test Stats */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                                            {pattern.totalQuestions}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Questions</div>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                                            {pattern.totalTime}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Minutes</div>
                                    </div>
                                </div>

                                {/* Sections */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Sections:</div>
                                    {pattern.sections.map((section, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '0.5rem 0',
                                            borderBottom: idx < pattern.sections.length - 1 ? '1px solid var(--border-color)' : 'none',
                                            fontSize: '0.875rem'
                                        }}>
                                            <span>{section.name}</span>
                                            <span style={{ color: 'var(--text-secondary)' }}>
                                                {section.questionCount}Q • {section.timeLimit}min
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Difficulty & Cutoff */}
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        background: `${getDifficultyColor(pattern.difficulty)}20`,
                                        color: getDifficultyColor(pattern.difficulty)
                                    }}>
                                        {pattern.difficulty}
                                    </span>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        Cutoff: {pattern.cutoff}%
                                    </span>
                                </div>

                                {/* Start Button */}
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => startTest(pattern._id)}
                                    style={{ width: '100%' }}
                                >
                                    Start Test
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="glass-card" style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📋</div>
                        <h3>No test patterns available</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Please run the database seed script to populate aptitude tests.
                        </p>
                    </div>
                )}
            </div>

            {/* Test History */}
            {myAttempts.length > 0 && (
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Your Recent Attempts</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {myAttempts.map((attempt) => (
                            <div
                                key={attempt._id}
                                className="history-item"
                                onClick={() => navigate(`/aptitude/results/${attempt._id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                                        {attempt.testPattern.name}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {new Date(attempt.completedAt).toLocaleDateString()} •
                                        {new Date(attempt.completedAt).toLocaleTimeString()}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                                            {attempt.percentage.toFixed(1)}%
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Score</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                                            {attempt.percentile}th
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Percentile</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AptitudeTests;
