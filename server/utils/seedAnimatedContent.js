import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

import connectDB from '../config/db.js';
import Topic from '../models/Topic.js';
import TopicContent from '../models/TopicContent.js';

// Main Topics Content (17 main categories)
const mainTopicsContent = {
    'Basics': {
        concept: {
            explanation: 'Understanding the fundamentals of Data Structures and Algorithms is crucial for writing efficient code. This section covers essential concepts like time complexity, space complexity, and problem-solving strategies that form the foundation of all DSA topics.',
            keyPoints: [
                'Time and Space Complexity analysis is fundamental to algorithm design',
                'Asymptotic notations (Big-O, Theta, Omega) describe algorithm efficiency',
                'Understanding best, worst, and average cases helps choose right algorithms',
                'Recursion vs Iteration - knowing when to use each approach',
                'Problem-solving strategies: brute force, divide and conquer, greedy, dynamic programming'
            ],
            timeComplexity: 'Varies by algorithm',
            spaceComplexity: 'Varies by algorithm'
        },
        visualExamples: [{
            title: 'Algorithm Efficiency Comparison',
            steps: [
                {
                    description: 'Comparing different time complexities',
                    visualization: '<div style="padding:2rem;background:var(--bg-secondary);border-radius:12px"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem"><div style="padding:1.5rem;background:#10b981;color:white;border-radius:8px;text-align:center"><div style="font-size:2rem">O(1)</div><div style="margin-top:0.5rem;font-size:0.875rem">Constant</div></div><div style="padding:1.5rem;background:#3b82f6;color:white;border-radius:8px;text-align:center"><div style="font-size:2rem">O(n)</div><div style="margin-top:0.5rem;font-size:0.875rem">Linear</div></div><div style="padding:1.5rem;background:#ef4444;color:white;border-radius:8px;text-align:center"><div style="font-size:2rem">O(n²)</div><div style="margin-top:0.5rem;font-size:0.875rem">Quadratic</div></div></div></div>',
                    code: '// O(1) - Best\narray[0]\n\n// O(n) - Good\nfor (let i = 0; i < n; i++) {}\n\n// O(n²) - Avoid if possible\nfor (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {}\n}'
                }
            ]
        }],
        commonPatterns: [
            {
                name: 'Analyzing Algorithm Efficiency',
                description: 'Always analyze time and space complexity before implementing',
                example: '// Step 1: Identify operations\n// Step 2: Count iterations\n// Step 3: Express in Big-O notation\n// Step 4: Optimize if needed'
            }
        ],
        tips: [
            'Master Big-O notation before diving into complex algorithms',
            'Practice analyzing code complexity',
            'Understand trade-offs between time and space',
            'Learn to recognize common patterns'
        ]
    },

    'Arrays and Array Operations': {
        concept: {
            explanation: 'Arrays are fundamental data structures that store elements in contiguous memory locations. Mastering array operations and techniques like two pointers, sliding window, and prefix sums is essential for solving a wide range of problems efficiently.',
            keyPoints: [
                'Arrays provide O(1) random access to elements',
                'Two Pointers technique reduces O(n²) to O(n) for many problems',
                'Sliding Window optimizes subarray problems',
                'Prefix Sum enables O(1) range queries',
                'Understanding array manipulation is crucial for interviews'
            ],
            timeComplexity: 'Access: O(1), Search: O(n), Insert/Delete: O(n)',
            spaceComplexity: 'O(n)'
        },
        visualExamples: [{
            title: 'Array Operations Overview',
            steps: [
                {
                    description: 'Array indexing and access',
                    visualization: '<div style="padding:2rem;background:var(--bg-secondary);border-radius:12px"><div style="display:flex;gap:0.5rem;justify-content:center"><div style="padding:1rem;background:#3b82f6;color:white;border-radius:8px">10</div><div style="padding:1rem;background:#3b82f6;color:white;border-radius:8px">20</div><div style="padding:1rem;background:#3b82f6;color:white;border-radius:8px">30</div><div style="padding:1rem;background:#3b82f6;color:white;border-radius:8px">40</div><div style="padding:1rem;background:#3b82f6;color:white;border-radius:8px">50</div></div><div style="display:flex;gap:0.5rem;justify-content:center;margin-top:0.5rem;color:var(--text-secondary)"><div style="padding:0.5rem">0</div><div style="padding:0.5rem">1</div><div style="padding:0.5rem">2</div><div style="padding:0.5rem">3</div><div style="padding:0.5rem">4</div></div></div>',
                    code: 'const arr = [10, 20, 30, 40, 50];\nconsole.log(arr[2]); // 30 - O(1) access'
                }
            ]
        }],
        commonPatterns: [
            {
                name: 'Two Pointers',
                description: 'Use two indices to traverse array efficiently',
                example: 'function twoSum(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    const sum = arr[left] + arr[right];\n    if (sum === target) return [left, right];\n    if (sum < target) left++;\n    else right--;\n  }\n}'
            }
        ],
        tips: [
            'Always check array bounds before accessing',
            'Consider sorting for two-pointer problems',
            'Use hash maps for O(n) lookups',
            'Practice sliding window for subarray problems'
        ]
    }
};

// Subtopics animated content (keeping existing detailed content)
const subtopicsContent = {
    'Time & Space Complexity': {
        concept: {
            explanation: 'Time complexity measures how the runtime of an algorithm grows with input size, while space complexity measures memory usage. Understanding these helps you write efficient code.',
            keyPoints: [
                'Time complexity: How execution time scales with input size',
                'Space complexity: How memory usage scales with input size',
                'Big-O notation describes worst-case growth rate',
                'Constant O(1) < Logarithmic O(log n) < Linear O(n) < Quadratic O(n²)',
                'Always aim for the most efficient solution that meets requirements'
            ],
            timeComplexity: 'Varies by algorithm',
            spaceComplexity: 'Varies by algorithm'
        },
        visualExamples: [{
            title: 'Complexity Growth Comparison',
            steps: [
                {
                    description: 'O(1) - Constant: Accessing array element by index',
                    code: 'function getFirst(arr) {\n  return arr[0]; // Always 1 operation\n}',
                    visualization: '<div style="padding:2rem;background:var(--bg-secondary);border-radius:12px"><div style="font-size:2rem;text-align:center">📊 O(1)</div><div style="margin-top:1rem;text-align:center">Input size: 10 → 1 operation<br>Input size: 1000 → 1 operation</div></div>'
                },
                {
                    description: 'O(n) - Linear: Searching through array',
                    code: 'function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}',
                    visualization: '<div style="padding:2rem;background:var(--bg-secondary);border-radius:12px"><div style="font-size:2rem;text-align:center">📈 O(n)</div><div style="margin-top:1rem;text-align:center">Input size: 10 → ~10 operations<br>Input size: 1000 → ~1000 operations</div></div>'
                },
                {
                    description: 'O(n²) - Quadratic: Nested loops',
                    code: 'function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n}',
                    visualization: '<div style="padding:2rem;background:var(--bg-secondary);border-radius:12px"><div style="font-size:2rem;text-align:center">📉 O(n²)</div><div style="margin-top:1rem;text-align:center;color:#ef4444">Input size: 10 → 100 operations<br>Input size: 1000 → 1,000,000 operations!</div></div>'
                }
            ]
        }],
        commonPatterns: [
            {
                name: 'Analyzing Loops',
                description: 'Single loop = O(n), Nested loops = O(n²), Halving input = O(log n)',
                example: '// O(n)\nfor (let i = 0; i < n; i++) { }\n\n// O(n²)\nfor (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) { }\n}\n\n// O(log n)\nwhile (n > 1) { n = n / 2; }'
            }
        ],
        tips: [
            'Drop constants: O(2n) = O(n)',
            'Drop non-dominant terms: O(n² + n) = O(n²)',
            'Different inputs use different variables: O(a + b) not O(n)',
            'Space complexity includes input space + auxiliary space'
        ]
    },

    'Two Pointers': {
        concept: {
            explanation: 'Two pointers technique uses two indices to traverse data structures efficiently. Common patterns include opposite direction (from both ends) and same direction (fast-slow pointers).',
            keyPoints: [
                'Reduces time complexity from O(n²) to O(n) for many problems',
                'Works best on sorted arrays or linked lists',
                'Three main patterns: opposite ends, same direction, sliding window',
                'Always check boundary conditions (left < right)',
                'Common in pair-finding, palindrome, and partitioning problems'
            ],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)'
        },
        visualExamples: [{
            title: 'Two Sum in Sorted Array',
            steps: [
                {
                    description: 'Step 1: Initialize pointers at both ends',
                    visualization: '<div style="display:flex;gap:0.5rem;justify-content:center;padding:2rem"><div style="padding:1rem;background:#3b82f6;color:white;border-radius:8px">1</div><div style="padding:1rem;background:var(--bg-secondary);border-radius:8px">2</div><div style="padding:1rem;background:var(--bg-secondary);border-radius:8px">3</div><div style="padding:1rem;background:var(--bg-secondary);border-radius:8px">4</div><div style="padding:1rem;background:#ef4444;color:white;border-radius:8px">5</div></div><div style="text-align:center;margin-top:1rem">Left=0, Right=4, Target=7</div>',
                    code: 'let left = 0;\nlet right = arr.length - 1;'
                },
                {
                    description: 'Step 2: Sum = 1+5 = 6 < 7, move left pointer right',
                    visualization: '<div style="display:flex;gap:0.5rem;justify-content:center;padding:2rem"><div style="padding:1rem;background:var(--bg-secondary);border-radius:8px;opacity:0.5">1</div><div style="padding:1rem;background:#3b82f6;color:white;border-radius:8px">2</div><div style="padding:1rem;background:var(--bg-secondary);border-radius:8px">3</div><div style="padding:1rem;background:var(--bg-secondary);border-radius:8px">4</div><div style="padding:1rem;background:#ef4444;color:white;border-radius:8px">5</div></div><div style="text-align:center;margin-top:1rem;color:#f59e0b">Sum = 6 < 7, left++</div>',
                    code: 'if (arr[left] + arr[right] < target) {\n  left++;\n}'
                },
                {
                    description: 'Step 3: Sum = 2+5 = 7, Found! ✅',
                    visualization: '<div style="display:flex;gap:0.5rem;justify-content:center;padding:2rem"><div style="padding:1rem;background:var(--bg-secondary);border-radius:8px;opacity:0.5">1</div><div style="padding:1rem;background:#10b981;color:white;border-radius:8px">2</div><div style="padding:1rem;background:var(--bg-secondary);border-radius:8px">3</div><div style="padding:1rem;background:var(--bg-secondary);border-radius:8px">4</div><div style="padding:1rem;background:#10b981;color:white;border-radius:8px">5</div></div><div style="text-align:center;margin-top:1rem;color:#10b981;font-weight:700">✅ Found: [1, 4]</div>',
                    code: 'if (arr[left] + arr[right] === target) {\n  return [left, right];\n}'
                }
            ]
        }],
        commonPatterns: [
            {
                name: 'Opposite Direction',
                description: 'Start from both ends, move towards center',
                example: 'function twoSum(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    const sum = arr[left] + arr[right];\n    if (sum === target) return [left, right];\n    if (sum < target) left++;\n    else right--;\n  }\n  return [-1, -1];\n}'
            }
        ],
        tips: [
            'Always validate array is sorted if algorithm requires it',
            'Watch out for edge cases: empty array, single element',
            'Consider what condition moves each pointer',
            'Practice with: Two Sum II, Container With Most Water, Remove Duplicates'
        ]
    }
};

const seedAnimatedContent = async () => {
    try {
        console.log('🎬 Starting animated content seeding...\n');

        await connectDB();

        console.log('📝 Clearing existing TopicContent...');
        await TopicContent.deleteMany({});

        // Seed MAIN TOPICS first
        const mainTopics = await Topic.find({ isMainCategory: true }).sort({ order: 1 });
        console.log(`\n📚 Found ${mainTopics.length} main topics\n`);

        let mainContentCreated = 0;
        for (const topic of mainTopics) {
            const content = mainTopicsContent[topic.title];

            if (content) {
                await TopicContent.create({
                    topic: topic._id,
                    title: topic.title,
                    description: topic.description,
                    ...content
                });
                mainContentCreated++;
                console.log(`✅ Added content for MAIN topic: ${topic.title}`);
            } else {
                // Basic content for main topics without detailed data
                await TopicContent.create({
                    topic: topic._id,
                    title: topic.title,
                    description: topic.description,
                    concept: {
                        explanation: `${topic.title} covers essential concepts and techniques. ${topic.description}`,
                        keyPoints: [
                            `Master the fundamentals of ${topic.title}`,
                            'Understand common patterns and approaches',
                            'Practice with various problem types',
                            'Learn time and space complexity analysis'
                        ]
                    },
                    tips: [
                        `Start with basics of ${topic.title}`,
                        'Practice regularly with coding problems',
                        'Understand the theory before implementation',
                        'Review and revise concepts frequently'
                    ]
                });
                mainContentCreated++;
                console.log(`📝 Added basic content for MAIN topic: ${topic.title}`);
            }
        }

        // Seed SUBTOPICS
        const allSubtopics = await Topic.find({ isMainCategory: false }).sort({ category: 1, order: 1 });
        console.log(`\n📖 Found ${allSubtopics.length} subtopics\n`);

        let subtopicContentCreated = 0;
        for (const topic of allSubtopics) {
            const content = subtopicsContent[topic.title];

            if (content) {
                await TopicContent.create({
                    topic: topic._id,
                    title: topic.title,
                    description: topic.description,
                    ...content
                });
                subtopicContentCreated++;
                console.log(`✅ Added animated content for subtopic: ${topic.title}`);
            } else {
                // Create basic content for subtopics without detailed data
                await TopicContent.create({
                    topic: topic._id,
                    title: topic.title,
                    description: topic.description,
                    concept: {
                        explanation: `${topic.title} is an important concept in ${topic.category}. ${topic.description}`,
                        keyPoints: [
                            `Understanding ${topic.title} is crucial for mastering ${topic.category}`,
                            'Practice with various examples to build intuition',
                            'Focus on time and space complexity analysis',
                            'Learn common patterns and edge cases'
                        ],
                        timeComplexity: topic.timeComplexity || 'Varies',
                        spaceComplexity: topic.spaceComplexity || 'Varies'
                    },
                    tips: [
                        `Start with simple examples of ${topic.title}`,
                        'Draw diagrams to visualize the concept',
                        'Practice coding implementations',
                        'Solve related LeetCode/GeeksforGeeks problems'
                    ]
                });
                subtopicContentCreated++;
                console.log(`📝 Added basic content for subtopic: ${topic.title}`);
            }
        }

        console.log(`\n🎉 Content seeding completed!`);
        console.log(`   Main topics: ${mainContentCreated}/${mainTopics.length}`);
        console.log(`   Subtopics: ${subtopicContentCreated}/${allSubtopics.length}`);
        console.log(`   Total: ${mainContentCreated + subtopicContentCreated}/${mainTopics.length + allSubtopics.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding animated content:', error);
        process.exit(1);
    }
};

seedAnimatedContent();
