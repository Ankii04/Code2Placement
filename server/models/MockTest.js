import mongoose from 'mongoose';

const mockTestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['Coding', 'HR', 'Technical', 'Company'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [{
        questionText: String,
        options: [String],
        correctAnswer: String,
        explanation: String,
        points: {
            type: Number,
            default: 1
        }
    }],
    duration: {
        type: Number,
        required: true,
        default: 60
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    attempts: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const MockTest = mongoose.model('MockTest', mockTestSchema);

export default MockTest;
