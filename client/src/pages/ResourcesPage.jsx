import { useEffect, useState } from 'react';
import api from '../services/api';
import './Resources.css';

const ResourcesPage = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const categories = ['All', 'Resume', 'CoverLetter', 'CheatSheet', 'Tutorial', 'Book', 'Course', 'Other'];
    const types = ['All', 'PDF', 'Template', 'Link', 'Video', 'Article'];

    useEffect(() => {
        fetchResources();
    }, [selectedCategory, selectedType]);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const params = {};
            if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
            if (selectedType && selectedType !== 'All') params.type = selectedType;

            const response = await api.get('/resources', { params });
            setResources(response.data);
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'PDF': return '📄';
            case 'Template': return '📋';
            case 'Link': return '🔗';
            case 'Video': return '🎥';
            case 'Article': return '📰';
            default: return '📁';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Resume': return '📝';
            case 'CoverLetter': return '✉️';
            case 'CheatSheet': return '📊';
            case 'Tutorial': return '🎓';
            case 'Book': return '📚';
            case 'Course': return '🎯';
            default: return '📦';
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
        <div className="resources-page">
            <div className="container">
                <div className="resources-header">
                    <div>
                        <h1>Resources 📚</h1>
                        <p>Access study materials, templates, and helpful links</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="resources-filters glass-card">
                    <div className="filter-section">
                        <h3>Category</h3>
                        <div className="filter-buttons">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-btn ${selectedCategory === cat || (cat === 'All' && !selectedCategory) ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Type</h3>
                        <div className="filter-buttons">
                            {types.map(type => (
                                <button
                                    key={type}
                                    className={`filter-btn ${selectedType === type || (type === 'All' && !selectedType) ? 'active' : ''}`}
                                    onClick={() => setSelectedType(type === 'All' ? '' : type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="resources-grid">
                    {resources.length === 0 ? (
                        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                            <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>
                                No resources found. Try adjusting your filters.
                            </p>
                        </div>
                    ) : (
                        resources.map(resource => (
                            <div key={resource._id} className="resource-card glass-card">
                                <div className="resource-header-section">
                                    <div className="resource-type-icon">
                                        {getTypeIcon(resource.type)}
                                    </div>
                                    <div className="resource-badges">
                                        <span className="category-badge">
                                            {getCategoryIcon(resource.category)} {resource.category}
                                        </span>
                                        {resource.isPremium && (
                                            <span className="premium-badge">⭐ Premium</span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="resource-title">{resource.title}</h3>
                                <p className="resource-description">{resource.description}</p>

                                {resource.tags && resource.tags.length > 0 && (
                                    <div className="resource-tags">
                                        {resource.tags.slice(0, 4).map((tag, idx) => (
                                            <span key={idx} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="resource-meta">
                                    <div className="meta-item">
                                        <span>⭐ {resource.rating?.toFixed(1) || '0.0'}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span>📥 {resource.downloads || 0} downloads</span>
                                    </div>
                                </div>

                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary resource-btn"
                                >
                                    {resource.type === 'PDF' || resource.type === 'Template' ? 'Download' : 'View'} →
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
