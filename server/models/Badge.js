import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Badge name is required'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    icon: {
        type: String,
        default: '🏆'
    },
    criteria: {
        type: String,
        required: true
    },
    rarity: {
        type: String,
        enum: ['Common', 'Rare', 'Epic', 'Legendary'],
        default: 'Common'
    },
    points: {
        type: Number,
        default: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
