import express from 'express';
import { protect, authorize } from '../../middleware/auth.middleware.js';
import Announcement from '../../models/Announcement.js';

const app = express();

// @route   GET /api/tpo/announcements
// @desc    Get all announcements
// @access  Public
app.get('/', async (req, res) => {
    try {
        const { type, targetAudience } = req.query;

        let query = {};
        if (type) query.type = type;
        if (targetAudience) query.targetAudience = targetAudience;

        const announcements = await Announcement.find(query)
            .populate('postedBy', 'name email')
            .sort({ isPinned: -1, createdAt: -1 })
            .limit(50);

        res.json(announcements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/tpo/announcements
// @desc    Create announcement
// @access  Private (TPO only)
app.post('/', protect, authorize('tpo', 'admin'), async (req, res) => {
    try {
        const { title, content, type, attachments, targetAudience, branch, isPinned, expiresAt } = req.body;

        const announcement = await Announcement.create({
            title,
            content,
            type,
            attachments,
            postedBy: req.user._id,
            targetAudience,
            branch,
            isPinned,
            expiresAt
        });

        res.status(201).json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/tpo/announcements/:id
// @desc    Update announcement
// @access  Private (TPO only)
app.put('/:id', protect, authorize('tpo', 'admin'), async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/tpo/announcements/:id
// @desc    Delete announcement
// @access  Private (TPO only)
app.delete('/:id', protect, authorize('tpo', 'admin'), async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.json({ message: 'Announcement deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/tpo/announcements/:id/view
// @desc    Increment view count
// @access  Public
app.post('/:id/view', async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            { $inc: { viewCount: 1 } },
            { new: true }
        );

        res.json({ viewCount: announcement.viewCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
