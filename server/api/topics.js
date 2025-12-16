import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import Topic from '../models/Topic.js';
import Question from '../models/Question.js';
import { protect, requireAdmin } from '../middleware/auth.middleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// @route   GET /api/topics
// @desc    Get all topics with filters
// @access  Public
app.get('/', async (req, res) => {
    try {
        const { difficulty, category, search } = req.query;

        let query = {};

        if (difficulty) {
            query.difficulty = difficulty;
        }

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Fetch all topics and populate subtopics
        const topics = await Topic.find(query)
            .populate('subtopics')
            .populate('parentTopic')
            .sort({ order: 1, createdAt: -1 });

        res.json(topics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/topics/:id/questions
// @desc    Get all questions for a specific topic
// @access  Public
// IMPORTANT: This route must come BEFORE /:id to avoid matching 'questions' as an ID
app.get('/:id/questions', async (req, res) => {
    try {
        const { difficulty, search } = req.query;

        let query = { topic: req.params.id };

        if (difficulty) {
            query.difficulty = difficulty;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const questions = await Question.find(query)
            .populate('topic', 'title category')
            .sort({ difficulty: 1, createdAt: -1 });

        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/topics/:id
// @desc    Get topic by ID
// @access  Public
app.get('/:id', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id)
            .populate('subtopics')
            .populate('parentTopic')
            .populate('relatedTopics');

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.json(topic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/topics
// @desc    Create a new topic
// @access  Private/Admin
app.post('/', protect, requireAdmin, async (req, res) => {
    try {
        const topic = await Topic.create(req.body);
        res.status(201).json(topic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/topics/:id
// @desc    Update topic
// @access  Private/Admin
app.put('/:id', protect, requireAdmin, async (req, res) => {
    try {
        const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.json(topic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/topics/:id
// @desc    Delete topic
// @access  Private/Admin
app.delete('/:id', protect, requireAdmin, async (req, res) => {
    try {
        const topic = await Topic.findByIdAndDelete(req.params.id);

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.json({ message: 'Topic deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Export for Vercel serverless
export default app;
