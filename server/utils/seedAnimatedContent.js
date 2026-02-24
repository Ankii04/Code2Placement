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
                        },
                        'Prefix Sum': {
                            explanation: 'Prefix Sum involves precomputing the cumulative sum of elements in an array. This allows answering range sum queries in O(1) time after an O(n) preprocessing step.',
                            code: `function rangeSum(arr, queries) {
  // Precompute prefix sums
  let prefix = new Array(arr.length + 1).fill(0);
  for(let i = 0; i < arr.length; i++) {
    prefix[i+1] = prefix[i] + arr[i];
  }
  
  // Answer queries in O(1)
  for(let [left, right] of queries) {
    let sum = prefix[right + 1] - prefix[left];
    console.log("Sum from index " + left + " to " + right + ": " + sum);
  }
}

rangeSum([1, 2, 3, 4, 5], [[0, 2], [1, 4]]);`
                        },
                        'Kadane\'s Algorithm': {
                            explanation: 'Kadane\'s Algorithm is an elegant dynamic programming technique used to find the maximum sum of a contiguous subarray in an array with a time complexity of O(n).',
                            code: `function maxSubArraySum(arr) {
  let maxSoFar = arr[0];
  let currMax = arr[0];
  
  for(let i = 1; i < arr.length; i++) {
    currMax = Math.max(arr[i], currMax + arr[i]);
    maxSoFar = Math.max(maxSoFar, currMax);
  }
  return maxSoFar;
}

const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log("Max subarray sum:", maxSubArraySum(arr));`
                        },
                        'Array Rotation & Reversal': {
                            explanation: 'Array rotation shifts elements by a certain number of positions. Reversal is often used as a helper operation to achieve rotation in O(n) time and O(1) extra space.',
                            code: `function reverse(arr, start, end) {
  while(start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++; end--;
  }
}

function rotateArray(arr, k) {
  k = k % arr.length;
  if(k < 0) k += arr.length; // Handle negative k
  
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
  return arr;
}

let nums = [1, 2, 3, 4, 5, 6, 7];
console.log("Rotated by 3:", rotateArray(nums, 3));`
                        },
                        'Pattern Searching': {
                            explanation: 'Pattern searching involves finding all occurrences of a smaller string (pattern) within a larger string (text). The naive approach is O(n*m).',
                            code: `function naiveSearch(text, pattern) {
  let n = text.length;
  let m = pattern.length;
  let found = [];
  
  for(let i = 0; i <= n - m; i++) {
    let match = true;
    for(let j = 0; j < m; j++) {
      if(text[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }
    if(match) found.push(i);
  }
  return found;
}

console.log("Found at indices:", naiveSearch("ABABDABACDABABCABAB", "ABABCABAB"));`
                        },
                        'String Matching (KMP, Rabin-Karp)': {
                            explanation: 'KMP and Rabin-Karp algorithms optimize pattern matching. KMP avoids unnecessary comparisons by precomputing an array (LPS). Rabin-Karp uses hashing.',
                            code: `// Simple string hashing (Rabin-Karp concept)
function hashMatch(text, pattern) {
  // Simplified concept: compare hash values instead of characters directly
  // Real implementation requires prime modulus and base calculations
  console.log("Searching for '" + pattern + "' in '" + text + "'...");
  
  // Using built-in for simplicity of demonstration
  let index = text.indexOf(pattern);
  if (index !== -1) {
    console.log("Pattern matched at index:", index);
  } else {
    console.log("No match found");
  }
}

hashMatch("hello algorithm world", "algorithm");`
                        },
                        'Palindromes': {
                            explanation: 'A palindrome is a string that reads the same forwards and backwards. Checking for a palindrome is a common introductory Two Pointers problem.',
                            code: `function isPalindrome(str) {
  // Clean string: remove non-alphanumeric and to lowercase
  str = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  
  let left = 0;
  let right = str.length - 1;
  
  while(left < right) {
    if(str[left] !== str[right]) return false;
    left++; right--;
  }
  return true;
}

console.log("race a car:", isPalindrome("race a car"));
console.log("A man, a plan, a canal: Panama:", isPalindrome("A man, a plan, a canal: Panama"));`
                        },
                        'Anagrams': {
                            explanation: 'Two strings are anagrams if they contain the same characters with the same frequencies, just possibly in a different order.',
                            code: `function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;
  
  const count = {};
  for(let char of str1) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for(let char of str2) {
    if(!count[char]) return false;
    count[char]--;
  }
  return true;
}

console.log("listen & silent:", areAnagrams("listen", "silent"));
console.log("hello & world:", areAnagrams("hello", "world"));`
                        },
                        'String Hashing': {
                            explanation: 'String Hashing converts a string into an integer. It serves as a building block for algorithms like Rabin-Karp to quickly compare strings.',
                            code: `function simplePolynomialHash(str) {
  const p = 31;
  const m = 1e9 + 9;
  let hashValue = 0;
  let p_pow = 1;
  
  for(let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i) - 96; // 'a' is 1
    hashValue = (hashValue + code * p_pow) % m;
    p_pow = (p_pow * p) % m;
  }
  return hashValue;
}

console.log("Hash of 'abc':", simplePolynomialHash("abc"));`
                        },
                        'Doubly Linked List': {
                            explanation: 'A Doubly Linked List is a linked list where each node contains two pointers: one to the next node and one to the previous node. This allows traversal in both directions.',
                            code: `class DLLNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

const head = new DLLNode(1);
const second = new DLLNode(2);
const third = new DLLNode(3);

head.next = second; second.prev = head;
second.next = third; third.prev = second;

console.log("Traversing backwards from tail:");
let curr = third;
while(curr) {
  console.log(curr.data);
  curr = curr.prev;
}`
                        },
                        'Fast & Slow Pointers': {
                            explanation: 'Also known as Floyd\'s Cycle-Finding Algorithm or the Tortoise and Hare algorithm. It uses two pointers moving at different speeds to detect cycles or find the middle of a linked list.',
                            code: `class Node {
  constructor(data) { this.data = data; this.next = null; }
}

function findMiddle(head) {
  let slow = head, fast = head;
  while(fast !== null && fast.next !== null) {
    slow = slow.next;         // moves 1 step
    fast = fast.next.next;    // moves 2 steps
  }
  return slow.data;
}

const head = new Node(1);
head.next = new Node(2); head.next.next = new Node(3);
head.next.next.next = new Node(4); // List: 1->2->3->4
console.log("Middle of list:", findMiddle(head));`
                        },
                        'Merge Linked Lists': {
                            explanation: 'Merging two or more sorted linked lists involves combining them into a single sorted linked list, typically using a dummy head node to simplify edge cases.',
                            code: `class Node {
  constructor(data) { this.data = data; this.next = null; }
}

function mergeTwoLists(l1, l2) {
  let dummy = new Node(0);
  let tail = dummy;
  
  while(l1 !== null && l2 !== null) {
    if(l1.data < l2.data) {
      tail.next = l1; l1 = l1.next;
    } else {
      tail.next = l2; l2 = l2.next;
    }
    tail = tail.next;
  }
  if(l1) tail.next = l1;
  if(l2) tail.next = l2;
  return dummy.next;
}

let l1 = new Node(1); l1.next = new Node(3);
let l2 = new Node(2); l2.next = new Node(4);
let merged = mergeTwoLists(l1, l2);
console.log("Merged list:", merged.data, "->", merged.next.data, "->", merged.next.next.data);`
                        },
                        'Next Greater Element': {
                            explanation: 'Using a Monotonic Stack to repeatedly pop elements smaller than the current element allows you to find the Next Greater Element for all items in O(n) time.',
                            code: `function nextGreaterElements(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = []; // Stores indices
  
  for(let i = 0; i < arr.length; i++) {
    // While stack is not empty and current element is greater than element at stack top
    while(stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      let idx = stack.pop();
      result[idx] = arr[i];
    }
    stack.push(i);
  }
  return result;
}

const arr = [4, 5, 2, 10, 8];
console.log("Array:", arr);
console.log("Next greater:", nextGreaterElements(arr));`
                        },
                        'Balanced Parentheses': {
                            explanation: 'Using a Stack is the classic approach to verify if a string has balanced brackets. We push opening brackets and pop when we encounter closing brackets, checking for a match.',
                            code: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  
  for(let char of s) {
    if(char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if(stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}

console.log("Is '{[()]}' valid?", isValid("{[()]}"));
console.log("Is '{[(])}' valid?", isValid("{[(])}"));`
                        },
                        'Infix-Prefix-Postfix Conversion': {
                            explanation: 'Stacks are vital for compiling languages, particularly in parsing expressions from human-readable human-readable Infix (A+B) notation to Postfix (AB+) or Prefix (+AB) which computers evaluate easily.',
                            code: `function evaluatePostfix(exp) {
  const stack = [];
  
  for(let char of exp) {
    if(!isNaN(parseInt(char))) {
      stack.push(parseInt(char));
    } else {
      let val1 = stack.pop();
      let val2 = stack.pop();
      switch(char) {
        case '+': stack.push(val2 + val1); break;
        case '-': stack.push(val2 - val1); break;
        case '*': stack.push(val2 * val1); break;
        case '/': stack.push(Math.floor(val2 / val1)); break;
      }
    }
  }
  return stack.pop();
}

console.log("Postfix '231*+9-' equals:", evaluatePostfix("231*+9-"));`
                        },
                        'Monotonic Stack': {
                            explanation: 'A monotonic stack is a stack whose elements are monotonically increasing or decreasing. It simplifies finding bounds (like left/right smaller elements) efficiently.',
                            code: `// Daily Temperatures: find how many days to wait for a warmer temperature
function dailyTemperatures(temps) {
  let ans = new Array(temps.length).fill(0);
  let stack = [];
  
  for(let i = 0; i < temps.length; i++) {
    while(stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      let prevIdx = stack.pop();
      ans[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return ans;
}

console.log("Temperatures [73,74,75,71,69,72,76,73]:");
console.log("Wait days:", dailyTemperatures([73,74,75,71,69,72,76,73]));`
                        },
                        'Circular Queue': {
                            explanation: 'A Circular Queue uses a fixed-size array where the front and rear pointers wrap around using modulo arithmetic. This avoids wasting space.',
                            code: `class CircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.head = -1; this.tail = -1; this.size = k;
  }
  
  enQueue(value) {
    if(this.isFull()) return false;
    if(this.isEmpty()) this.head = 0;
    this.tail = (this.tail + 1) % this.size;
    this.queue[this.tail] = value;
    return true;
  }
  
  deQueue() {
    if(this.isEmpty()) return false;
    if(this.head === this.tail) { this.head = -1; this.tail = -1; }
    else this.head = (this.head + 1) % this.size;
    return true;
  }
  
  isEmpty() { return this.head === -1; }
  isFull() { return ((this.tail + 1) % this.size) === this.head; }
}

const cq = new CircularQueue(3);
console.log("Enqueue 1:", cq.enQueue(1));
console.log("Enqueue 2:", cq.enQueue(2));
console.log("Enqueue 3:", cq.enQueue(3));
console.log("Enqueue 4 (full):", cq.enQueue(4));`
                        },
                        'Deque': {
                            explanation: 'A Deque (Double Ended Queue) allows insertion and deletion at both ends. It functions as both a stack and a queue.',
                            code: `// Basic Deque
class Deque {
  constructor() { this.items = []; }
  
  addFront(item) { this.items.unshift(item); }
  addRear(item) { this.items.push(item); }
  removeFront() { return this.items.shift(); }
  removeRear() { return this.items.pop(); }
  getFront() { return this.items[0]; }
  getRear() { return this.items[this.items.length - 1]; }
}

const d = new Deque();
d.addRear(10);
d.addFront(5);
d.addRear(15);
console.log("Current Deque Array:", d.items);
console.log("Remove Rear:", d.removeRear());`
                        },
                        'Priority Queue': {
                            explanation: 'A Priority Queue serves elements based on priority rather than FIFO order. Commonly implemented using Heaps, they are essential in algorithms like Dijkstra\'s.',
                            code: `// Simple array-based Priority Queue (for demonstration)
// Real implementations use Min/Max Heaps for O(log n) performance
class SimplePQ {
  constructor() { this.items = []; }
  
  enqueue(element, priority) {
    let qElement = { element, priority };
    let added = false;
    
    for(let i = 0; i < this.items.length; i++) {
      if(qElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, qElement);
        added = true; break;
      }
    }
    if(!added) this.items.push(qElement);
  }
  
  dequeue() { return this.items.shift(); }
}

const pq = new SimplePQ();
pq.enqueue("Low Priority Task", 3);
pq.enqueue("High Priority Task", 1);
pq.enqueue("Medium Priority Task", 2);

console.log("First out:", pq.dequeue().element);`
                        },
                        'Monotonic Queue': {
                            explanation: 'A monotonic queue maintains elements in sorted order dynamically while a window slides. It is extremely useful for problems like "Sliding Window Maximum".',
                            code: `// Sliding Window Maximum using Monotonic Queue
function maxSlidingWindow(nums, k) {
  let ans = [];
  let deque = []; // Stores indices
  
  for(let i = 0; i < nums.length; i++) {
    // Remove indices out of current window
    if(deque.length > 0 && deque[0] === i - k) {
      deque.shift();
    }
    
    // Maintain decreasing order in deque
    while(deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    deque.push(i);
    // Add to answer when window size is met
    if(i >= k - 1) ans.push(nums[deque[0]]);
  }
  return ans;
}

console.log("Max sliding window [1,3,-1,-3,5,3,6,7], k=3:");
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));`
                        },
                        'Binary Tree Basics': {
                            explanation: 'A Binary Tree is a hierarchical data structure where each node has at most two children, referred to as the left and right child.',
                            code: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);

console.log("Root value:", root.val);
console.log("Left child:", root.left.val);`
                        },
                        'Tree Traversals': {
                            explanation: 'Tree traversals visit all nodes in a tree. The main types are Inorder (Left, Root, Right), Preorder (Root, Left, Right), and Postorder (Left, Right, Root).',
                            code: `class TreeNode { constructor(v) { this.val = v; this.left = this.right = null; } }
const root = new TreeNode(1); root.right = new TreeNode(2); root.right.left = new TreeNode(3);

function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left, result);
  result.push(node.val);
  inorder(node.right, result);
  return result;
}

console.log("Inorder Traversal:", inorder(root));`
                        },
                        'Binary Search Tree': {
                            explanation: 'A Binary Search Tree (BST) ensures that for every node, all values in its left subtree are smaller, and all values in its right subtree are larger.',
                            code: `class TreeNode { constructor(v) { this.val = v; this.left = this.right = null; } }

function insertBST(node, val) {
  if (!node) return new TreeNode(val);
  if (val < node.val) node.left = insertBST(node.left, val);
  else node.right = insertBST(node.right, val);
  return node;
}

let root = null;
root = insertBST(root, 5);
insertBST(root, 3); insertBST(root, 7);
insertBST(root, 2); insertBST(root, 4);

console.log("BST Root:", root.val);
console.log("Left Child:", root.left.val, ", Right Child:", root.right.val);`
                        },
                        'Lowest Common Ancestor': {
                            explanation: 'The Lowest Common Ancestor (LCA) of two nodes p and q in a tree is the lowest (deepest) node that has both p and q as descendants.',
                            code: `class TreeNode { constructor(v) { this.val = v; this.left = this.right = null; } }

function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  
  if (left && right) return root;
  return left ? left : right;
}

const root = new TreeNode(3);
const p = new TreeNode(5); const q = new TreeNode(1);
root.left = p; root.right = q;
console.log("LCA of 5 and 1 is:", lowestCommonAncestor(root, p, q).val);`
                        },
                        'Heap': {
                            explanation: 'A Heap is a complete binary tree satisfying the heap property (Max-Heap: parent >= children; Min-Heap: parent <= children). Used for Priority Queues.',
                            code: `// Simple Min-Heap approach
class MinHeap {
  constructor() { this.heap = []; }
  
  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  
  bubbleUp(idx) {
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] >= this.heap[parentIdx]) break;
      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }
}

const minHeap = new MinHeap();
minHeap.insert(5); minHeap.insert(2); minHeap.insert(8); minHeap.insert(1);
console.log("Heap array (Min at top):", minHeap.heap);`
                        },
                        'Graph Representation': {
                            explanation: 'Graphs can be represented using Adjacency Matrices (2D arrays) or Adjacency Lists (arrays of lists/arrays). Adjacency lists are more space-efficient for sparse graphs.',
                            code: `// Adjacency List using a Map
class Graph {
  constructor() { this.adjList = new Map(); }
  
  addVertex(v) { this.adjList.set(v, []); }
  addEdge(v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v); // Assuming undirected
  }
}

const graph = new Graph();
graph.addVertex('A'); graph.addVertex('B'); graph.addVertex('C');
graph.addEdge('A', 'B'); graph.addEdge('A', 'C');
console.log("Graph Representation:", graph.adjList);`
                        },
                        'BFS & DFS': {
                            explanation: 'Breadth-First Search (BFS) uses a Queue to explore level by level. Depth-First Search (DFS) uses a Stack (or recursion) to explore as deep as possible before backtracking.',
                            code: `// Iterative BFS and DFS representations
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];
  
  while(queue.length) {
    const vertex = queue.shift();
    result.push(vertex);
    
    for(let neighbor of graph[vertex]) {
      if(!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}

const graph = { A: ['B', 'C'], B: ['A', 'D'], C: ['A'], D: ['B'] };
console.log("BFS starting from A:", bfs(graph, 'A'));`
                        },
                        'Shortest Path (Dijkstra)': {
                            explanation: "Dijkstra's Algorithm finds the shortest path from a source node to all other nodes in a graph with non-negative edge weights using a priority queue.",
                            code: `// Simplified Dijkstra (O(V^2) without Priority Queue)
function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  
  for (let vertex in graph) distances[vertex] = Infinity;
  distances[start] = 0;
  
  while (visited.size < Object.keys(graph).length) {
    // Find min unvisited node
    let minNode = null;
    for (let vertex in distances) {
      if (!visited.has(vertex) && (!minNode || distances[vertex] < distances[minNode])) {
        minNode = vertex;
      }
    }
    
    if (distances[minNode] === Infinity) break;
    visited.add(minNode);
    
    // Update neighbors
    for (let neighbor in graph[minNode]) {
      let newDist = distances[minNode] + graph[minNode][neighbor];
      if (newDist < distances[neighbor]) distances[neighbor] = newDist;
    }
  }
  return distances;
}

const graph = { A: {B:4, C:2}, B: {A:4, C:1, D:5}, C: {A:2, B:1, D:8}, D: {B:5, C:8} };
console.log("Shortest paths from A:", dijkstra(graph, 'A'));`
                        },
                        'Topological Sort': {
                            explanation: 'Topological sorting of a directed acyclic graph (DAG) is a linear ordering of its vertices such that for every directed edge U->V, U comes before V. Critical for job scheduling.',
                            code: `// Kahn's Algorithm (BFS based Topological Sort)
function topologicalSort(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({length: numCourses}, () => []);
  
  for(let [dest, src] of prerequisites) {
    adj[src].push(dest);
    inDegree[dest]++;
  }
  
  const queue = [];
  for(let i = 0; i < numCourses; i++) {
    if(inDegree[i] === 0) queue.push(i);
  }
  
  const result = [];
  while(queue.length) {
    const node = queue.shift();
    result.push(node);
    for(let neighbor of adj[node]) {
      inDegree[neighbor]--;
      if(inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  
  return result.length === numCourses ? result : [];
}

console.log("Schedule for 4 courses [[1,0],[2,0],[3,1],[3,2]]:", topologicalSort(4, [[1,0],[2,0],[3,1],[3,2]]));`
                        },
                        'Minimum Spanning Tree': {
                            explanation: "A Minimum Spanning Tree (MST) connects all vertices in a weighted graph with the minimum possible total edge weight. Common algorithms: Kruskal's and Prim's.",
                            code: `// Concept of Kruskal's Algorithm using Disjoint Set (Union-Find)
class UnionFind {
  constructor(n) { this.parent = Array.from({length:n}, (_,i) => i); }
  find(i) {
    if (this.parent[i] !== i) this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }
  union(i, j) {
    let rootI = this.find(i), rootJ = this.find(j);
    if(rootI !== rootJ) { this.parent[rootI] = rootJ; return true; }
    return false;
  }
}

function kruskalMST(n, edges) {
  edges.sort((a,b) => a[2] - b[2]); // Sort by weight
  const uf = new UnionFind(n);
  let mstCost = 0;
  
  for(let [u, v, w] of edges) {
    if(uf.union(u, v)) mstCost += w;
  }
  return mstCost;
}

// Edges: [u, v, weight]
const edges = [[0,1,10], [0,2,6], [0,3,5], [1,3,15], [2,3,4]];
console.log("MST Cost:", kruskalMST(4, edges));`
                        },
                        'Basic Recursion': {
                            explanation: 'Recursion is when a function calls itself. It must have a Base Case (to stop) and a Recursive Step (moving toward the base case).',
                            code: `function factorial(n) {
  // Base case
  if (n <= 1) return 1;
  // Recursive case
  return n * factorial(n - 1);
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Factorial of 5:", factorial(5));
console.log("Fibonacci of 6:", fibonacci(6));`
                        },
                        'Subset & Subsequence Problems': {
                            explanation: 'Backtracking is often used to generate all unique subsets or subsequences of an array by making a choice to either "include" or "exclude" an element at each step.',
                            code: `function subsets(nums) {
  const result = [];
  
  function backtrack(index, currentSubset) {
    result.push([...currentSubset]);
    
    for(let i = index; i < nums.length; i++) {
        currentSubset.push(nums[i]); // Include
        backtrack(i + 1, currentSubset); // Move forward
        currentSubset.pop(); // Exclude (Backtrack)
    }
  }
  
  backtrack(0, []);
  return result;
}

console.log("Subsets of [1,2]:", subsets([1,2]));`
                        },
                        'Permutations & Combinations': {
                            explanation: 'Permutations deal with every possible arrangement of items, while combinations deal with selecting items. Both are classic DFS/Backtracking problems.',
                            code: `function permute(nums) {
  const result = [];
  
  function backtrack(current) {
    if(current.length === nums.length) {
      result.push([...current]);
      return;
    }
    
    for(let i = 0; i < nums.length; i++) {
      if(current.includes(nums[i])) continue; // Skip used
      current.push(nums[i]);
      backtrack(current);
      current.pop();
    }
  }
  
  backtrack([]);
  return result;
}

console.log("Permutations of [1,2,3]:", permute([1,2,3]));`
                        },
                        'N-Queens Problem': {
                            explanation: 'Place N chess queens on an NxN chessboard so that no two queens threaten each other. A perfect example of backtracking with constraint checking.',
                            code: `function totalNQueens(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set(); // r + c
  const diag2 = new Set(); // r - c
  
  function backtrack(r) {
    if (r === n) { count++; return; }
    
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(r + c) || diag2.has(r - c)) continue;
      
      cols.add(c); diag1.add(r + c); diag2.add(r - c);
      backtrack(r + 1);
      cols.delete(c); diag1.delete(r + c); diag2.delete(r - c);
    }
  }
  
  backtrack(0);
  return count;
}

console.log("Valid 4-Queens solutions:", totalNQueens(4));
console.log("Valid 8-Queens solutions:", totalNQueens(8));`
                        },
                        'Sudoku Solver': {
                            explanation: 'Sudoku solver algorithms attempt to place digits 1-9 in empty cells, backtracking whenever a conflict occurs in the row, column, or 3x3 subgrid.',
                            code: `function isValid(board, row, col, char) {
  for(let i = 0; i < 9; i++) {
    if(board[row][i] === char) return false;
    if(board[i][col] === char) return false;
    // Check 3x3 block
    if(board[3 * Math.floor(row/3) + Math.floor(i/3)][3 * Math.floor(col/3) + i%3] === char) return false;
  }
  return true;
}

// Conceptual wrapper, full solution uses a deeply nested backtrack function
console.log("Sudoku solver uses Backtracking combining isValid checks and deep recursion.");`
                        },
                        '1D DP': {
                            explanation: '1D Dynamic Programming solves problems by breaking them down into simpler 1D subproblems, caching results in an array to avoid redundant work (Memoization/Tabulation).',
                            code: `// Climbing Stairs: You can climb 1 or 2 steps. How many distinct ways?
function climbStairs(n) {
  if (n <= 2) return n;
  
  let dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  
  for(let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}

console.log("Ways to climb 4 steps:", climbStairs(4));
console.log("Ways to climb 5 steps:", climbStairs(5));`
                        },
                        '2D DP': {
                            explanation: '2D DP involves problems requiring a 2D matrix to store overlapping subproblems, typical for grids, subsequences of two strings, or knapsack variants.',
                            code: `// Unique Paths: robot moving from top-left to bottom-right (right or down)
function uniquePaths(m, n) {
  const dp = Array.from({length: m}, () => new Array(n).fill(1));
  
  for(let r = 1; r < m; r++) {
    for(let c = 1; c < n; c++) {
      dp[r][c] = dp[r-1][c] + dp[r][c-1];
    }
  }
  
  return dp[m-1][n-1];
}

console.log("Unique paths mapping a 3x7 grid:", uniquePaths(3, 7));`
                        },
                        'Knapsack Problems': {
                            explanation: 'Given a set of items, each with a weight and a value, determine the number of each item to include so that the total weight is <= capacity and total value is maximized.',
                            code: `// 0/1 Knapsack Problem
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({length: n + 1}, () => new Array(capacity + 1).fill(0));
  
  for(let i = 1; i <= n; i++) {
    const w = weights[i-1];
    const v = values[i-1];
    
    for(let c = 1; c <= capacity; c++) {
      if(w <= c) {
        dp[i][c] = Math.max(dp[i-1][c], v + dp[i-1][c - w]);
      } else {
        dp[i][c] = dp[i-1][c];
      }
    }
  }
  return dp[n][capacity];
}

console.log("Max value:", knapsack([1,2,3], [10,15,40], 6));`
                        },
                        'Longest Common Subsequence': {
                            explanation: 'LCS aims to find the longest subsequence common to two sequences. Crucial in bioinformatics and diff tools like git.',
                            code: `function longestCommonSubsequence(text1, text2) {
  const dp = Array.from({length: text1.length + 1}, () => new Array(text2.length + 1).fill(0));
  
  for(let i = 1; i <= text1.length; i++) {
    for(let j = 1; j <= text2.length; j++) {
      if(text1[i-1] === text2[j-1]) {
        dp[i][j] = 1 + dp[i-1][j-1];
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  
  return dp[text1.length][text2.length];
}

console.log("LCS of 'abcde' & 'ace':", longestCommonSubsequence("abcde", "ace"));`
                        },
                        'DP on Trees': {
                            explanation: 'Applying Dynamic Programming on trees usually involves doing a post-order traversal and making decisions at the parent based on DP states gathered from children.',
                            code: `class Node { constructor(v) { this.val = v; this.left = this.right = null; } }

// House Robber III (Cannot rob directly linked nodes)
function rob(root) {
  function dfs(node) {
    if (!node) return [0, 0]; // [robbed, notRobbed]
    
    let left = dfs(node.left);
    let right = dfs(node.right);
    
    let rob = node.val + left[1] + right[1];
    let notRob = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    
    return [rob, notRob];
  }
  
  let res = dfs(root);
  return Math.max(res[0], res[1]);
}

const root = new Node(3);
root.left = new Node(2); root.right = new Node(3);
root.left.right = new Node(3); root.right.right = new Node(1);
console.log("Max loot:", rob(root));`
                        },
                        'Activity Selection': {
                            explanation: 'Activity Selection is a greedy algorithm problem aiming to find the maximum number of non-overlapping activities that can be performed, given their start and end times.',
                            code: `function maxActivities(activities) {
  // Sort activities by end time (Greedy Choice)
  activities.sort((a,b) => a.end - b.end);
  
  let count = 0;
  let lastEndTime = -1;
  const selected = [];
  
  for(let act of activities) {
    if(act.start >= lastEndTime) {
      count++;
      selected.push(act);
      lastEndTime = act.end;
    }
  }
  return selected;
}

const acts = [
  {id: 1, start: 1, end: 4}, {id: 2, start: 3, end: 5},
  {id: 3, start: 0, end: 6}, {id: 4, start: 5, end: 7}
];
console.log("Max activities:", maxActivities(acts));`
                        },
                        'Interval Scheduling': {
                            explanation: "Equivalent to Activity Selection, Interval Scheduling seeks to find the largest compatible subset of intervals. It's purely sorted by end time to maximize available future space.",
                            code: `function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;
  intervals.sort((a,b) => a[1] - b[1]); // Sort by End Time
  
  let count = 1;
  let end = intervals[0][1];
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= end) {
      count++;
      end = intervals[i][1];
    }
  }
  
  // Total minus max non-overlapping = min removals
  return intervals.length - count;
}

console.log("Min removals for [[1,2],[2,3],[3,4],[1,3]]:", 
  eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]));`
                        },
                        'Huffman Coding': {
                            explanation: 'Huffman Coding assigns variable-length codes to input characters. Short codes for frequent characters (Greedy approach using Min-Heap) for lossless data compression.',
                            code: `// Conceptual outline for Huffman Coding tree building
function buildHuffmanTree(freqMap) {
  let nodes = Object.entries(freqMap).map(([char, freq]) => ({char, freq, left:null, right:null}));
  
  while(nodes.length > 1) {
    nodes.sort((a,b) => a.freq - b.freq); // Simulating Min-Heap
    let left = nodes.shift();
    let right = nodes.shift();
    
    let parent = { char: null, freq: left.freq + right.freq, left, right };
    nodes.push(parent);
  }
  return nodes[0];
}

console.log("Huffman tree root freq:", buildHuffmanTree({ 'A': 5, 'B': 9, 'C': 12, 'D': 13, 'E': 16, 'F': 45 }).freq);`
                        },
                        'Fractional Knapsack': {
                            explanation: 'Unlike 0/1 Knapsack, you can break items into fractions. The Greedy approach is to sort items by Value-to-Weight ratio and take as much of the highest ratio as possible.',
                            code: `function fractionalKnapsack(items, capacity) {
  // Items: {value, weight}
  items.sort((a,b) => (b.value/b.weight) - (a.value/a.weight));
  
  let totalValue = 0;
  for(let item of items) {
    if(capacity === 0) break;
    
    let takeWeight = Math.min(item.weight, capacity);
    totalValue += takeWeight * (item.value / item.weight);
    capacity -= takeWeight;
  }
  return totalValue;
}

const items = [{value: 60, weight: 10}, {value: 100, weight: 20}, {value: 120, weight: 30}];
console.log("Max value in Knapsack (50):", fractionalKnapsack(items, 50));`
                        },
                        'Job Sequencing': {
                            explanation: 'Given an array of jobs with deadlines and profits, maximize profit if only one job can be executed at a time. Solved greedily by taking highest profit jobs first.',
                            code: `function jobScheduling(jobs) {
  // Sort by profit descending
  jobs.sort((a,b) => b.profit - a.profit);
  
  let maxDeadline = Math.max(...jobs.map(j => j.deadline));
  let slots = new Array(maxDeadline + 1).fill(-1);
  
  let totalProfit = 0;
  for(let job of jobs) {
    // Find a free slot from deadline to 1
    for(let j = job.deadline; j > 0; j--) {
      if(slots[j] === -1) {
        slots[j] = job.id;
        totalProfit += job.profit;
        break;
      }
    }
  }
  return totalProfit;
}

const jobs = [
  {id: 'a', deadline: 4, profit: 20}, {id: 'b', deadline: 1, profit: 10},
  {id: 'c', deadline: 1, profit: 40}, {id: 'd', deadline: 1, profit: 30}
];
console.log("Max profit:", jobScheduling(jobs));`
                        },
                        'Advanced Binary Search': {
                            explanation: 'Advanced BS is used to find conditions rather than exact targets. Examples include finding the minimum in a rotated sorted array or finding an insertion point.',
                            code: `// Find the minimum in a rotated sorted array
function findMin(nums) {
  if(nums.length === 1) return nums[0];
  let left = 0, right = nums.length - 1;
  
  if(nums[right] > nums[0]) return nums[0];
  
  while(right >= left) {
    let mid = Math.floor(left + (right - left) / 2);
    if(nums[mid] > nums[mid + 1]) return nums[mid + 1];
    if(nums[mid - 1] > nums[mid]) return nums[mid];
    
    if(nums[mid] > nums[0]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
}

console.log("Min in [3,4,5,1,2]:", findMin([3,4,5,1,2]));`
                        },
                        'Merge Sort': {
                            explanation: 'Merge sort is a Divide and Conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
                            code: `function mergeSort(arr) {
  if(arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log("Merge Sort [38, 27, 43, 3, 9, 82, 10]:");
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));`
                        },
                        'Quick Sort': {
                            explanation: 'Quick sort partitions an array into two smaller arrays based on a pivot element. It recursively sorts the subarrays. Average case is O(n log n), worst is O(n^2).',
                            code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log("Quick Sort [10, 80, 30, 90, 40, 50, 70]:");
console.log(quickSort([10, 80, 30, 90, 40, 50, 70]));`
                        },
                        'Heap Sort': {
                            explanation: 'Heap Sort leverages a max-heap property. It builds a max-heap from the array, then repeatedly swaps the max element with the last element and reduces the heap size.',
                            code: `function heapSort(arr) {
  function maxHeapify(array, n, i) {
    let largest = i, left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;
    
    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      maxHeapify(array, n, largest);
    }
  }

  let n = arr.length;
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) maxHeapify(arr, n, i);
  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    maxHeapify(arr, i, 0);
  }
  return arr;
}

console.log("Heap Sort [12, 11, 13, 5, 6, 7]:", heapSort([12, 11, 13, 5, 6, 7]));`
                        },
                        'Bitwise Operators': {
                            explanation: 'Bitwise AND (&), OR (|), XOR (^), NOT (~), and Shifts (<<, >>) operate on binary digits directly. They form the basis for highly optimized low-level calculations.',
                            code: `console.log("5  in binary: (101)");
console.log("3  in binary: (011)\\n");

console.log("5 &  3 (AND):", 5 & 3, "  (001)");
console.log("5 |  3 (OR): ", 5 | 3, "  (111)");
console.log("5 ^  3 (XOR):", 5 ^ 3, "  (110)");
console.log("5 << 1 (L.S):", 5 << 1, " (1010) = 5 * 2");
console.log("5 >> 1 (R.S):", 5 >> 1, "   (10) = Math.floor(5 / 2)");`
                        },
                        'Subsets using Bits': {
                            explanation: 'Since an integer has up to 32 bits, we can iterate from 0 to 2^n - 1. Each integer matches a subset where the set bits indicate the included array index.',
                            code: `function subsets(nums) {
  const n = nums.length;
  const result = [];
  const subsetCount = 1 << n; // 2^n
  
  for(let i = 0; i < subsetCount; i++) {
    const currentSubset = [];
    for(let j = 0; j < n; j++) {
      // Check if j-th bit is set in i
      if((i & (1 << j)) !== 0) {
        currentSubset.push(nums[j]);
      }
    }
    result.push(currentSubset);
  }
  return result;
}

console.log("Bitwise subsets of [A,B,C]:");
console.log(subsets(['A', 'B', 'C']));`
                        },
                        'Bit Masks': {
                            explanation: 'A bitmask is data that is used for bitwise operations. It can concisely store boolean states or compress combinations to a single integer instead of arrays/sets.',
                            code: `// Representing options using bits
const HAS_WIFI     = 1 << 0; // 0001
const HAS_BREAKFAST= 1 << 1; // 0010
const HAS_POOL     = 1 << 2; // 0100

// Set options
let roomFlags = HAS_WIFI | HAS_POOL; // 0101

// Check if room has pool
let hasPool = (roomFlags & HAS_POOL) !== 0; // 0100 & 0100 is > 0
console.log("Has pool?", hasPool);

// Toggle pool
roomFlags ^= HAS_POOL;
console.log("Has pool after toggle?", (roomFlags & HAS_POOL) !== 0);`
                        },
                        'Power of Two': {
                            explanation: 'A neat bit trick says that (N & (N - 1)) clears the lowest set bit. A number is a power of 2 if it has only one set bit, so N & (N - 1) equals 0.',
                            code: `function isPowerOfTwo(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}

console.log("Is 16 a power of two?", isPowerOfTwo(16));
console.log("Is 18 a power of two?", isPowerOfTwo(18));
console.log("Is 1024 a power of two?", isPowerOfTwo(1024));`
                        },
                        'XOR Tricks': {
                            explanation: 'XOR properties: A^A = 0, A^0 = A, A^B^A = B. This allows finding the single unique element in an array where every other element appears exactly twice in O(n) without extra space.',
                            code: `function singleNumber(nums) {
  let unique = 0;
  for (let num of nums) {
    unique ^= num; // Same numbers cancel out to zero
  }
  return unique;
}

const arr = [4, 1, 2, 1, 2];
console.log("Array:", arr);
console.log("Unique number is:", singleNumber(arr));`
                        },
                        'Hash Sets': {
                            explanation: 'A Hash Set is an implementation of a Set using a hash table. It guarantees unique items and offers O(1) average time complexity for lookup, insert, and delete.',
                            code: `function containsDuplicate(nums) {
  const seen = new Set();
  
  for(let num of nums) {
    if(seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

console.log("Contains duplicate [1,2,3,4]:", containsDuplicate([1,2,3,4]));
console.log("Contains duplicate [1,2,3,1]:", containsDuplicate([1,2,3,1]));`
                        },
                        'Frequency Maps': {
                            explanation: 'Maps (or objects in JS) are heavily used to count the occurrences of elements in collections, laying the ground for finding modes and identifying duplicates.',
                            code: `function topKFrequent(nums, k) {
  const map = {};
  for(let n of nums) map[n] = (map[n] || 0) + 1;
  
  const sortedArr = Object.entries(map).sort((a,b) => b[1] - a[1]);
  
  return sortedArr.slice(0, k).map(item => parseInt(item[0]));
}

console.log("Top 2 frequent in [1,1,1,2,2,3]:", topKFrequent([1,1,1,2,2,3], 2));`
                        },
                        'Collision Handling': {
                            explanation: 'Hash collisions occur when two distinct keys yield the same bucket index. Strategies to handle collisions include Chaining (Linked Lists) and Open Addressing.',
                            code: `// Simple visual conceptual hash map with Chaining
class HashChainMap {
  constructor(size = 5) { this.buckets = Array.from({length: size}, () => []); }
  
  hash(key) { return String(key).length % this.buckets.length; } // Bad hash function just to force collisions!
  
  set(key, value) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    let found = bucket.find(item => item[0] === key);
    if(found) found[1] = value;
    else bucket.push([key, value]);
  }
}

const map = new HashChainMap();
map.set("Cat", 1); map.set("Dog", 2); map.set("Bat", 3); // Will collide in bucket 3
console.log("Internal Buckets (notice collisions):", map.buckets);`
                        },
                        'Rolling Hash': {
                            explanation: 'The rolling hash technique updates a hash function in O(1) time as a sliding window moves. It is the core concept of the Rabin-Karp pattern matching algorithm.',
                            code: `// Rolling string hash
function rollingHashStr(text, m) { // m is window size
  let currentHash = 0; // naive sum hash for demo
  for(let i = 0; i < m; i++) currentHash += text.charCodeAt(i);
  
  console.log("Hash for window [0-" + (m-1) + "]:", currentHash);
  
  for(let i = 1; i <= text.length - m; i++) {
    // Roll: remove old char, add new char
    currentHash -= text.charCodeAt(i - 1);
    currentHash += text.charCodeAt(i + m - 1);
    console.log("Hash for window [" + i + "-" + (i+m-1) + "]:", currentHash);
  }
}

rollingHashStr("ABCDE", 3);`
                        },
                        'Segment Tree': {
                            explanation: 'A Segment Tree is a binary tree used for storing information about intervals. It allows querying and updating range operations (like min/max/sum) in O(log N) time.',
                            code: `class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(2 * this.n);
    // Insert leaf nodes
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = arr[i];
    // Build the tree by calculating parents
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
    }
  }
  
  update(i, val) {
    i += this.n;
    this.tree[i] = val;
    while (i > 1) {
      i = Math.floor(i / 2);
      this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
    }
  }
  
  query(left, right) { // range sum [left, right)
    left += this.n; right += this.n;
    let sum = 0;
    while (left < right) {
      if ((left % 2) === 1) { sum += this.tree[left]; left++; }
      if ((right % 2) === 1) { right--; sum += this.tree[right]; }
      left = Math.floor(left / 2); right = Math.floor(right / 2);
    }
    return sum;
  }
}

const st = new SegmentTree([1, 2, 3, 4, 5]);
console.log("Sum range [1, 4):", st.query(1, 4)); // 2+3+4 = 9
st.update(2, 10); // arr becomes [1,2,10,4,5]
console.log("Sum range [1, 4) after update:", st.query(1, 4));`
                        },
                        'Fenwick Tree (BIT)': {
                            explanation: 'Binary Indexed Trees efficiently update elements and calculate prefix sums in a table of numbers in O(log n) time. Perfect for dynamic cumulative frequency tables.',
                            code: `class FenwickTree {
  constructor(n) {
    this.sums = new Array(n + 1).fill(0);
  }
  
  update(i, delta) {
    while (i < this.sums.length) {
      this.sums[i] += delta;
      i += i & -i; // Move to next node that covers this element
    }
  }
  
  query(i) {
    let sum = 0;
    while (i > 0) {
      sum += this.sums[i];
      i -= i & -i; // Move to parent
    }
    return sum;
  }
}

const numArr = [1, 2, 3, 4, 5];
const ft = new FenwickTree(numArr.length);

for (let i = 0; i < numArr.length; i++) ft.update(i + 1, numArr[i]);

console.log("Prefix sum up to index 3 (value 4):", ft.query(4));`
                        },
                        'Disjoint Set Union (Union-Find)': {
                            explanation: "DSU tracks a set of elements partitioned into non-overlapping subsets. Optimizations include Path Compression and Union by Rank (or Size). Mostly used in Kruskal's Algorithm.",
                            code: `class DSU {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = new Array(n).fill(1);
  }
  
  find(i) {
    if (this.parent[i] !== i) {
      this.parent[i] = this.find(this.parent[i]); // Path compression
    }
    return this.parent[i];
  }
  
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);
    
    if (rootI !== rootJ) {
      // Union by rank
      if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
    }
  }
}

const dsu = new DSU(5);
dsu.union(0, 2); dsu.union(4, 2); dsu.union(3, 1);
console.log("Is 0 connected to 4?", dsu.find(0) === dsu.find(4));
console.log("Is 0 connected to 1?", dsu.find(0) === dsu.find(1));`
                        },
                        'Trie (Advanced)': {
                            explanation: 'A Trie (Prefix Tree) efficiently stores strings for rapid retrieval. Excellent for autocomplete systems, IP routing, and spell checkers.',
                            code: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}
class Trie {
  constructor() { this.root = new TrieNode(); }
  
  insert(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) curr.children[char] = new TrieNode();
      curr = curr.children[char];
    }
    curr.isEndOfWord = true;
  }
  
  search(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return curr.isEndOfWord;
  }
}

const trie = new Trie();
trie.insert("apple"); trie.insert("app");
console.log("Has 'apple'?", trie.search("apple"));
console.log("Has 'app'?", trie.search("app"));
console.log("Has 'appl'?", trie.search("appl"));`
                        },
                        'LRU Cache': {
                            explanation: 'A Least Recently Used (LRU) Cache organizes items in order of use. Achieved efficiently using a Hash Map pointing to a Doubly Linked List node in O(1) ops.',
                            code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // JavaScript Maps preserve insertion order (like DLL)
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    // Refresh position by deleting and reinserting
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.capacity) {
      // .keys().next().value gets the oldest inserted element
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}

const cache = new LRUCache(2);
cache.put(1, 1); cache.put(2, 2);
console.log("Get 1:", cache.get(1)); // Refreshes 1
cache.put(3, 3); // Evicts key 2
console.log("Get 2:", cache.get(2)); // Not found`
                        },
                        'GCD & LCM': {
                            explanation: 'Greatest Common Divisor (GCD) uses the Euclidean Algorithm recursively. Lowest Common Multiple (LCM) is calculated effectively via (a*b)/GCD.',
                            code: `function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

console.log("GCD of 48 and 18 is:", gcd(48, 18));
console.log("LCM of 15 and 20 is:", lcm(15, 20));`
                        },
                        'Modular Arithmetic': {
                            explanation: 'Used heavily in cryptography and combinatorics. Rules: (a+b)%m = ((a%m)+(b%m))%m, (a*b)%m = ((a%m)*(b%m))%m, but division requires modular inverses.',
                            code: `const MOD = 1e9 + 7;

function safeAdd(a, b) {
  return (a % MOD + b % MOD) % MOD;
}

function safeMultiply(a, b) {
  // Be careful with large numbers in JS, BigInt might be needed
  return Number((BigInt(a) * BigInt(b)) % BigInt(MOD));
}

let largeA = 1000000000;
let largeB = 1000000000;
console.log("Normal mod multiplication risk:", (largeA * largeB) % MOD);
console.log("Safe Modular Multiplication:", safeMultiply(largeA, largeB));`
                        },
                        'Sieve of Eratosthenes': {
                            explanation: 'An ancient algorithm for finding all prime numbers up to any given limit in O(n log log n) time by iteratively marking multiples of primes as composite.',
                            code: `function simpleSieve(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = false; isPrime[1] = false;
  
  for(let p = 2; p * p <= n; p++) {
    if(isPrime[p]) {
      // Mark all multiples
      for(let i = p * p; i <= n; i += p) {
        isPrime[i] = false;
      }
    }
  }
  
  const primes = [];
  for(let i = 2; i <= n; i++) {
    if(isPrime[i]) primes.push(i);
  }
  return primes;
}

console.log("Primes up to 30:", simpleSieve(30));`
                        },
                        'Fast Exponentiation': {
                            explanation: 'A technique to compute powers (a^n) in O(log n) time by squaring the base and halving the exponent recursively or iteratively.',
                            code: `function fastPower(base, exp) {
  let result = 1;
  while(exp > 0) {
    if (exp % 2 === 1) { // If exp is odd
      result = (result * base);
    }
    base = (base * base); // Square the base
    exp = Math.floor(exp / 2); // Halve the exponent
  }
  return result;
}

console.log("2^10 is:", fastPower(2, 10)); // 1024
console.log("3^5 is:", fastPower(3, 5)); // 243`
                        },
                        'Combinatorics': {
                            explanation: 'Permutations, Combinations, nCr calculations. Since n! grows huge quickly, nCr is often calculated iteratively alongside Division using modulo inverses.',
                            code: `// Iterative formula for Combinations (nCr)
function nCr(n, r) {
  if (r > n) return 0;
  if (r === 0 || r === n) return 1;
  if (r > n - r) r = n - r; // Optimize using symmetry nCr = nC(n-r)
  
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = res * (n - i + 1) / i;
  }
  return res;
}

console.log("10 Choose 3 (10C3):", nCr(10, 3));`
                        },
                        'Two Pointers (Advanced)': {
                            explanation: 'Used for in-place array transformations like removing duplicates, merging arrays, sorting arrays of 0s 1s 2s (Dutch National Flag problem), or Trapping Rain Water.',
                            code: `// Array containing only 0, 1, 2. Sort in-place O(n) (Dutch National Flag Problem)
function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else { // 2
      [nums[high], nums[mid]] = [nums[mid], nums[high]];
      high--; // Don't increment mid, swapped item might be 0
    }
  }
  return nums;
}

let colors = [2, 0, 2, 1, 1, 0];
console.log("Sorted:", sortColors(colors));`
                        },
                        'Sliding Window (Advanced)': {
                            explanation: 'Advanced sliding window patterns feature dynamic boundaries tracked by frequency maps or counts, like "Longest Substring Without Repeating Characters".',
                            code: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLen = 0;
  
  for(let right = 0; right < s.length; right++) {
    const char = s[right];
    
    if (map.has(char) && map.get(char) >= left) {
      // Jump left boundary past the duplicate
      left = map.get(char) + 1;
    }
    
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}

console.log("abcabcbb longest substr:", lengthOfLongestSubstring("abcabcbb"));
console.log("pwwkew longest substr:", lengthOfLongestSubstring("pwwkew"));`
                        },
                        'Randomized Algorithms': {
                            explanation: 'Algorithms that use a degree of randomness as part of their logic to achieve good average-case guarantees or bypass worst-case data layout (e.g. Randomized Quick Sort, Fisher-Yates array shuffling).',
                            code: `// Fisher-Yates Shuffle algorithm for true uniform randomization O(N)
function shuffle(arr) {
  let curr = arr.length, randIdx;

  // While there remain elements to shuffle.
  while (curr !== 0) {
    // Pick a remaining element.
    randIdx = Math.floor(Math.random() * curr);
    curr--;

    // And swap it with the current element.
    [arr[curr], arr[randIdx]] = [arr[randIdx], arr[curr]];
  }
  return arr;
}

const deck = [1, 2, 3, 4, 5, 6, 7];
console.log("Original deck:", [1,2,3,4,5,6,7]);
console.log("Shuffled deck:", shuffle(deck));`
                        },
                        'Amortized Analysis': {
                            explanation: 'Amortized Analysis evaluates the time average of a sequence of operations so the overall cost distributes out fairly, despite an occasional expensive op (like expanding a dynamic Array list).',
                            code: `// Concept: We have an expensive O(N) resize, but we only do it every O(N) adds.
class DynamicArrayDemo {
  constructor() {
    this.memoryCostSequence = [];
    this.capacity = 1;
    this.size = 0;
  }
  add(element) {
    if (this.size === this.capacity) {
      // O(N) cost right here where it doubles
      this.capacity *= 2; 
      this.memoryCostSequence.push("Cost: O(N) - Expanded!"); 
    } else {
      // O(1) mostly
      this.memoryCostSequence.push("Cost: O(1)");
    }
    this.size++;
  }
}

const arr = new DynamicArrayDemo();
for(let i=0; i<6; i++) arr.add(i);
console.log(arr.memoryCostSequence);`
                        },
                        'Problem Solving Patterns': {
                            explanation: `Learning the Meta-Patterns: if it's "top K", think Heaps; if it's "substring", Sliding Window; if "combinations", Backtracking; if "shortest path unweighted", BFS.`,
                            code: `function analyzeProblem(description) {
  description = description.toLowerCase();
  if (description.includes("top k") || description.includes("kth largest")) {
    return "Suggestion: Use a Heap (Priority Queue)";
  }
  if (description.includes("substring") || description.includes("contiguous subarray")) {
    return "Suggestion: Use Sliding Window";
  }
  if (description.includes("sorted array") && description.includes("target")) {
    return "Suggestion: Use Binary Search or Two Pointers";
  }
  if (description.includes("combinations") || description.includes("subsets")) {
    return "Suggestion: Use DFS/Backtracking";
  }
  return "Suggestion: Analyze constraints carefully for DP, Hashing, or Trees.";
}

console.log("Analyzing constraint: 'Find the top k frequent words...'");
console.log("Result:", analyzeProblem("Find the top k frequent words"));`
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
