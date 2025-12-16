import express from 'express';
import { protect, requireAdmin } from '../middleware/auth.middleware.js';
import User from '../models/User.js';
import Topic from '../models/Topic.js';
import Question from '../models/Question.js';

const app = express();

// @route   GET /api/misc/stats
// @desc    Get platform statistics
// @access  Private/Admin
app.get('/stats', protect, requireAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTopics = await Topic.countDocuments();
        const totalQuestions = await Question.countDocuments();

        // Active users in last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const activeUsers = await User.countDocuments({
            lastActive: { $gte: sevenDaysAgo }
        });

        res.json({
            totalUsers,
            totalTopics,
            totalQuestions,
            activeUsers
        });
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/misc/users
// @desc    Get all users
// @access  Private/Admin
app.get('/users', protect, requireAdmin, async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.json(users);
    } catch (error) {
        console.error('Users Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/misc/users/:id/role
// @desc    Update user role
// @access  Private/Admin
app.put('/users/:id/role', protect, requireAdmin, async (req, res) => {
    try {
        const { role } = req.body;

        if (!['USER', 'ADMIN'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated successfully', user: { _id: user._id, role: user.role } });
    } catch (error) {
        console.error('Update Role Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
