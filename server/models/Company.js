import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        unique: true
    },
    logo: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    interviewProcess: [{
        round: String,
        description: String,
        duration: String,
        tips: [String]
    }],
    mockQuestions: [{
        type: {
            type: String,
            enum: ['Technical', 'HR', 'Coding']
        },
        question: String,
        answer: String,
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard']
        }
    }],
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    industry: {
        type: String,
        default: ''
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

const Company = mongoose.model('Company', companySchema);

export default Company;
