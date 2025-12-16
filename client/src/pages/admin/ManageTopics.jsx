import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAllTopics, createTopic, updateTopic, deleteTopic } from '../../services/adminService';
import './ManageTopics.css';

const ManageTopics = () => {
    const [topics, setTopics] = useState([]);
    const [mainTopics, setMainTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingTopic, setEditingTopic] = useState(null);
    const [isMainCategory, setIsMainCategory] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        difficulty: 'Easy',
        order: 0,
        parentTopic: '',
        isMainCategory: false
    });

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const data = await getAllTopics();
            setTopics(data);

            // Filter main categories for parent selection
            const mains = data.filter(t => t.isMainCategory);
            setMainTopics(mains);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load topics');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = {
                ...formData,
                isMainCategory: isMainCategory
            };

            // If it's a subtopic, ensure parentTopic is set
            if (!isMainCategory && !formData.parentTopic) {
                setError('Please select a parent topic for this subtopic');
                return;
            }

            if (editingTopic) {
                await updateTopic(editingTopic._id, submitData);
            } else {
                await createTopic(submitData);
            }
            setShowModal(false);
            resetForm();
            fetchTopics();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save topic');
        }
    };

    const handleEdit = (topic) => {
        setEditingTopic(topic);
        setIsMainCategory(topic.isMainCategory || false);
        setFormData({
            title: topic.title,
            description: topic.description,
            category: topic.category,
            difficulty: topic.difficulty || 'Easy',
            order: topic.order || 0,
            parentTopic: topic.parentTopic?._id || topic.parentTopic || '',
            isMainCategory: topic.isMainCategory || false
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this topic?')) return;

        try {
            await deleteTopic(id);
            fetchTopics();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete topic');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: '',
            difficulty: 'Easy',
            order: 0,
            parentTopic: '',
            isMainCategory: false
        });
        setIsMainCategory(false);
        setEditingTopic(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1>Manage Topics & Subtopics</h1>
                <p>Create and manage DSA topics and their subtopics</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div style={{ marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary"
                >
                    ➕ Add New Topic/Subtopic
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center" style={{ minHeight: '40vh' }}>
                    <div className="spinner"></div>
                </div>
            ) : topics.length === 0 ? (
                <div className="empty-state">
                    <p>No topics found. Click "Add New Topic/Subtopic" to create one.</p>
                </div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Parent Topic</th>
                                <th>Difficulty</th>
                                <th>Order</th>
                                <th style={{ width: '150px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.map((topic) => (
                                <tr key={topic._id}>
                                    <td>{topic.title}</td>
                                    <td>
                                        <span className={`badge ${topic.isMainCategory ? 'badge-primary' : 'badge-secondary'}`}>
                                            {topic.isMainCategory ? 'Main Topic' : 'Subtopic'}
                                        </span>
                                    </td>
                                    <td>{topic.category}</td>
                                    <td>{topic.parentTopic?.title || '-'}</td>
                                    <td>
                                        <span className={`badge badge-${topic.difficulty?.toLowerCase() || 'easy'}`}>
                                            {topic.difficulty || 'Easy'}
                                        </span>
                                    </td>
                                    <td>{topic.order || 0}</td>
                                    <td>
                                        <div style={{
                                            display: 'flex',
                                            gap: '0.5rem',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <button
                                                onClick={() => handleEdit(topic)}
                                                className="btn-icon btn-edit"
                                                title="Edit"
                                                style={{
                                                    padding: '0.5rem',
                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '1.125rem'
                                                }}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(topic._id)}
                                                className="btn-icon btn-delete"
                                                title="Delete"
                                                style={{
                                                    padding: '0.5rem',
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '1.125rem'
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
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingTopic ? 'Edit Topic' : 'Add New Topic/Subtopic'}</h2>
                            <button onClick={handleCloseModal} className="modal-close">×</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Topic Type Selection */}
                            <div className="input-group">
                                <label className="input-label">Topic Type *</label>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            checked={isMainCategory}
                                            onChange={() => setIsMainCategory(true)}
                                        />
                                        <span>Main Topic</span>
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            checked={!isMainCategory}
                                            onChange={() => setIsMainCategory(false)}
                                        />
                                        <span>Subtopic</span>
                                    </label>
                                </div>
                            </div>

                            {/* Parent Topic Selection (only for subtopics) */}
                            {!isMainCategory && (
                                <div className="input-group">
                                    <label className="input-label">Parent Topic *</label>
                                    <select
                                        className="input"
                                        value={formData.parentTopic}
                                        onChange={(e) => setFormData({ ...formData, parentTopic: e.target.value })}
                                        required={!isMainCategory}
                                    >
                                        <option value="">Select a main topic</option>
                                        {mainTopics.map((topic) => (
                                            <option key={topic._id} value={topic._id}>
                                                {topic.title}
                                            </option>
                                        ))}
                                    </select>
                                    <small>This subtopic will appear under the selected main topic</small>
                                </div>
                            )}

                            <div className="input-group">
                                <label className="input-label">Title *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g., Two Pointers"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Description *</label>
                                <textarea
                                    className="input"
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description of this topic"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Category *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g., Arrays, Strings, Trees"
                                    required
                                />
                                <small>Used for grouping and filtering</small>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Difficulty</label>
                                <select
                                    className="input"
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Order</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    placeholder="Display order (0, 1, 2...)"
                                />
                                <small>Lower numbers appear first</small>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                    {editingTopic ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="btn btn-secondary"
                                    style={{ flex: 1 }}
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

export default ManageTopics;
