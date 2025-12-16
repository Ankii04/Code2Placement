import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import MockInterview from '../../models/MockInterview.js';
import aiService from '../../services/aiService.js';

const app = express();

// @route   POST /api/ai/interview/start
// @desc    Start a new mock interview
// @access  Private
app.post('/start', protect, async (req, res) => {
    try {
        const { type } = req.body; // HR or TECHNICAL

        if (!['HR', 'TECHNICAL', 'BEHAVIORAL'].includes(type)) {
            return res.status(400).json({ message: 'Invalid interview type' });
        }

        // Generate questions
        const { questions } = await aiService.generateInterviewQuestions(type, 10);

        // Create interview session
        const interview = await MockInterview.create({
            user: req.user._id,
            type,
            questions: questions.map(q => ({
                question: q.question,
                userAnswer: '',
                aiEvaluation: '',
                score: 0
            })),
            status: 'IN_PROGRESS'
        });

        res.json({
            interviewId: interview._id,
            type: interview.type,
            questions: interview.questions.map(q => ({ question: q.question }))
        });
    } catch (error) {
        console.error('Interview Start Error:', error);

        // Handle quota limits
        if (error.status === 429 || error.message?.includes('429') || error.message?.includes('Quota')) {
            return res.status(429).json({
                message: 'AI Service Quota Exceeded. Please wait 60 seconds and try again.'
            });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/ai/interview/:id/answer
// @desc    Submit answer for a question
// @access  Private
app.post('/:id/answer', protect, async (req, res) => {
    try {
        const { questionIndex, answer } = req.body;

        const interview = await MockInterview.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        if (questionIndex >= interview.questions.length) {
            return res.status(400).json({ message: 'Invalid question index' });
        }

        // Evaluate answer
        const question = interview.questions[questionIndex].question;
        const evaluation = await aiService.evaluateAnswer(question, answer);

        // Update interview
        interview.questions[questionIndex].userAnswer = answer;
        interview.questions[questionIndex].aiEvaluation = evaluation.feedback;
        interview.questions[questionIndex].score = evaluation.score;
        interview.questions[questionIndex].feedback = evaluation.feedback;

        await interview.save();

        res.json({
            evaluation,
            nextQuestion: questionIndex + 1 < interview.questions.length
                ? interview.questions[questionIndex + 1].question
                : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/ai/interview/:id/complete
// @desc    Complete interview and get final scores
// @access  Private
app.post('/:id/complete', protect, async (req, res) => {
    try {
        const interview = await MockInterview.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        // Calculate scores properly
        const totalScore = interview.questions.reduce((sum, q) => sum + (q.score || 0), 0);
        const avgScore = totalScore / interview.questions.length;

        // Calculate average for each metric from AI evaluations
        let totalConfidence = 0, totalClarity = 0, totalAccuracy = 0, totalCommunication = 0;
        let count = 0;

        interview.questions.forEach(q => {
            if (q.aiEvaluation) {
                try {
                    // AI evaluation might be a string, try to parse if needed
                    const evaluation = typeof q.aiEvaluation === 'string' ? JSON.parse(q.aiEvaluation) : q.aiEvaluation;
                    totalConfidence += evaluation.confidence || 0;
                    totalClarity += evaluation.clarity || 0;
                    totalAccuracy += evaluation.accuracy || 0;
                    totalCommunication += evaluation.communication || 0;
                    count++;
                } catch (e) {
                    // If parsing fails, use default values
                }
            }
        });

        // Scores are already on 0-10 scale from AI, just round the averages
        interview.scores.overall = Math.round(avgScore);
        interview.scores.confidence = count > 0 ? Math.round(totalConfidence / count) : Math.round(avgScore);
        interview.scores.clarity = count > 0 ? Math.round(totalClarity / count) : Math.round(avgScore);
        interview.scores.accuracy = count > 0 ? Math.round(totalAccuracy / count) : Math.round(avgScore);
        interview.scores.communication = count > 0 ? Math.round(totalCommunication / count) : Math.round(avgScore);
        interview.status = 'COMPLETED';
        interview.completedAt = new Date();

        await interview.save();

        res.json(interview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/ai/interview/history
// @desc    Get interview history
// @access  Private
app.get('/history', protect, async (req, res) => {
    try {
        const interviews = await MockInterview.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(20);

        res.json(interviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
