import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import CompanyReadiness from '../../models/CompanyReadiness.js';
import SkillAnalysis from '../../models/SkillAnalysis.js';
import ResumeAnalysis from '../../models/ResumeAnalysis.js';
import MockInterview from '../../models/MockInterview.js';

const app = express();

// @route   GET /api/analytics/readiness
// @desc    Calculate company readiness scores
// @access  Private
app.get('/', protect, async (req, res) => {
    try {
        // Get all scores
        const skillAnalysis = await SkillAnalysis.findOne({ user: req.user._id });
        const resumeAnalysis = await ResumeAnalysis.findOne({ user: req.user._id })
            .sort({ analyzedAt: -1 });
        const interviews = await MockInterview.find({
            user: req.user._id,
            status: 'COMPLETED'
        }).sort({ completedAt: -1 }).limit(5);

        const dsaScore = skillAnalysis?.dsaScore.overall || 0;
        const csScore = skillAnalysis?.csFundamentals.overall || 0;
        const resumeScore = resumeAnalysis?.score || 0;
        const interviewScore = interviews.length > 0
            ? Math.round(interviews.reduce((sum, i) => sum + i.scores.overall, 0) / interviews.length)
            : 0;

        // Company weights and requirements
        const companyConfigs = [
            {
                name: 'TCS',
                weights: { dsa: 0.3, cs: 0.3, resume: 0.2, interview: 0.2 },
                recommendations: []
            },
            {
                name: 'Infosys',
                weights: { dsa: 0.35, cs: 0.25, resume: 0.2, interview: 0.2 },
                recommendations: []
            },
            {
                name: 'Wipro',
                weights: { dsa: 0.3, cs: 0.3, resume: 0.2, interview: 0.2 },
                recommendations: []
            },
            {
                name: 'Cognizant',
                weights: { dsa: 0.3, cs: 0.25, resume: 0.25, interview: 0.2 },
                recommendations: []
            },
            {
                name: 'Accenture',
                weights: { dsa: 0.25, cs: 0.25, resume: 0.25, interview: 0.25 },
                recommendations: []
            },
            {
                name: 'Amazon',
                weights: { dsa: 0.5, cs: 0.2, resume: 0.15, interview: 0.15 },
                recommendations: []
            },
            {
                name: 'Google',
                weights: { dsa: 0.55, cs: 0.2, resume: 0.1, interview: 0.15 },
                recommendations: []
            },
            {
                name: 'Microsoft',
                weights: { dsa: 0.5, cs: 0.25, resume: 0.1, interview: 0.15 },
                recommendations: []
            }
        ];

        const companies = companyConfigs.map(config => {
            const readinessScore = Math.round(
                (dsaScore * config.weights.dsa) +
                (csScore * config.weights.cs) +
                (resumeScore * config.weights.resume) +
                (interviewScore * config.weights.interview)
            );

            // Generate recommendations
            const recommendations = [];
            if (dsaScore < 60) recommendations.push('Improve DSA skills - solve more problems');
            if (csScore < 50) recommendations.push('Strengthen CS fundamentals');
            if (resumeScore < 70) recommendations.push('Optimize your resume for ATS');
            if (interviewScore < 60) recommendations.push('Practice mock interviews');

            return {
                name: config.name,
                readinessScore,
                breakdown: {
                    dsa: dsaScore,
                    cs: csScore,
                    resume: resumeScore,
                    interview: interviewScore
                },
                recommendations
            };
        });

        // Save to database
        await CompanyReadiness.findOneAndUpdate(
            { user: req.user._id },
            { companies, lastUpdated: new Date() },
            { upsert: true, new: true }
        );

        res.json(companies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/analytics/readiness/:company
// @desc    Get readiness for specific company
// @access  Private
app.get('/:company', protect, async (req, res) => {
    try {
        const readiness = await CompanyReadiness.findOne({ user: req.user._id });

        if (!readiness) {
            return res.status(404).json({ message: 'No readiness data found' });
        }

        const company = readiness.companies.find(
            c => c.name.toLowerCase() === req.params.company.toLowerCase()
        );

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
