import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Question title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    difficulty: {
        type: String,
        enum: ['EASY', 'MEDIUM', 'HARD'],
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    // Striver-style external links
    leetcodeLink: String,
    gfgLink: String,
    youtubeLink: String,
    articleLink: String,

    hints: [{
        type: String
    }],
    solution: {
        approach: String,
        code: String,
        explanation: String
    },
    testCases: [{
        input: String,
        expectedOutput: String,
        explanation: String
    }],
    externalLinks: [{
        platform: {
            type: String,
            enum: ['LeetCode', 'HackerRank', 'CodeForces', 'GeeksForGeeks', 'Other']
        },
        url: String
    }],
    tags: [String],
    companies: [String],
    solvedCount: {
        type: Number,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
questionSchema.index({ topic: 1, order: 1 });
questionSchema.index({ difficulty: 1 });

const Question = mongoose.model('Question', questionSchema);

export default Question;

