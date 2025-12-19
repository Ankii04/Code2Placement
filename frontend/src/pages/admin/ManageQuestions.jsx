import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAllQuestions, getAllTopics, createQuestion, updateQuestion, deleteQuestion } from '../../services/adminService';
import './ManageQuestions.css';

const ManageQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [topics, setTopics] = useState([]);
    const [subtopics, setSubtopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'EASY',
        topic: '',
        companies: '',
        tags: '',
        hints: '',
        solution: {
            approach: '',
            code: '',
            explanation: ''
        },
        testCases: [{ input: '', expectedOutput: '' }],
        examples: [{ input: '', output: '', explanation: '' }]
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [questionsData, topicsData] = await Promise.all([
                getAllQuestions(),
                getAllTopics()
            ]);
            setQuestions(questionsData);

            // Filter to get only subtopics (not main categories)
            const allSubtopics = topicsData.filter(t => !t.isMainCategory);
            setSubtopics(allSubtopics);
            setTopics(topicsData);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const questionData = {
                ...formData,
                companies: formData.companies.split(',').map(c => c.trim()).filter(Boolean),
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                hints: formData.hints.split('\n').filter(Boolean)
            };

            if (editingQuestion) {
                await updateQuestion(editingQuestion._id, questionData);
            } else {
                await createQuestion(questionData);
            }
            setShowModal(false);
            resetForm();
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save question');
        }
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        setFormData({
            title: question.title,
            description: question.description,
            difficulty: question.difficulty,
            topic: question.topic?._id || question.topic,
            companies: question.companies?.join(', ') || '',
            tags: question.tags?.join(', ') || '',
            hints: question.hints?.join('\n') || '',
            solution: question.solution || { approach: '', code: '', explanation: '' },
            testCases: question.testCases || [{ input: '', expectedOutput: '' }],
            examples: question.examples || [{ input: '', output: '', explanation: '' }]
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;

        try {
            await deleteQuestion(id);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete question');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            difficulty: 'EASY',
            topic: '',
            companies: '',
            tags: '',
            hints: '',
            solution: {
                approach: '',
                code: '',
                explanation: ''
            },
            testCases: [{ input: '', expectedOutput: '' }],
            examples: [{ input: '', output: '', explanation: '' }]
        });
        setEditingQuestion(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    // Helper functions for dynamic fields
    const addTestCase = () => {
        setFormData({
            ...formData,
            testCases: [...formData.testCases, { input: '', expectedOutput: '' }]
        });
    };

    const removeTestCase = (index) => {
        const newTestCases = formData.testCases.filter((_, i) => i !== index);
        setFormData({ ...formData, testCases: newTestCases });
    };

    const updateTestCase = (index, field, value) => {
        const newTestCases = [...formData.testCases];
        newTestCases[index][field] = value;
        setFormData({ ...formData, testCases: newTestCases });
    };

    const addExample = () => {
        setFormData({
            ...formData,
            examples: [...formData.examples, { input: '', output: '', explanation: '' }]
        });
    };

    const removeExample = (index) => {
        const newExamples = formData.examples.filter((_, i) => i !== index);
        setFormData({ ...formData, examples: newExamples });
    };

    const updateExample = (index, field, value) => {
        const newExamples = [...formData.examples];
        newExamples[index][field] = value;
        setFormData({ ...formData, examples: newExamples });
    };

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1>Manage Questions</h1>
                <p>Create, edit, and delete coding questions for subtopics</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div style={{ marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary"
                >
                    ➕ Add New Question
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center" style={{ minHeight: '40vh' }}>
                    <div className="spinner"></div>
                </div>
            ) : questions.length === 0 ? (
                <div className="empty-state">
                    <p>No questions found. Click "➕ Add New Question" to create one.</p>
                </div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Subtopic</th>
                                <th>Difficulty</th>
                                <th>Companies</th>
                                <th style={{ width: '120px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question) => (
                                <tr key={question._id}>
                                    <td>{question.title}</td>
                                    <td>{question.topic?.title || 'N/A'}</td>
                                    <td>
                                        <span className={`badge badge-${question.difficulty?.toLowerCase() || 'easy'}`}>
                                            {question.difficulty || 'EASY'}
                                        </span>
                                    </td>
                                    <td>{question.companies?.slice(0, 2).join(', ') || 'N/A'}</td>
                                    <td>
                                        <div style={{
                                            display: 'flex !important',
                                            flexDirection: 'row',
                                            gap: '0.5rem',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%'
                                        }}>
                                            <button
                                                onClick={() => handleEdit(question)}
                                                title="Edit"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '36px',
                                                    height: '36px',
                                                    padding: '0.5rem',
                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '1.125rem',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(question._id)}
                                                title="Delete"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '36px',
                                                    height: '36px',
                                                    padding: '0.5rem',
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '1.125rem',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingQuestion ? 'Edit Question' : 'Add New Question'}</h2>
                            <button onClick={handleCloseModal} className="modal-close">×</button>
                        </div>

                        <form onSubmit={handleSubmit} className="question-form">
                            {/* Basic Info */}
                            <div className="form-section">
                                <h3>Basic Information</h3>

                                <div className="input-group">
                                    <label className="input-label">Question Title *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., Two Sum Problem"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Description *</label>
                                    <textarea
                                        className="input"
                                        rows="6"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Full problem statement with examples, constraints, etc."
                                        required
                                    />
                                    <small>Use markdown formatting. Include examples and constraints.</small>
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <label className="input-label">Subtopic *</label>
                                        <select
                                            className="input"
                                            value={formData.topic}
                                            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                            required
                                        >
                                            <option value="">Select a subtopic</option>
                                            {subtopics.map((topic) => (
                                                <option key={topic._id} value={topic._id}>
                                                    {topic.category} → {topic.title}
                                                </option>
                                            ))}
                                        </select>
                                        <small>Questions will be filtered by this subtopic</small>
                                    </div>

                                    <div className="input-group">
                                        <label className="input-label">Difficulty *</label>
                                        <select
                                            className="input"
                                            value={formData.difficulty}
                                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                        >
                                            <option value="EASY">Easy</option>
                                            <option value="MEDIUM">Medium</option>
                                            <option value="HARD">Hard</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <label className="input-label">Companies</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={formData.companies}
                                            onChange={(e) => setFormData({ ...formData, companies: e.target.value })}
                                            placeholder="Google, Amazon, Microsoft"
                                        />
                                        <small>Comma-separated list</small>
                                    </div>

                                    <div className="input-group">
                                        <label className="input-label">Tags</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            placeholder="array, two-pointers, hash-map"
                                        />
                                        <small>Comma-separated list</small>
                                    </div>
                                </div>
                            </div>

                            {/* Examples */}
                            <div className="form-section">
                                <h3>Examples</h3>
                                {formData.examples.map((example, index) => (
                                    <div key={index} className="dynamic-field-group">
                                        <div className="dynamic-field-header">
                                            <span>Example {index + 1}</span>
                                            {formData.examples.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeExample(index)}
                                                    className="btn-remove"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Input</label>
                                            <input
                                                type="text"
                                                className="input"
                                                value={example.input}
                                                onChange={(e) => updateExample(index, 'input', e.target.value)}
                                                placeholder="arr = [1, 2, 3], target = 5"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Output</label>
                                            <input
                                                type="text"
                                                className="input"
                                                value={example.output}
                                                onChange={(e) => updateExample(index, 'output', e.target.value)}
                                                placeholder="[1, 3]"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Explanation</label>
                                            <textarea
                                                className="input"
                                                rows="2"
                                                value={example.explanation}
                                                onChange={(e) => updateExample(index, 'explanation', e.target.value)}
                                                placeholder="arr[1] + arr[3] = 2 + 3 = 5"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={addExample} className="btn btn-secondary btn-sm">
                                    + Add Example
                                </button>
                            </div>

                            {/* Test Cases */}
                            <div className="form-section">
                                <h3>Test Cases</h3>
                                {formData.testCases.map((testCase, index) => (
                                    <div key={index} className="dynamic-field-group">
                                        <div className="dynamic-field-header">
                                            <span>Test Case {index + 1}</span>
                                            {formData.testCases.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTestCase(index)}
                                                    className="btn-remove"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="input-row">
                                            <div className="input-group">
                                                <label className="input-label">Input</label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={testCase.input}
                                                    onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                                                    placeholder="[1, 2, 3, 4], 5"
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Expected Output</label>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={testCase.expectedOutput}
                                                    onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                                                    placeholder="[1, 3]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={addTestCase} className="btn btn-secondary btn-sm">
                                    + Add Test Case
                                </button>
                            </div>

                            {/* Solution */}
                            <div className="form-section">
                                <h3>Solution</h3>

                                <div className="input-group">
                                    <label className="input-label">Approach</label>
                                    <textarea
                                        className="input"
                                        rows="3"
                                        value={formData.solution.approach}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            solution: { ...formData.solution, approach: e.target.value }
                                        })}
                                        placeholder="Brief description of the solution approach"
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Solution Code (C++)</label>
                                    <textarea
                                        className="input code-input"
                                        rows="12"
                                        value={formData.solution.code}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            solution: { ...formData.solution, code: e.target.value }
                                        })}
                                        placeholder="Complete C++ solution code"
                                        style={{ fontFamily: 'monospace', fontSize: '14px' }}
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Explanation</label>
                                    <textarea
                                        className="input"
                                        rows="4"
                                        value={formData.solution.explanation}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            solution: { ...formData.solution, explanation: e.target.value }
                                        })}
                                        placeholder="Detailed explanation of how the solution works"
                                    />
                                </div>
                            </div>

                            {/* Hints */}
                            <div className="form-section">
                                <h3>Hints</h3>
                                <div className="input-group">
                                    <label className="input-label">Hints (one per line)</label>
                                    <textarea
                                        className="input"
                                        rows="4"
                                        value={formData.hints}
                                        onChange={(e) => setFormData({ ...formData, hints: e.target.value })}
                                        placeholder="Hint 1: Think about using two pointers&#10;Hint 2: Start from both ends&#10;Hint 3: Compare and move pointers"
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    {editingQuestion ? 'Update Question' : 'Create Question'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ManageQuestions;
