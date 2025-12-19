import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content animate-fade-in">
                        <h1 className="hero-title">
                            Master <span className="gradient-text">DSA</span> & Ace Your
                            <br />
                            <span className="gradient-text">Dream Placements</span>
                        </h1>
                        <p className="hero-subtitle">
                            Your ultimate platform for mastering Data Structures & Algorithms,
                            acing coding interviews, and landing your dream job. Join thousands
                            of students preparing for success.
                        </p>
                        <div className="hero-actions">
                            {isAuthenticated ? (
                                <Link to="/dashboard" className="btn btn-primary btn-lg">
                                    Go to Dashboard →
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn-primary btn-lg">
                                        Get Started Free
                                    </Link>
                                    <Link to="/login" className="btn btn-secondary btn-lg">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <h2 className="section-title text-center">Everything You Need to Succeed</h2>
                    <div className="features-grid">
                        <div className="feature-card glass-card">
                            <div className="feature-icon">📚</div>
                            <h3>DSA Topics</h3>
                            <p>Comprehensive coverage of all data structures and algorithms with detailed explanations</p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-icon">💻</div>
                            <h3>Coding Questions</h3>
                            <p>Practice 500+ curated coding problems with solutions and test cases</p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-icon">💼</div>
                            <h3>Interview Prep</h3>
                            <p>Technical and HR interview questions from top companies</p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Daily Challenges</h3>
                            <p>Sharpen your skills with new coding challenges every day</p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-icon">🏆</div>
                            <h3>Mock Tests</h3>
                            <p>Simulate real interviews with company-specific mock tests</p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-icon">👥</div>
                            <h3>Community Forum</h3>
                            <p>Connect with peers, share experiences, and learn together</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number gradient-text">500+</div>
                            <div className="stat-label">Coding Problems</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number gradient-text">50+</div>
                            <div className="stat-label">DSA Topics</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number gradient-text">100+</div>
                            <div className="stat-label">Interview Q&A</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number gradient-text">10K+</div>
                            <div className="stat-label">Active Users</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content glass-card">
                        <h2>Ready to Start Your Journey?</h2>
                        <p>Join thousands of students preparing for their dream placements</p>
                        {!isAuthenticated && (
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Create Free Account
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
