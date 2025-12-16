import mongoose from 'mongoose';

const companyExamSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    examDate: Date,
    registrationDeadline: Date,
    pattern: {
        type: String,
        required: true
    },
    rounds: [{
        name: String,
        description: String,
        duration: Number,
        topics: [String]
    }],
    syllabus: [String],
    eligibility: {
        cgpa: Number,
        branches: [String],
        year: String,
        backlogs: Number
    },
    resources: [{
        title: String,
        url: String,
        type: String
    }],
    previousYearQuestions: [{
        title: String,
        url: String
    }],
    tips: [String],
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
companyExamSchema.index({ company: 1, examDate: -1 });
companyExamSchema.index({ isActive: 1 });

const CompanyExam = mongoose.model('CompanyExam', companyExamSchema);

export default CompanyExam;
