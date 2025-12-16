import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    solvedQuestions: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        solvedAt: {
            type: Date,
            default: Date.now
        },
        notes: {
            type: String,
            default: ''
        }
    }],
    totalSolved: {
        type: Number,
        default: 0
    },
    easyCount: {
        type: Number,
        default: 0
    },
    mediumCount: {
        type: Number,
        default: 0
    },
    hardCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
userProgressSchema.index({ user: 1 });
userProgressSchema.index({ 'solvedQuestions.question': 1 });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
