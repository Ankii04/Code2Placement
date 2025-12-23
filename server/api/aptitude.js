import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import TestPattern from '../models/TestPattern.js';
import TestAttempt from '../models/TestAttempt.js';
import AptitudeQuestion from '../models/AptitudeQuestion.js';
import AptitudeModule from '../models/AptitudeModule.js';
import AptitudeCategory from '../models/AptitudeCategory.js';
import AptitudeTopic from '../models/AptitudeTopic.js';

const router = express.Router();

// @route   GET /api/aptitude/test-patterns
// @desc    Get all test patterns
// @access  Public
router.get('/test-patterns', async (req, res) => {
    try {
        const patterns = await TestPattern.find({ isActive: true })
            .populate('sections.module', 'name icon')
            .populate('sections.category', 'name')
            .sort({ company: 1 });

        res.json(patterns);
    } catch (error) {
        console.error('Error fetching test patterns:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/aptitude/test-patterns/:id
// @desc    Get test pattern by ID
// @access  Public
router.get('/test-patterns/:id', async (req, res) => {
    try {
        const pattern = await TestPattern.findById(req.params.id)
            .populate('sections.module', 'name icon description')
            .populate('sections.category', 'name description');

        if (!pattern) {
            return res.status(404).json({ message: 'Test pattern not found' });
        }

        res.json(pattern);
    } catch (error) {
        console.error('Error fetching test pattern:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/aptitude/tests/start
// @desc    Start a new test
// @access  Private
router.post('/tests/start', protect, async (req, res) => {
    try {
        const { testPatternId } = req.body;

        const pattern = await TestPattern.findById(testPatternId);
        if (!pattern) {
            return res.status(404).json({ message: 'Test pattern not found' });
        }

        // Generate questions for each section
        const sections = [];
        for (const section of pattern.sections) {
            // Get random questions for this section
            const questions = await AptitudeQuestion.aggregate([
                {
                    $match: {
                        module: section.module,
                        category: section.category
                    }
                },
                { $sample: { size: section.questionCount } }
            ]);

            sections.push({
                module: section.module,
                category: section.category,
                name: section.name,
                questions: questions.map(q => ({
                    question: q._id,
                    selectedAnswer: null,
                    isCorrect: false,
                    timeTaken: 0,
                    isMarked: false,
                    isSkipped: true
                })),
                score: 0,
                accuracy: 0,
                timeSpent: 0,
                startedAt: new Date()
            });
        }

        // Create test attempt
        const attempt = await TestAttempt.create({
            user: req.user._id,
            testPattern: testPatternId,
            sections,
            currentSection: 0,
            status: 'in-progress'
        });

        // Populate questions for response
        const populatedAttempt = await TestAttempt.findById(attempt._id)
            .populate({
                path: 'sections.questions.question',
                select: 'question options difficulty timeToSolve'
            })
            .populate('testPattern', 'name company sections totalTime');

        res.json(populatedAttempt);
    } catch (error) {
        console.error('Error starting test:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/aptitude/tests/:attemptId/answer
// @desc    Submit answer for a question
// @access  Private
router.put('/tests/:attemptId/answer', protect, async (req, res) => {
    try {
        const { sectionIndex, questionIndex, selectedAnswer, timeTaken, isMarked } = req.body;

        const attempt = await TestAttempt.findOne({
            _id: req.params.attemptId,
            user: req.user._id
        });

        if (!attempt) {
            return res.status(404).json({ message: 'Test attempt not found' });
        }

        if (attempt.status !== 'in-progress') {
            return res.status(400).json({ message: 'Test is not in progress' });
        }

        // Get the question to check correct answer
        const questionId = attempt.sections[sectionIndex].questions[questionIndex].question;
        const question = await AptitudeQuestion.findById(questionId);

        // Update answer
        attempt.sections[sectionIndex].questions[questionIndex].selectedAnswer = selectedAnswer;
        attempt.sections[sectionIndex].questions[questionIndex].isCorrect =
            selectedAnswer === question.correctAnswer;
        attempt.sections[sectionIndex].questions[questionIndex].timeTaken = timeTaken;
        attempt.sections[sectionIndex].questions[questionIndex].isMarked = isMarked || false;
        attempt.sections[sectionIndex].questions[questionIndex].isSkipped = !selectedAnswer;

        await attempt.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/aptitude/tests/:attemptId/section/:sectionIndex/complete
// @desc    Complete a section
// @access  Private
router.put('/tests/:attemptId/section/:sectionIndex/complete', protect, async (req, res) => {
    try {
        const attempt = await TestAttempt.findOne({
            _id: req.params.attemptId,
            user: req.user._id
        });

        if (!attempt) {
            return res.status(404).json({ message: 'Test attempt not found' });
        }

        const sectionIndex = parseInt(req.params.sectionIndex);

        // Mark section as completed
        attempt.sections[sectionIndex].completedAt = new Date();

        // Calculate section score
        const section = attempt.sections[sectionIndex];
        const correctAnswers = section.questions.filter(q => q.isCorrect).length;
        section.score = correctAnswers;
        section.accuracy = (correctAnswers / section.questions.length) * 100;
        section.timeSpent = section.questions.reduce((sum, q) => sum + q.timeTaken, 0);

        // Move to next section
        if (sectionIndex < attempt.sections.length - 1) {
            attempt.currentSection = sectionIndex + 1;
            attempt.sections[sectionIndex + 1].startedAt = new Date();
        }

        await attempt.save();

        res.json({ success: true, currentSection: attempt.currentSection });
    } catch (error) {
        console.error('Error completing section:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/aptitude/tests/:attemptId/submit
// @desc    Submit entire test
// @access  Private
router.put('/tests/:attemptId/submit', protect, async (req, res) => {
    try {
        const attempt = await TestAttempt.findOne({
            _id: req.params.attemptId,
            user: req.user._id
        }).populate({
            path: 'sections.questions.question',
            select: 'question options correctAnswer explanation quickTip difficulty'
        }).populate('testPattern', 'name company totalQuestions cutoff');

        if (!attempt) {
            return res.status(404).json({ message: 'Test attempt not found' });
        }

        // Calculate total score
        let totalCorrect = 0;
        let totalQuestions = 0;

        attempt.sections.forEach(section => {
            const correctAnswers = section.questions.filter(q => q.isCorrect).length;
            section.score = correctAnswers;
            section.accuracy = (correctAnswers / section.questions.length) * 100;
            section.timeSpent = section.questions.reduce((sum, q) => sum + q.timeTaken, 0);
            section.completedAt = section.completedAt || new Date();

            totalCorrect += correctAnswers;
            totalQuestions += section.questions.length;
        });

        attempt.totalScore = totalCorrect;
        attempt.percentage = (totalCorrect / totalQuestions) * 100;
        attempt.completedAt = new Date();
        attempt.status = 'completed';

        // Calculate percentile (simplified - compare with other attempts)
        const allAttempts = await TestAttempt.find({
            testPattern: attempt.testPattern._id,
            status: 'completed'
        }).select('totalScore');

        const totalOthers = allAttempts.length;
        if (totalOthers === 0) {
            attempt.percentile = 100;
            attempt.rank = 1;
        } else {
            const lowerScores = allAttempts.filter(a => a.totalScore < attempt.totalScore).length;
            attempt.percentile = Math.round((lowerScores / totalOthers) * 100);
            attempt.rank = totalOthers - lowerScores + 1;
        }

        // Identify strengths and weaknesses
        const strengths = [];
        const weaknesses = [];

        attempt.sections.forEach(section => {
            if (section.accuracy >= 70) {
                strengths.push(section.name);
            } else if (section.accuracy < 50) {
                weaknesses.push(section.name);
            }
        });

        attempt.strengths = strengths;
        attempt.weaknesses = weaknesses;

        await attempt.save();

        res.json(attempt);
    } catch (error) {
        console.error('Error submitting test:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/aptitude/tests/my-attempts
// @desc    Get user's test attempts
// @access  Private
router.get('/tests/my-attempts', protect, async (req, res) => {
    try {
        const attempts = await TestAttempt.find({
            user: req.user._id,
            status: 'completed'
        })
            .populate('testPattern', 'name company totalQuestions totalTime')
            .sort({ completedAt: -1 })
            .limit(10);

        res.json(attempts);
    } catch (error) {
        console.error('Error fetching attempts:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/aptitude/tests/:attemptId
// @desc    Get test attempt details
// @access  Private
router.get('/tests/:attemptId', protect, async (req, res) => {
    try {
        const attempt = await TestAttempt.findOne({
            _id: req.params.attemptId,
            user: req.user._id
        })
            .populate({
                path: 'sections.questions.question',
                select: 'question options correctAnswer explanation quickTip difficulty'
            })
            .populate('testPattern', 'name company sections totalQuestions totalTime');

        if (!attempt) {
            return res.status(404).json({ message: 'Test attempt not found' });
        }

        res.json(attempt);
    } catch (error) {
        console.error('Error fetching attempt:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/aptitude/modules
// @desc    Get all modules
// @access  Public
router.get('/modules', async (req, res) => {
    try {
        const modules = await AptitudeModule.find({ isActive: true }).sort({ order: 1 });
        res.json(modules);
    } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
