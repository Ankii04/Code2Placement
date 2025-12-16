import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import '../config/env.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

const createTestUser = async () => {
    try {
        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email: 'test@example.com' });
        if (existingUser) {
            console.log('✅ Test user already exists');
            console.log('Email: test@example.com');
            console.log('Password: password123');
            process.exit(0);
        }

        // Create test user
        const testUser = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 'user'
        });

        console.log('✅ Test user created successfully!');
        console.log('Email: test@example.com');
        console.log('Password: password123');
        console.log('User ID:', testUser._id);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating test user:', error);
        process.exit(1);
    }
};

createTestUser();
