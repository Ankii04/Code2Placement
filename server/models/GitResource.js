import mongoose from 'mongoose';

const gitResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    category: {
        type: String,
        enum: ['Basics', 'Branching', 'Merging', 'Collaboration', 'Advanced', 'GitHub', 'BestPractices'],
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    codeExamples: [{
        command: String,
        explanation: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const GitResource = mongoose.model('GitResource', gitResourceSchema);

export default GitResource;
