import mongoose from 'mongoose';

// Cache the connection across serverless invocations
// On Vercel, the global scope persists between warm invocations
let cached = global._mongooseConnection;

if (!cached) {
    cached = global._mongooseConnection = { conn: null, promise: null };
}

const connectDB = async () => {
    // If already connected, reuse immediately
    if (cached.conn) {
        return cached.conn;
    }

    // If a connection is in progress, wait for it (avoid duplicate connects)
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            // Serverless-optimized settings
            maxPoolSize: 5,           // Keep pool small for serverless
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
            .then((mongooseInstance) => {
                console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
                return mongooseInstance;
            })
            .catch((error) => {
                // Reset the promise so next invocation retries
                cached.promise = null;
                console.error(`MongoDB connection error: ${error.message}`);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default connectDB;
