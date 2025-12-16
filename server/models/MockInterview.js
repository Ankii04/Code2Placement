import mongoose from 'mongoose';

const mockInterviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['HR', 'TECHNICAL', 'BEHAVIORAL'],
        required: true
    },
    questions: [{
        question: String,
        userAnswer: String,
        aiEvaluation: String,
        score: {
            type: Number,
            min: 0,
            max: 10
        },
        feedback: String
    }],
    scores: {
        confidence: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        clarity: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        accuracy: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        communication: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        overall: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        }
    },
    duration: Number, // in minutes
    status: {
        type: String,
        enum: ['IN_PROGRESS', 'COMPLETED', 'ABANDONED'],
        default: 'IN_PROGRESS'
    },
    completedAt: Date
}, {
    timestamps: true
});

// Index for faster queries
mockInterviewSchema.index({ user: 1, createdAt: -1 });
mockInterviewSchema.index({ status: 1 });

const MockInterview = mongoose.model('MockInterview', mockInterviewSchema);

export default MockInterview;
