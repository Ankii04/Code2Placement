import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import SkillAnalysis from '../../models/SkillAnalysis.js';
import aiService from '../../services/aiService.js';

const app = express();

// @route   GET /api/ai/challenges/daily
// @desc    Get personalized daily challenge
// @access  Private
app.get('/daily', protect, async (req, res) => {
    try {
        // Get user's weak topics
        const skillAnalysis = await SkillAnalysis.findOne({ user: req.user._id });

        let weakTopics = ['arrays']; // default
        let difficulty = 'MEDIUM';

        if (skillAnalysis) {
            const topicScores = skillAnalysis.dsaScore.topicScores;
            weakTopics = Object.entries(topicScores)
                .filter(([_, score]) => score < 50)
                .map(([topic]) => topic);

            // Adjust difficulty based on overall score
            const overall = skillAnalysis.dsaScore.overall;
            if (overall < 30) difficulty = 'EASY';
            else if (overall > 70) difficulty = 'HARD';
        }

        // Generate challenge
        const challenge = await aiService.generatePersonalizedChallenge(
            weakTopics.length > 0 ? weakTopics : ['arrays'],
            difficulty
        );

        res.json(challenge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/ai/challenges/submit
// @desc    Submit solution for evaluation
// @access  Private
app.post('/submit', protect, async (req, res) => {
    try {
        const { problem, solution } = req.body;

        if (!problem || !solution) {
            return res.status(400).json({ message: 'Problem and solution are required' });
        }

        // Evaluate solution
        const evaluation = await aiService.evaluateSolution(problem, solution);

        res.json(evaluation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
