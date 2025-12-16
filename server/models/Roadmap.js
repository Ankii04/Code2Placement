import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    goal: {
        type: String,
        enum: ['Frontend', 'Backend', 'FullStack', 'DevOps', 'DataScience', 'Mobile', 'Other'],
        required: true
    },
    steps: [{
        phase: String,
        title: String,
        description: String,
        resources: [String],
        estimatedTime: String,
        skills: [String]
    }],
    duration: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    prerequisites: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;
