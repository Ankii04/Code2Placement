import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AptitudeTests.css';

const AptitudeTestResults = () => {
    const { attemptId } = useParams();
    const navigate = useNavigate();
    const [attempt, setAttempt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSolutions, setShowSolutions] = useState(false);
    const [selectedSection, setSelectedSection] = useState(0);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const { data } = await api.get(`/aptitude/tests/${attemptId}`);
            setAttempt(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch results:', error);
            alert('Failed to load results');
            navigate('/aptitude');
        }
    };

    const getScoreColor = (percentage) => {
        if (percentage >= 70) return '#10b981';
        if (percentage >= 50) return '#f59e0b';
        return '#ef4444';
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="spinner" style={{ margin: '0 auto' }}></div>
                <p style={{ marginTop: '1rem' }}>Loading results...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            {/* Header */}
            <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '1rem' }}>🎉 Test Completed!</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                    {attempt.testPattern.name}
                </p>
            </div>

            {/* Overall Score */}
            <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Overall Performance</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', fontWeight: '800', color: getScoreColor(attempt.percentage) }}>
                            {attempt.totalScore}
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                            out of {attempt.testPattern.totalQuestions}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            Questions Correct
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', fontWeight: '800', color: getScoreColor(attempt.percentage) }}>
                            {attempt.percentage.toFixed(1)}%
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                            Score
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', fontWeight: '800', color: '#6366f1' }}>
                            {attempt.percentile}th
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                            Percentile
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', fontWeight: '800', color: '#10b981' }}>
                            #{attempt.rank}
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                            Rank
                        </div>
                    </div>
                </div>

                {/* Pass/Fail Status */}
                <div style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                    background: attempt.percentage >= attempt.testPattern.cutoff
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                    border: `2px solid ${attempt.percentage >= attempt.testPattern.cutoff ? '#10b981' : '#ef4444'}`
                }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: attempt.percentage >= attempt.testPattern.cutoff ? '#10b981' : '#ef4444' }}>
                        {attempt.percentage >= attempt.testPattern.cutoff ? '✅ PASSED' : '❌ NOT QUALIFIED'}
                    </div>
                    <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                        Cutoff: {attempt.testPattern.cutoff}%
                    </div>
                </div>
            </div>

            {/* Section-wise Performance */}
            <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '2rem' }}>Section-wise Performance</h2>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {attempt.sections.map((section, idx) => (
                        <div key={idx} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0 }}>{section.name}</h3>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: getScoreColor(section.accuracy) }}>
                                    {section.score}/{section.questions.length}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div style={{ height: '12px', background: 'var(--bg-primary)', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${section.accuracy}%`,
                                    background: getScoreColor(section.accuracy),
                                    transition: 'width 0.5s ease'
                                }}></div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Accuracy</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{section.accuracy.toFixed(1)}%</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Time Spent</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                        {Math.floor(section.timeSpent / 60)}:{(section.timeSpent % 60).toString().padStart(2, '0')}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Avg Time/Q</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                        {Math.floor(section.timeSpent / section.questions.length)}s
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                {attempt.strengths.length > 0 && (
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>✅ Strengths</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {attempt.strengths.map((strength, idx) => (
                                <li key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                    {strength}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {attempt.weaknesses.length > 0 && (
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>⚠️ Areas to Improve</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {attempt.weaknesses.map((weakness, idx) => (
                                <li key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                    {weakness}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Question-wise Review */}
            <div className="glass-card" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0 }}>Question-wise Review</h2>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowSolutions(!showSolutions)}
                    >
                        {showSolutions ? 'Hide Solutions' : 'Show Solutions'}
                    </button>
                </div>

                {/* Section Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {attempt.sections.map((section, idx) => (
                        <button
                            key={idx}
                            className={`btn ${selectedSection === idx ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setSelectedSection(idx)}
                        >
                            {section.name}
                        </button>
                    ))}
                </div>

                {/* Questions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {attempt.sections[selectedSection].questions.map((q, idx) => {
                        const questionData = q.question;
                        return (
                            <div key={idx} style={{
                                padding: '1.5rem',
                                background: 'var(--bg-secondary)',
                                borderRadius: '12px',
                                border: `2px solid ${q.isCorrect ? '#10b981' : '#ef4444'}`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                                            Question {idx + 1}
                                        </div>
                                        <div style={{ fontSize: '1.0625rem', lineHeight: '1.6' }}>
                                            {questionData.question}
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        background: q.isCorrect ? '#10b98120' : '#ef444420',
                                        color: q.isCorrect ? '#10b981' : '#ef4444',
                                        fontWeight: '600',
                                        minWidth: '80px',
                                        textAlign: 'center'
                                    }}>
                                        {q.isCorrect ? '✓ Correct' : '✗ Wrong'}
                                    </div>
                                </div>

                                {/* Options */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                                    {questionData.options.map((option) => {
                                        const isCorrect = option.label === questionData.correctAnswer;
                                        const isSelected = option.label === q.selectedAnswer;

                                        return (
                                            <div
                                                key={option.label}
                                                style={{
                                                    padding: '1rem',
                                                    borderRadius: '8px',
                                                    background: isCorrect ? '#10b98110' : isSelected ? '#ef444410' : 'var(--bg-primary)',
                                                    border: `2px solid ${isCorrect ? '#10b981' : isSelected ? '#ef4444' : 'var(--border-color)'}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem'
                                                }}
                                            >
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    background: isCorrect ? '#10b981' : isSelected ? '#ef4444' : 'var(--bg-secondary)',
                                                    color: (isCorrect || isSelected) ? 'white' : 'var(--text-primary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: '600'
                                                }}>
                                                    {option.label}
                                                </div>
                                                <div style={{ flex: 1 }}>{option.text}</div>
                                                {isCorrect && <span>✓</span>}
                                                {isSelected && !isCorrect && <span>✗</span>}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Solution */}
                                {showSolutions && questionData.explanation && (
                                    <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>
                                            💡 Explanation:
                                        </div>
                                        <div style={{ lineHeight: '1.6' }}>{questionData.explanation}</div>
                                        {questionData.quickTip && (
                                            <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                                                <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                                    ⚡ Quick Tip:
                                                </div>
                                                <div style={{ fontSize: '0.875rem' }}>{questionData.quickTip}</div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Time Taken */}
                                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    Time taken: {q.timeTaken}s
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/aptitude')}
                    style={{ flex: 1 }}
                >
                    Back to Tests
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/dashboard')}
                    style={{ flex: 1 }}
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default AptitudeTestResults;
