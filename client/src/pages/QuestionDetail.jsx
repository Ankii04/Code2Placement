import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuestionById } from '../services/userService';
import CodeEditor from '../components/CodeEditor';
import './QuestionDetail.css';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showSolution, setShowSolution] = useState(false);
    const [showHints, setShowHints] = useState(false);

    useEffect(() => {
        fetchQuestion();
    }, [id]);

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            const data = await getQuestionById(id);
            setQuestion(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load question');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitSuccess = (result) => {
        if (result.allPassed) {
            alert('🎉 Congratulations! All test cases passed!');
            // Optionally refresh question to update completion status
            fetchQuestion();
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

    if (error || !question) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <div className="alert alert-error">{error || 'Question not found'}</div>
                <Link to="/questions" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                    ← Back to Questions
                </Link>
            </div>
        );
    }

    return (
        <div className="question-detail-page">
            {/* Header */}
            <div className="question-header">
                <Link to="/questions" className="btn btn-ghost back-btn">
                    ← Back to Questions
                </Link>
                <div className="question-title-section">
                    <h1>{question.title}</h1>
                    <div className="question-meta">
                        <span
                            className="difficulty-badge"
                            data-difficulty={question.difficulty?.toLowerCase()}
                        >
                            {question.difficulty}
                        </span>
                        {question.topic && <span className="meta-item">📚 {question.topic.title}</span>}
                        {question.companies && question.companies.length > 0 && (
                            <span className="meta-item">🏢 {question.companies.join(', ')}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Split Layout */}
            <div className="question-split-layout">
                {/* Left Panel - Problem Description */}
                <div className="problem-panel">
                    <div className="problem-content">
                        <section className="problem-section">
                            <h2>Problem Description</h2>
                            <p className="problem-description">{question.description}</p>
                        </section>

                        {question.examples && question.examples.length > 0 && (
                            <section className="problem-section">
                                <h2>Examples</h2>
                                {question.examples.map((example, index) => (
                                    <div key={index} className="example-box">
                                        <div className="example-header">Example {index + 1}</div>
                                        <div className="example-content">
                                            <div className="example-item">
                                                <strong>Input:</strong>
                                                <pre>{example.input}</pre>
                                            </div>
                                            <div className="example-item">
                                                <strong>Output:</strong>
                                                <pre>{example.output}</pre>
                                            </div>
                                            {example.explanation && (
                                                <div className="example-item">
                                                    <strong>Explanation:</strong>
                                                    <p>{example.explanation}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {question.constraints && question.constraints.length > 0 && (
                            <section className="problem-section">
                                <h2>Constraints</h2>
                                <ul className="constraints-list">
                                    {question.constraints.map((constraint, index) => (
                                        <li key={index}>{constraint}</li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {question.hints && question.hints.length > 0 && (
                            <section className="problem-section">
                                <button
                                    onClick={() => setShowHints(!showHints)}
                                    className="btn btn-secondary"
                                >
                                    {showHints ? '🙈 Hide Hints' : '💡 Show Hints'}
                                </button>
                                {showHints && (
                                    <div className="hints-box">
                                        <ol>
                                            {question.hints.map((hint, index) => (
                                                <li key={index}>{hint}</li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </section>
                        )}

                        {question.solution && (
                            <section className="problem-section">
                                <button
                                    onClick={() => setShowSolution(!showSolution)}
                                    className="btn btn-primary"
                                >
                                    {showSolution ? '🔒 Hide Solution' : '🔓 Show Solution'}
                                </button>
                                {showSolution && (
                                    <div className="solution-box">
                                        <h3>Solution</h3>
                                        <pre><code>{question.solution}</code></pre>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="editor-panel">
                    <CodeEditor
                        question={question}
                        onSubmit={handleSubmitSuccess}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;
