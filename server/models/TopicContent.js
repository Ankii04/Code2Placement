import mongoose from 'mongoose';

const topicContentSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    concept: {
        explanation: String,
        keyPoints: [String],
        timeComplexity: String,
        spaceComplexity: String
    },
    visualExamples: [{
        title: String,
        steps: [{
            description: String,
            visualization: String, // SVG or animation data
            code: String
        }]
    }],
    commonPatterns: [{
        name: String,
        description: String,
        example: String
    }],
    tips: [String],
    resources: [{
        title: String,
        url: String,
        type: {
            type: String,
            enum: ['Video', 'Article', 'Book', 'Course']
        }
    }]
}, {
    timestamps: true
});

const TopicContent = mongoose.model('TopicContent', topicContentSchema);

export default TopicContent;
