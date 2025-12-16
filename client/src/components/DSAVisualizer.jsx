import { useState, useEffect } from 'react';
import './DSAVisualizer.css';

const DSAVisualizer = ({ topic, example }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(2000); // Slower default speed

    // Auto-play animation
    useEffect(() => {
        let interval;
        if (isPlaying && example?.steps) {
            interval = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev >= example.steps.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, speed);
        }
        return () => clearInterval(interval);
    }, [isPlaying, speed, example]);

    if (!example || !example.steps || example.steps.length === 0) {
        return (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No visualization available for this topic yet.</p>
            </div>
        );
    }

    const currentStepData = example.steps[currentStep];

    const handleNext = () => {
        if (currentStep < example.steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (currentStep >= example.steps.length - 1) {
            setCurrentStep(0);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="dsa-visualizer glass-card" style={{ padding: '2.5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    <span style={{ filter: 'none', WebkitTextFillColor: 'initial' }}>🎬</span>
                    {example.title || 'Visual Example'}
                </h3>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--primary-color)'
                    }}>
                        Step {currentStep + 1} of {example.steps.length}
                    </div>
                    {isPlaying && (
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(245, 87, 108, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#f5576c',
                            animation: 'pulse 1.5s infinite'
                        }}>
                            ▶️ Playing...
                        </div>
                    )}
                </div>
            </div>

            {/* Visualization Area */}
            <div className="visualization-container" style={{
                background: 'var(--bg-secondary)',
                borderRadius: '16px',
                padding: '3rem 2rem',
                marginBottom: '2rem',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Step Description - Prominent */}
                <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    borderLeft: '5px solid var(--primary-color)',
                    marginBottom: '3rem',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
                    animation: 'slideInDown 0.5s ease-out'
                }}>
                    <div style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'var(--primary-color)',
                        marginBottom: '0.5rem',
                        fontWeight: '700'
                    }}>
                        Current Step
                    </div>
                    <p style={{
                        margin: 0,
                        fontWeight: '600',
                        fontSize: '1.125rem',
                        lineHeight: '1.6',
                        color: 'var(--text-primary)'
                    }}>
                        {currentStepData.description}
                    </p>
                </div>

                {/* Visualization - Larger and More Prominent */}
                {currentStepData.visualization && (
                    <div
                        className="visualization-content"
                        style={{
                            marginBottom: '2rem',
                            fontSize: '2.5rem',
                            fontFamily: 'monospace',
                            display: 'flex',
                            gap: '0.75rem',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '700px',
                            animation: 'zoomIn 0.6s ease-out'
                        }}
                        dangerouslySetInnerHTML={{ __html: currentStepData.visualization }}
                    />
                )}

                {/* Code Snippet for Current Step */}
                {currentStepData.code && (
                    <div style={{ width: '100%', maxWidth: '700px', animation: 'fadeInUp 0.5s ease-out' }}>
                        <div style={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: 'var(--text-secondary)',
                            marginBottom: '0.75rem',
                            fontWeight: '700'
                        }}>
                            💻 Code
                        </div>
                        <pre style={{
                            background: 'var(--bg-primary)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            overflow: 'auto',
                            fontSize: '0.9375rem',
                            borderLeft: '4px solid #10b981',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            lineHeight: '1.6'
                        }}>
                            <code>{currentStepData.code}</code>
                        </pre>
                    </div>
                )}
            </div>

            {/* Controls Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Progress Bar - Enhanced */}
                <div style={{ width: '100%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)'
                    }}>
                        <span>Progress</span>
                        <span>{Math.round(((currentStep + 1) / example.steps.length) * 100)}%</span>
                    </div>
                    <div style={{
                        height: '12px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${((currentStep + 1) / example.steps.length) * 100}%`,
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                            transition: 'width 0.5s ease',
                            borderRadius: '6px',
                            boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
                        }} />
                    </div>
                </div>

                {/* Button Controls - Enhanced */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    padding: '1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '12px'
                }}>
                    <button
                        className="btn btn-secondary"
                        onClick={handleReset}
                        disabled={currentStep === 0 && !isPlaying}
                        style={{
                            minWidth: '110px',
                            fontSize: '1rem',
                            padding: '0.75rem 1.5rem'
                        }}
                    >
                        ⏮️ Reset
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={handlePrev}
                        disabled={currentStep === 0 || isPlaying}
                        style={{
                            minWidth: '110px',
                            fontSize: '1rem',
                            padding: '0.75rem 1.5rem'
                        }}
                    >
                        ⏪ Prev
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={togglePlay}
                        style={{
                            minWidth: '140px',
                            fontSize: '1.125rem',
                            padding: '0.75rem 2rem',
                            fontWeight: '700',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                        }}
                    >
                        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={handleNext}
                        disabled={currentStep >= example.steps.length - 1 || isPlaying}
                        style={{
                            minWidth: '110px',
                            fontSize: '1rem',
                            padding: '0.75rem 1.5rem'
                        }}
                    >
                        Next ⏩
                    </button>
                </div>

                {/* Speed Control - Enhanced */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    justifyContent: 'center',
                    padding: '1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '12px'
                }}>
                    <label style={{
                        fontSize: '0.9375rem',
                        color: 'var(--text-secondary)',
                        fontWeight: '600'
                    }}>
                        ⚡ Animation Speed:
                    </label>
                    <select
                        className="input"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        style={{
                            width: 'auto',
                            padding: '0.75rem 1rem',
                            fontSize: '0.9375rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        <option value={3000}>🐢 Slow (3s per step)</option>
                        <option value={2000}>🚶 Normal (2s per step)</option>
                        <option value={1000}>🏃 Fast (1s per step)</option>
                        <option value={500}>⚡ Very Fast (0.5s per step)</option>
                    </select>
                </div>

                {/* Step Indicators */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    padding: '1rem'
                }}>
                    {example.steps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => !isPlaying && setCurrentStep(index)}
                            disabled={isPlaying}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: 'none',
                                background: index === currentStep
                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    : index < currentStep
                                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                        : 'var(--bg-secondary)',
                                color: index <= currentStep ? 'white' : 'var(--text-secondary)',
                                cursor: isPlaying ? 'not-allowed' : 'pointer',
                                fontWeight: '700',
                                fontSize: '0.875rem',
                                transition: 'all 0.3s ease',
                                boxShadow: index === currentStep ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none',
                                transform: index === currentStep ? 'scale(1.1)' : 'scale(1)'
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DSAVisualizer;
