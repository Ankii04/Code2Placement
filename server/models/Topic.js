import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Topic title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: false // Not required for main categories
    },
    content: {
        type: String,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: '📚'
    },
    examples: [{
        input: String,
        output: String,
        explanation: String
    }],
    timeComplexity: {
        type: String,
        default: ''
    },
    spaceComplexity: {
        type: String,
        default: ''
    },
    relatedTopics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    category: {
        type: String,
        enum: [
            'Basics',
            'Arrays',
            'Strings',
            'Linked List',
            'Stack',
            'Queue',
            'Trees',
            'Graphs',
            'Recursion & Backtracking',
            'Dynamic Programming',
            'Greedy Algorithms',
            'Searching & Sorting',
            'Bit Manipulation',
            'Hashing',
            'Advanced Data Structures',
            'Mathematics for DSA',
            'Miscellaneous',
            'Other'
        ],
        default: 'Other'
    },
    // Hierarchical structure
    parentTopic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        default: null
    },
    subtopics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    isMainCategory: {
        type: Boolean,
        default: false
    },
    // Question count for display
    questionCount: {
        type: Number,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
topicSchema.index({ category: 1, order: 1 });
topicSchema.index({ parentTopic: 1 });
topicSchema.index({ isMainCategory: 1 });

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
