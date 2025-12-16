import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    template: {
        type: String,
        enum: ['modern', 'classic', 'minimal'],
        default: 'modern'
    },
    colorTheme: {
        type: String,
        default: '#6366f1'
    },
    data: {
        personal: {
            name: String,
            email: String,
            phone: String,
            linkedin: String,
            github: String,
            portfolio: String,
            location: String
        },
        summary: String,
        education: [{
            degree: String,
            college: String,
            university: String,
            year: String,
            cgpa: String,
            location: String
        }],
        experience: [{
            company: String,
            role: String,
            duration: String,
            location: String,
            description: [String]
        }],
        projects: [{
            title: String,
            tech: [String],
            description: [String],
            link: String,
            github: String
        }],
        skills: {
            languages: [String],
            frameworks: [String],
            tools: [String],
            databases: [String]
        },
        achievements: [String],
        certifications: [{
            name: String,
            issuer: String,
            date: String,
            link: String
        }]
    },
    pdfUrl: String,
    isActive: {
        type: Boolean,
        default: true
    },
    versions: [{
        data: Object,
        pdfUrl: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Index for faster queries
resumeSchema.index({ user: 1, isActive: 1 });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
