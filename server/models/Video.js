import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    youtubeId: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true // in seconds
    },
    description: String,
    notes: String,
    practiceProblems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    resources: [{
        title: String,
        url: String,
        type: {
            type: String,
            enum: ['Article', 'PDF', 'Code', 'Other']
        }
    }],
    order: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
