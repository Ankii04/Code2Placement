import mongoose from 'mongoose';

const aptitudeQuestionSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AptitudeTopic',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AptitudeCategory',
        required: true
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AptitudeModule',
        required: true
    },
    questionType: {
        type: String,
        enum: ['MCQ', 'Coding', 'Descriptive'],
        default: 'MCQ'
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        label: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    explanation: String,
    quickTip: String,
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    timeToSolve: {
        type: Number,
        default: 60 // seconds
    },
    tags: [String],
    companies: [String],
    yearAsked: Number,
    similarQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AptitudeQuestion'
    }]
}, {
    timestamps: true
});

// Index for faster queries
aptitudeQuestionSchema.index({ module: 1, category: 1, topic: 1 });
aptitudeQuestionSchema.index({ difficulty: 1 });
aptitudeQuestionSchema.index({ companies: 1 });

export default mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
