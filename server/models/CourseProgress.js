import mongoose from 'mongoose';

const courseProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    completedVideos: [{
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        },
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    lastWatched: {
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        },
        timestamp: Number, // in seconds
        watchedAt: Date
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: Date
}, {
    timestamps: true
});

// Compound index for user-course combination
courseProgressSchema.index({ user: 1, course: 1 }, { unique: true });

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);

export default CourseProgress;
