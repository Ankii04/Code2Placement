import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import api from '../services/api';
import './SkillDashboard.css';

const SkillDashboard = () => {
    const [dsaScore, setDsaScore] = useState(null);
    const [readiness, setReadiness] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [dsaRes, readinessRes] = await Promise.all([
                api.get('/analytics/dsa/score'),
                api.get('/analytics/readiness')
            ]);

            setDsaScore(dsaRes.data);
            setReadiness(readinessRes.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <div className="alert alert-error">{error}</div>
            </div>
        );
    }

    // Prepare radar chart data
    const radarData = dsaScore ? Object.entries(dsaScore.topicScores).map(([topic, score]) => ({
        topic: topic.charAt(0).toUpperCase() + topic.slice(1).replace(/([A-Z])/g, ' $1'),
        score
    })) : [];

    // Prepare company readiness bar chart data
    const barData = readiness.map(company => ({
        name: company.name,
        score: company.readinessScore
    }));

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div className="page-header">
                <h1>Skill Analysis Dashboard</h1>
                <p>Track your progress and readiness for placements</p>
            </div>

            {/* Overall DSA Score */}
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <div className="score-header">
                    <div className="score-card main">
                        <h2>Overall DSA Proficiency</h2>
                        <div className="score-main-value" style={{ color: getScoreColor(dsaScore?.overall || 0) }}>
                            {dsaScore?.overall || 0}
                            <span className="score-total">/100</span>
                        </div>
                        <p>Based on {dsaScore?.problemsSolved || 0} problems solved</p>
                    </div>

                    <div className="score-card points">
                        <h2>DSA Points</h2>
                        <div className="score-main-value">
                            <span className="points-icon">🏆</span>
                            {(dsaScore?.problemsSolved || 0) * 10}
                        </div>
                        <p>Total experience earned</p>
                    </div>
                </div>

                {/* Strengths and Weaknesses */}
                <div className="strengths-weaknesses-grid">
                    <div>
                        <h3 style={{ color: 'var(--success)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.2em' }}>💪</span> Strengths
                        </h3>
                        {dsaScore?.strengths?.length > 0 ? (
                            <ul className="sw-list">
                                {dsaScore.strengths.map((topic, idx) => (
                                    <li key={idx} className="sw-item">
                                        <span className="sw-icon success">✓</span>
                                        {topic.charAt(0).toUpperCase() + topic.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="sw-list" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                Solve more problems to identify strengths
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--error)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.2em' }}>⚠️</span> Weaknesses
                        </h3>
                        {dsaScore?.weaknesses?.length > 0 ? (
                            <ul className="sw-list">
                                {dsaScore.weaknesses.map((topic, idx) => (
                                    <li key={idx} className="sw-item">
                                        <span className="sw-icon error">✗</span>
                                        {topic.charAt(0).toUpperCase() + topic.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="sw-list" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                Great! No weak areas identified
                            </div>
                        )}
                    </div>
                </div>

                {/* Radar Chart */}
                <div className="radar-container">
                    <h3 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.5rem' }}>Topic-wise Performance</h3>
                    <div style={{ width: '100%', height: 450 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                                <PolarGrid stroke="var(--border-color)" />
                                <PolarAngleAxis
                                    dataKey="topic"
                                    tick={{ fill: 'var(--text-primary)', fontSize: 13, fontWeight: 500 }}
                                />
                                <PolarRadiusAxis
                                    angle={90}
                                    domain={[0, 100]}
                                    tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
                                    axisLine={false}
                                    tickCount={6}
                                />
                                <Radar
                                    name="Proficiency"
                                    dataKey="score"
                                    stroke="var(--primary-color)"
                                    fill="var(--primary-color)"
                                    fillOpacity={0.4}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-primary)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-primary)',
                                        boxShadow: 'var(--shadow-lg)'
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Company Readiness */}
            <div className="glass-card">
                <h2 style={{ marginBottom: '2rem' }}>Company Readiness</h2>

                {/* Bar Chart */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.5rem 1rem 1rem 0', marginBottom: '3rem', border: '1px solid var(--border-color)' }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" tick={{ fill: 'var(--text-primary)' }} />
                            <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} cursor={{ fill: 'var(--bg-tertiary)' }} />
                            <Legend wrapperStyle={{ paddingTop: '10px' }} />
                            <Bar dataKey="score" fill="var(--primary-500)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Detailed Breakdown */}
                <div className="company-breakdown-list">
                    {readiness.map(company => (
                        <div key={company.name} className="company-card">
                            <div className="company-card-header">
                                <h3>{company.name}</h3>
                                <div className="company-score" style={{ color: getScoreColor(company.readinessScore) }}>
                                    {company.readinessScore}%
                                </div>
                            </div>

                            <div className="company-breakdown-grid">
                                <div className="metric-item">
                                    <div className="metric-label">DSA</div>
                                    <div className="metric-value">{company.breakdown.dsa}</div>
                                </div>
                                <div className="metric-item">
                                    <div className="metric-label">CS Fundamentals</div>
                                    <div className="metric-value">{company.breakdown.cs}</div>
                                </div>
                                <div className="metric-item">
                                    <div className="metric-label">Resume</div>
                                    <div className="metric-value">{company.breakdown.resume}</div>
                                </div>
                                <div className="metric-item">
                                    <div className="metric-label">Interview</div>
                                    <div className="metric-value">{company.breakdown.interview}</div>
                                </div>
                            </div>

                            {company.recommendations && company.recommendations.length > 0 && (
                                <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-600)' }}>
                                        <span>💡</span> Recommendations
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        {company.recommendations.map((rec, idx) => (
                                            <li key={idx} style={{ marginBottom: '0.25rem' }}>{rec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillDashboard;
