import mongoose from 'mongoose';

const testPatternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    company: {
        type: String,
        required: true
    },
    description: String,
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
        questionCount: {
            type: Number,
            required: true
        },
        timeLimit: {
            type: Number,
            required: true // in minutes
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard', 'Mixed'],
            default: 'Mixed'
        }
    }],
    totalQuestions: {
        type: Number,
        required: true
    },
    totalTime: {
        type: Number,
        required: true // in minutes
    },
    cutoff: {
        type: Number,
        default: 0 // percentage
    },
    isActive: {
        type: Boolean,
        default: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    }
}, {
    timestamps: true
});

export default mongoose.model('TestPattern', testPatternSchema);
