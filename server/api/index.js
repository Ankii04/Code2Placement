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

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: true, // Allow all origins for now
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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
