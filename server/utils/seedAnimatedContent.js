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
                    ],
                    commonPatterns: [
                        {
                            name: `Basic Example: ${topic.title}`,
                            description: `Try out a foundational approach for ${topic.title}. Modify the code and see how it works!`,
                            language: 'javascript',
                            example: `// Example for ${topic.title}\nfunction solve() {\n  console.log("Exploring ${topic.title}");\n  // Add your code here\n}\n\nsolve();`
                        }
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
                // Helper function to generate topic specific implementation
                const generateTopicContent = (title, category, description) => {
                    const specificContent = {
                        'Time & Space Complexity': {
                            explanation: 'Time complexity answers the question "How fast does the runtime grow as the input size grows?" Space complexity answers "How much extra memory do we need as input size grows?" Evaluating these is paramount for writing scalable algorithms.',
                            code: `// Time Complexity: O(n) example
function findMax(arr) {
  let max = -Infinity;
  // We visit each element once, so it scales linearly with array length
  for(let n of arr) {
    if(n > max) max = n;
  }
  return max;
}

const data = [10, 4, 30, 2, 70, 8];
console.log("Max element:", findMax(data));`
                        },
                        'Asymptotic Notations (Big-O, Ω, Θ)': {
                            explanation: 'Big-O represents the upper bound (worst-case), Omega (Ω) is the lower bound (best-case), and Theta (Θ) is the exact bound (average-case). Big-O is most commonly used in interviews.',
                            code: `// Big-O Notations
function constantTime(arr) {
  console.log("O(1) - Constant:", arr[0]);
}

function linearTime(arr) {
  console.log("O(n) - Linear:");
  arr.forEach(element => console.log(element));
}

constantTime([1, 2, 3]);
linearTime([1, 2, 3]);`
                        },
                        'Best, Worst, Average Case Analysis': {
                            explanation: 'Algorithms can perform differently depending on the input variation. Best case scenario occurs when data is exactly how we want it. Worst case is the maximum time. Average is expected time across all inputs.',
                            code: `// Demonstrating best and worst cases in Search
function linearSearch(arr, target) {
  let steps = 0;
  for (let i = 0; i < arr.length; i++) {
    steps++;
    if (arr[i] === target) {
      console.log(\`Found \${target} in \${steps} step(s)!\`);
      return;
    }
  }
  console.log(\`\${target} not found after \${steps} steps.\`);
}

const arr = [10, 20, 30, 40, 50];
linearSearch(arr, 10); // Best case: 1 step
linearSearch(arr, 50); // Worst case: 5 steps`
                        },
                        'Recursion vs Iteration': {
                            explanation: 'Recursion happens when a function calls itself to solve a smaller instance of the same problem. Iteration uses loops like `for` and `while`. Both can solve similar problems, but recursion involves overhead from the call stack.',
                            code: `// Computing Factorial
function factIterative(n) {
  let res = 1;
  for(let i = 1; i <= n; i++) res *= i;
  return res;
}

function factRecursive(n) {
  if (n <= 1) return 1;
  return n * factRecursive(n - 1);
}

console.log("Iterative 5! =", factIterative(5));
console.log("Recursive 5! =", factRecursive(5));`
                        },
                        'Two Pointers': {
                            explanation: 'The Two Pointers technique involves using two indices to continuously iterate through an array or list until certain conditions are met, drastically reducing time complexities from O(n^2) to O(n).',
                            code: `// Two Sum on sorted array
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while(left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;
    else right--;
  }
  return null;
}

console.log("Indices for sum 9:", twoSum([2, 7, 11, 15], 9));`
                        },
                        'Sliding Window': {
                            explanation: 'Sliding Window is used to compute something over sequential subarrays. Instead of traversing the same elements repeatedly, you simply slide the window, removing the contribution of the element left behind and adding the new element.',
                            code: `// Maximum sum of subarray of size k
function maxSubArraySum(arr, k) {
  let maxSum = 0, windowSum = 0;
  
  // Calculate first window
  for(let i = 0; i < k; i++) windowSum += arr[i];
  maxSum = windowSum;
  
  // Slide window
  for(let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i-k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}

console.log("Max sum of 3 elements:", maxSubArraySum([1, 4, 2, 10, 2, 3, 1, 0, 20], 3));`
                        },
                        'Binary Search': {
                            explanation: 'Binary Search is a divide-and-conquer algorithm that finds an element in a sorted array in O(log n) time by repeatedly dividing the search interval in half.',
                            code: `// Binary Search Implementation
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while(left <= right) {
    let mid = Math.floor((left + right) / 2);
    if(arr[mid] === target) return mid;
    else if(arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

const sortedArr = [1, 3, 5, 7, 9, 11, 13];
console.log("Index of 7:", binarySearch(sortedArr, 7));`
                        },
                        'Hash Maps': {
                            explanation: 'Hash Maps (or Hash Tables) store key-value pairs allowing access to values in O(1) time on average. They are extremely useful for counting frequencies, tracking seen elements, or associating data.',
                            code: `// Finding frequency of characters
function charFrequency(str) {
  const map = new Map();
  
  for(let char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  
  for(let [key, value] of map) {
    console.log(\`\${key}: \${value}\`);
  }
}

charFrequency("hello algorithm");`
                        },
                        'Singly Linked List': {
                            explanation: 'A Singly Linked List is a linear collection of data elements, whose order is not given by their physical placement in memory. Instead, each element points to the next, creating a sequence.',
                            code: `// Implementing and Traversing a Linked List
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);

let curr = head;
while(curr !== null) {
  console.log("Node value:", curr.data);
  curr = curr.next;
}`
                        },
                        'Reverse Linked List': {
                            explanation: 'Reversing a linked list means changing the next pointers of all nodes so that the last node becomes the head, and the head becomes the last node pointing to null. This is a very common interview question.',
                            code: `// Reversing a Linked List Iteratively
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;
  while(curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}

const list = new Node(1, new Node(2, new Node(3)));
const reversed = reverseList(list);
console.log("New Head:", reversed.data);`
                        },
                        'Stack Basics': {
                            explanation: 'A Stack is a Last-In-First-Out (LIFO) data structure. You can push elements onto the top of the stack and pop them off the top. They are often used for managing function calls, tracking history, or validating structured language.',
                            code: `// Stack implemented with an Array
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) { this.items.push(element); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
console.log("Popped element:", stack.pop());
console.log("Current top element:", stack.peek());`
                        },
                        'Queue Basics': {
                            explanation: 'A Queue is a First-In-First-Out (FIFO) data structure. Elements are enqueued at the back and dequeued from the front. They are used in scheduling algorithms, breadth-first searches, and anywhere fairness is a factor.',
                            code: `// Basic Queue implementation
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(ele) { this.items.push(ele); }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
}

const queue = new Queue();
queue.enqueue("Task 1");
queue.enqueue("Task 2");
console.log("Processing:", queue.dequeue());
console.log("Next up:", queue.front());`
                        }
                    };

                    const defaultCode = `// Try Yourself: ${title}\nfunction practice() {\n  console.log("Practicing ${title}...");\n  // Add your logic here\n}\n\npractice();`;

                    const data = specificContent[title] || {
                        explanation: `${title} is an important concept in ${category}. ${description}`,
                        code: defaultCode
                    };

                    return data;
                };

                const topicData = generateTopicContent(topic.title, topic.category, topic.description);

                await TopicContent.create({
                    topic: topic._id,
                    title: topic.title,
                    description: topic.description,
                    concept: {
                        explanation: topicData.explanation,
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
                    ],
                    commonPatterns: [
                        {
                            name: `Try Yourself: ${topic.title}`,
                            description: `Here is a sample code snippet for ${topic.title}. Modify it and run it to see the output.`,
                            language: 'javascript',
                            example: topicData.code
                        }
                    ]
                });
                subtopicContentCreated++;
                console.log(`📝 Added basic content for subtopic: ${topic.title} `);
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
