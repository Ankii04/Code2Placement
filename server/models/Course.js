import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true,
        enum: ['Striver', 'Love Babbar', 'CodeWithHarry', 'Apna College', 'Other']
    },
    thumbnail: String,
    description: String,
    category: {
        type: String,
        enum: ['DSA', 'Web Development', 'System Design', 'CS Fundamentals', 'Interview Prep'],
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    totalVideos: {
        type: Number,
        default: 0
    },
    totalDuration: {
        type: Number,
        default: 0 // in minutes
    },
    modules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
    }],
    isPublished: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
