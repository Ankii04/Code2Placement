import express from 'express';
import TopicContent from '../models/TopicContent.js';
import { protect } from '../middleware/auth.middleware.js';

const app = express();

// @route   GET /api/topic-content/:topicId
// @desc    Get detailed content for a topic
// @access  Public
app.get('/:topicId', async (req, res) => {
    try {
        const content = await TopicContent.findOne({ topic: req.params.topicId })
            .populate('topic', 'title category icon');

        if (!content) {
            return res.status(404).json({ message: 'Content not found for this topic' });
        }

        res.json(content);
    } catch (error) {
        console.error('Topic Content Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/topic-content
// @desc    Create or update topic content
// @access  Private/Admin
app.post('/', protect, async (req, res) => {
    try {
        const { topic, title, description, concept, visualExamples, commonPatterns, tips, resources } = req.body;

        let content = await TopicContent.findOne({ topic });

        if (content) {
            // Update existing
            content.title = title || content.title;
            content.description = description || content.description;
            content.concept = concept || content.concept;
            content.visualExamples = visualExamples || content.visualExamples;
            content.commonPatterns = commonPatterns || content.commonPatterns;
            content.tips = tips || content.tips;
            content.resources = resources || content.resources;
            await content.save();
        } else {
            // Create new
            content = await TopicContent.create({
                topic,
                title,
                description,
                concept,
                visualExamples,
                commonPatterns,
                tips,
                resources
            });
        }

        res.json(content);
    } catch (error) {
        console.error('Create/Update Content Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
