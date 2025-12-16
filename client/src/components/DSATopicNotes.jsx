import { useState, useEffect } from 'react';
import axios from 'axios';
import DSAVisualizer from './DSAVisualizer';
import './DSATopicNotes.css';

const DSATopicNotes = ({ topic }) => {
    const [topicContent, setTopicContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedExample, setSelectedExample] = useState(0);

    useEffect(() => {
        fetchTopicContent();
    }, [topic._id]);

    const fetchTopicContent = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/topic-content/${topic._id}`);
            console.log('Fetched topic content:', data);
            setTopicContent(data);
        } catch (error) {
            console.log('No detailed content found, using basic topic data', error);
            setTopicContent(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="topic-notes">
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
                    <p style={{ color: 'var(--text-secondary)' }}>Loading teaching content...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="topic-notes">

            {/* Concept Explanation */}
            {topicContent?.concept && (
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📖</span> Concept
                    </h2>
                    <div style={{
                        lineHeight: '1.8',
                        color: 'var(--text-secondary)',
                        fontSize: '1.0625rem',
                        marginBottom: '1.5rem'
                    }}>
                        {topicContent.concept.explanation}
                    </div>

                    {/* Key Points */}
                    {topicContent.concept.keyPoints && topicContent.concept.keyPoints.length > 0 && (
                        <div style={{
                            background: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            marginTop: '1rem'
                        }}>
                            <h4 style={{ marginBottom: '1rem' }}>🔑 Key Points:</h4>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                {topicContent.concept.keyPoints.map((point, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.5rem', lineHeight: '1.7' }}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Complexity */}
                    {(topicContent.concept.timeComplexity || topicContent.concept.spaceComplexity) && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                            {topicContent.concept.timeComplexity && (
                                <div className="glass-card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ marginBottom: '0.75rem', color: 'var(--primary-color)' }}>⏱️ Time Complexity</h4>
                                    <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{topicContent.concept.timeComplexity}</p>
                                </div>
                            )}
                            {topicContent.concept.spaceComplexity && (
                                <div className="glass-card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ marginBottom: '0.75rem', color: 'var(--primary-color)' }}>💾 Space Complexity</h4>
                                    <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{topicContent.concept.spaceComplexity}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Visual Examples with Animation */}
            {topicContent?.visualExamples && topicContent.visualExamples.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🎬</span> Visual Learning
                    </h2>

                    {/* Example Selector */}
                    {topicContent.visualExamples.length > 1 && (
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                            {topicContent.visualExamples.map((example, idx) => (
                                <button
                                    key={idx}
                                    className={`btn ${selectedExample === idx ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setSelectedExample(idx)}
                                >
                                    {example.title || `Example ${idx + 1}`}
                                </button>
                            ))}
                        </div>
                    )}

                    <DSAVisualizer
                        topic={topic}
                        example={topicContent.visualExamples[selectedExample]}
                    />
                </div>
            )}

            {/* Fallback to basic topic content if no TopicContent */}
            {!topicContent && (
                <>
                    {/* Main Content */}
                    {topic.content && (
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>📖</span> Overview
                            </h2>
                            <div style={{
                                lineHeight: '1.8',
                                color: 'var(--text-secondary)',
                                whiteSpace: 'pre-wrap',
                                fontSize: '1.0625rem'
                            }}>
                                {topic.content}
                            </div>
                        </div>
                    )}

                    {/* Notes Section */}
                    {topic.notes && (
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>📝</span> Study Notes
                            </h2>
                            <div className="notes-content" style={{
                                lineHeight: '1.8',
                                color: 'var(--text-secondary)',
                                whiteSpace: 'pre-wrap',
                                fontSize: '1.0625rem',
                                background: 'var(--bg-secondary)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                borderLeft: '4px solid var(--primary-color)'
                            }}>
                                {topic.notes}
                            </div>
                        </div>
                    )}

                    {/* Complexity Analysis */}
                    {(topic.timeComplexity || topic.spaceComplexity) && (
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>⚡</span> Complexity Analysis
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                {topic.timeComplexity && (
                                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--primary-color)' }}>⏱️ Time Complexity</h4>
                                        <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{topic.timeComplexity}</p>
                                    </div>
                                )}
                                {topic.spaceComplexity && (
                                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--primary-color)' }}>💾 Space Complexity</h4>
                                        <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{topic.spaceComplexity}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Examples */}
                    {topic.examples && topic.examples.length > 0 && (
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>💻</span> Code Examples
                            </h2>
                            {topic.examples.map((example, index) => (
                                <div key={index} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <h4 style={{ marginBottom: '1rem' }}>
                                        {example.title || `Example ${index + 1}`}
                                    </h4>

                                    {example.input && (
                                        <div style={{ marginBottom: '1rem' }}>
                                            <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                                Input:
                                            </p>
                                            <pre style={{
                                                background: 'var(--bg-primary)',
                                                padding: '1rem',
                                                borderRadius: '8px',
                                                overflow: 'auto',
                                                fontSize: '0.9375rem'
                                            }}>
                                                <code>{example.input}</code>
                                            </pre>
                                        </div>
                                    )}

                                    {example.output && (
                                        <div style={{ marginBottom: '1rem' }}>
                                            <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                                Output:
                                            </p>
                                            <pre style={{
                                                background: 'var(--bg-primary)',
                                                padding: '1rem',
                                                borderRadius: '8px',
                                                overflow: 'auto',
                                                fontSize: '0.9375rem'
                                            }}>
                                                <code>{example.output}</code>
                                            </pre>
                                        </div>
                                    )}

                                    {example.code && (
                                        <div style={{ marginBottom: '1rem' }}>
                                            <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                                Code:
                                            </p>
                                            <pre style={{
                                                background: 'var(--bg-primary)',
                                                padding: '1rem',
                                                borderRadius: '8px',
                                                overflow: 'auto',
                                                fontSize: '0.9375rem',
                                                borderLeft: '3px solid var(--primary-color)'
                                            }}>
                                                <code>{example.code}</code>
                                            </pre>
                                        </div>
                                    )}

                                    {example.explanation && (
                                        <div style={{ marginTop: '1rem' }}>
                                            <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                                Explanation:
                                            </p>
                                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                                {example.explanation}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Common Patterns */}
            {topicContent?.commonPatterns && topicContent.commonPatterns.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🎯</span> Common Patterns
                    </h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {topicContent.commonPatterns.map((pattern, idx) => (
                            <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.75rem' }}>{pattern.name}</h4>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{pattern.description}</p>
                                {pattern.example && (
                                    <pre style={{
                                        background: 'var(--bg-primary)',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        overflow: 'auto',
                                        fontSize: '0.875rem'
                                    }}>
                                        <code>{pattern.example}</code>
                                    </pre>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tips */}
            {topicContent?.tips && topicContent.tips.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>💡</span> Pro Tips
                    </h2>
                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: '1.5rem',
                        borderRadius: '12px'
                    }}>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                            {topicContent.tips.map((tip, idx) => (
                                <li key={idx} style={{ marginBottom: '0.75rem', lineHeight: '1.7' }}>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Resources */}
            {topicContent?.resources && topicContent.resources.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📚</span> Additional Resources
                    </h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {topicContent.resources.map((resource, idx) => (
                            <a
                                key={idx}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card"
                                style={{
                                    padding: '1rem',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <div>
                                    <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>{resource.title}</h4>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {resource.type}
                                    </span>
                                </div>
                                <span style={{ fontSize: '1.5rem' }}>→</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Key Takeaways */}
            <div className="glass-card" style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                borderLeft: '4px solid var(--primary-color)'
            }}>
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>💡</span> Key Takeaways
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                    Master this topic by understanding the core concepts, practicing the examples above, and solving related questions in the Practice Questions section.
                </p>
            </div>
        </div>
    );
};

export default DSATopicNotes;

