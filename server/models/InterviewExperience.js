import mongoose from 'mongoose';

const interviewExperienceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true
    },
    experience: {
        type: String,
        required: [true, 'Experience is required']
    },
    round: {
        type: String,
        enum: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Technical Round 3', 'HR Round', 'Managerial Round', 'Final Round', 'Other'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    outcome: {
        type: String,
        enum: ['Selected', 'Rejected', 'Waiting', 'Ongoing'],
        default: 'Ongoing'
    },
    helpful: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const InterviewExperience = mongoose.model('InterviewExperience', interviewExperienceSchema);

export default InterviewExperience;
