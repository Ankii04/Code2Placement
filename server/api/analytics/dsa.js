import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import SkillAnalysis from '../../models/SkillAnalysis.js';
import UserProgress from '../../models/UserProgress.js';
import Question from '../../models/Question.js';
import Topic from '../../models/Topic.js';

const app = express();

// @route   GET /api/analytics/dsa/score
// @desc    Calculate and return DSA score
// @access  Private
// @route   GET /api/analytics/dsa/score
// @desc    Calculate and return DSA score
// @access  Private
app.get('/score', protect, async (req, res) => {
    try {
        const { refresh } = req.query;

        // Check for cached analysis first
        const cachedAnalysis = await SkillAnalysis.findOne({ user: req.user._id });

        // If cached analysis exists and not refreshing, return it
        if (cachedAnalysis && !refresh) {
            return res.json({
                overall: cachedAnalysis.dsaScore.overall,
                topicScores: cachedAnalysis.dsaScore.topicScores,
                problemsSolved: cachedAnalysis.dsaScore.problemsSolved,
                accuracy: cachedAnalysis.dsaScore.accuracy,
                strengths: cachedAnalysis.dsaScore.strengths,
                weaknesses: cachedAnalysis.dsaScore.weaknesses
            });
        }

        const [progress, topics] = await Promise.all([
            UserProgress.findOne({ user: req.user._id }).populate('solvedQuestions.question'),
            Topic.find({ isMainCategory: true })
        ]);

        if (!progress) {
            return res.json({
                overall: 0,
                topicScores: {},
                problemsSolved: 0,
                accuracy: 0,
                strengths: [],
                weaknesses: []
            });
        }

        const topicNames = {
            'Basics': 'basics',
            'Arrays': 'arrays',
            'Strings': 'strings',
            'Linked List': 'linkedList',
            'Stack': 'stack',
            'Queue': 'queue',
            'Trees': 'trees',
            'Graphs': 'graphs',
            'Recursion & Backtracking': 'recursion',
            'Dynamic Programming': 'dynamicProgramming',
            'Greedy Algorithms': 'greedy',
            'Searching & Sorting': 'searchingAndSorting',
            'Bit Manipulation': 'bitManipulation',
            'Hashing': 'hashing',
            'Advanced Data Structures': 'advancedDS',
            'Mathematics for DSA': 'mathematics',
            'Miscellaneous': 'miscellaneous'
        };

        // Calculate topic-wise scores in parallel
        const topicCalculations = topics.map(async (topic) => {
            const topicKey = topicNames[topic.title] || topic.title.toLowerCase().replace(/\s+/g, '');

            // Find all subtopics of this main topic
            const subtopics = await Topic.find({ parentTopic: topic._id }).select('_id');
            const subtopicIds = [topic._id, ...subtopics.map(s => s._id)];

            const totalQuestions = await Question.countDocuments({
                topic: { $in: subtopicIds }
            });

            const solvedInThisTopic = progress.solvedQuestions.filter(sq =>
                sq.question && sq.question.topic &&
                subtopicIds.some(id => id.toString() === sq.question.topic.toString())
            ).length;

            return {
                key: topicKey,
                score: totalQuestions > 0 ? Math.round((solvedInThisTopic / totalQuestions) * 100) : 0
            };
        });

        const calculatedScores = await Promise.all(topicCalculations);
        const topicScores = {};
        calculatedScores.forEach(item => {
            topicScores[item.key] = item.score;
        });

        // Calculate overall score
        const scores = Object.values(topicScores);
        const overall = scores.length > 0
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;

        // Determine strengths and weaknesses
        const strengths = Object.entries(topicScores)
            .filter(([_, score]) => score >= 70)
            .map(([topic]) => topic);

        const weaknesses = Object.entries(topicScores)
            .filter(([_, score]) => score < 50 && score > 0) // Only mark as weakness if attempted or we want to show all? 
            .map(([topic]) => topic);

        // Update or create skill analysis
        const updatedAnalysis = await SkillAnalysis.findOneAndUpdate(
            { user: req.user._id },
            {
                'dsaScore.overall': overall,
                'dsaScore.topicScores': topicScores,
                'dsaScore.problemsSolved': progress.totalSolved,
                'dsaScore.accuracy': 85,
                'dsaScore.strengths': strengths,
                'dsaScore.weaknesses': weaknesses,
                lastCalculated: new Date()
            },
            { upsert: true, new: true }
        );

        res.json({
            overall,
            topicScores,
            problemsSolved: progress.totalSolved,
            accuracy: 85,
            strengths,
            weaknesses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/analytics/dsa/heatmap
// @desc    Get topic heatmap data
// @access  Private
app.get('/heatmap', protect, async (req, res) => {
    try {
        const skillAnalysis = await SkillAnalysis.findOne({ user: req.user._id });

        if (!skillAnalysis) {
            return res.json([]);
        }

        const heatmapData = Object.entries(skillAnalysis.dsaScore.topicScores).map(([topic, score]) => ({
            topic,
            score,
            level: score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low'
        }));

        res.json(heatmapData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
