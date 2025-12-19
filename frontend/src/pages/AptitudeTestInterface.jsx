import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AptitudeTests.css';

const AptitudeTestInterface = () => {
    const { attemptId } = useParams();
    const navigate = useNavigate();

    const [attempt, setAttempt] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showNotepad, setShowNotepad] = useState(false);
    const [notepadText, setNotepadText] = useState('');

    const timerRef = useRef(null);
    const questionStartTimeRef = useRef(Date.now());

    useEffect(() => {
        fetchAttempt();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    useEffect(() => {
        if (attempt) {
            const section = attempt.sections[currentSectionIndex];
            const timeLimit = attempt.testPattern.sections[currentSectionIndex].timeLimit * 60; // convert to seconds
            const timeSpent = section.timeSpent || 0;
            setTimeRemaining(timeLimit - timeSpent);

            // Start timer
            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        handleSectionComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timerRef.current);
        }
    }, [currentSectionIndex, attempt]);

    useEffect(() => {
        if (attempt) {
            const currentQuestion = attempt.sections[currentSectionIndex].questions[currentQuestionIndex];
            setSelectedAnswer(currentQuestion.selectedAnswer || null);
            questionStartTimeRef.current = Date.now();
        }
    }, [currentQuestionIndex, currentSectionIndex, attempt]);

    const fetchAttempt = async () => {
        try {
            const { data } = await api.get(`/aptitude/tests/${attemptId}`);
            setAttempt(data);
            setCurrentSectionIndex(data.currentSection);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch attempt:', error);
            alert('Failed to load test');
            navigate('/aptitude');
        }
    };

    const handleAnswerSelect = async (answer) => {
        setSelectedAnswer(answer);

        const timeTaken = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);

        try {
            await api.put(`/aptitude/tests/${attemptId}/answer`, {
                sectionIndex: currentSectionIndex,
                questionIndex: currentQuestionIndex,
                selectedAnswer: answer,
                timeTaken,
                isMarked: false
            });

            // Update local state
            const updatedAttempt = { ...attempt };
            updatedAttempt.sections[currentSectionIndex].questions[currentQuestionIndex].selectedAnswer = answer;
            updatedAttempt.sections[currentSectionIndex].questions[currentQuestionIndex].timeTaken = timeTaken;
            updatedAttempt.sections[currentSectionIndex].questions[currentQuestionIndex].isSkipped = false;
            setAttempt(updatedAttempt);
        } catch (error) {
            console.error('Failed to save answer:', error);
        }
    };

    const handleMarkForReview = async () => {
        const timeTaken = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);

        try {
            await api.put(`/aptitude/tests/${attemptId}/answer`, {
                sectionIndex: currentSectionIndex,
                questionIndex: currentQuestionIndex,
                selectedAnswer,
                timeTaken,
                isMarked: true
            });

            const updatedAttempt = { ...attempt };
            updatedAttempt.sections[currentSectionIndex].questions[currentQuestionIndex].isMarked = true;
            setAttempt(updatedAttempt);
        } catch (error) {
            console.error('Failed to mark question:', error);
        }
    };

    const handleNext = () => {
        const section = attempt.sections[currentSectionIndex];
        if (currentQuestionIndex < section.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSectionComplete = async () => {
        if (timerRef.current) clearInterval(timerRef.current);

        try {
            const { data } = await api.put(`/aptitude/tests/${attemptId}/section/${currentSectionIndex}/complete`);

            if (data.currentSection < attempt.sections.length) {
                setCurrentSectionIndex(data.currentSection);
                setCurrentQuestionIndex(0);
                fetchAttempt(); // Refresh attempt data
            } else {
                handleSubmitTest();
            }
        } catch (error) {
            console.error('Failed to complete section:', error);
            alert('Failed to complete section');
        }
    };

    const handleSubmitTest = async () => {
        if (!confirm('Are you sure you want to submit the test? You cannot change answers after submission.')) {
            return;
        }

        if (timerRef.current) clearInterval(timerRef.current);

        try {
            await api.put(`/aptitude/tests/${attemptId}/submit`);
            navigate(`/aptitude/results/${attemptId}`);
        } catch (error) {
            console.error('Failed to submit test:', error);
            alert('Failed to submit test');
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getQuestionStatus = (question) => {
        if (question.selectedAnswer) return 'answered';
        if (question.isMarked) return 'marked';
        if (question.isSkipped) return 'skipped';
        return 'not-answered';
    };

    if (loading) {
        return (
            <div className="test-interface" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{ margin: '0 auto' }}></div>
                    <p style={{ marginTop: '1rem' }}>Loading test...</p>
                </div>
            </div>
        );
    }

    const currentSection = attempt.sections[currentSectionIndex];
    const currentQuestion = currentSection.questions[currentQuestionIndex];
    const questionData = currentQuestion.question;

    return (
        <div className="test-interface">
            {/* Header */}
            <div className="test-header">
                <div>
                    <h2 style={{ margin: 0 }}>{attempt.testPattern.name}</h2>
                    <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Section: {currentSection.name}
                    </p>
                </div>
                <div className={`test-timer ${timeRemaining < 300 ? 'warning' : ''}`}>
                    <span>⏱️</span>
                    <span>{formatTime(timeRemaining)}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="test-content">
                {/* Question Area */}
                <div className="question-area">
                    {/* Question Header */}
                    <div className="question-header">
                        <div>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Question {currentQuestionIndex + 1} of {currentSection.questions.length}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-secondary)'
                            }}>
                                {questionData.difficulty}
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentQuestionIndex + 1) / currentSection.questions.length) * 100}%` }}
                        ></div>
                    </div>

                    {/* Question Text */}
                    <div className="question-text">
                        {questionData.question}
                    </div>

                    {/* Options */}
                    <div className="options-container">
                        {questionData.options.map((option) => (
                            <div
                                key={option.label}
                                className={`option ${selectedAnswer === option.label ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(option.label)}
                            >
                                <div className="option-label">{option.label}</div>
                                <div className="option-text">{option.text}</div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="question-actions">
                        <button
                            className="btn btn-secondary"
                            onClick={handleMarkForReview}
                            disabled={!selectedAnswer}
                        >
                            🚩 Mark for Review
                        </button>
                        <button
                            className="btn btn-ghost"
                            onClick={() => handleAnswerSelect(null)}
                        >
                            Clear Response
                        </button>
                    </div>

                    {/* Tools */}
                    <div className="tools-container">
                        <button
                            className="tool-btn"
                            onClick={() => setShowCalculator(!showCalculator)}
                        >
                            🔢 Calculator
                        </button>
                        <button
                            className="tool-btn"
                            onClick={() => setShowNotepad(!showNotepad)}
                        >
                            📝 Notepad
                        </button>
                    </div>

                    {/* Notepad */}
                    {showNotepad && (
                        <div style={{ marginTop: '1rem' }}>
                            <textarea
                                className="input"
                                rows="4"
                                placeholder="Use this space for rough work..."
                                value={notepadText}
                                onChange={(e) => setNotepadText(e.target.value)}
                                style={{ width: '100%', fontFamily: 'monospace' }}
                            />
                        </div>
                    )}

                    {/* Navigation */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                        >
                            ← Previous
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={currentQuestionIndex === currentSection.questions.length - 1}
                            style={{ flex: 1 }}
                        >
                            Next →
                        </button>
                        {currentQuestionIndex === currentSection.questions.length - 1 && (
                            <button
                                className="btn btn-success"
                                onClick={handleSectionComplete}
                            >
                                {currentSectionIndex === attempt.sections.length - 1 ? 'Submit Test' : 'Next Section'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    {/* Question Palette */}
                    <div className="question-palette">
                        <div className="palette-header">Question Palette</div>

                        <div className="palette-grid">
                            {currentSection.questions.map((q, idx) => {
                                const status = getQuestionStatus(q);
                                return (
                                    <div
                                        key={idx}
                                        className={`palette-item ${idx === currentQuestionIndex ? 'current' : ''} ${status}`}
                                        onClick={() => setCurrentQuestionIndex(idx)}
                                    >
                                        {idx + 1}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="palette-legend">
                            <div className="legend-item">
                                <div className="legend-color" style={{ background: '#10b981' }}></div>
                                <span>Answered</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color" style={{ background: '#f59e0b' }}></div>
                                <span>Marked</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color" style={{ background: 'var(--bg-tertiary)' }}></div>
                                <span>Not Answered</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color" style={{ background: 'var(--primary-color)' }}></div>
                                <span>Current</span>
                            </div>
                        </div>

                        {/* Summary */}
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <strong>Answered:</strong> {currentSection.questions.filter(q => q.selectedAnswer).length}
                            </div>
                            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <strong>Marked:</strong> {currentSection.questions.filter(q => q.isMarked).length}
                            </div>
                            <div style={{ fontSize: '0.875rem' }}>
                                <strong>Not Answered:</strong> {currentSection.questions.filter(q => !q.selectedAnswer).length}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="btn btn-danger"
                            onClick={handleSubmitTest}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            Submit Test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AptitudeTestInterface;
