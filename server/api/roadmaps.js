import express from 'express';
import Roadmap from '../models/Roadmap.js';
import { protect, requireAdmin } from '../middleware/auth.middleware.js';

const app = express();

// @route   GET /api/roadmaps
// @desc    Get all roadmaps
// @access  Public
app.get('/', async (req, res) => {
    try {
        const { goal, difficulty } = req.query;
        let query = {};

        if (goal) query.goal = goal;
        if (difficulty) query.difficulty = difficulty;

        const roadmaps = await Roadmap.find(query).sort({ createdAt: -1 });
        res.json(roadmaps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/roadmaps/:id
// @desc    Get roadmap by ID
// @access  Public
app.get('/:id', async (req, res) => {
    try {
        const roadmap = await Roadmap.findById(req.params.id);
        if (!roadmap) {
            return res.status(404).json({ message: 'Roadmap not found' });
        }
        res.json(roadmap);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/roadmaps
// @desc    Create a roadmap
// @access  Private/Admin
app.post('/', protect, requireAdmin, async (req, res) => {
    try {
        const roadmap = await Roadmap.create(req.body);
        res.status(201).json(roadmap);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
