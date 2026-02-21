import express from 'express';
import Question from '../models/Question.js';
import { protect, requireAdmin } from '../middleware/auth.middleware.js';

const app = express();

// @route   GET /api/questions
// @desc    Get all questions with filters
// @access  Public
app.get('/', async (req, res) => {
    try {
        const { difficulty, topic, search, company } = req.query;

        let query = {};

        if (difficulty) {
            query.difficulty = difficulty;
        }

        if (topic) {
            query.topic = topic;
        }

        if (company) {
            query.companies = { $in: [company] };
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const questions = await Question.find(query)
            .populate('topic', 'title category')
            .sort({ createdAt: -1 });

        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/questions/:id
// @desc    Get question by ID
// @access  Public
app.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('topic');

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/questions
// @desc    Create a new question
// @access  Private/Admin
app.post('/', protect, requireAdmin, async (req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(201).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/questions/:id
// @desc    Update question
// @access  Private/Admin
app.put('/:id', protect, requireAdmin, async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/questions/:id
// @desc    Delete question
// @access  Private/Admin
app.delete('/:id', protect, requireAdmin, async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Export for Vercel serverless
export default app;
