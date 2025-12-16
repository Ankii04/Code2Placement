import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Video from '../models/Video.js';
import CourseProgress from '../models/CourseProgress.js';

const app = express();

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
app.get('/', async (req, res) => {
    try {
        const { category, creator } = req.query;

        let query = { isPublished: true };
        if (category) query.category = category;
        if (creator) query.creator = creator;

        const courses = await Course.find(query)
            .populate('modules')
            .sort({ order: 1 });

        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/courses/:id
// @desc    Get course details
// @access  Public
app.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate({
                path: 'modules',
                populate: { path: 'videos' }
            });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/courses/:id/progress
// @desc    Get user's course progress
// @access  Private
app.get('/:id/progress', protect, async (req, res) => {
    try {
        let progress = await CourseProgress.findOne({
            user: req.user._id,
            course: req.params.id
        }).populate('completedVideos.video');

        if (!progress) {
            progress = await CourseProgress.create({
                user: req.user._id,
                course: req.params.id
            });
        }

        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/courses/:id/videos/:videoId/complete
// @desc    Mark video as completed
// @access  Private
app.post('/:id/videos/:videoId/complete', protect, async (req, res) => {
    try {
        const progress = await CourseProgress.findOne({
            user: req.user._id,
            course: req.params.id
        });

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }

        // Check if already completed
        const alreadyCompleted = progress.completedVideos.some(
            cv => cv.video.toString() === req.params.videoId
        );

        if (!alreadyCompleted) {
            progress.completedVideos.push({
                video: req.params.videoId,
                completedAt: new Date()
            });

            // Calculate progress percentage
            const course = await Course.findById(req.params.id).populate('modules');
            const totalVideos = course.totalVideos || 0;
            progress.progress = totalVideos > 0
                ? Math.round((progress.completedVideos.length / totalVideos) * 100)
                : 0;

            if (progress.progress === 100) {
                progress.completedAt = new Date();
            }

            await progress.save();
        }

        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/courses/:id/videos/:videoId/watch
// @desc    Update last watched video
// @access  Private
app.post('/:id/videos/:videoId/watch', protect, async (req, res) => {
    try {
        const { timestamp } = req.body;

        const progress = await CourseProgress.findOneAndUpdate(
            { user: req.user._id, course: req.params.id },
            {
                lastWatched: {
                    video: req.params.videoId,
                    timestamp: timestamp || 0,
                    watchedAt: new Date()
                }
            },
            { upsert: true, new: true }
        );

        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
