import express from 'express';
import DailyChallenge from '../models/DailyChallenge.js';
import UserChallengeStatus from '../models/UserChallengeStatus.js';
import { protect, requireAdmin } from '../middleware/auth.middleware.js';

const app = express();

// GET today's challenge
app.get('/today', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let challenge = await DailyChallenge.findOne({ date: today });

        if (!challenge) {
            return res.status(404).json({ message: 'No challenge for today' });
        }

        res.json(challenge);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// SUBMIT challenge solution
app.post('/submit', protect, async (req, res) => {
    try {
        const { challengeId, code, timeTaken } = req.body;

        const status = await UserChallengeStatus.findOneAndUpdate(
            { userId: req.user._id, challengeId },
            {
                userId: req.user._id,
                challengeId,
                code,
                timeTaken,
                completed: true,
                submittedAt: new Date()
            },
            { upsert: true, new: true }
        );

        await DailyChallenge.findByIdAndUpdate(challengeId, {
            $inc: { submissions: 1, successfulSubmissions: 1 }
        });

        res.json({ message: 'Challenge submitted successfully', status });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// CREATE daily challenge (Admin only)
app.post('/', protect, requireAdmin, async (req, res) => {
    try {
        const challenge = await DailyChallenge.create(req.body);
        res.status(201).json(challenge);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
