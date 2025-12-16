import mongoose from 'mongoose';

const resumeAnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resumeUrl: {
        type: String,
        required: false
    },
    fileName: String,
    score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    atsScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    skillsMissing: [String],
    keywords: [String],
    improvements: [{
        category: String,
        suggestion: String
    }],
    sections: {
        grammar: { type: Number, default: 0 },
        structure: { type: Number, default: 0 },
        content: { type: Number, default: 0 },
        formatting: { type: Number, default: 0 }
    },
    strengths: [String],
    weaknesses: [String],
    aiAnalysis: String,
    analyzedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
resumeAnalysisSchema.index({ user: 1, analyzedAt: -1 });

const ResumeAnalysis = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);

export default ResumeAnalysis;
