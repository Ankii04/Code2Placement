import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    order: {
        type: Number,
        required: true
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    totalVideos: {
        type: Number,
        default: 0
    },
    totalDuration: {
        type: Number,
        default: 0 // in minutes
    }
}, {
    timestamps: true
});

const Module = mongoose.model('Module', moduleSchema);

export default Module;
