// Serverless function wrapper for Express app
// This file is the entry point for Vercel deployment
// It imports the main Express app from server/api/index.js

import app from '../server/api/index.js';

// Export the Express app as a serverless function
export default app;
