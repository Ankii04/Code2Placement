import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

console.log('Testing MongoDB connection...');
console.log('URI exists:', !!process.env.MONGODB_URI);
console.log('URI preview:', process.env.MONGODB_URI?.substring(0, 30) + '...');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connection successful!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ MongoDB connection failed:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        process.exit(1);
    });
