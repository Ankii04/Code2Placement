import mongoose from 'mongoose';

const userChallengeStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DailyChallenge',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        default: ''
    },
    timeTaken: {
        type: Number,
        default: 0
    },
    submittedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index to ensure one status per user per challenge
userChallengeStatusSchema.index({ userId: 1, challengeId: 1 }, { unique: true });

const UserChallengeStatus = mongoose.model('UserChallengeStatus', userChallengeStatusSchema);

export default UserChallengeStatus;
