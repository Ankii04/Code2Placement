import mongoose from 'mongoose';

const aptitudeCategorySchema = new mongoose.Schema({
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AptitudeModule',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('AptitudeCategory', aptitudeCategorySchema);
