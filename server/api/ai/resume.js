import express from 'express';
import multer from 'multer';
import { protect } from '../../middleware/auth.middleware.js';
import ResumeAnalysis from '../../models/ResumeAnalysis.js';
import aiService from '../../services/aiService.js';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Lazy load pdf-parse
let pdfParse = null;

async function getPdfParse() {
    if (pdfParse) return pdfParse;

    try {
        // Try dynamic import first
        const module = await import('pdf-parse');
        pdfParse = module.default || module;
        console.log('✓ pdf-parse loaded via import');
        return pdfParse;
    } catch (err) {
        console.error('Failed to load pdf-parse via import:', err);

        // Fallback to require for serverless
        try {
            const { createRequire } = await import('module');
            const require = createRequire(import.meta.url);
            pdfParse = require('pdf-parse');
            console.log('✓ pdf-parse loaded via require');
            return pdfParse;
        } catch (err2) {
            console.error('Failed to load pdf-parse via require:', err2);
            throw new Error('PDF parser could not be loaded');
        }
    }
}

// @route   POST /api/ai/resume/analyze
// @desc    Analyze resume with AI
// @access  Private
app.post('/analyze', protect, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a PDF file' });
        }

        // Load pdf-parse
        let parser;
        try {
            parser = await getPdfParse();
        } catch (error) {
            console.error('PDF parser error:', error);
            return res.status(500).json({
                message: 'PDF parsing is temporarily unavailable. Please try again later.',
                error: error.message
            });
        }

        // Verify parser is a function
        if (typeof parser !== 'function') {
            console.error('pdf-parse is not a function:', typeof parser);
            return res.status(500).json({
                message: 'PDF parser configuration error'
            });
        }

        // Parse PDF
        const pdfData = await parser(req.file.buffer);
        const resumeText = pdfData.text;

        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({
                message: 'Could not extract text from PDF. Please ensure the PDF contains readable text.'
            });
        }

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
        console.error('Resume analysis error:', error);
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
