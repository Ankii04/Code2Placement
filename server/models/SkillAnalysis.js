import mongoose from 'mongoose';

const skillAnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    dsaScore: {
        overall: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        topicScores: {
            basics: { type: Number, default: 0 },
            arrays: { type: Number, default: 0 },
            strings: { type: Number, default: 0 },
            linkedList: { type: Number, default: 0 },
            stack: { type: Number, default: 0 },
            queue: { type: Number, default: 0 },
            trees: { type: Number, default: 0 },
            graphs: { type: Number, default: 0 },
            recursion: { type: Number, default: 0 },
            dynamicProgramming: { type: Number, default: 0 },
            greedy: { type: Number, default: 0 },
            searchingAndSorting: { type: Number, default: 0 },
            bitManipulation: { type: Number, default: 0 },
            hashing: { type: Number, default: 0 },
            advancedDS: { type: Number, default: 0 },
            mathematics: { type: Number, default: 0 },
            miscellaneous: { type: Number, default: 0 }
        },
        problemsSolved: {
            type: Number,
            default: 0
        },
        accuracy: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        strengths: [String],
        weaknesses: [String]
    },
    csFundamentals: {
        os: {
            score: { type: Number, default: 0 },
            weakTopics: [String],
            quizzesTaken: { type: Number, default: 0 }
        },
        dbms: {
            score: { type: Number, default: 0 },
            weakTopics: [String],
            quizzesTaken: { type: Number, default: 0 }
        },
        oop: {
            score: { type: Number, default: 0 },
            weakTopics: [String],
            quizzesTaken: { type: Number, default: 0 }
        },
        cn: {
            score: { type: Number, default: 0 },
            weakTopics: [String],
            quizzesTaken: { type: Number, default: 0 }
        },
        overall: {
            type: Number,
            default: 0
        }
    },
    lastCalculated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Calculate overall CS score before saving
skillAnalysisSchema.pre('save', function (next) {
    const cs = this.csFundamentals;
    cs.overall = Math.round((cs.os.score + cs.dbms.score + cs.oop.score + cs.cn.score) / 4);
    next();
});

const SkillAnalysis = mongoose.model('SkillAnalysis', skillAnalysisSchema);

export default SkillAnalysis;
