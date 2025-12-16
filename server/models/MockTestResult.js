import mongoose from 'mongoose';

const mockTestResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MockTest',
        required: true
    },
    answers: [{
        questionIndex: Number,
        selectedAnswer: String,
        isCorrect: Boolean,
        pointsEarned: Number
    }],
    score: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        default: 0
    },
    timeTaken: {
        type: Number,
        required: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const MockTestResult = mongoose.model('MockTestResult', mockTestResultSchema);

export default MockTestResult;
