import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import ForumThread from '../models/ForumThread.js';
import ForumReply from '../models/ForumReply.js';
import { protect, requireAdmin } from '../middleware/auth.middleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// GET all threads
app.get('/threads', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category) query.category = category;
        if (search) query.title = { $regex: search, $options: 'i' };

        const threads = await ForumThread.find(query)
            .populate('userId', 'name email')
            .sort({ isPinned: -1, createdAt: -1 });

        res.json(threads);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET single thread with replies
app.get('/threads/:id', async (req, res) => {
    try {
        const thread = await ForumThread.findById(req.params.id).populate('userId', 'name email');
        if (!thread) return res.status(404).json({ message: 'Thread not found' });

        thread.views += 1;
        await thread.save();

        const replies = await ForumReply.find({ threadId: req.params.id })
            .populate('userId', 'name email')
            .sort({ createdAt: 1 });

        res.json({ thread, replies });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// CREATE thread
app.post('/threads', protect, async (req, res) => {
    try {
        const thread = await ForumThread.create({
            ...req.body,
            userId: req.user._id
        });
        res.status(201).json(thread);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// REPLY to thread
app.post('/threads/:id/reply', protect, async (req, res) => {
    try {
        const reply = await ForumReply.create({
            threadId: req.params.id,
            userId: req.user._id,
            content: req.body.content
        });

        await ForumThread.findByIdAndUpdate(req.params.id, {
            $inc: { replyCount: 1 }
        });

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// LIKE thread
app.put('/threads/:id/like', protect, async (req, res) => {
    try {
        const thread = await ForumThread.findById(req.params.id);

        const index = thread.likes.indexOf(req.user._id);
        if (index > -1) {
            thread.likes.splice(index, 1);
        } else {
            thread.likes.push(req.user._id);
        }

        await thread.save();
        res.json({ likes: thread.likes.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
