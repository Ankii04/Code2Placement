// Load environment variables first
import '../config/env.js';

import express from 'express';
import cors from 'cors';
import connectDB from '../config/db.js';

// Import routes
import authRoutes from './auth.js';
import userRoutes from './users.js';
import topicRoutes from './topics.js';
import questionRoutes from './questions.js';
import interviewQARoutes from './interview-qa.js';
import dailyChallengeRoutes from './daily-challenge.js';
import forumRoutes from './forum.js';
import miscRoutes from './misc.js';
import progressRoutes from './progress.js';

// AI Routes
import resumeAI from './ai/resume.js';
import interviewAI from './ai/interview.js';
import challengesAI from './ai/challenges.js';

// Analytics Routes
import dsaAnalytics from './analytics/dsa.js';
import readinessAnalytics from './analytics/readiness.js';

// Course Routes
import coursesRoutes from './courses.js';

// TPO Routes
import announcementsTPO from './tpo/announcements.js';
import examsTPO from './tpo/exams.js';

// Topic Content Routes
import topicContentRoutes from './topic-content.js';

// Code Execution Routes
import codeExecutionRoutes from './code-execution.js';

// Aptitude Test Routes
import aptitudeRoutes from './aptitude.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL, // Add your frontend Vercel URL here
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow all origins in development or if FRONTEND_URL is not set
        if (process.env.NODE_ENV !== 'production' || !process.env.FRONTEND_URL) {
            return callback(null, true);
        }

        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for now, tighten later
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB and seed content
connectDB().then(async () => {
    // Auto-seed content on startup (only in development)
    if (process.env.NODE_ENV !== 'production') {
        try {
            const seedCompleteContent = (await import('../scripts/seedCompleteContent.js')).default;
            await seedCompleteContent();
            console.log('✅ Complete content and questions seeding done');
        } catch (error) {
            console.log('ℹ️  Seeding skipped or already done');
        }
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/interview-qa', interviewQARoutes);
app.use('/api/daily-challenge', dailyChallengeRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/progress', progressRoutes);

// AI Routes
app.use('/api/ai/resume', resumeAI);
app.use('/api/ai/interview', interviewAI);
app.use('/api/ai/challenges', challengesAI);

// Analytics Routes
app.use('/api/analytics/dsa', dsaAnalytics);
app.use('/api/analytics/readiness', readinessAnalytics);

// Course Routes
app.use('/api/courses', coursesRoutes);

// TPO Routes
app.use('/api/tpo/announcements', announcementsTPO);
app.use('/api/tpo/exams', examsTPO);

// Topic Content Routes
app.use('/api/topic-content', topicContentRoutes);

// Code Execution Routes
app.use('/api/code', codeExecutionRoutes);

// Aptitude Test Routes
app.use('/api/aptitude', aptitudeRoutes);

// Misc Routes (admin stats, etc.)
app.use('/api/misc', miscRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server (only in development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel
export default app;
