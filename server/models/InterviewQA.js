import mongoose from 'mongoose';

const interviewQASchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required'],
        trim: true
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    },
    example: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['Technical', 'HR'],
        required: true
    },
    subcategory: {
        type: String,
        enum: ['DBMS', 'OS', 'OOP', 'CN', 'DSA', 'WebDev', 'General', 'Behavioral', 'Situational', 'CompanySpecific', 'Other', 'Memory Management', 'Networking'],
        default: 'Other'
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    tags: [{
        type: String
    }],
    companies: [{
        type: String
    }],
    views: {
        type: Number,
        default: 0
    },
    helpful: {
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

const InterviewQA = mongoose.model('InterviewQA', interviewQASchema);

export default InterviewQA;
