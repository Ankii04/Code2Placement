// Run this script ONCE to seed production database
// Usage: node seedProduction.js

import mongoose from 'mongoose';

// Replace with your production MongoDB URI
const PRODUCTION_MONGODB_URI = process.env.MONGODB_URI || 'your-production-mongodb-uri';

async function seedProduction() {
    try {
        await mongoose.connect(PRODUCTION_MONGODB_URI);
        console.log('📦 Connected to PRODUCTION MongoDB');

        // Import and run the seed function
        const { default: seedAptitudeData } = await import('./server/utils/seedAptitudeData.js');

        console.log('🌱 Seeding production database...');
        // The seed script will run automatically when imported

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

seedProduction();
