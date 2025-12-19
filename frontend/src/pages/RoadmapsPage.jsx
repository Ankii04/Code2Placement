import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Roadmaps.css';

const RoadmapsPage = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGoal, setSelectedGoal] = useState('');

    const goals = ['All', 'Frontend', 'Backend', 'FullStack', 'DevOps', 'DataScience', 'Mobile', 'Other'];

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    const fetchRoadmaps = async () => {
        try {
            setLoading(true);
            const response = await api.get('/roadmaps');
            setRoadmaps(response.data);
        } catch (error) {
            console.error('Failed to fetch roadmaps:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRoadmaps = selectedGoal && selectedGoal !== 'All'
        ? roadmaps.filter(r => r.goal === selectedGoal)
        : roadmaps;

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return '#10b981';
            case 'Intermediate': return '#f59e0b';
            case 'Advanced': return '#ef4444';
            default: return '#6b7280';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="roadmaps-page">
            <div className="container">
                <div className="roadmaps-header">
                    <div>
                        <h1>Learning Roadmaps 🗺️</h1>
                        <p>Follow structured paths to achieve your career goals</p>
                    </div>
                </div>

                {/* Goal Filters */}
                <div className="roadmap-filters glass-card">
                    <h3>Filter by Goal</h3>
                    <div className="goal-filters">
                        {goals.map(goal => (
                            <button
                                key={goal}
                                className={`goal-btn ${selectedGoal === goal || (goal === 'All' && !selectedGoal) ? 'active' : ''}`}
                                onClick={() => setSelectedGoal(goal === 'All' ? '' : goal)}
                            >
                                {goal}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Roadmaps Grid */}
                <div className="roadmaps-grid">
                    {filteredRoadmaps.length === 0 ? (
                        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                            <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>
                                {roadmaps.length === 0
                                    ? 'No roadmaps available yet. Check back soon!'
                                    : 'No roadmaps found for this goal.'}
                            </p>
                        </div>
                    ) : (
                        filteredRoadmaps.map(roadmap => (
                            <div key={roadmap._id} className="roadmap-card glass-card">
                                <div className="roadmap-header-section">
                                    <div className="roadmap-goal-badge">{roadmap.goal}</div>
                                    <div
                                        className="roadmap-difficulty-badge"
                                        style={{ backgroundColor: getDifficultyColor(roadmap.difficulty) }}
                                    >
                                        {roadmap.difficulty}
                                    </div>
                                </div>

                                <h3 className="roadmap-title">{roadmap.title}</h3>
                                <p className="roadmap-description">{roadmap.description}</p>

                                <div className="roadmap-meta">
                                    <div className="meta-item">
                                        <span className="meta-icon">⏱️</span>
                                        <span>{roadmap.duration}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-icon">📚</span>
                                        <span>{roadmap.steps?.length || 0} Steps</span>
                                    </div>
                                </div>

                                {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
                                    <div className="prerequisites">
                                        <strong>Prerequisites:</strong>
                                        <ul>
                                            {roadmap.prerequisites.slice(0, 3).map((prereq, idx) => (
                                                <li key={idx}>{prereq}</li>
                                            ))}
                                            {roadmap.prerequisites.length > 3 && (
                                                <li>+{roadmap.prerequisites.length - 3} more</li>
                                            )}
                                        </ul>
                                    </div>
                                )}

                                <button className="btn btn-primary roadmap-btn">
                                    View Roadmap →
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoadmapsPage;
