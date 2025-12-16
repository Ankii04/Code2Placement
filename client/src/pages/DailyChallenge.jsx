import { useState, useEffect } from 'react';
import { getDailyChallenge } from '../services/userService';

const DailyChallenge = () => {
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        fetchChallenge();
    }, []);

    const fetchChallenge = async () => {
        try {
            setLoading(true);
            const data = await getDailyChallenge();
            setChallenge(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load daily challenge');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (error || !challenge) {
        return (
            <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
                <div className="page-header">
                    <h1>Daily Challenge 🎯</h1>
                    <p>Solve today's coding challenge and maintain your streak!</p>
                </div>
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {error || 'No challenge available today. Check back tomorrow!'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
            <div className="page-header">
                <h1>Daily Challenge 🎯</h1>
                <p>Solve today's coding challenge and maintain your streak!</p>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <h2 style={{ margin: 0 }}>{challenge.title}</h2>
                        <span
                            className="badge"
                            style={{
                                background: challenge.difficulty === 'EASY' ? '#10b981' :
                                    challenge.difficulty === 'MEDIUM' ? '#f59e0b' : '#ef4444',
                                color: 'white'
                            }}
                        >
                            {challenge.difficulty}
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        📅 {new Date(challenge.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3>Problem Description</h3>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                        {challenge.description}
                    </p>
                </div>

                {challenge.hints && challenge.hints.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h3>Hints</h3>
                        <ol style={{ paddingLeft: '1.5rem' }}>
                            {challenge.hints.map((hint, index) => (
                                <li key={index} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    {hint}
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {challenge.solution && (
                    <div style={{ marginBottom: '2rem' }}>
                        <button
                            onClick={() => setShowSolution(!showSolution)}
                            className="btn btn-primary"
                            style={{ marginBottom: '1rem' }}
                        >
                            {showSolution ? '🔒 Hide Solution' : '🔓 Show Solution'}
                        </button>
                        {showSolution && (
                            <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-primary)' }}>
                                <h4>Solution</h4>
                                <pre style={{
                                    background: 'var(--bg-secondary)',
                                    padding: '1.5rem',
                                    borderRadius: '8px',
                                    overflow: 'auto',
                                    lineHeight: '1.6'
                                }}>
                                    <code>{challenge.solution}</code>
                                </pre>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                    <button className="btn btn-primary">
                        ✅ Mark as Completed
                    </button>
                    <button className="btn btn-secondary">
                        🔄 Get New Challenge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DailyChallenge;
