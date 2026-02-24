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
    console.log(\`Sum from index \${left} to \${right}: \${sum}\`);
  }
}

rangeSum([1, 2, 3, 4, 5], [[0, 2], [1, 4]]);`
                        },
                        'Kadane\\'s Algorithm': {
                            explanation: 'Kadane\\'s Algorithm is an elegant dynamic programming technique used to find the maximum sum of a contiguous subarray in an array with a time complexity of O(n).',
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
  console.log(\`Searching for '\${pattern}' in '\${text}'...\`);
  
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
                    explanation: 'Also known as Floyd\\'s Cycle - Finding Algorithm or the Tortoise and Hare algorithm.It uses two pointers moving at different speeds to detect cycles or find the middle of a linked list.',
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
                    explanation: 'A Priority Queue serves elements based on priority rather than FIFO order. Commonly implemented using Heaps, they are essential in algorithms like Dijkstra\\'s.',
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
