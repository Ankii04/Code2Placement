import mongoose from 'mongoose';

const testAttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testPattern: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestPattern',
        required: true
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: Date,
    status: {
        type: String,
        enum: ['in-progress', 'completed', 'abandoned'],
        default: 'in-progress'
    },
    currentSection: {
        type: Number,
        default: 0
    },
    sections: [{
        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AptitudeModule'
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AptitudeCategory'
        },
        name: String,
        questions: [{
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AptitudeQuestion'
            },
            selectedAnswer: String,
            isCorrect: Boolean,
            timeTaken: Number, // seconds
            isMarked: {
                type: Boolean,
                default: false
            },
            isSkipped: {
                type: Boolean,
                default: false
            }
        }],
        score: {
            type: Number,
            default: 0
        },
        accuracy: {
            type: Number,
            default: 0
        },
        timeSpent: {
            type: Number,
            default: 0
        },
        startedAt: Date,
        completedAt: Date
    }],
    totalScore: {
        type: Number,
        default: 0
    },
    percentage: {
        type: Number,
        default: 0
    },
    percentile: Number,
    rank: Number,
    strengths: [String],
    weaknesses: [String]
}, {
    timestamps: true
});

// Index for faster queries
testAttemptSchema.index({ user: 1, createdAt: -1 });
testAttemptSchema.index({ testPattern: 1 });
testAttemptSchema.index({ status: 1 });

export default mongoose.model('TestAttempt', testAttemptSchema);
