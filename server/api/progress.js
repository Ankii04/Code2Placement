import express from 'express';
import UserProgress from '../models/UserProgress.js';
import { protect } from '../middleware/auth.middleware.js';

const app = express();

app.use(express.json());

// @route   GET /api/progress
// @desc    Get user's progress
// @access  Private
app.get('/', protect, async (req, res) => {
    try {
        let progress = await UserProgress.findOne({ user: req.user._id })
            .populate('solvedQuestions.question', 'title difficulty');

        if (!progress) {
            progress = await UserProgress.create({ user: req.user._id });
        }

        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/progress/toggle/:questionId
// @desc    Toggle question solved status
// @access  Private
app.post('/toggle/:questionId', protect, async (req, res) => {
    try {
        let progress = await UserProgress.findOne({ user: req.user._id });

        if (!progress) {
            progress = await UserProgress.create({ user: req.user._id });
        }

        const questionIndex = progress.solvedQuestions.findIndex(
            q => q.question.toString() === req.params.questionId
        );

        if (questionIndex > -1) {
            // Remove question (mark as unsolved)
            progress.solvedQuestions.splice(questionIndex, 1);
        } else {
            // Add question (mark as solved)
            progress.solvedQuestions.push({
                question: req.params.questionId,
                solvedAt: new Date()
            });
        }

        // Update counts
        await progress.save();
        await progress.populate('solvedQuestions.question', 'title difficulty');

        // Recalculate statistics
        progress.totalSolved = progress.solvedQuestions.length;
        progress.easyCount = progress.solvedQuestions.filter(
            q => q.question?.difficulty === 'EASY'
        ).length;
        progress.mediumCount = progress.solvedQuestions.filter(
            q => q.question?.difficulty === 'MEDIUM'
        ).length;
        progress.hardCount = progress.solvedQuestions.filter(
            q => q.question?.difficulty === 'HARD'
        ).length;

        await progress.save();

        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/progress/stats
// @desc    Get user's statistics
// @access  Private
app.get('/stats', protect, async (req, res) => {
    try {
        const progress = await UserProgress.findOne({ user: req.user._id });

        if (!progress) {
            return res.json({
                totalSolved: 0,
                easyCount: 0,
                mediumCount: 0,
                hardCount: 0
            });
        }

        res.json({
            totalSolved: progress.totalSolved,
            easyCount: progress.easyCount,
            mediumCount: progress.mediumCount,
            hardCount: progress.hardCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
