import mongoose from 'mongoose';

const companyReadinessSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    companies: [{
        name: {
            type: String,
            enum: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 'Amazon', 'Google', 'Microsoft', 'Flipkart', 'Adobe'],
            required: true
        },
        readinessScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        breakdown: {
            dsa: { type: Number, default: 0 },
            cs: { type: Number, default: 0 },
            resume: { type: Number, default: 0 },
            interview: { type: Number, default: 0 }
        },
        recommendations: [String],
        status: {
            type: String,
            enum: ['NOT_READY', 'GETTING_READY', 'READY', 'HIGHLY_READY'],
            default: 'NOT_READY'
        }
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Determine status based on readiness score
companyReadinessSchema.pre('save', function (next) {
    this.companies.forEach(company => {
        if (company.readinessScore >= 80) {
            company.status = 'HIGHLY_READY';
        } else if (company.readinessScore >= 60) {
            company.status = 'READY';
        } else if (company.readinessScore >= 40) {
            company.status = 'GETTING_READY';
        } else {
            company.status = 'NOT_READY';
        }
    });
    next();
});

const CompanyReadiness = mongoose.model('CompanyReadiness', companyReadinessSchema);

export default CompanyReadiness;
