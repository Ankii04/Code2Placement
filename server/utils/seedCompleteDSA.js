import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from root directory
dotenv.config({ path: join(__dirname, '../../.env') });

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Topic from '../models/Topic.js';
import Question from '../models/Question.js';
import InterviewQA from '../models/InterviewQA.js';
import Roadmap from '../models/Roadmap.js';
import Company from '../models/Company.js';
import Badge from '../models/Badge.js';
import { questions, interviewQATechnical, interviewQAHR, roadmaps, companies, badges } from './seedData.js';

// Complete DSA Topics with 5 Subtopics Each
const completeDSATopics = [
    {
        main: {
            title: 'Basics',
            description: 'Fundamental concepts of algorithm analysis and complexity',
            icon: '📖',
            category: 'Basics',
            isMainCategory: true,
            order: 1
        },
        subtopics: [
            { title: 'Time & Space Complexity', description: 'Understanding algorithm efficiency and resource usage', difficulty: 'Easy', order: 1 },
            { title: 'Asymptotic Notations (Big-O, Ω, Θ)', description: 'Mathematical notations for algorithm complexity analysis', difficulty: 'Easy', order: 2 },
            { title: 'Best, Worst, Average Case Analysis', description: 'Analyzing algorithm performance in different scenarios', difficulty: 'Medium', order: 3 },
            { title: 'Recursion vs Iteration', description: 'Comparing recursive and iterative approaches', difficulty: 'Easy', order: 4 },
            { title: 'Problem Solving Strategies', description: 'Systematic approaches to solving algorithmic problems', difficulty: 'Medium', order: 5 }
        ]
    },
    {
        main: {
            title: 'Arrays',
            description: 'Linear data structure for storing elements in contiguous memory',
            icon: '📊',
            category: 'Arrays',
            isMainCategory: true,
            order: 2
        },
        subtopics: [
            { title: 'Two Pointers', description: 'Efficient technique using two pointers for array problems', difficulty: 'Medium', order: 1 },
            { title: 'Sliding Window', description: 'Technique for solving subarray/substring problems', difficulty: 'Medium', order: 2 },
            { title: 'Prefix Sum', description: 'Precomputation technique for range sum queries', difficulty: 'Easy', order: 3 },
            { title: 'Kadane\'s Algorithm', description: 'Finding maximum sum subarray in linear time', difficulty: 'Medium', order: 4 },
            { title: 'Array Rotation & Reversal', description: 'Rotating and reversing array elements efficiently', difficulty: 'Easy', order: 5 }
        ]
    },
    {
        main: {
            title: 'Strings',
            description: 'Sequence of characters and string manipulation techniques',
            icon: '📝',
            category: 'Strings',
            isMainCategory: true,
            order: 3
        },
        subtopics: [
            { title: 'Pattern Searching', description: 'Finding patterns within strings efficiently', difficulty: 'Medium', order: 1 },
            { title: 'String Matching (KMP, Rabin-Karp)', description: 'Advanced pattern matching algorithms', difficulty: 'Hard', order: 2 },
            { title: 'Palindromes', description: 'Checking and finding palindromic substrings', difficulty: 'Medium', order: 3 },
            { title: 'Anagrams', description: 'Detecting and grouping anagrams', difficulty: 'Easy', order: 4 },
            { title: 'String Hashing', description: 'Using hash functions for string problems', difficulty: 'Medium', order: 5 }
        ]
    },
    {
        main: {
            title: 'Linked List',
            description: 'Linear data structure with nodes connected via pointers',
            icon: '🔗',
            category: 'Linked List',
            isMainCategory: true,
            order: 4
        },
        subtopics: [
            { title: 'Singly Linked List', description: 'Basic linked list with one-way traversal', difficulty: 'Easy', order: 1 },
            { title: 'Doubly Linked List', description: 'Linked list with bidirectional traversal', difficulty: 'Medium', order: 2 },
            { title: 'Fast & Slow Pointers', description: 'Two-pointer approach for cycle detection and middle finding', difficulty: 'Medium', order: 3 },
            { title: 'Reverse Linked List', description: 'Reversing linked list iteratively and recursively', difficulty: 'Medium', order: 4 },
            { title: 'Merge Linked Lists', description: 'Merging two or more sorted linked lists', difficulty: 'Medium', order: 5 }
        ]
    },
    {
        main: {
            title: 'Stack',
            description: 'LIFO (Last In First Out) data structure',
            icon: '📚',
            category: 'Stack',
            isMainCategory: true,
            order: 5
        },
        subtopics: [
            { title: 'Stack Basics', description: 'Stack implementation and basic operations', difficulty: 'Easy', order: 1 },
            { title: 'Next Greater Element', description: 'Finding next greater element using stack', difficulty: 'Medium', order: 2 },
            { title: 'Balanced Parentheses', description: 'Checking validity of parentheses expressions', difficulty: 'Easy', order: 3 },
            { title: 'Infix-Prefix-Postfix Conversion', description: 'Converting between expression notations', difficulty: 'Medium', order: 4 },
            { title: 'Monotonic Stack', description: 'Stack maintaining monotonic order for optimization', difficulty: 'Hard', order: 5 }
        ]
    },
    {
        main: {
            title: 'Queue',
            description: 'FIFO (First In First Out) data structure',
            icon: '🎫',
            category: 'Queue',
            isMainCategory: true,
            order: 6
        },
        subtopics: [
            { title: 'Queue Basics', description: 'Queue implementation and basic operations', difficulty: 'Easy', order: 1 },
            { title: 'Circular Queue', description: 'Efficient queue using circular array', difficulty: 'Medium', order: 2 },
            { title: 'Deque', description: 'Double-ended queue for insertion/deletion at both ends', difficulty: 'Medium', order: 3 },
            { title: 'Priority Queue', description: 'Queue where elements have priorities', difficulty: 'Medium', order: 4 },
            { title: 'Monotonic Queue', description: 'Queue maintaining monotonic order', difficulty: 'Hard', order: 5 }
        ]
    },
    {
        main: {
            title: 'Trees',
            description: 'Hierarchical data structure with parent-child relationships',
            icon: '🌳',
            category: 'Trees',
            isMainCategory: true,
            order: 7
        },
        subtopics: [
            { title: 'Binary Tree Basics', description: 'Tree where each node has at most two children', difficulty: 'Easy', order: 1 },
            { title: 'Tree Traversals', description: 'Inorder, Preorder, Postorder, Level Order traversals', difficulty: 'Medium', order: 2 },
            { title: 'Binary Search Tree', description: 'Binary tree with ordered node values', difficulty: 'Medium', order: 3 },
            { title: 'Lowest Common Ancestor', description: 'Finding common ancestor of two nodes', difficulty: 'Medium', order: 4 },
            { title: 'Heap', description: 'Complete binary tree with heap property', difficulty: 'Hard', order: 5 }
        ]
    },
    {
        main: {
            title: 'Graphs',
            description: 'Non-linear data structure with vertices and edges',
            icon: '🕸️',
            category: 'Graphs',
            isMainCategory: true,
            order: 8
        },
        subtopics: [
            { title: 'Graph Representation', description: 'Adjacency matrix and adjacency list', difficulty: 'Easy', order: 1 },
            { title: 'BFS & DFS', description: 'Breadth-first and depth-first search algorithms', difficulty: 'Medium', order: 2 },
            { title: 'Shortest Path (Dijkstra)', description: 'Finding shortest paths in weighted graphs', difficulty: 'Hard', order: 3 },
            { title: 'Topological Sort', description: 'Linear ordering of vertices in DAG', difficulty: 'Medium', order: 4 },
            { title: 'Minimum Spanning Tree', description: 'Kruskal\'s and Prim\'s algorithms', difficulty: 'Hard', order: 5 }
        ]
    },
    {
        main: {
            title: 'Recursion & Backtracking',
            description: 'Problem-solving techniques using recursive calls and backtracking',
            icon: '🔄',
            category: 'Recursion & Backtracking',
            isMainCategory: true,
            order: 9
        },
        subtopics: [
            { title: 'Basic Recursion', description: 'Understanding recursive function calls', difficulty: 'Easy', order: 1 },
            { title: 'Subset & Subsequence Problems', description: 'Generating all subsets and subsequences', difficulty: 'Medium', order: 2 },
            { title: 'Permutations & Combinations', description: 'Generating all permutations of elements', difficulty: 'Medium', order: 3 },
            { title: 'N-Queens Problem', description: 'Classic backtracking problem placing queens on chessboard', difficulty: 'Hard', order: 4 },
            { title: 'Sudoku Solver', description: 'Solving sudoku puzzles using backtracking', difficulty: 'Hard', order: 5 }
        ]
    },
    {
        main: {
            title: 'Dynamic Programming',
            description: 'Optimization technique using memoization and tabulation',
            icon: '💎',
            category: 'Dynamic Programming',
            isMainCategory: true,
            order: 10
        },
        subtopics: [
            { title: '1D DP', description: 'Dynamic programming on linear sequences', difficulty: 'Medium', order: 1 },
            { title: '2D DP', description: 'Dynamic programming on grids and matrices', difficulty: 'Hard', order: 2 },
            { title: 'Knapsack Problems', description: '0/1 and unbounded knapsack problems', difficulty: 'Hard', order: 3 },
            { title: 'Longest Common Subsequence', description: 'Finding LCS in strings', difficulty: 'Medium', order: 4 },
            { title: 'DP on Trees', description: 'Dynamic programming on tree structures', difficulty: 'Hard', order: 5 }
        ]
    },
    {
        main: {
            title: 'Greedy Algorithms',
            description: 'Making locally optimal choices for global optimization',
            icon: '🎯',
            category: 'Greedy Algorithms',
            isMainCategory: true,
            order: 11
        },
        subtopics: [
            { title: 'Activity Selection', description: 'Selecting maximum non-overlapping activities', difficulty: 'Medium', order: 1 },
            { title: 'Interval Scheduling', description: 'Scheduling intervals without overlap', difficulty: 'Medium', order: 2 },
            { title: 'Huffman Coding', description: 'Optimal prefix-free encoding', difficulty: 'Hard', order: 3 },
            { title: 'Fractional Knapsack', description: 'Knapsack with fractional items allowed', difficulty: 'Medium', order: 4 },
            { title: 'Job Sequencing', description: 'Maximizing profit with deadlines', difficulty: 'Medium', order: 5 }
        ]
    },
    {
        main: {
            title: 'Searching & Sorting',
            description: 'Fundamental algorithms for searching and ordering data',
            icon: '🔍',
            category: 'Searching & Sorting',
            isMainCategory: true,
            order: 12
        },
        subtopics: [
            { title: 'Binary Search', description: 'Efficient searching in sorted arrays', difficulty: 'Easy', order: 1 },
            { title: 'Advanced Binary Search', description: 'Complex applications of binary search', difficulty: 'Medium', order: 2 },
            { title: 'Merge Sort', description: 'Divide and conquer sorting algorithm', difficulty: 'Medium', order: 3 },
            { title: 'Quick Sort', description: 'Efficient partition-based sorting', difficulty: 'Medium', order: 4 },
            { title: 'Heap Sort', description: 'Sorting using heap data structure', difficulty: 'Medium', order: 5 }
        ]
    },
    {
        main: {
            title: 'Bit Manipulation',
            description: 'Operations on individual bits for optimization',
            icon: '⚡',
            category: 'Bit Manipulation',
            isMainCategory: true,
            order: 13
        },
        subtopics: [
            { title: 'Bitwise Operators', description: 'AND, OR, XOR, NOT, shift operations', difficulty: 'Easy', order: 1 },
            { title: 'Subsets using Bits', description: 'Generating subsets using bitmasks', difficulty: 'Medium', order: 2 },
            { title: 'Bit Masks', description: 'Using masks for state representation', difficulty: 'Medium', order: 3 },
            { title: 'Power of Two', description: 'Checking and working with powers of 2', difficulty: 'Easy', order: 4 },
            { title: 'XOR Tricks', description: 'Clever XOR-based problem solving', difficulty: 'Medium', order: 5 }
        ]
    },
    {
        main: {
            title: 'Hashing',
            description: 'Using hash functions for fast data access',
            icon: '#️⃣',
            category: 'Hashing',
            isMainCategory: true,
            order: 14
        },
        subtopics: [
            { title: 'Hash Maps', description: 'Key-value pair storage and retrieval', difficulty: 'Easy', order: 1 },
            { title: 'Hash Sets', description: 'Unique element storage using hashing', difficulty: 'Easy', order: 2 },
            { title: 'Frequency Maps', description: 'Counting element occurrences', difficulty: 'Easy', order: 3 },
            { title: 'Collision Handling', description: 'Chaining and open addressing techniques', difficulty: 'Medium', order: 4 },
            { title: 'Rolling Hash', description: 'Efficient string hashing for pattern matching', difficulty: 'Hard', order: 5 }
        ]
    },
    {
        main: {
            title: 'Advanced Data Structures',
            description: 'Complex data structures for specialized problems',
            icon: '🏗️',
            category: 'Advanced Data Structures',
            isMainCategory: true,
            order: 15
        },
        subtopics: [
            { title: 'Segment Tree', description: 'Tree for range queries and updates', difficulty: 'Hard', order: 1 },
            { title: 'Fenwick Tree (BIT)', description: 'Binary indexed tree for prefix sums', difficulty: 'Hard', order: 2 },
            { title: 'Disjoint Set Union (Union-Find)', description: 'Efficient set operations and connectivity', difficulty: 'Medium', order: 3 },
            { title: 'Trie (Advanced)', description: 'Advanced trie operations and applications', difficulty: 'Medium', order: 4 },
            { title: 'LRU Cache', description: 'Least recently used cache implementation', difficulty: 'Medium', order: 5 }
        ]
    },
    {
        main: {
            title: 'Mathematics for DSA',
            description: 'Mathematical concepts essential for algorithms',
            icon: '🔢',
            category: 'Mathematics for DSA',
            isMainCategory: true,
            order: 16
        },
        subtopics: [
            { title: 'GCD & LCM', description: 'Greatest common divisor and least common multiple', difficulty: 'Easy', order: 1 },
            { title: 'Modular Arithmetic', description: 'Arithmetic operations with modulo', difficulty: 'Medium', order: 2 },
            { title: 'Sieve of Eratosthenes', description: 'Finding all primes up to a limit', difficulty: 'Medium', order: 3 },
            { title: 'Fast Exponentiation', description: 'Computing powers efficiently', difficulty: 'Medium', order: 4 },
            { title: 'Combinatorics', description: 'Counting and arrangement problems', difficulty: 'Medium', order: 5 }
        ]
    },
    {
        main: {
            title: 'Miscellaneous',
            description: 'Additional important concepts and techniques',
            icon: '🎲',
            category: 'Miscellaneous',
            isMainCategory: true,
            order: 17
        },
        subtopics: [
            { title: 'Two Pointers (Advanced)', description: 'Advanced two-pointer techniques', difficulty: 'Medium', order: 1 },
            { title: 'Sliding Window (Advanced)', description: 'Complex sliding window problems', difficulty: 'Hard', order: 2 },
            { title: 'Randomized Algorithms', description: 'Algorithms using randomness', difficulty: 'Hard', order: 3 },
            { title: 'Amortized Analysis', description: 'Average time complexity analysis', difficulty: 'Medium', order: 4 },
            { title: 'Problem Solving Patterns', description: 'Common patterns in competitive programming', difficulty: 'Medium', order: 5 }
        ]
    }
];

const seedDatabase = async () => {
    try {
        console.log('Environment check:');
        console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
        console.log('MONGODB_URI length:', process.env.MONGODB_URI?.length || 0);

        await connectDB();

        console.log('\n🗑️  Clearing existing data...');
        await Topic.deleteMany({});
        await Question.deleteMany({});
        await InterviewQA.deleteMany({});
        await Roadmap.deleteMany({});
        await Company.deleteMany({});
        await Badge.deleteMany({});

        console.log('\n📝 Creating DSA topics with subtopics...\n');

        let totalSubtopics = 0;

        for (const topicData of completeDSATopics) {
            // Create main topic
            const mainTopic = await Topic.create(topicData.main);
            console.log(`✅ Created main topic: ${mainTopic.title}`);

            const subtopicIds = [];

            // Create subtopics
            for (const subtopicData of topicData.subtopics) {
                const subtopic = await Topic.create({
                    ...subtopicData,
                    category: topicData.main.category,
                    icon: topicData.main.icon,
                    parentTopic: mainTopic._id,
                    isMainCategory: false,
                    questionCount: 0
                });
                subtopicIds.push(subtopic._id);
                totalSubtopics++;
                console.log(`  ↳ ${subtopic.title}`);
            }

            // Update main topic with subtopics
            mainTopic.subtopics = subtopicIds;
            await mainTopic.save();
            console.log(`  📌 Linked ${subtopicIds.length} subtopics\n`);
        }

        console.log('📚 Seeding questions...');
        // Link questions to topics
        const allTopics = await Topic.find({ isMainCategory: false });
        const questionsWithTopics = questions.map((q, index) => ({
            ...q,
            topic: allTopics[index % allTopics.length]._id
        }));
        const createdQuestions = await Question.insertMany(questionsWithTopics);
        console.log(`✓ Created ${createdQuestions.length} questions`);

        console.log('\n💬 Seeding interview Q&A...');
        const allInterviewQA = [...interviewQATechnical, ...interviewQAHR];
        const createdQA = await InterviewQA.insertMany(allInterviewQA);
        console.log(`✓ Created ${createdQA.length} interview Q&A`);

        console.log('\n🗺️  Seeding roadmaps...');
        const createdRoadmaps = await Roadmap.insertMany(roadmaps);
        console.log(`✓ Created ${createdRoadmaps.length} roadmaps`);

        console.log('\n🏢 Seeding companies...');
        const createdCompanies = await Company.insertMany(companies);
        console.log(`✓ Created ${createdCompanies.length} companies`);

        console.log('\n🏆 Seeding badges...');
        const createdBadges = await Badge.insertMany(badges);
        console.log(`✓ Created ${createdBadges.length} badges`);

        console.log('\n👤 Creating admin user...');
        const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@code2placement.com' });
        if (!adminExists) {
            await User.create({
                name: 'Admin',
                email: process.env.ADMIN_EMAIL || 'admin@code2placement.com',
                password: process.env.ADMIN_PASSWORD || 'Admin@123',
                role: 'ADMIN',
                isEmailVerified: true
            });
            console.log('✓ Created admin user');
        } else {
            console.log('✓ Admin user already exists');
        }

        console.log('\n' + '='.repeat(60));
        console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
        console.log('='.repeat(60));
        console.log(`\n📊 Summary:`);
        console.log(`   • Main Topics: ${completeDSATopics.length}`);
        console.log(`   • Subtopics: ${totalSubtopics}`);
        console.log(`   • Questions: ${createdQuestions.length}`);
        console.log(`   • Interview Q&A: ${createdQA.length}`);
        console.log(`   • Roadmaps: ${createdRoadmaps.length}`);
        console.log(`   • Companies: ${createdCompanies.length}`);
        console.log(`   • Badges: ${createdBadges.length}`);
        console.log(`\n🔐 Admin credentials:`);
        console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@code2placement.com'}`);
        console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
        console.log('\n' + '='.repeat(60) + '\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
