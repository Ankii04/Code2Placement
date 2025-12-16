import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="gradient-text">Code2Placement</h3>
                        <p>Your ultimate platform for DSA and placement preparation.</p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/topics">DSA Topics</Link></li>
                            <li><Link to="/questions">Questions</Link></li>
                            <li><Link to="/interview-qa">Interview Q&A</Link></li>
                            <li><Link to="/roadmaps">Roadmaps</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Resources</h4>
                        <ul className="footer-links">
                            <li><Link to="/resources">Study Materials</Link></li>
                            <li><Link to="/daily-challenge">Daily Challenge</Link></li>
                            <li><Link to="/forum">Community Forum</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Connect</h4>
                        <div className="social-links">
                            <a href="#" aria-label="GitHub">GitHub</a>
                            <a href="#" aria-label="LinkedIn">LinkedIn</a>
                            <a href="#" aria-label="Twitter">Twitter</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Code2Placement. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
