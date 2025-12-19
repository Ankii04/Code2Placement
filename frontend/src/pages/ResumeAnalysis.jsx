import { useState, useEffect } from 'react';
import api from '../services/api';
import './ResumeAnalysis.css';

const ResumeAnalysis = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
        fetchLatest();
    }, []);

    const fetchHistory = async () => {
        try {
            const { data } = await api.get('/ai/resume/history');
            setHistory(data);
        } catch (error) {
            console.error('Failed to fetch history:', error);
        }
    };

    const fetchLatest = async () => {
        try {
            const { data } = await api.get('/ai/resume/latest');
            setAnalysis(data);
        } catch (error) {
            // No previous analysis
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Please select a PDF file');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('resume', file);

            const { data } = await api.post('/ai/resume/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setAnalysis(data);
            setFile(null);
            fetchHistory();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to analyze resume');
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div className="page-header">
                <h1>AI Resume Analysis</h1>
                <p>Get instant feedback on your resume with AI-powered analysis</p>
            </div>

            {/* Upload Section */}
            <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Upload Your Resume</h2>

                <div className="upload-area">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="upload-label">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            {file ? file.name : 'Click to upload PDF'}
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                            Maximum file size: 5MB
                        </div>
                    </label>
                </div>

                <button
                    className="btn btn-primary btn-lg"
                    onClick={handleUpload}
                    disabled={!file || loading}
                    style={{ width: '100%', marginTop: '1.5rem' }}
                >
                    {loading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
            </div>

            {/* Analysis Results */}
            {analysis && (
                <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Analysis Results</h2>

                    {/* Overall Scores */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                        <div className="score-card">
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: getScoreColor(analysis.score) }}>
                                {analysis.score}
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>Overall Score</div>
                        </div>
                        <div className="score-card">
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: getScoreColor(analysis.atsScore) }}>
                                {analysis.atsScore}
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>ATS Score</div>
                        </div>
                    </div>

                    {/* Section Scores */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Section Breakdown</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {Object.entries(analysis.sections).map(([section, score]) => (
                                <div key={section}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ textTransform: 'capitalize' }}>{section}</span>
                                        <span style={{ fontWeight: '600' }}>{score}/100</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${score}%`,
                                            background: getScoreColor(score),
                                            transition: 'width 0.5s ease'
                                        }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Strengths */}
                    {analysis.strengths && analysis.strengths.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>✓ Strengths</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {analysis.strengths.map((strength, idx) => (
                                    <li key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                        {strength}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Weaknesses */}
                    {analysis.weaknesses && analysis.weaknesses.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>✗ Areas for Improvement</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {analysis.weaknesses.map((weakness, idx) => (
                                    <li key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                                        {weakness}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Missing Skills */}
                    {analysis.skillsMissing && analysis.skillsMissing.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>🎯 Skills to Add</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {analysis.skillsMissing.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Keywords */}
                    {analysis.keywords && analysis.keywords.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>🔑 ATS Keywords to Include</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {analysis.keywords.map((keyword, idx) => (
                                    <span key={idx} className="keyword-tag">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Improvements */}
                    {analysis.improvements && analysis.improvements.length > 0 && (
                        <div>
                            <h3 style={{ marginBottom: '1rem' }}>💡 Specific Improvements</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {analysis.improvements.map((improvement, idx) => (
                                    <div key={idx} className="improvement-card">
                                        <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                                            {improvement.category}
                                        </div>
                                        <div style={{ color: 'var(--text-secondary)' }}>
                                            {improvement.suggestion}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* History */}
            {history.length > 0 && (
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Analysis History</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {history.map((item) => (
                            <div key={item._id} className="history-item" onClick={() => setAnalysis(item)}>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{item.fileName}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {new Date(item.analyzedAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: getScoreColor(item.score) }}>
                                            {item.score}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Overall</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: getScoreColor(item.atsScore) }}>
                                            {item.atsScore}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ATS</div>
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

export default ResumeAnalysis;
