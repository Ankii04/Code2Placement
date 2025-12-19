import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './MockInterview.css';

const MockInterview = () => {
    const navigate = useNavigate();
    const [interviewType, setInterviewType] = useState('');
    const [interview, setInterview] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState([]); // Store all answers
    const [loading, setLoading] = useState(false);
    const [finalResults, setFinalResults] = useState(null);
    const [history, setHistory] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        fetchHistory();

        // Initialize speech recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' ';
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    setAnswer(prev => prev + finalTranscript);
                }
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
        }
    }, []);

    const toggleVoiceInput = () => {
        if (!recognition) {
            alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
            return;
        }

        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    const fetchHistory = async () => {
        try {
            const { data } = await api.get('/ai/interview/history');
            setHistory(data);
        } catch (error) {
            console.error('Failed to fetch history:', error);
        }
    };

    const startInterview = async () => {
        if (!interviewType) {
            alert('Please select interview type');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('/ai/interview/start',
                { type: interviewType }
            );

            setInterview(data);
            setCurrentQuestionIndex(0);
            setAnswer('');
            setAnswers([]);
            setFinalResults(null);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to start interview');
        } finally {
            setLoading(false);
        }
    };

    const submitAnswer = async () => {
        if (!answer.trim()) {
            alert('Please provide an answer');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post(
                `/ai/interview/${interview.interviewId}/answer`,
                { questionIndex: currentQuestionIndex, answer }
            );

            // Store answer and evaluation
            setAnswers([...answers, {
                question: interview.questions[currentQuestionIndex].question,
                answer: answer,
                evaluation: data.evaluation
            }]);

            // Move to next question or complete
            if (data.nextQuestion) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setAnswer('');
            } else {
                completeInterview();
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to submit answer');
        } finally {
            setLoading(false);
        }
    };

    const completeInterview = async () => {
        setLoading(true);
        try {
            const { data } = await api.post(
                `/ai/interview/${interview.interviewId}/complete`,
                {}
            );

            setFinalResults(data);
            fetchHistory();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to complete interview');
        } finally {
            setLoading(false);
        }
    };

    const resetInterview = () => {
        setInterview(null);
        setInterviewType('');
        setCurrentQuestionIndex(0);
        setAnswer('');
        setAnswers([]);
        setFinalResults(null);
    };

    if (finalResults) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <div className="glass-card" style={{ padding: '3rem' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>🎉 Interview Completed!</h1>

                    {/* Overall Score */}
                    <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                        <div style={{ fontSize: '4rem', fontWeight: '800', color: '#6366f1' }}>
                            {finalResults.scores.overall}
                        </div>
                        <div style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Overall Score</div>
                    </div>

                    {/* Score Breakdown */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{finalResults.scores.confidence}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Confidence</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{finalResults.scores.clarity}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Clarity</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{finalResults.scores.accuracy}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Accuracy</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{finalResults.scores.communication}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Communication</div>
                        </div>
                    </div>

                    {/* Detailed Question-wise Evaluation */}
                    <h2 style={{ marginBottom: '1.5rem' }}>Question-wise Evaluation</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                        {answers.map((item, index) => (
                            <div key={index} className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-secondary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <h3 style={{ flex: 1, marginRight: '1rem' }}>Q{index + 1}: {item.question}</h3>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6366f1', minWidth: '60px', textAlign: 'right' }}>
                                        {item.evaluation.score}/10
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Your Answer:</div>
                                    <div>{item.answer}</div>
                                </div>

                                <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>AI Feedback:</div>
                                    <div>{item.evaluation.feedback}</div>

                                    {item.evaluation.improvements && item.evaluation.improvements.length > 0 && (
                                        <div style={{ marginTop: '1rem' }}>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Improvements:</div>
                                            <ul style={{ marginLeft: '1.5rem' }}>
                                                {item.evaluation.improvements.map((imp, i) => (
                                                    <li key={i}>{imp}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{item.evaluation.confidence || 'N/A'}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Confidence</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{item.evaluation.clarity || 'N/A'}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Clarity</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{item.evaluation.accuracy || 'N/A'}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Accuracy</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{item.evaluation.communication || 'N/A'}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Communication</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ flex: 1 }}>
                            Back to Dashboard
                        </button>
                        <button className="btn btn-primary" onClick={resetInterview} style={{ flex: 1 }}>
                            Start New Interview
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!interview) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <div className="page-header">
                    <button className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ marginBottom: '1rem' }}>
                        ← Back to Dashboard
                    </button>
                    <h1>AI Mock Interview</h1>
                    <p>Practice with AI-powered interview questions</p>
                </div>

                <div className="glass-card" style={{ padding: '3rem', marginBottom: '3rem' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Select Interview Type</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div
                            className={`interview-type-card ${interviewType === 'HR' ? 'selected' : ''}`}
                            onClick={() => setInterviewType('HR')}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👔</div>
                            <h3>HR Interview</h3>
                            <p>Behavioral and situational questions</p>
                        </div>

                        <div
                            className={`interview-type-card ${interviewType === 'TECHNICAL' ? 'selected' : ''}`}
                            onClick={() => setInterviewType('TECHNICAL')}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
                            <h3>Technical Interview</h3>
                            <p>DSA and system design questions</p>
                        </div>

                        <div
                            className={`interview-type-card ${interviewType === 'BEHAVIORAL' ? 'selected' : ''}`}
                            onClick={() => setInterviewType('BEHAVIORAL')}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                            <h3>Behavioral Interview</h3>
                            <p>Leadership and teamwork scenarios</p>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary btn-lg"
                        onClick={startInterview}
                        disabled={!interviewType || loading}
                        style={{ width: '100%' }}
                    >
                        {loading ? 'Starting Interview...' : 'Start Interview'}
                    </button>
                </div>

                {/* Interview History */}
                {history.length > 0 && (
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Previous Interviews</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {history.slice(0, 5).map((item) => (
                                <div key={item._id} className="history-item">
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{item.type} Interview</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: '700', fontSize: '1.5rem', color: '#6366f1' }}>
                                        {item.scores.overall}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const currentQuestion = interview.questions[currentQuestionIndex];

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
                {/* Back Button */}
                <button className="btn btn-secondary" onClick={resetInterview} style={{ marginBottom: '2rem' }}>
                    ← Back
                </button>

                {/* Progress */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Question {currentQuestionIndex + 1} of {interview.questions.length}</span>
                        <span>{Math.round(((currentQuestionIndex + 1) / interview.questions.length) * 100)}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            width: `${((currentQuestionIndex + 1) / interview.questions.length) * 100}%`,
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                            transition: 'width 0.3s ease'
                        }}></div>
                    </div>
                </div>

                {/* Question */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>{currentQuestion.question}</h2>
                </div>

                {/* Answer Input */}
                <div>
                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="input"
                            rows="8"
                            placeholder={isListening ? "🎤 Listening... Speak now!" : "Type your answer here or click the microphone to speak..."}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            style={{ width: '100%', marginBottom: '1rem', paddingRight: '60px' }}
                        />
                        <button
                            onClick={toggleVoiceInput}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '15px',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                border: 'none',
                                background: isListening ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                boxShadow: isListening ? '0 0 20px rgba(245, 87, 108, 0.5)' : '0 2px 8px rgba(0,0,0,0.2)',
                                animation: isListening ? 'pulse 1.5s infinite' : 'none'
                            }}
                            title={isListening ? "Stop listening" : "Start voice input"}
                        >
                            {isListening ? '🔴' : '🎤'}
                        </button>
                    </div>
                    {isListening && (
                        <div style={{
                            marginBottom: '1rem',
                            padding: '0.75rem',
                            background: 'linear-gradient(135deg, rgba(245, 87, 108, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%)',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            color: '#f5576c',
                            textAlign: 'center',
                            fontWeight: '600'
                        }}>
                            🎙️ Microphone is active - Speak clearly
                        </div>
                    )}
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={submitAnswer}
                        disabled={loading || !answer.trim()}
                        style={{ width: '100%' }}
                    >
                        {loading ? 'Submitting...' : (currentQuestionIndex === interview.questions.length - 1 ? 'Submit & Finish' : 'Submit & Next')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockInterview;
