import '../config/env.js';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Roadmap from '../models/Roadmap.js';
import Resource from '../models/Resource.js';
import Course from '../models/Course.js';

const roadmaps = [
    {
        title: 'DSA Mastery Roadmap',
        description: 'Complete path to master Data Structures and Algorithms for top tech company interviews. Covers arrays to advanced graph algorithms.',
        goal: 'FullStack',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        prerequisites: ['Basic programming knowledge', 'Familiarity with any language (C++/Java/Python)'],
        steps: [
            { phase: 'Phase 1', title: 'Arrays & Strings', description: 'Master array manipulation, two pointers, sliding window techniques', estimatedTime: '2 weeks', skills: ['Arrays', 'Strings', 'Two Pointers'], resources: ['Striver A2Z Sheet'] },
            { phase: 'Phase 2', title: 'Linked Lists & Stacks', description: 'Understand linked list operations, stack-based problems', estimatedTime: '2 weeks', skills: ['Linked Lists', 'Stacks', 'Queues'], resources: ['LeetCode Top 50'] },
            { phase: 'Phase 3', title: 'Trees & Graphs', description: 'Binary trees, BST, BFS/DFS traversals, graph algorithms', estimatedTime: '3 weeks', skills: ['Binary Trees', 'BST', 'Graphs', 'BFS', 'DFS'], resources: ['NeetCode 150'] },
            { phase: 'Phase 4', title: 'Dynamic Programming', description: 'Master DP patterns — knapsack, LCS, matrix chain, state machines', estimatedTime: '3 weeks', skills: ['1D DP', '2D DP', 'DP on Trees'], resources: ['Aditya Verma YouTube'] },
            { phase: 'Phase 5', title: 'Advanced Topics', description: 'Tries, segment trees, bit manipulation, greedy algorithms', estimatedTime: '2 weeks', skills: ['Tries', 'Greedy', 'Bit Manipulation'], resources: ['Competitive Programming Handbook'] }
        ]
    },
    {
        title: 'Frontend Developer Roadmap',
        description: 'Become a professional frontend developer. From HTML/CSS basics to React, Next.js, and modern tooling.',
        goal: 'Frontend',
        difficulty: 'Beginner',
        duration: '4-5 months',
        prerequisites: ['No prior experience needed'],
        steps: [
            { phase: 'Phase 1', title: 'HTML & CSS Fundamentals', description: 'Semantic HTML, CSS Box Model, Flexbox, Grid, Responsive Design', estimatedTime: '3 weeks', skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid'], resources: ['FreeCodeCamp', 'MDN Web Docs'] },
            { phase: 'Phase 2', title: 'JavaScript Core', description: 'Variables, functions, DOM manipulation, async/await, ES6+', estimatedTime: '4 weeks', skills: ['JavaScript', 'DOM', 'ES6+', 'Async Programming'], resources: ['JavaScript.info', 'Eloquent JavaScript'] },
            { phase: 'Phase 3', title: 'React Ecosystem', description: 'Components, Hooks, State Management, React Router, API Integration', estimatedTime: '4 weeks', skills: ['React', 'Hooks', 'Context API', 'React Router'], resources: ['React Official Docs', 'Striver React Course'] },
            { phase: 'Phase 4', title: 'Advanced & Tooling', description: 'Next.js, TypeScript, Testing, CI/CD, Performance Optimization', estimatedTime: '3 weeks', skills: ['Next.js', 'TypeScript', 'Jest', 'Webpack/Vite'], resources: ['Next.js Docs', 'TypeScript Handbook'] }
        ]
    },
    {
        title: 'Backend Developer Roadmap',
        description: 'Learn server-side development with Node.js, Express, databases and deployment.',
        goal: 'Backend',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        prerequisites: ['JavaScript fundamentals', 'Basic HTML knowledge'],
        steps: [
            { phase: 'Phase 1', title: 'Node.js Fundamentals', description: 'Event loop, modules, file system, streams, HTTP module', estimatedTime: '2 weeks', skills: ['Node.js', 'NPM', 'Event Loop'], resources: ['Node.js Official Docs'] },
            { phase: 'Phase 2', title: 'Express & REST APIs', description: 'Routing, middleware, error handling, authentication with JWT', estimatedTime: '3 weeks', skills: ['Express.js', 'REST APIs', 'JWT', 'Middleware'], resources: ['ExpressJS Guide'] },
            { phase: 'Phase 3', title: 'Databases', description: 'MongoDB with Mongoose, SQL basics, Redis caching', estimatedTime: '3 weeks', skills: ['MongoDB', 'Mongoose', 'SQL', 'Redis'], resources: ['MongoDB University', 'SQLBolt'] },
            { phase: 'Phase 4', title: 'Deployment & DevOps', description: 'Docker basics, CI/CD, cloud deployment (AWS/Vercel/Render)', estimatedTime: '2 weeks', skills: ['Docker', 'CI/CD', 'AWS', 'Vercel'], resources: ['Docker Getting Started'] }
        ]
    },
    {
        title: 'Full Stack Web Development',
        description: 'Build complete web applications from frontend to backend, database to deployment.',
        goal: 'FullStack',
        difficulty: 'Advanced',
        duration: '6 months',
        prerequisites: ['Basic programming knowledge', 'HTML/CSS basics'],
        steps: [
            { phase: 'Phase 1', title: 'Frontend Foundations', description: 'HTML5, CSS3, JavaScript, responsive design', estimatedTime: '4 weeks', skills: ['HTML', 'CSS', 'JavaScript'], resources: ['FreeCodeCamp'] },
            { phase: 'Phase 2', title: 'React & State Management', description: 'React components, hooks, Redux/Context, API integration', estimatedTime: '4 weeks', skills: ['React', 'Redux', 'Axios'], resources: ['React Docs'] },
            { phase: 'Phase 3', title: 'Backend with Node.js', description: 'Express APIs, authentication, authorization, file uploads', estimatedTime: '4 weeks', skills: ['Node.js', 'Express', 'JWT'], resources: ['Node.js Guide'] },
            { phase: 'Phase 4', title: 'Database & Cloud', description: 'MongoDB/PostgreSQL, cloud services, containerization', estimatedTime: '4 weeks', skills: ['MongoDB', 'PostgreSQL', 'Docker', 'AWS'], resources: ['MongoDB University'] },
            { phase: 'Phase 5', title: 'Capstone Project', description: 'Build and deploy a production-ready full stack application', estimatedTime: '4 weeks', skills: ['System Design', 'Testing', 'Deployment'], resources: ['Project-based learning'] }
        ]
    },
    {
        title: 'DevOps Engineering Roadmap',
        description: 'Learn infrastructure, CI/CD, containerization, and cloud platforms.',
        goal: 'DevOps',
        difficulty: 'Advanced',
        duration: '4-5 months',
        prerequisites: ['Linux basics', 'Command line proficiency', 'Basic networking'],
        steps: [
            { phase: 'Phase 1', title: 'Linux & Networking', description: 'Linux administration, networking protocols, shell scripting', estimatedTime: '3 weeks', skills: ['Linux', 'Bash', 'Networking'], resources: ['Linux Journey', 'The Linux Command Line'] },
            { phase: 'Phase 2', title: 'Containers & Orchestration', description: 'Docker, Docker Compose, Kubernetes basics', estimatedTime: '4 weeks', skills: ['Docker', 'Kubernetes', 'Container Registry'], resources: ['Docker Docs', 'K8s Official Tutorial'] },
            { phase: 'Phase 3', title: 'CI/CD & IaC', description: 'GitHub Actions, Jenkins, Terraform, Ansible', estimatedTime: '3 weeks', skills: ['CI/CD', 'Terraform', 'Ansible'], resources: ['GitHub Actions Docs'] },
            { phase: 'Phase 4', title: 'Cloud Platforms', description: 'AWS/GCP core services, monitoring, logging', estimatedTime: '4 weeks', skills: ['AWS', 'GCP', 'Monitoring', 'Logging'], resources: ['AWS Free Tier', 'GCP Qwiklabs'] }
        ]
    },
    {
        title: 'Data Science & ML Roadmap',
        description: 'From Python basics to machine learning, deep learning and data analysis.',
        goal: 'DataScience',
        difficulty: 'Intermediate',
        duration: '5-6 months',
        prerequisites: ['Basic math (linear algebra, statistics)', 'Any programming experience'],
        steps: [
            { phase: 'Phase 1', title: 'Python for Data Science', description: 'NumPy, Pandas, Matplotlib, data cleaning', estimatedTime: '3 weeks', skills: ['Python', 'NumPy', 'Pandas'], resources: ['Kaggle Learn'] },
            { phase: 'Phase 2', title: 'Statistics & Probability', description: 'Distributions, hypothesis testing, Bayesian thinking', estimatedTime: '3 weeks', skills: ['Statistics', 'Probability', 'A/B Testing'], resources: ['Khan Academy'] },
            { phase: 'Phase 3', title: 'Machine Learning', description: 'Regression, classification, clustering, ensemble methods', estimatedTime: '5 weeks', skills: ['Scikit-learn', 'ML Algorithms', 'Feature Engineering'], resources: ['Andrew Ng ML Course'] },
            { phase: 'Phase 4', title: 'Deep Learning', description: 'Neural networks, CNNs, RNNs, transformers', estimatedTime: '4 weeks', skills: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'], resources: ['FastAI', 'Deep Learning Specialization'] }
        ]
    }
];

const resources = [
    // Resume Resources
    { title: 'ATS-Friendly Resume Template', description: 'Clean, professional resume template optimized for Applicant Tracking Systems. Used by 10,000+ candidates.', type: 'Template', url: 'https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs', category: 'Resume', tags: ['ATS', 'Template', 'Professional'], downloads: 8500, rating: 4.8 },
    { title: 'How to Write a Tech Resume', description: 'Complete guide on writing a compelling resume for software engineering roles. Includes real examples from FAANG engineers.', type: 'Article', url: 'https://www.techinterviewhandbook.org/resume/', category: 'Resume', tags: ['Guide', 'Tips', 'FAANG'], downloads: 6200, rating: 4.7 },
    { title: 'Resume Action Words Cheatsheet', description: '200+ powerful action verbs to make your resume stand out. Categorized by impact type.', type: 'PDF', url: 'https://hwpi.harvard.edu/files/ocs/files/hes-resume-cover-letter-guide.pdf', category: 'Resume', tags: ['Action Verbs', 'Cheatsheet'], downloads: 3400, rating: 4.5 },

    // CheatSheet Resources
    { title: 'Big-O Complexity Cheatsheet', description: 'Time and space complexity of every major data structure and algorithm. Essential for interview prep.', type: 'Link', url: 'https://www.bigocheatsheet.com/', category: 'CheatSheet', tags: ['Big-O', 'DSA', 'Complexity'], downloads: 12000, rating: 4.9 },
    { title: 'Git Commands Cheatsheet', description: 'Complete reference of essential Git commands with examples. From basics to advanced workflows.', type: 'PDF', url: 'https://education.github.com/git-cheat-sheet-education.pdf', category: 'CheatSheet', tags: ['Git', 'Version Control'], downloads: 7800, rating: 4.6 },
    { title: 'SQL Quick Reference', description: 'Essential SQL queries, joins, subqueries, and window functions. Great for placement exams.', type: 'Link', url: 'https://www.sqltutorial.org/sql-cheat-sheet/', category: 'CheatSheet', tags: ['SQL', 'Database', 'Queries'], downloads: 5600, rating: 4.5 },
    { title: 'System Design Cheatsheet', description: 'Key concepts, patterns and components for system design interviews. Covers load balancers, databases, caching.', type: 'Link', url: 'https://gist.github.com/vasanthk/485d1c25737e8e72759f', category: 'CheatSheet', tags: ['System Design', 'Interview', 'Architecture'], downloads: 4200, rating: 4.7 },

    // Tutorial Resources
    { title: 'JavaScript ES6+ Features Guide', description: 'Master modern JavaScript — arrow functions, destructuring, promises, async/await, modules and more.', type: 'Article', url: 'https://javascript.info/', category: 'Tutorial', tags: ['JavaScript', 'ES6', 'Modern JS'], downloads: 9100, rating: 4.8 },
    { title: 'React Official Tutorial', description: 'The official React tutorial — learn components, hooks, state management step by step.', type: 'Link', url: 'https://react.dev/learn', category: 'Tutorial', tags: ['React', 'Frontend', 'Hooks'], downloads: 7300, rating: 4.9 },
    { title: 'MongoDB University Courses', description: 'Free official MongoDB courses covering CRUD, aggregation, indexing and schema design.', type: 'Link', url: 'https://university.mongodb.com/', category: 'Tutorial', tags: ['MongoDB', 'Database', 'Free Course'], downloads: 4500, rating: 4.6 },

    // Book Resources
    { title: 'Cracking the Coding Interview', description: 'The gold standard book for coding interviews. 189 programming questions and solutions.', type: 'Link', url: 'https://www.crackingthecodinginterview.com/', category: 'Book', tags: ['Interview', 'DSA', 'Classic'], downloads: 15000, rating: 4.9, isPremium: true },
    { title: 'Clean Code by Robert Martin', description: 'Learn to write clean, maintainable and professional code. A must-read for every developer.', type: 'Link', url: 'https://www.amazon.in/Clean-Code-Robert-C-Martin/dp/8131773388', category: 'Book', tags: ['Clean Code', 'Best Practices'], downloads: 8900, rating: 4.7, isPremium: true },
    { title: 'Designing Data-Intensive Applications', description: 'Deep dive into database internals, distributed systems, and data processing architectures.', type: 'Link', url: 'https://dataintensive.net/', category: 'Book', tags: ['System Design', 'Distributed Systems', 'Advanced'], downloads: 6700, rating: 4.8, isPremium: true },

    // Course Resources
    { title: 'Striver A2Z DSA Sheet', description: 'Complete DSA roadmap with 450+ problems organized by topic. The most popular DSA sheet in India.', type: 'Link', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2', category: 'Course', tags: ['DSA', 'Striver', 'A2Z', 'Free'], downloads: 20000, rating: 5.0 },
    { title: 'NeetCode 150 Problems', description: 'Curated list of 150 LeetCode problems covering all major patterns. Best for focused interview prep.', type: 'Link', url: 'https://neetcode.io/practice', category: 'Course', tags: ['LeetCode', 'Patterns', 'Interview'], downloads: 11000, rating: 4.8 },

    // Cover Letter
    { title: 'Tech Cover Letter Template', description: 'Professional cover letter template tailored for software engineering positions. Includes tips for customization.', type: 'Template', url: 'https://novoresume.com/cover-letter-templates', category: 'CoverLetter', tags: ['Cover Letter', 'Template', 'Professional'], downloads: 3200, rating: 4.4 }
];

const courses = [
    {
        title: 'Striver A2Z DSA Course',
        creator: 'Striver',
        description: 'Complete Data Structures and Algorithms course following the A2Z DSA sheet. Covers every topic from basics to advanced with detailed explanations.',
        thumbnail: 'https://img.youtube.com/vi/0bHoB32fuj0/maxresdefault.jpg',
        category: 'DSA',
        level: 'Beginner',
        totalVideos: 200,
        totalDuration: 18000,
        isPublished: true,
        order: 1
    },
    {
        title: 'Love Babbar DSA Sheet',
        creator: 'Love Babbar',
        description: 'Comprehensive DSA course with 450+ problems. Learn problem-solving patterns and ace your coding interviews.',
        thumbnail: 'https://img.youtube.com/vi/WQoB2z67hvY/maxresdefault.jpg',
        category: 'DSA',
        level: 'Intermediate',
        totalVideos: 150,
        totalDuration: 12000,
        isPublished: true,
        order: 2
    },
    {
        title: 'Web Development Masterclass',
        creator: 'CodeWithHarry',
        description: 'Full stack web development course in Hindi. Covers HTML, CSS, JavaScript, React, Node.js, MongoDB and deployment.',
        thumbnail: 'https://img.youtube.com/vi/tVzUXW6siu0/maxresdefault.jpg',
        category: 'Web Development',
        level: 'Beginner',
        totalVideos: 120,
        totalDuration: 9600,
        isPublished: true,
        order: 3
    },
    {
        title: 'Java + DSA Complete Course',
        creator: 'Apna College',
        description: 'Learn Java programming along with Data Structures and Algorithms. Perfect for placement preparation.',
        thumbnail: 'https://img.youtube.com/vi/UmnCZ7-9yDY/maxresdefault.jpg',
        category: 'DSA',
        level: 'Beginner',
        totalVideos: 180,
        totalDuration: 14400,
        isPublished: true,
        order: 4
    },
    {
        title: 'System Design for Interviews',
        creator: 'Striver',
        description: 'Learn system design concepts — load balancers, databases, caching, message queues, and design real systems like URL shortener, chat app.',
        thumbnail: 'https://img.youtube.com/vi/rliSgjoOFTs/maxresdefault.jpg',
        category: 'System Design',
        level: 'Advanced',
        totalVideos: 30,
        totalDuration: 3600,
        isPublished: true,
        order: 5
    },
    {
        title: 'Operating Systems Complete',
        creator: 'Love Babbar',
        description: 'Operating Systems concepts for placements — process management, memory, scheduling, deadlocks, paging and file systems.',
        thumbnail: 'https://img.youtube.com/vi/bkSWJJZNgf8/maxresdefault.jpg',
        category: 'CS Fundamentals',
        level: 'Intermediate',
        totalVideos: 40,
        totalDuration: 4800,
        isPublished: true,
        order: 6
    }
];

async function seedData() {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Clear existing data
        await Roadmap.deleteMany({});
        await Resource.deleteMany({});
        await Course.deleteMany({});
        console.log('Cleared existing roadmaps, resources, and courses');

        // Insert seed data
        await Roadmap.insertMany(roadmaps);
        console.log(`✅ Seeded ${roadmaps.length} roadmaps`);

        await Resource.insertMany(resources);
        console.log(`✅ Seeded ${resources.length} resources`);

        await Course.insertMany(courses);
        console.log(`✅ Seeded ${courses.length} courses`);

        console.log('\n🎉 All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seedData();
