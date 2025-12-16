// Seed data with 100% original content for Code2Placement
// This file contains original DSA topics, questions, interview Q&A, and more

export const topics = [
    {
        title: "Arrays and Array Operations",
        description: "Master fundamental array concepts and common operations",
        difficulty: "Easy",
        category: "Arrays",
        icon: "📊",
        notes: `## Study Notes for Arrays

### Why Arrays?
- Fastest data structure for random access (O(1))
- Cache-friendly due to contiguous memory
- Foundation for many other data structures

### Common Patterns:
1. **Two Pointers**: Use two indices to solve problems efficiently
2. **Sliding Window**: Maintain a window of elements
3. **Prefix Sum**: Precompute cumulative sums for range queries
4. **Kadane's Algorithm**: Find maximum subarray sum

### Interview Tips:
- Always ask about array size and constraints
- Consider edge cases: empty array, single element, duplicates
- Think about in-place vs extra space solutions
- Practice time-space tradeoffs

### Must-Know Problems:
- Two Sum, Three Sum
- Maximum Subarray (Kadane's)
- Rotate Array
- Merge Sorted Arrays
- Find Duplicate/Missing Number`,
        content: `# Arrays and Array Operations

Arrays are contiguous memory locations that store elements of the same data type. They provide constant-time access to elements using indices.

## Key Concepts:
- **Declaration**: Creating an array with fixed or dynamic size
- **Indexing**: Accessing elements using zero-based indices
- **Traversal**: Iterating through all elements
- **Insertion/Deletion**: Adding or removing elements

## Common Operations:
1. **Linear Search**: O(n) - Check each element sequentially
2. **Binary Search**: O(log n) - Search in sorted arrays
3. **Reversal**: O(n) - Reverse array elements
4. **Rotation**: O(n) - Shift elements left or right

## Best Practices:
- Always check array bounds to avoid errors
- Use appropriate data structures for specific use cases
- Consider space-time tradeoffs
`,
        examples: [
            {
                input: "[1, 2, 3, 4, 5]",
                output: "[5, 4, 3, 2, 1]",
                explanation: "Reversing an array swaps elements from both ends"
            }
        ],
        timeComplexity: "O(n) for most operations",
        spaceComplexity: "O(1) for in-place operations",
        order: 1
    },
    {
        title: "String Manipulation Techniques",
        description: "Learn essential string processing and manipulation methods",
        difficulty: "Easy",
        category: "Strings",
        icon: "🔤",
        notes: `## String Mastery Notes

### Key Insights:
- Strings are immutable in most languages (Java, Python)
- Use StringBuilder/StringBuffer for multiple concatenations
- Character array manipulation is often faster

### Essential Techniques:
1. **Two Pointers**: Palindrome check, reverse
2. **Hashing**: Anagram detection, pattern matching
3. **Sliding Window**: Longest substring problems
4. **KMP/Rabin-Karp**: Advanced pattern matching

### Common Pitfalls:
- Forgetting about Unicode/special characters
- Not handling empty strings
- Inefficient string concatenation in loops

### Practice Problems:
- Valid Palindrome
- Longest Palindromic Substring
- Group Anagrams
- String to Integer (atoi)
- Longest Substring Without Repeating Characters`,
        content: `# String Manipulation Techniques

Strings are sequences of characters. Understanding string manipulation is crucial for text processing and pattern matching.

## Core Operations:
- **Concatenation**: Joining strings together
- **Substring**: Extracting portions of strings
- **Comparison**: Lexicographic ordering
- **Pattern Matching**: Finding substrings

## Important Algorithms:
1. **Palindrome Check**: Verify if string reads same forwards/backwards
2. **Anagram Detection**: Check if strings contain same characters
3. **String Reversal**: Reverse character order
4. **Character Frequency**: Count occurrences of characters

## Tips:
- Strings are often immutable in many languages
- Use StringBuilder for multiple concatenations
- Consider ASCII values for character operations
`,
        examples: [
            {
                input: "\"hello\"",
                output: "\"olleh\"",
                explanation: "String reversal swaps characters from both ends"
            }
        ],
        timeComplexity: "O(n) for traversal",
        spaceComplexity: "O(n) for new string creation",
        order: 2
    },
    {
        title: "Linked Lists Fundamentals",
        description: "Understand linked list structure and operations",
        difficulty: "Medium",
        category: "Linked List",
        icon: "🔗",
        notes: `## Linked List Deep Dive

### When to Use:
- Frequent insertions/deletions at beginning
- Unknown or dynamic size
- No need for random access

### Pro Tips:
1. **Dummy Node**: Simplifies edge cases
2. **Fast & Slow Pointers**: Detect cycles, find middle
3. **Runner Technique**: Two pointers at different speeds

### Common Mistakes:
- Losing reference to head
- Not handling null pointers
- Forgetting to update tail pointer

### Must-Practice:
- Reverse Linked List
- Detect Cycle
- Merge Two Sorted Lists
- Remove Nth Node from End
- Add Two Numbers`,
        content: `# Linked Lists Fundamentals

A linked list is a linear data structure where elements are stored in nodes, each containing data and a reference to the next node.

## Types:
- **Singly Linked List**: Each node points to next node
- **Doubly Linked List**: Nodes point to both next and previous
- **Circular Linked List**: Last node points to first node

## Common Operations:
1. **Insertion**: Add nodes at beginning, end, or middle - O(1) or O(n)
2. **Deletion**: Remove nodes - O(1) or O(n)
3. **Traversal**: Visit all nodes - O(n)
4. **Search**: Find specific element - O(n)

## Advantages:
- Dynamic size
- Efficient insertions/deletions
- No memory waste

## Disadvantages:
- No random access
- Extra memory for pointers
- Not cache-friendly
`,
        examples: [
            {
                input: "1 -> 2 -> 3 -> NULL",
                output: "3 -> 2 -> 1 -> NULL",
                explanation: "Reversing a linked list changes pointer directions"
            }
        ],
        timeComplexity: "O(n) for traversal",
        spaceComplexity: "O(1) for pointer manipulation",
        order: 3
    },
    {
        title: "Binary Trees and Tree Traversals",
        description: "Explore binary tree concepts and traversal techniques",
        difficulty: "Medium",
        category: "Trees",
        icon: "🌳",
        notes: `## Tree Mastery Guide

### Traversal Cheat Sheet:
- **Inorder**: Left → Root → Right (BST gives sorted)
- **Preorder**: Root → Left → Right (Copy tree)
- **Postorder**: Left → Right → Root (Delete tree)
- **Level Order**: BFS using queue

### Key Patterns:
1. **Recursion**: Most tree problems are recursive
2. **DFS vs BFS**: Choose based on problem
3. **Path Problems**: Track path while traversing

### Interview Favorites:
- Maximum Depth
- Validate BST
- Lowest Common Ancestor
- Serialize/Deserialize
- Path Sum Problems`,
        content: `# Binary Trees and Tree Traversals

A binary tree is a hierarchical data structure where each node has at most two children: left and right.

## Tree Terminology:
- **Root**: Topmost node
- **Leaf**: Node with no children
- **Height**: Longest path from root to leaf
- **Depth**: Distance from root to node

## Traversal Methods:
1. **Inorder (Left-Root-Right)**: Gives sorted order in BST
2. **Preorder (Root-Left-Right)**: Used for tree copying
3. **Postorder (Left-Right-Root)**: Used for deletion
4. **Level Order**: Breadth-first traversal

## Applications:
- Expression trees
- Binary Search Trees (BST)
- Heap implementation
- File system structure
`,
        examples: [
            {
                input: "Tree: 1(2,3)",
                output: "Inorder: 2,1,3",
                explanation: "Inorder traversal visits left subtree, root, then right subtree"
            }
        ],
        timeComplexity: "O(n) for traversals",
        spaceComplexity: "O(h) where h is height",
        order: 4
    },
    {
        title: "Graph Representations and Basics",
        description: "Learn graph data structures and representation methods",
        difficulty: "Hard",
        category: "Graphs",
        icon: "🕸️",
        notes: `## Graph Algorithms Mastery

### Representation Choice:
- **Adjacency Matrix**: Dense graphs, O(1) edge lookup
- **Adjacency List**: Sparse graphs, space efficient

### Core Algorithms:
1. **BFS**: Shortest path in unweighted graph
2. **DFS**: Cycle detection, topological sort
3. **Dijkstra**: Shortest path in weighted graph
4. **Union-Find**: Connected components

### Problem Categories:
- Shortest Path (BFS, Dijkstra, Bellman-Ford)
- Connectivity (DFS, Union-Find)
- Minimum Spanning Tree (Kruskal, Prim)
- Topological Sort (DFS, Kahn's)

### Must-Solve:
- Number of Islands
- Course Schedule
- Network Delay Time
- Clone Graph`,
        content: `# Graph Representations and Basics

Graphs consist of vertices (nodes) connected by edges. They model relationships and networks.

## Types of Graphs:
- **Directed**: Edges have direction
- **Undirected**: Edges are bidirectional
- **Weighted**: Edges have weights/costs
- **Unweighted**: All edges equal

## Representation Methods:
1. **Adjacency Matrix**: 2D array - O(V²) space
2. **Adjacency List**: Array of lists - O(V+E) space
3. **Edge List**: List of edges - O(E) space

## Common Algorithms:
- **BFS**: Breadth-First Search - shortest path
- **DFS**: Depth-First Search - connectivity
- **Dijkstra**: Shortest path in weighted graphs
- **Topological Sort**: Ordering of vertices

## Applications:
- Social networks
- Route planning
- Dependency resolution
- Network flow
`,
        examples: [
            {
                input: "Vertices: 4, Edges: [(0,1), (0,2), (1,3)]",
                output: "Adjacency List: 0->[1,2], 1->[3], 2->[], 3->[]",
                explanation: "Each vertex stores list of its neighbors"
            }
        ],
        timeComplexity: "Varies by algorithm",
        spaceComplexity: "O(V+E) for adjacency list",
        order: 5
    },
    {
        title: "Dynamic Programming Introduction",
        description: "Master the fundamentals of dynamic programming",
        difficulty: "Hard",
        category: "Dynamic Programming",
        icon: "🧩",
        notes: `## DP Problem-Solving Framework

### Step-by-Step Approach:
1. Define state (what does dp[i] represent?)
2. Find recurrence relation
3. Identify base cases
4. Determine iteration order
5. Optimize space if possible

### Common Patterns:
- **Linear DP**: Fibonacci, House Robber
- **2D DP**: Grid paths, Edit Distance
- **Knapsack**: 0/1, Unbounded, Subset Sum
- **LCS/LIS**: Subsequence problems

### Optimization Tips:
- Memoization (Top-Down) vs Tabulation (Bottom-Up)
- Space optimization: Use 1D array instead of 2D
- Print solution path, not just value

### Classic Problems:
- Climbing Stairs, Coin Change
- Longest Common Subsequence
- 0/1 Knapsack, Edit Distance`,
        content: `# Dynamic Programming Introduction

Dynamic Programming (DP) solves complex problems by breaking them into simpler subproblems and storing results to avoid redundant calculations.

## Key Principles:
1. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems
2. **Overlapping Subproblems**: Same subproblems solved multiple times

## Approaches:
- **Top-Down (Memoization)**: Recursive with caching
- **Bottom-Up (Tabulation)**: Iterative with table

## Classic Problems:
1. **Fibonacci**: Calculate nth Fibonacci number
2. **Knapsack**: Maximize value within weight limit
3. **Longest Common Subsequence**: Find longest common subsequence
4. **Coin Change**: Minimum coins for amount

## When to Use DP:
- Problem has optimal substructure
- Subproblems overlap
- Can define recurrence relation
`,
        examples: [
            {
                input: "Fibonacci(5)",
                output: "5",
                explanation: "F(5) = F(4) + F(3) = 3 + 2 = 5, using memoization avoids recalculation"
            }
        ],
        timeComplexity: "Reduces exponential to polynomial",
        spaceComplexity: "O(n) for memoization table",
        order: 6
    },
    {
        title: "Sorting Algorithms Comparison",
        description: "Compare and understand different sorting techniques",
        difficulty: "Medium",
        category: "Searching & Sorting",
        icon: "↕️",
        notes: `## Sorting Algorithms Quick Reference

### Algorithm Selection Guide:
- **Small arrays (<50)**: Insertion Sort
- **General purpose**: Quick Sort or Merge Sort
- **Stability required**: Merge Sort
- **Space constrained**: Heap Sort or Quick Sort
- **Nearly sorted**: Insertion Sort

### Time Complexity Summary:
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) |
| Insertion | O(n) | O(n²) | O(n²) | O(1) |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) |

### Interview Tips:
- Know when to use each algorithm
- Understand stability concept
- Practice implementing Quick Sort and Merge Sort`,
        content: `# Sorting Algorithms Comparison

Sorting arranges elements in a specific order (ascending/descending).

## Common Algorithms:
1. **Bubble Sort**: O(n²) - Simple, inefficient
2. **Selection Sort**: O(n²) - Finds minimum repeatedly
3. **Insertion Sort**: O(n²) - Good for small/nearly sorted
4. **Merge Sort**: O(n log n) - Divide and conquer, stable
5. **Quick Sort**: O(n log n) avg - In-place, not stable
6. **Heap Sort**: O(n log n) - Uses heap data structure

## Comparison Factors:
- **Time Complexity**: Best, average, worst cases
- **Space Complexity**: Extra memory needed
- **Stability**: Preserves relative order of equal elements
- **Adaptability**: Performance on partially sorted data

## Choosing Algorithm:
- Small data: Insertion sort
- Large data: Merge/Quick sort
- Stability needed: Merge sort
- Memory constrained: Heap sort
`,
        examples: [
            {
                input: "[5, 2, 8, 1, 9]",
                output: "[1, 2, 5, 8, 9]",
                explanation: "Sorting arranges elements in ascending order"
            }
        ],
        timeComplexity: "O(n log n) for efficient algorithms",
        spaceComplexity: "O(1) to O(n) depending on algorithm",
        order: 7
    },
    {
        title: "Stack and Queue Operations",
        description: "Learn stack and queue data structures",
        difficulty: "Easy",
        category: "Stack",
        icon: "🥞",
        notes: `## Stack & Queue Essentials

### Stack Applications:
- Expression evaluation (infix, postfix, prefix)
- Parentheses matching
- Browser history (back button)
- Undo mechanism in editors
- Function call stack
- Depth-First Search (DFS)

### Queue Applications:
- Breadth-First Search (BFS)
- Task scheduling
- Print spooling
- Request handling in servers
- Level-order tree traversal

### Variants:
- **Deque**: Double-ended queue
- **Priority Queue**: Elements with priorities
- **Circular Queue**: Efficient space usage

### Common Problems:
- Valid Parentheses
- Min Stack
- Implement Queue using Stacks
- Sliding Window Maximum`,
        content: `# Stack and Queue Operations

## Stack (LIFO - Last In First Out):
A linear data structure where elements are added and removed from the same end (top).

**Operations:**
- **Push**: Add element to top - O(1)
- **Pop**: Remove top element - O(1)
- **Peek**: View top element - O(1)
- **isEmpty**: Check if empty - O(1)

**Applications:**
- Function call stack
- Undo/Redo operations
- Expression evaluation
- Backtracking algorithms

## Queue (FIFO - First In First Out):
Elements are added at rear and removed from front.

**Operations:**
- **Enqueue**: Add to rear - O(1)
- **Dequeue**: Remove from front - O(1)
- **Front**: View front element - O(1)
- **isEmpty**: Check if empty - O(1)

**Applications:**
- Task scheduling
- BFS traversal
- Print queue
- Request handling
`,
        examples: [
            {
                input: "Stack: push(1), push(2), pop()",
                output: "2",
                explanation: "Last pushed element (2) is popped first"
            }
        ],
        timeComplexity: "O(1) for all operations",
        spaceComplexity: "O(n) for n elements",
        order: 8
    },
    {
        title: "Hashing and Hash Tables",
        description: "Understand hashing concepts and collision resolution",
        difficulty: "Medium",
        category: "Hashing",
        icon: "#️⃣",
        notes: `## Hashing Deep Dive

### Hash Function Design:
- Good distribution across table
- Fast to compute
- Minimize collisions

### Collision Resolution Strategies:
1. **Chaining**: 
   - Use linked lists at each bucket
   - Simple to implement
   - No table full issue

2. **Open Addressing**:
   - Linear Probing: Check next slot
   - Quadratic Probing: Check i² slots away
   - Double Hashing: Use second hash function

### Performance Tips:
- Keep load factor < 0.75
- Resize when threshold exceeded
- Use prime number for table size

### Use Cases:
- Two Sum problem
- Group Anagrams
- Subarray sum equals K
- LRU Cache implementation`,
        content: `# Hashing and Hash Tables

Hashing maps data to fixed-size values using a hash function, enabling fast lookups.

## Hash Function Properties:
- **Deterministic**: Same input → same output
- **Uniform Distribution**: Minimizes collisions
- **Fast Computation**: Efficient calculation

## Collision Resolution:
1. **Chaining**: Store collisions in linked lists
2. **Open Addressing**: Find next available slot
   - Linear Probing
   - Quadratic Probing
   - Double Hashing

## Hash Table Operations:
- **Insert**: O(1) average
- **Search**: O(1) average
- **Delete**: O(1) average

## Applications:
- Database indexing
- Caching
- Symbol tables
- Duplicate detection

## Load Factor:
α = n/m (n = elements, m = table size)
- Keep α < 0.7 for good performance
`,
        examples: [
            {
                input: "Insert: key='apple', value=5",
                output: "hash('apple') = 3, store at index 3",
                explanation: "Hash function maps key to index for O(1) access"
            }
        ],
        timeComplexity: "O(1) average for operations",
        spaceComplexity: "O(n) for n elements",
        order: 9
    },
    {
        title: "Recursion and Backtracking",
        description: "Master recursive problem-solving techniques",
        difficulty: "Medium",
        category: "Recursion & Backtracking",
        icon: "🔁",
        notes: `## Recursion Mastery

### Recursion Checklist:
1. **Base Case**: When to stop?
2. **Recursive Case**: How to break down?
3. **Progress**: Are we moving toward base case?
4. **Return Value**: What does function return?

### Common Patterns:
- **Divide & Conquer**: Merge Sort, Quick Sort
- **Decrease & Conquer**: Binary Search, Factorial
- **Tree Recursion**: Fibonacci, Tree Traversals

### Backtracking Template:
- Define base case (solution found)
- Try each choice
- Make choice and recurse
- Undo choice (backtrack)

### Classic Problems:
- Generate Parentheses
- N-Queens
- Sudoku Solver
- Combination Sum
- Word Search`,
        content: `# Recursion and Backtracking

## Recursion:
A function that calls itself to solve smaller instances of the same problem.

**Components:**
1. **Base Case**: Termination condition
2. **Recursive Case**: Problem reduction
3. **Progress**: Move toward base case

**Types:**
- **Direct**: Function calls itself
- **Indirect**: Function A calls B, B calls A
- **Tail**: Recursive call is last operation

## Backtracking:
Systematic exploration of all possibilities by trying options and undoing (backtracking) when they don't work.

**Classic Problems:**
1. **N-Queens**: Place N queens on chessboard
2. **Sudoku Solver**: Fill grid with constraints
3. **Permutations**: Generate all arrangements
4. **Subset Sum**: Find subsets with target sum

**Template:**
\`\`\`
solve(state):
    if is_solution(state):
        record(state)
        return
    for choice in choices:
        make_choice(choice)
        solve(new_state)
        undo_choice(choice)
\`\`\`
`,
        examples: [
            {
                input: "Factorial(4)",
                output: "24",
                explanation: "4! = 4 × 3 × 2 × 1 = 24, computed recursively"
            }
        ],
        timeComplexity: "Varies, often exponential",
        spaceComplexity: "O(depth) for call stack",
        order: 10
    }
];

export const questions = [
    {
        title: "Find Maximum Element in Array",
        description: "Write a function to find the maximum element in an unsorted array.",
        difficulty: "EASY",
        hints: [
            "Initialize a variable to track the maximum value",
            "Compare each element with the current maximum",
            "Update maximum if current element is larger"
        ],
        solution: {
            approach: "Linear scan through array, maintaining maximum value seen so far",
            code: `function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
            explanation: "We iterate through the array once, comparing each element with our current maximum and updating it when we find a larger value."
        },
        testCases: [
            { input: "[3, 1, 4, 1, 5, 9]", expectedOutput: "9" },
            { input: "[-5, -2, -8]", expectedOutput: "-2" }
        ],
        tags: ["array", "linear-search"],
        companies: ["Google", "Amazon"]
    },
    {
        title: "Check if String is Palindrome",
        description: "Determine if a given string reads the same forwards and backwards.",
        difficulty: "EASY",
        hints: [
            "Use two pointers from start and end",
            "Compare characters while moving pointers toward center",
            "Consider case sensitivity and spaces"
        ],
        solution: {
            approach: "Two-pointer technique comparing characters from both ends",
            code: `function isPalindrome(str) {
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
            explanation: "After cleaning the string, we use two pointers to compare characters from both ends, moving toward the center."
        },
        testCases: [
            { input: "\"racecar\"", expectedOutput: "true" },
            { input: "\"hello\"", expectedOutput: "false" }
        ],
        tags: ["string", "two-pointer"],
        companies: ["Microsoft", "Facebook"]
    },
    {
        title: "Reverse a Linked List",
        description: "Reverse a singly linked list iteratively.",
        difficulty: "MEDIUM",
        hints: [
            "Use three pointers: previous, current, next",
            "Reverse the direction of each link",
            "Update pointers as you traverse"
        ],
        solution: {
            approach: "Iterative reversal using three pointers",
            code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
            explanation: "We maintain three pointers and reverse links one by one while traversing the list."
        },
        testCases: [
            { input: "1->2->3->NULL", expectedOutput: "3->2->1->NULL" }
        ],
        tags: ["linked-list", "pointer"],
        companies: ["Amazon", "Apple"]
    },
    {
        title: "Binary Search Implementation",
        description: "Implement binary search on a sorted array.",
        difficulty: "EASY",
        hints: [
            "Array must be sorted",
            "Compare middle element with target",
            "Eliminate half of search space each iteration"
        ],
        solution: {
            approach: "Divide and conquer by repeatedly halving search space",
            code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
            explanation: "We repeatedly divide the search space in half by comparing the middle element with the target."
        },
        testCases: [
            { input: "arr=[1,3,5,7,9], target=5", expectedOutput: "2" },
            { input: "arr=[1,3,5,7,9], target=6", expectedOutput: "-1" }
        ],
        tags: ["searching", "binary-search"],
        companies: ["Google", "Microsoft"]
    },
    {
        title: "Two Sum Problem",
        description: "Find two numbers in an array that add up to a target sum.",
        difficulty: "EASY",
        hints: [
            "Use a hash map to store seen numbers",
            "For each number, check if complement exists",
            "Return indices when found"
        ],
        solution: {
            approach: "Hash map to store complements for O(n) solution",
            code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
            explanation: "We use a hash map to store each number and its index. For each number, we check if its complement exists in the map."
        },
        testCases: [
            { input: "nums=[2,7,11,15], target=9", expectedOutput: "[0,1]" }
        ],
        tags: ["array", "hash-map"],
        companies: ["Amazon", "Facebook"]
    }
];

// Continue with more questions, interview Q&A, roadmaps, etc. (truncated for brevity)
// The actual implementation would include all 30 questions, 40 interview Q&A, etc.

export const interviewQATechnical = [
    {
        question: "What is the difference between a process and a thread?",
        answer: "A process is an independent program in execution with its own memory space, while a thread is a lightweight unit of execution within a process that shares the process's memory. Multiple threads in a process can run concurrently and share resources, making threads more efficient for parallel tasks within the same application. Processes provide better isolation and security, while threads enable better resource sharing and communication.",
        example: "Think of a web browser: Each browser window is a separate process with its own memory. Within each window, different tabs run as threads sharing the same memory - one thread handles UI, another handles network requests, and another runs JavaScript. If one tab crashes, other tabs continue working because they're separate threads, but if the entire browser crashes, all tabs go down because they're in the same process.",
        category: "Technical",
        subcategory: "OS",
        difficulty: "Medium",
        tags: ["operating-systems", "concurrency", "multithreading"]
    },
    {
        question: "Explain the concept of normalization in databases.",
        answer: "Normalization is the process of organizing database tables to reduce redundancy and improve data integrity. It involves dividing large tables into smaller ones and defining relationships between them. The main normal forms are: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies), and BCNF (stricter version of 3NF). Normalization helps eliminate data anomalies, reduces storage space, and makes database maintenance easier.",
        example: "Consider a student database:\n\nBEFORE (Unnormalized):\nStudentID | Name | Course1 | Course2 | Professor1 | Professor2\n1 | John | Math | Physics | Dr. Smith | Dr. Jones\n\nAFTER (Normalized - 3NF):\nStudents: StudentID | Name\nCourses: CourseID | CourseName | ProfessorID\nEnrollments: StudentID | CourseID\nProfessors: ProfessorID | ProfessorName\n\nThis eliminates redundancy and makes updates easier.",
        category: "Technical",
        subcategory: "DBMS",
        difficulty: "Medium",
        tags: ["database", "normalization", "sql"]
    },
    {
        question: "What are the four pillars of Object-Oriented Programming?",
        answer: "The four pillars of OOP are: 1) Encapsulation - bundling data and methods that operate on that data within a single unit (class) and restricting direct access to some components. 2) Abstraction - hiding complex implementation details and showing only essential features. 3) Inheritance - mechanism where a new class derives properties and behaviors from an existing class. 4) Polymorphism - ability of objects to take multiple forms, allowing methods to do different things based on the object calling them.",
        example: "Real-world example using a Car class:\n\n1. Encapsulation: Car has private variables (engine, fuel) and public methods (start(), stop())\n2. Abstraction: User calls start() without knowing internal combustion details\n3. Inheritance: ElectricCar extends Car, inheriting common properties but adding battery\n4. Polymorphism: Both Car and ElectricCar have start() method, but implementation differs (fuel vs electric)",
        category: "Technical",
        subcategory: "OOP",
        difficulty: "Easy",
        tags: ["oop", "fundamentals", "design-patterns"]
    },
    {
        question: "Explain the difference between SQL and NoSQL databases.",
        answer: "SQL databases are relational, table-based databases with predefined schemas, ACID compliance, and use SQL for queries. They're best for complex queries and transactions. NoSQL databases are non-relational, can be document-based, key-value, graph, or column-family, with flexible schemas and eventual consistency. They excel at horizontal scaling and handling large volumes of unstructured data.",
        example: "SQL (MySQL): Perfect for a banking system where you need strict ACID properties:\nCustomers table with ID, Name, Balance\nTransactions table with ID, FromAccount, ToAccount, Amount\nStrict relationships and guaranteed consistency.\n\nNoSQL (MongoDB): Ideal for a social media app:\nUser documents with flexible fields (posts, friends, photos)\nEasy to add new fields without schema changes\nHorizontal scaling for millions of users",
        category: "Technical",
        subcategory: "DBMS",
        difficulty: "Medium",
        tags: ["database", "sql", "nosql"]
    },
    {
        question: "What is the difference between stack and heap memory?",
        answer: "Stack memory is used for static memory allocation, storing local variables and function call information. It follows LIFO order, is automatically managed, and is faster but limited in size. Heap memory is used for dynamic memory allocation, storing objects and data structures. It's manually managed (or garbage collected), slower but larger, and allows flexible memory allocation at runtime.",
        example: "In Java:\n\nStack: When you call a method, local variables are stored on stack:\nvoid calculate() {\n    int x = 5; // stored on stack\n    int y = 10; // stored on stack\n}\n// x and y are automatically removed when method ends\n\nHeap: Objects are stored on heap:\nStudent student = new Student(); // reference on stack, object on heap\n// Object remains until garbage collected",
        category: "Technical",
        subcategory: "Memory Management",
        difficulty: "Medium",
        tags: ["memory", "stack", "heap"]
    }
];

export const interviewQAHR = [
    {
        question: "Tell me about yourself.",
        answer: "Structure your answer using the present-past-future format: Start with your current role and key responsibilities, then briefly mention relevant past experiences and achievements, and conclude with your future goals and why you're interested in this position. Keep it concise (2-3 minutes), focus on professional aspects relevant to the job, and highlight your unique value proposition.",
        example: "Sample Answer: 'I'm currently a software developer at XYZ Company, where I work on full-stack web applications using React and Node.js. I've successfully delivered 3 major projects that improved user engagement by 40%. Before this, I completed my Computer Science degree from ABC University and interned at DEF Corp, where I learned agile development. I'm excited about this opportunity at your company because it aligns with my goal of working on scalable cloud-based systems, and your focus on innovation really resonates with me.'",
        category: "HR",
        subcategory: "Behavioral",
        difficulty: "Easy",
        tags: ["introduction", "behavioral", "interview-basics"]
    },
    {
        question: "What are your strengths and weaknesses?",
        answer: "For strengths, choose 2-3 relevant to the job with specific examples. For weaknesses, be honest but strategic - mention a real weakness you're actively working to improve. Always show self-awareness and commitment to growth. Use the STAR method (Situation, Task, Action, Result) for strength examples.",
        example: "Strength Example: 'My key strength is problem-solving. In my last project, we faced a critical performance issue affecting 10,000 users. I analyzed the codebase, identified the bottleneck in our database queries, implemented query optimization and caching, which reduced response time by 60%.' \n\nWeakness Example: 'I tend to focus too much on details, which sometimes slows me down. However, I've been working on this by setting time limits for tasks and using the Pomodoro technique. This has helped me balance thoroughness with efficiency - I've improved my task completion rate by 30% in the last quarter.'",
        category: "HR",
        subcategory: "Behavioral",
        difficulty: "Medium",
        tags: ["self-assessment", "behavioral", "star-method"]
    },
    {
        question: "Why do you want to work here?",
        answer: "Research the company thoroughly and align your answer with their mission, values, and recent achievements. Mention specific aspects that attract you - technology stack, company culture, growth opportunities, or impact. Show genuine enthusiasm and explain how the role fits your career goals.",
        example: "Sample Answer: 'I'm impressed by your company's commitment to innovation in AI/ML, particularly your recent launch of the smart recommendation system. As someone passionate about machine learning, I'm excited about the opportunity to work with cutting-edge technology. I also admire your focus on work-life balance and continuous learning - I noticed you offer tech talks and hackathons. This aligns perfectly with my goal to grow as an ML engineer while contributing to products that impact millions of users. Your collaborative culture, as mentioned in Glassdoor reviews, is exactly the environment where I thrive.'",
        category: "HR",
        subcategory: "Behavioral",
        difficulty: "Medium",
        tags: ["company-research", "motivation", "culture-fit"]
    },
    {
        question: "Describe a challenging situation and how you handled it.",
        answer: "Use the STAR method: Situation (context), Task (your responsibility), Action (steps you took), Result (outcome with metrics). Choose a relevant professional challenge that demonstrates problem-solving, leadership, or technical skills. Focus on your specific contributions and quantifiable results.",
        example: "STAR Example:\nSituation: 'Our team's main application crashed during peak hours, affecting 50,000 users.'\nTask: 'As the on-call engineer, I needed to identify and fix the issue quickly.'\nAction: 'I immediately checked logs, identified a memory leak in our caching layer, implemented a temporary fix to restart affected services, then worked with the team to deploy a permanent solution using better memory management.'\nResult: 'We restored service in 45 minutes, preventing $100K in potential revenue loss. I also created monitoring alerts to prevent similar issues, which has kept our uptime at 99.9% for the past 6 months.'",
        category: "HR",
        subcategory: "Behavioral",
        difficulty: "Medium",
        tags: ["star-method", "problem-solving", "crisis-management"]
    }
];

export const roadmaps = [
    {
        title: "Frontend Developer Roadmap",
        description: "Complete path to becoming a professional frontend developer",
        goal: "Frontend",
        duration: "6-8 months",
        difficulty: "Beginner",
        prerequisites: ["Basic computer knowledge", "Interest in web development"],
        steps: [
            {
                phase: "Phase 1",
                title: "HTML & CSS Fundamentals",
                description: "Learn the building blocks of web pages",
                resources: ["MDN Web Docs", "freeCodeCamp", "CSS-Tricks"],
                estimatedTime: "4-6 weeks",
                skills: ["HTML5 semantic tags", "CSS layouts", "Flexbox", "Grid", "Responsive design"]
            },
            {
                phase: "Phase 2",
                title: "JavaScript Essentials",
                description: "Master JavaScript programming",
                resources: ["JavaScript.info", "Eloquent JavaScript", "You Don't Know JS"],
                estimatedTime: "8-10 weeks",
                skills: ["ES6+ features", "DOM manipulation", "Async programming", "APIs", "Error handling"]
            },
            {
                phase: "Phase 3",
                title: "React.js Framework",
                description: "Build modern web applications with React",
                resources: ["React official docs", "React courses", "Project-based learning"],
                estimatedTime: "6-8 weeks",
                skills: ["Components", "Hooks", "State management", "React Router", "Context API"]
            }
        ]
    }
];

export const companies = [
    {
        name: "TechCorp Solutions",
        description: "Leading technology company specializing in cloud solutions",
        difficulty: "Medium",
        industry: "Technology",
        interviewProcess: [
            {
                round: "Online Assessment",
                description: "Coding test with 2-3 DSA problems",
                duration: "90 minutes",
                tips: ["Practice medium-level DSA", "Focus on time complexity", "Test your code thoroughly"]
            },
            {
                round: "Technical Round 1",
                description: "DSA and problem-solving",
                duration: "60 minutes",
                tips: ["Explain your approach clearly", "Write clean code", "Discuss trade-offs"]
            }
        ],
        mockQuestions: [
            {
                type: "Technical",
                question: "Explain how you would design a URL shortener service",
                answer: "Use hashing to generate short codes, store mappings in database, implement redirect logic, consider scalability with caching and load balancing",
                difficulty: "Medium"
            }
        ],
        tags: ["cloud", "software"]
    }
];

export const badges = [
    {
        name: "First Steps",
        description: "Complete your first topic",
        icon: "🎯",
        criteria: "Complete 1 topic",
        rarity: "Common",
        points: 10
    },
    {
        name: "Problem Solver",
        description: "Solve 10 coding questions",
        icon: "💡",
        criteria: "Solve 10 questions",
        rarity: "Common",
        points: 25
    },
    {
        name: "Streak Master",
        description: "Complete daily challenges for 7 days",
        icon: "🔥",
        criteria: "7-day streak",
        rarity: "Rare",
        points: 50
    }
];
