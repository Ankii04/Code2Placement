import mongoose from 'mongoose';

const aptitudeTopicSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: true
    },
    shortNotes: String, // Concise markdown notes
    keyPoints: [String],
    formulas: [String],
    tips: [String],
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    order: {
        type: Number,
        default: 0
    },
    totalQuestions: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('AptitudeTopic', aptitudeTopicSchema);
