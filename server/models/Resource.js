import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    type: {
        type: String,
        enum: ['PDF', 'Template', 'Link', 'Video', 'Article'],
        required: true
    },
    url: {
        type: String,
        required: [true, 'URL is required']
    },
    category: {
        type: String,
        enum: ['Resume', 'CoverLetter', 'CheatSheet', 'Tutorial', 'Book', 'Course', 'Other'],
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String
    }],
    downloads: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
