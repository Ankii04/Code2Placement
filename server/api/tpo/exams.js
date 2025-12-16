import express from 'express';
import { protect, authorize } from '../../middleware/auth.middleware.js';
import CompanyExam from '../../models/CompanyExam.js';

const app = express();

// @route   GET /api/tpo/exams
// @desc    Get all company exams
// @access  Public
app.get('/', async (req, res) => {
    try {
        const { company, isActive } = req.query;

        let query = {};
        if (company) query.company = new RegExp(company, 'i');
        if (isActive !== undefined) query.isActive = isActive === 'true';

        const exams = await CompanyExam.find(query)
            .populate('addedBy', 'name email')
            .sort({ examDate: -1 });

        res.json(exams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/tpo/exams/:id
// @desc    Get exam details
// @access  Public
app.get('/:id', async (req, res) => {
    try {
        const exam = await CompanyExam.findById(req.params.id)
            .populate('addedBy', 'name email');

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        res.json(exam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/tpo/exams
// @desc    Add company exam pattern
// @access  Private (TPO only)
app.post('/', protect, authorize('tpo', 'admin'), async (req, res) => {
    try {
        const exam = await CompanyExam.create({
            ...req.body,
            addedBy: req.user._id
        });

        res.status(201).json(exam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/tpo/exams/:id
// @desc    Update exam pattern
// @access  Private (TPO only)
app.put('/:id', protect, authorize('tpo', 'admin'), async (req, res) => {
    try {
        const exam = await CompanyExam.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        res.json(exam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/tpo/exams/:id
// @desc    Delete exam pattern
// @access  Private (TPO only)
app.delete('/:id', protect, authorize('tpo', 'admin'), async (req, res) => {
    try {
        const exam = await CompanyExam.findByIdAndDelete(req.params.id);

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        res.json({ message: 'Exam deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default app;
