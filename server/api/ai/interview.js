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

        // Generate questions - Reduced to 5 for speed and focus
        const { questions } = await aiService.generateInterviewQuestions(type, 5);

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

        // 🚀 OPTIMIZATION: Return next question immediately
        // Start evaluation in background
        const question = interview.questions[questionIndex].question;

        // Save the answer first so it's not lost
        interview.questions[questionIndex].userAnswer = answer;
        await interview.save();

        // Fire evaluation in background
        aiService.evaluateAnswer(question, answer).then(async (evaluation) => {
            try {
                // Fetch fresh copy to avoid version conflicts
                const activeInterview = await MockInterview.findById(interview._id);
                activeInterview.questions[questionIndex].aiEvaluation = evaluation.feedback;
                activeInterview.questions[questionIndex].score = evaluation.score;
                activeInterview.questions[questionIndex].feedback = evaluation.feedback;
                activeInterview.questions[questionIndex].confidence = evaluation.confidence;
                activeInterview.questions[questionIndex].clarity = evaluation.clarity;
                activeInterview.questions[questionIndex].accuracy = evaluation.accuracy;
                activeInterview.questions[questionIndex].communication = evaluation.communication;
                await activeInterview.save();
            } catch (err) {
                console.error('Background Evaluation Save Error:', err);
            }
        }).catch(err => {
            console.error('Background Evaluation Error:', err);
        });

        res.json({
            status: 'submitted',
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
        let interview = await MockInterview.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        // 🚀 OPTIMIZATION: Wait for pending background evaluations (max 5s)
        let attempts = 0;
        let isFullyEvaluated = false;
        while (attempts < 10) {
            const pendingAnswers = interview.questions.filter(q => q.userAnswer && !q.aiEvaluation);
            if (pendingAnswers.length === 0) {
                isFullyEvaluated = true;
                break;
            }
            console.log(`Waiting for ${pendingAnswers.length} pending evaluations... attempt ${attempts + 1}`);
            await new Promise(r => setTimeout(r, 500));
            interview = await MockInterview.findOne({ _id: req.params.id });
            attempts++;
        }

        // Calculate scores properly
        const totalScore = interview.questions.reduce((sum, q) => sum + (q.score || 0), 0);
        const avgScore = totalScore / (interview.questions.filter(q => q.userAnswer).length || 1);

        // Calculate average for each metric from AI evaluations
        let metrics = { confidence: 0, clarity: 0, accuracy: 0, communication: 0 };
        let evaluatiedCount = 0;

        interview.questions.forEach(q => {
            if (q.aiEvaluation) {
                metrics.confidence += q.confidence || 0;
                metrics.clarity += q.clarity || 0;
                metrics.accuracy += q.accuracy || 0;
                metrics.communication += q.communication || 0;
                evaluatiedCount++;
            }
        });

        // Scores are on 0-10 or 0-100 scale from AI
        interview.scores.overall = Math.round(avgScore);
        const calcMetric = (val) => evaluatiedCount > 0 ? Math.round(val / evaluatiedCount) : Math.round(avgScore * 10);

        interview.scores.confidence = calcMetric(metrics.confidence);
        interview.scores.clarity = calcMetric(metrics.clarity);
        interview.scores.accuracy = calcMetric(metrics.accuracy);
        interview.scores.communication = calcMetric(metrics.communication);

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
