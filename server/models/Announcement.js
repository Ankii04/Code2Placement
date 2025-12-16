import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['PLACEMENT', 'EXAM', 'GENERAL', 'URGENT'],
        default: 'GENERAL'
    },
    attachments: [{
        name: String,
        url: String,
        type: String
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetAudience: {
        type: String,
        enum: ['ALL', 'FINAL_YEAR', 'THIRD_YEAR', 'SPECIFIC_BRANCH'],
        default: 'ALL'
    },
    branch: String, // if targetAudience is SPECIFIC_BRANCH
    isPinned: {
        type: Boolean,
        default: false
    },
    expiresAt: Date,
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
announcementSchema.index({ type: 1, createdAt: -1 });
announcementSchema.index({ isPinned: 1, createdAt: -1 });

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
