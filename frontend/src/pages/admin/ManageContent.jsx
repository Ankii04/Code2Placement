import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAllTopics, updateTopic } from '../../services/adminService';
import './ManageContent.css';

const ManageContent = () => {
    const [topics, setTopics] = useState([]);
    const [subtopics, setSubtopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);
    const [formData, setFormData] = useState({
        content: '',
        notes: '',
        examples: '',
        timeComplexity: '',
        spaceComplexity: ''
    });

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const data = await getAllTopics();

            // Filter subtopics only
            const allSubtopics = data.filter(t => !t.isMainCategory);
            setSubtopics(allSubtopics);
            setTopics(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load topics');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (subtopic) => {
        setSelectedSubtopic(subtopic);
        setFormData({
            content: subtopic.content || '',
            notes: subtopic.notes || '',
            examples: subtopic.examples || '',
            timeComplexity: subtopic.timeComplexity || '',
            spaceComplexity: subtopic.spaceComplexity || ''
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTopic(selectedSubtopic._id, formData);
            setShowModal(false);
            setSelectedSubtopic(null);
            fetchTopics();
            alert('✅ Teaching content updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update content');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSubtopic(null);
        setFormData({
            content: '',
            notes: '',
            examples: '',
            timeComplexity: '',
            spaceComplexity: ''
        });
    };

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1>Manage Teaching Content</h1>
                <p>Add or edit teaching content for subtopics</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <div className="flex items-center justify-center" style={{ minHeight: '40vh' }}>
                    <div className="spinner"></div>
                </div>
            ) : subtopics.length === 0 ? (
                <div className="empty-state">
                    <p>No subtopics found. Create subtopics first in Manage Topics.</p>
                </div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Subtopic</th>
                                <th>Category</th>
                                <th>Content Status</th>
                                <th>Notes</th>
                                <th>Examples</th>
                                <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subtopics.map((subtopic) => (
                                <tr key={subtopic._id}>
                                    <td>{subtopic.title}</td>
                                    <td>{subtopic.category}</td>
                                    <td>
                                        <span className={`badge ${subtopic.content ? 'badge-success' : 'badge-warning'}`}>
                                            {subtopic.content ? '✓ Has Content' : '⚠ Empty'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${subtopic.notes ? 'badge-success' : 'badge-secondary'}`}>
                                            {subtopic.notes ? '✓' : '✗'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${subtopic.examples ? 'badge-success' : 'badge-secondary'}`}>
                                            {subtopic.examples ? '✓' : '✗'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                            <button
                                                onClick={() => handleEdit(subtopic)}
                                                className="btn btn-primary btn-sm"
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {subtopic.content ? '✏️ Edit' : '➕ Add'} Content
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
                            <h2>Teaching Content: {selectedSubtopic?.title}</h2>
                            <button onClick={handleCloseModal} className="modal-close">×</button>
                        </div>

                        <form onSubmit={handleSubmit} className="content-form">
                            {/* Main Content */}
                            <div className="form-section">
                                <h3>📖 Main Content</h3>
                                <div className="input-group">
                                    <label className="input-label">Content (Markdown supported)</label>
                                    <textarea
                                        className="input code-input"
                                        rows="12"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Write the main teaching content here. Use markdown for formatting:

# Heading
## Subheading
→ Bullet point
**bold** *italic*
\`code\`
\`\`\`cpp
code block
\`\`\`"
                                    />
                                    <small>This is the main explanation students will see. Use markdown formatting.</small>
                                </div>
                            </div>

                            {/* Study Notes */}
                            <div className="form-section">
                                <h3>📝 Study Notes</h3>
                                <div className="input-group">
                                    <label className="input-label">Key Points & Notes</label>
                                    <textarea
                                        className="input"
                                        rows="6"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="→ Key point 1
→ Key point 2
→ Important concept
→ Common pitfall to avoid"
                                    />
                                    <small>Bullet points of important concepts to remember</small>
                                </div>
                            </div>

                            {/* Examples */}
                            <div className="form-section">
                                <h3>💡 Examples</h3>
                                <div className="input-group">
                                    <label className="input-label">Code Examples (C++)</label>
                                    <textarea
                                        className="input code-input"
                                        rows="10"
                                        value={formData.examples}
                                        onChange={(e) => setFormData({ ...formData, examples: e.target.value })}
                                        placeholder="Example 1: Basic Usage
\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    // Your example code
    return 0;
}
\`\`\`

Example 2: Advanced Usage
..."
                                        style={{ fontFamily: 'monospace' }}
                                    />
                                    <small>Provide working C++ code examples with explanations</small>
                                </div>
                            </div>

                            {/* Complexity Analysis */}
                            <div className="form-section">
                                <h3>⏱️ Complexity Analysis</h3>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label className="input-label">Time Complexity</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={formData.timeComplexity}
                                            onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
                                            placeholder="O(n), O(n log n), O(1), etc."
                                        />
                                        <small>Big-O notation for time complexity</small>
                                    </div>

                                    <div className="input-group">
                                        <label className="input-label">Space Complexity</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={formData.spaceComplexity}
                                            onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
                                            placeholder="O(1), O(n), O(n²), etc."
                                        />
                                        <small>Big-O notation for space complexity</small>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Section */}
                            <div className="form-section">
                                <h3>👁️ Preview</h3>
                                <div className="preview-box">
                                    <p><strong>Content:</strong> {formData.content ? `${formData.content.substring(0, 100)}...` : 'No content yet'}</p>
                                    <p><strong>Notes:</strong> {formData.notes ? `${formData.notes.substring(0, 100)}...` : 'No notes yet'}</p>
                                    <p><strong>Time:</strong> {formData.timeComplexity || 'Not specified'}</p>
                                    <p><strong>Space:</strong> {formData.spaceComplexity || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    💾 Save Teaching Content
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

export default ManageContent;
