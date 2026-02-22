import express from 'express';
import Resource from '../models/Resource.js';
import { protect, requireAdmin } from '../middleware/auth.middleware.js';

const app = express();

// @route   GET /api/resources
// @desc    Get all resources with filters
// @access  Public
app.get('/', async (req, res) => {
    try {
        const { category, type, search } = req.query;
        let query = {};

        if (category) query.category = category;
        if (type) query.type = type;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const resources = await Resource.find(query).sort({ rating: -1, createdAt: -1 });
        res.json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/resources
// @desc    Create a resource
// @access  Private/Admin
app.post('/', protect, requireAdmin, async (req, res) => {
    try {
        const resource = await Resource.create(req.body);
        res.status(201).json(resource);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
