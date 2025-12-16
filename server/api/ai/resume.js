import express from 'express';
import multer from 'multer';

// pdf-parse v1.1.1 - simple dynamic import
let pdfParse;
const pdfParsePromise = import('pdf-parse').then(module => {
    // v1.1.1 exports as default
    pdfParse = module.default || module;
    console.log('✓ pdf-parse v1.1.1 loaded successfully');
}).catch(err => {
    console.error('Failed to load pdf-parse:', err);
});

import { protect } from '../../middleware/auth.middleware.js';
import ResumeAnalysis from '../../models/ResumeAnalysis.js';
import aiService from '../../services/aiService.js';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// @route   POST /api/ai/resume/analyze
// @desc    Analyze resume with AI
// @access  Private
app.post('/analyze', protect, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a PDF file' });
        }

        // Ensure pdf-parse is loaded
        await pdfParsePromise;

        // Final safety check
        if (typeof pdfParse !== 'function') {
            console.error('pdf-parse is not a function:', pdfParse);
            return res.status(500).json({ message: 'Server configuration error: PDF parser not working' });
        }

        // Parse PDF
        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text;

        // Analyze with AI
        const analysis = await aiService.analyzeResume(resumeText);

        // Save analysis
        const resumeAnalysis = await ResumeAnalysis.create({
            user: req.user._id,
            resumeUrl: '', // TODO: Upload to cloud storage
            fileName: req.file.originalname,
            score: analysis.overallScore,
            atsScore: analysis.atsScore,
            skillsMissing: analysis.skillsMissing,
            keywords: analysis.keywords,
            improvements: analysis.improvements,
            sections: analysis.sections,
            strengths: analysis.strengths,
            weaknesses: analysis.weaknesses,
            aiAnalysis: JSON.stringify(analysis)
        });

        res.json(resumeAnalysis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/ai/resume/history
// @desc    Get resume analysis history
// @access  Private
app.get('/history', protect, async (req, res) => {
    try {
        const analyses = await ResumeAnalysis.find({ user: req.user._id })
            .sort({ analyzedAt: -1 })
            .limit(10);

        res.json(analyses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/ai/resume/latest
// @desc    Get latest resume analysis
// @access  Private
app.get('/latest', protect, async (req, res) => {
    try {
        const analysis = await ResumeAnalysis.findOne({ user: req.user._id })
            .sort({ analyzedAt: -1 });

        if (!analysis) {
            return res.status(404).json({ message: 'No analysis found' });
        }

        res.json(analysis);
    } catch (error) {
        console.error('Resume Analysis Error:', error);

        // Handle Google AI Quota limits checking multiple properties
        if (error.status === 429 ||
            (error.message && (error.message.includes('Quota') || error.message.includes('429'))) ||
            JSON.stringify(error).includes('QuotaFailure')) {

            return res.status(429).json({
                message: 'AI Service Quota Exceeded. Please wait 60 seconds and try again.'
            });
        }

        res.status(500).json({ message: 'Server error during analysis', error: error.message });
    }
});

export default app;
