import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import UserProgress from '../models/UserProgress.js';
import { protect } from '../middleware/auth.middleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
app.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password');

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
app.put('/profile', protect, async (req, res) => {
    try {
        const { name } = req.body;

        const user = await User.findById(req.user._id);

        if (user) {
            user.name = name || user.name;
            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/users/github-connect
// @desc    Connect GitHub account
// @access  Private
app.post('/github-connect', protect, async (req, res) => {
    try {
        const { githubUsername } = req.body;

        const user = await User.findById(req.user._id);

        if (user) {
            user.githubConnected = true;
            user.githubUsername = githubUsername;
            await user.save();

            res.json({ message: 'GitHub connected successfully', githubUsername });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
app.get('/stats', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const userProgress = await UserProgress.findOne({ user: req.user._id });

        const stats = {
            topicsCompleted: user.progress?.topicsCompleted?.length || 0,
            questionsCompleted: userProgress?.totalSolved || user.progress?.questionsCompleted?.length || 0,
            totalScore: userProgress?.totalSolved ? (userProgress.totalSolved * 10) : (user.progress?.totalScore || 0),
            badges: user.badges?.length || 0
        };

        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Export for Vercel serverless
export default app;
