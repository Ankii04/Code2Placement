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
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h2>DSA Overall Score</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Based on {dsaScore?.problemsSolved || 0} problems solved</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: '800',
                            color: getScoreColor(dsaScore?.overall || 0)
                        }}>
                            {dsaScore?.overall || 0}
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>out of 100</div>
                    </div>
                </div>

                {/* Strengths and Weaknesses */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>💪 Strengths</h3>
                        {dsaScore?.strengths?.length > 0 ? (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {dsaScore.strengths.map((topic, idx) => (
                                    <li key={idx} style={{ padding: '0.5rem 0' }}>
                                        ✓ {topic.charAt(0).toUpperCase() + topic.slice(1)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)' }}>Solve more problems to identify strengths</p>
                        )}
                    </div>
                    <div>
                        <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>⚠️ Weaknesses</h3>
                        {dsaScore?.weaknesses?.length > 0 ? (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {dsaScore.weaknesses.map((topic, idx) => (
                                    <li key={idx} style={{ padding: '0.5rem 0' }}>
                                        ✗ {topic.charAt(0).toUpperCase() + topic.slice(1)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)' }}>Great! No weak areas identified</p>
                        )}
                    </div>
                </div>

                {/* Radar Chart */}
                <h3 style={{ marginBottom: '1rem' }}>Topic-wise Performance</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                        <PolarGrid stroke="var(--border-color)" />
                        <PolarAngleAxis dataKey="topic" tick={{ fill: 'var(--text-primary)', fontSize: 12 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'var(--text-secondary)' }} />
                        <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                        <Tooltip contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Company Readiness */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h2 style={{ marginBottom: '2rem' }}>Company Readiness</h2>

                {/* Bar Chart */}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" tick={{ fill: 'var(--text-primary)' }} />
                        <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-secondary)' }} />
                        <Tooltip contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }} />
                        <Legend />
                        <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>

                {/* Detailed Breakdown */}
                <div style={{ marginTop: '2rem' }}>
                    {readiness.map(company => (
                        <div key={company.name} className="company-card" style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3>{company.name}</h3>
                                <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    color: getScoreColor(company.readinessScore)
                                }}>
                                    {company.readinessScore}%
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>DSA</div>
                                    <div style={{ fontWeight: '600' }}>{company.breakdown.dsa}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>CS Fundamentals</div>
                                    <div style={{ fontWeight: '600' }}>{company.breakdown.cs}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Resume</div>
                                    <div style={{ fontWeight: '600' }}>{company.breakdown.resume}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Interview</div>
                                    <div style={{ fontWeight: '600' }}>{company.breakdown.interview}</div>
                                </div>
                            </div>

                            {company.recommendations && company.recommendations.length > 0 && (
                                <div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Recommendations:</div>
                                    <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {company.recommendations.map((rec, idx) => (
                                            <li key={idx}>{rec}</li>
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
