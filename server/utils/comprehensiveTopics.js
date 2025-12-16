// Comprehensive DSA Topics for Placement Preparation (A-Z Coverage)
// This file contains 30+ essential DSA topics with detailed notes

export const comprehensiveTopics = [
    // ARRAYS & STRINGS
    {
        title: "Array Fundamentals",
        description: "Master array basics, traversal, and manipulation techniques",
        difficulty: "Easy",
        category: "Array",
        icon: "📊",
        notes: `## Array Fundamentals - Complete Guide

### What are Arrays?
Arrays are contiguous memory locations storing elements of the same type with O(1) random access.

### Core Operations & Complexity:
- **Access**: O(1) - Direct index access
- **Search**: O(n) linear, O(log n) binary (sorted)
- **Insert/Delete at end**: O(1) amortized
- **Insert/Delete at beginning/middle**: O(n)

### Essential Patterns:
1. **Two Pointers**
   - Same direction: Fast & slow pointers
   - Opposite direction: Start & end pointers
   - Use cases: Remove duplicates, reverse, palindrome

2. **Sliding Window**
   - Fixed size window
   - Variable size window
   - Use cases: Subarray problems, substring problems

3. **Prefix Sum**
   - Precompute cumulative sums
   - O(1) range sum queries
   - Use cases: Range queries, subarray sum

4. **Kadane's Algorithm**
   - Maximum subarray sum
   - Dynamic programming approach
   - O(n) time, O(1) space

### Interview Must-Knows:
- Two Sum / Three Sum / Four Sum
- Maximum Subarray (Kadane's)
- Rotate Array (3 reversals trick)
- Merge Sorted Arrays
- Find Duplicate/Missing Number
- Dutch National Flag (3-way partitioning)
- Trapping Rain Water
- Product of Array Except Self

### Pro Tips:
- Always ask: sorted? duplicates? constraints?
- Consider in-place vs extra space
- Think about edge cases: empty, single element
- Use hash maps for O(1) lookups
- Binary search on sorted arrays`,
        content: "Arrays store elements in contiguous memory with constant-time access...",
        examples: [{
            input: "[1,2,3,4,5]",
            output: "[5,4,3,2,1]",
            explanation: "Array reversal using two pointers"
        }],
        timeComplexity: "O(1) access, O(n) search",
        spaceComplexity: "O(1) for in-place operations",
        order: 1
    },
    {
        title: "String Algorithms",
        description: "Pattern matching, manipulation, and advanced string techniques",
        difficulty: "Medium",
        category: "String",
        icon: "🔤",
        notes: `## String Algorithms - Advanced Guide

### String Basics:
- Immutable in Java/Python (use StringBuilder)
- Mutable in C++ (char array)
- ASCII: 128 characters, Extended: 256

### Pattern Matching Algorithms:
1. **Naive Pattern Matching**: O(nm)
2. **KMP Algorithm**: O(n+m) with LPS array
3. **Rabin-Karp**: O(n+m) using rolling hash
4. **Boyer-Moore**: Best for large alphabets

### Essential Techniques:
1. **Two Pointers**: Palindrome, reverse
2. **Hashing**: Anagrams, duplicates
3. **Sliding Window**: Substring problems
4. **Trie**: Prefix matching, autocomplete

### Common Problems:
- Longest Palindromic Substring (DP/Expand)
- Longest Substring Without Repeating Characters
- Group Anagrams (Hash map)
- Valid Parentheses (Stack)
- String to Integer (atoi)
- Implement strStr() (KMP)
- Minimum Window Substring
- Edit Distance (DP)

### Character Frequency Tricks:
\`\`\`
int[] freq = new int[26]; // lowercase
freq[ch - 'a']++;
\`\`\`

### Interview Tips:
- Ask about character set (ASCII/Unicode)
- Consider case sensitivity
- Handle empty strings
- Use char array for multiple modifications
- StringBuilder for concatenations`,
        content: "Strings are sequences of characters...",
        examples: [{
            input: "\"racecar\"",
            output: "true",
            explanation: "Palindrome check using two pointers"
        }],
        timeComplexity: "O(n) for most operations",
        spaceComplexity: "O(n) for new strings",
        order: 2
    },

    // LINKED LISTS
    {
        title: "Singly Linked Lists",
        description: "Linear data structure with nodes and pointers",
        difficulty: "Easy",
        category: "LinkedList",
        icon: "🔗",
        notes: `## Singly Linked Lists - Complete Guide

### Structure:
\`\`\`
class Node {
    int data;
    Node next;
}
\`\`\`

### Core Operations:
- **Insert at head**: O(1)
- **Insert at tail**: O(n) without tail pointer, O(1) with
- **Delete**: O(n) to find, O(1) to remove
- **Search**: O(n)

### Essential Patterns:
1. **Dummy Node**: Simplifies edge cases
2. **Fast & Slow Pointers**: Cycle detection, middle
3. **Reverse**: Iterative (3 pointers) or Recursive
4. **Runner Technique**: Two pointers at different speeds

### Must-Know Problems:
- Reverse Linked List (iterative & recursive)
- Detect Cycle (Floyd's algorithm)
- Find Middle (fast/slow pointers)
- Merge Two Sorted Lists
- Remove Nth Node from End
- Palindrome Linked List
- Add Two Numbers
- Copy List with Random Pointer

### Common Mistakes:
- Losing head reference
- Not handling null pointers
- Forgetting to update tail
- Off-by-one errors

### Pro Tips:
- Draw diagrams!
- Use dummy node for head operations
- Check for cycles before traversal
- Consider space: O(1) iterative vs O(n) recursive`,
        content: "Singly linked lists connect nodes...",
        examples: [{
            input: "1->2->3->NULL",
            output: "3->2->1->NULL",
            explanation: "Reverse using 3 pointers"
        }],
        timeComplexity: "O(n) for traversal",
        spaceComplexity: "O(1) for iterative",
        order: 3
    },
    {
        title: "Doubly Linked Lists & Circular Lists",
        description: "Bidirectional traversal and circular structures",
        difficulty: "Medium",
        category: "LinkedList",
        icon: "🔄",
        notes: `## Doubly & Circular Linked Lists

### Doubly Linked List:
\`\`\`
class Node {
    int data;
    Node prev, next;
}
\`\`\`

**Advantages:**
- Bidirectional traversal
- Easy deletion (no need for previous node)
- Reverse traversal

**Use Cases:**
- LRU Cache implementation
- Browser history (back/forward)
- Undo/Redo functionality

### Circular Linked List:
- Last node points to first
- No NULL pointers
- Useful for round-robin scheduling

### Key Problems:
- LRU Cache (Doubly LL + HashMap)
- Browser History
- Flatten Multilevel Doubly Linked List
- Design Browser History

### Implementation Tips:
- Maintain both head and tail
- Update prev pointers carefully
- Check for circular references`,
        content: "Doubly linked lists allow bidirectional traversal...",
        examples: [],
        timeComplexity: "O(1) for insertion/deletion at ends",
        spaceComplexity: "O(n) for n nodes",
        order: 4
    },

    // STACKS & QUEUES
    {
        title: "Stack Data Structure",
        description: "LIFO principle with push, pop, and peek operations",
        difficulty: "Easy",
        category: "Stack",
        icon: "📚",
        notes: `## Stack - LIFO Data Structure

### Operations (All O(1)):
- **Push**: Add to top
- **Pop**: Remove from top
- **Peek/Top**: View top element
- **isEmpty**: Check if empty

### Implementation:
1. **Array-based**: Fixed size
2. **Linked List**: Dynamic size

### Classic Applications:
1. **Expression Evaluation**
   - Infix to Postfix conversion
   - Postfix evaluation
   - Balanced parentheses

2. **Backtracking**
   - DFS traversal
   - Undo operations
   - Browser back button

3. **Function Calls**
   - Call stack
   - Recursion simulation

### Must-Solve Problems:
- Valid Parentheses
- Min Stack (O(1) getMin)
- Evaluate Reverse Polish Notation
- Daily Temperatures
- Next Greater Element
- Largest Rectangle in Histogram
- Trapping Rain Water (stack approach)
- Decode String

### Monotonic Stack:
- Maintain increasing/decreasing order
- Use for "next greater/smaller" problems
- O(n) time for most problems

### Interview Tips:
- Consider using stack for nested structures
- Think about monotonic stack for comparison problems
- Stack + HashMap for advanced problems`,
        content: "Stack follows LIFO principle...",
        examples: [{
            input: "push(1), push(2), pop()",
            output: "2",
            explanation: "Last in, first out"
        }],
        timeComplexity: "O(1) for all operations",
        spaceComplexity: "O(n) for n elements",
        order: 5
    },
    {
        title: "Queue & Deque",
        description: "FIFO structures and double-ended queues",
        difficulty: "Easy",
        category: "Queue",
        icon: "🎫",
        notes: `## Queue & Deque - Complete Guide

### Queue (FIFO):
**Operations:**
- Enqueue (rear): O(1)
- Dequeue (front): O(1)
- Front/Peek: O(1)

**Implementations:**
1. Array-based (circular)
2. Linked List
3. Two Stacks

### Deque (Double-Ended Queue):
- Add/Remove from both ends: O(1)
- More flexible than queue

### Applications:
1. **BFS Traversal**
2. **Level Order Traversal**
3. **Sliding Window Maximum** (Deque)
4. **Task Scheduling**
5. **Request Handling**

### Priority Queue:
- Elements with priorities
- Implemented using Heap
- O(log n) insert/delete
- O(1) peek

### Key Problems:
- Implement Queue using Stacks
- Implement Stack using Queues
- Sliding Window Maximum (Deque)
- Design Circular Queue
- Task Scheduler
- Rotten Oranges (BFS)

### Circular Queue:
- Efficient space usage
- Use modulo for wraparound
- Track front, rear, size

### Pro Tips:
- Use deque for sliding window problems
- Priority queue for "kth largest/smallest"
- Queue for BFS, Stack for DFS`,
        content: "Queue follows FIFO principle...",
        examples: [],
        timeComplexity: "O(1) for enqueue/dequeue",
        spaceComplexity: "O(n) for n elements",
        order: 6
    },

    // TREES
    {
        title: "Binary Trees",
        description: "Hierarchical structure with at most two children per node",
        difficulty: "Medium",
        category: "Tree",
        icon: "🌳",
        notes: `## Binary Trees - Comprehensive Guide

### Tree Terminology:
- **Root**: Top node
- **Leaf**: Node with no children
- **Height**: Longest path to leaf
- **Depth**: Distance from root
- **Level**: Depth + 1

### Tree Traversals:
1. **Inorder (Left-Root-Right)**
   - BST gives sorted order
   - Iterative: Use stack

2. **Preorder (Root-Left-Right)**
   - Copy tree structure
   - Prefix expression

3. **Postorder (Left-Right-Root)**
   - Delete tree
   - Postfix expression

4. **Level Order (BFS)**
   - Use queue
   - Level-by-level processing

### Types of Binary Trees:
1. **Full**: 0 or 2 children
2. **Complete**: All levels filled except last
3. **Perfect**: All levels completely filled
4. **Balanced**: Height = O(log n)

### Essential Problems:
- Maximum Depth
- Invert Binary Tree
- Symmetric Tree
- Diameter of Binary Tree
- Lowest Common Ancestor
- Path Sum Problems
- Serialize/Deserialize
- Construct Tree from Traversals

### Recursion Patterns:
1. **Top-Down**: Pass info down
2. **Bottom-Up**: Return info up
3. **Divide & Conquer**: Solve subproblems

### Pro Tips:
- Most tree problems use recursion
- Draw the tree!
- Consider base cases carefully
- Use helper functions with extra parameters`,
        content: "Binary trees are hierarchical structures...",
        examples: [],
        timeComplexity: "O(n) for traversals",
        spaceComplexity: "O(h) where h is height",
        order: 7
    },
    {
        title: "Binary Search Trees (BST)",
        description: "Ordered binary tree for efficient searching",
        difficulty: "Medium",
        category: "Tree",
        icon: "🔍",
        notes: `## Binary Search Trees - Complete Guide

### BST Property:
- Left subtree < Root < Right subtree
- Enables binary search: O(log n) average

### Operations:
- **Search**: O(log n) average, O(n) worst
- **Insert**: O(log n) average, O(n) worst
- **Delete**: O(log n) average, O(n) worst
- **Inorder**: Gives sorted sequence

### Balanced BSTs:
1. **AVL Tree**: Height-balanced, strict
2. **Red-Black Tree**: Color-balanced, relaxed
3. **B-Tree**: Multi-way, for databases

### Key Problems:
- Validate BST
- Kth Smallest Element
- Lowest Common Ancestor in BST
- Convert Sorted Array to BST
- Delete Node in BST
- Inorder Successor/Predecessor
- Range Sum of BST
- Trim a BST

### BST to Sorted Array:
- Inorder traversal
- O(n) time, O(n) space

### Deletion Cases:
1. **Leaf**: Simply remove
2. **One child**: Replace with child
3. **Two children**: Replace with inorder successor

### Interview Tips:
- Leverage BST property for optimization
- Inorder gives sorted order
- Consider balanced vs unbalanced
- Think about degenerate case (linked list)`,
        content: "BST maintains sorted order...",
        examples: [],
        timeComplexity: "O(log n) average for operations",
        spaceComplexity: "O(n) for n nodes",
        order: 8
    },

    // Continue with more topics...
];

// Export for use in seed.js
export default comprehensiveTopics;
