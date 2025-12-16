import mongoose from 'mongoose';

const dailyChallengeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    question: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            required: true
        },
        hints: [{
            type: String
        }],
        testCases: [{
            input: String,
            expectedOutput: String
        }]
    },
    solution: {
        approach: String,
        code: String,
        explanation: String
    },
    submissions: {
        type: Number,
        default: 0
    },
    successfulSubmissions: {
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

const DailyChallenge = mongoose.model('DailyChallenge', dailyChallengeSchema);

export default DailyChallenge;
