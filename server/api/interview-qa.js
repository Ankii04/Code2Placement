import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import InterviewQA from '../models/InterviewQA.js';
import { protect, requireAdmin } from '../middleware/auth.middleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// GET all interview Q&A with filters
app.get('/', async (req, res) => {
    try {
        const { category, subcategory, difficulty, search } = req.query;
        let query = {};

        if (category) query.category = category;
        if (subcategory) query.subcategory = subcategory;
        if (difficulty) query.difficulty = difficulty;
        if (search) {
            query.$or = [
                { question: { $regex: search, $options: 'i' } },
                { answer: { $regex: search, $options: 'i' } }
            ];
        }

        const interviewQAs = await InterviewQA.find(query).sort({ createdAt: -1 });
        res.json(interviewQAs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET single interview Q&A
app.get('/:id', async (req, res) => {
    try {
        const qa = await InterviewQA.findById(req.params.id);
        if (!qa) return res.status(404).json({ message: 'Q&A not found' });

        qa.views += 1;
        await qa.save();
        res.json(qa);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// CREATE interview Q&A (Admin only)
app.post('/', protect, requireAdmin, async (req, res) => {
    try {
        const qa = await InterviewQA.create(req.body);
        res.status(201).json(qa);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// UPDATE interview Q&A (Admin only)
app.put('/:id', protect, requireAdmin, async (req, res) => {
    try {
        const qa = await InterviewQA.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!qa) return res.status(404).json({ message: 'Q&A not found' });
        res.json(qa);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE interview Q&A (Admin only)
app.delete('/:id', protect, requireAdmin, async (req, res) => {
    try {
        const qa = await InterviewQA.findByIdAndDelete(req.params.id);
        if (!qa) return res.status(404).json({ message: 'Q&A not found' });
        res.json({ message: 'Q&A deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
