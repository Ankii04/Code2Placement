import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

import connectDB from '../config/db.js';
import Topic from '../models/Topic.js';
import Question from '../models/Question.js';

// Complete content for ALL subtopics with C++ code
const LeetCodeUtils = {
    // Generate C++ driver that reads vector from stdin
    cppVectorDriver: (className, funcName, returnType = 'int') => ({
        cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <climits>
using namespace std;

// --- USER CODE ---

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for(int i=0; i<n; i++) cin >> arr[i];
    Solution sol;
    ${returnType === 'void' ? `sol.${funcName}(arr);` : `cout << sol.${funcName}(arr) << endl;`}
    ${returnType === 'void' ? `for(int i=0; i<arr.size(); i++) cout << arr[i] << (i==arr.size()-1 ? "" : " "); cout << endl;` : ''}
    return 0;
}`
    }),

    // Generate Python driver
    pythonVectorDriver: (funcName, returnType = 'int') => ({
        py: `import sys

# --- USER CODE ---

if __name__ == "__main__":
    input_data = sys.stdin.read().split()
    if not input_data:
        exit()
    n = int(input_data[0])
    arr = [int(x) for x in input_data[1:n+1]]
    sol = Solution()
    ${returnType === 'void' ? `sol.${funcName}(arr)\n    print(" ".join(map(str, arr)))` : `print(sol.${funcName}(arr))`}
`
    }),

    // Generate JS driver
    jsVectorDriver: (funcName, returnType = 'int') => ({
        js: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
if (!input[0]) process.exit(0);

// --- USER CODE ---

const n = parseInt(input[0]);
const arr = input.slice(1, n + 1).map(Number);
const sol = new Solution();
${returnType === 'void' ? `sol.${funcName}(arr);\nconsole.log(arr.join(" "));` : `console.log(sol.${funcName}(arr));`}
`
    })
};

const completeSubtopicContent = {
    // ==================== ARRAY SUBTOPICS ====================
    'Array Rotation & Reversal': {
        content: `# Array Basics - Complete Guide

## What is an Array?
An array is a collection of elements stored in **contiguous memory locations**. It's the most fundamental data structure.

## Memory Layout
\`\`\`
Array: [10, 20, 30, 40, 50]
Memory: 
Address:  1000  1004  1008  1012  1016
Value:     10    20    30    40    50

Formula: address[i] = base_address + (i × element_size)
\`\`\`

## Types of Arrays

### 1. Static Array (Fixed Size)
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    // Fixed size array
    int arr[5] = {10, 20, 30, 40, 50};
    
    // Access element - O(1)
    cout << arr[2] << endl;  // 30
    
    // Size is fixed
    cout << sizeof(arr)/sizeof(arr[0]) << endl;  // 5
    
    return 0;
}
\`\`\`

### 2. Dynamic Array (Vector in C++)
\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Dynamic array - size can grow
    vector<int> vec;
    
    // Add elements - O(1) amortized
    vec.push_back(10);
    vec.push_back(20);
    vec.push_back(30);
    
    // Access - O(1)
    cout << vec[1] << endl;  // 20
    
    // Size
    cout << vec.size() << endl;  // 3
    
    // Remove last - O(1)
    vec.pop_back();
    
    return 0;
}
\`\`\`

## Array vs Vector Comparison

| Feature | Static Array | Vector (Dynamic) |
|---------|-------------|------------------|
| Size | Fixed at compile time | Grows automatically |
| Memory | Stack | Heap |
| Performance | Faster (no overhead) | Slight overhead |
| Flexibility | Limited | High |
| Bounds Checking | No | Yes (with .at()) |
| Methods | None | Many (push_back, pop_back, etc.) |

## Basic Operations

### Traversal - O(n)
\`\`\`cpp
// Method 1: Index-based
for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}

// Method 2: Range-based (C++11)
for (int x : arr) {
    cout << x << " ";
}
\`\`\`

### Search - O(n)
\`\`\`cpp
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}
\`\`\`

### Insert at End - O(1)
\`\`\`cpp
vector<int> vec = {10, 20, 30};
vec.push_back(40);  // [10, 20, 30, 40]
\`\`\`

### Insert at Beginning - O(n)
\`\`\`cpp
vector<int> vec = {10, 20, 30};
vec.insert(vec.begin(), 5);  // [5, 10, 20, 30]
// All elements shift right - expensive!
\`\`\`

### Delete from End - O(1)
\`\`\`cpp
vector<int> vec = {10, 20, 30};
vec.pop_back();  // [10, 20]
\`\`\`

### Delete from Position - O(n)
\`\`\`cpp
vector<int> vec = {10, 20, 30, 40};
vec.erase(vec.begin() + 1);  // [10, 30, 40]
// Elements shift left
\`\`\`

## Vector Methods Reference

\`\`\`cpp
vector<int> vec = {1, 2, 3, 4, 5};

// Size operations
vec.size()        // Current size
vec.capacity()    // Allocated capacity
vec.empty()       // Check if empty
vec.resize(10)    // Resize to 10 elements

// Access
vec[i]            // Direct access (no bounds check)
vec.at(i)         // Access with bounds checking
vec.front()       // First element
vec.back()        // Last element

// Modifiers
vec.push_back(6)  // Add at end
vec.pop_back()    // Remove from end
vec.insert(pos, val)  // Insert at position
vec.erase(pos)    // Remove at position
vec.clear()       // Remove all elements

// Iteration
vec.begin()       // Iterator to first element
vec.end()         // Iterator to past-last element
\`\`\`

## When to Use What

### Use Static Array When:
→ Size is known and fixed
→ Need maximum performance
→ Memory is limited
→ Simple use case

### Use Vector When:
→ Size is unknown or changes
→ Need flexibility
→ Want built-in methods
→ Modern C++ development`,
        notes: `## Key Concepts

### Memory Efficiency
→ Arrays use contiguous memory for cache-friendly access
→ Formula: address[i] = base + (i × element_size)
→ This enables O(1) random access

### Vector Growth Strategy
When vector is full:
→ Allocate new array (typically 2× current size)
→ Copy all elements to new array
→ Delete old array
→ This makes push_back() O(1) amortized

### Common Mistakes
→ Index out of bounds (accessing arr[n] when size is n)
→ Not checking for empty array
→ Modifying array while iterating
→ Forgetting arrays are 0-indexed

### Interview Tips
→ Always ask about array size and constraints
→ Consider edge cases: empty, single element, duplicates
→ Think about in-place vs extra space solutions
→ Know common patterns: two pointers, sliding window, prefix sum`,
        examples: [
            {
                input: 'arr = [1, 2, 3, 4, 5], access arr[2]',
                output: '3',
                explanation: 'Direct O(1) access using index calculation'
            },
            {
                input: 'vector: push_back(1), push_back(2), size()',
                output: '2',
                explanation: 'Vector grows automatically as elements are added'
            }
        ],
        timeComplexity: 'Access: O(1), Search: O(n), Insert/Delete: O(n)',
        spaceComplexity: 'O(n) for n elements'
    },

    'Two Pointers': {
        content: `# Two Pointers Technique

## What is Two Pointers?
A technique using two indices to traverse an array, often from opposite ends or at different speeds.

## Pattern 1: Opposite Ends

### Reverse Array
\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

void reverseArray(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        // Swap elements
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    reverseArray(arr);
    
    for (int x : arr) {
        cout << x << " ";  // 5 4 3 2 1
    }
    return 0;
}
\`\`\`

### Check Palindrome
\`\`\`cpp
bool isPalindrome(string s) {
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        if (s[left] != s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
\`\`\`

## Pattern 2: Two Sum (Sorted Array)

\`\`\`cpp
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;   // Need larger sum
        } else {
            right--;  // Need smaller sum
        }
    }
    
    return {-1, -1};  // Not found
}
\`\`\`

## Pattern 3: Fast & Slow Pointers

### Remove Duplicates from Sorted Array
\`\`\`cpp
int removeDuplicates(vector<int>& arr) {
    if (arr.empty()) return 0;
    
    int slow = 0;  // Position for unique elements
    
    for (int fast = 1; fast < arr.size(); fast++) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    
    return slow + 1;  // New length
}

// Example: [1,1,2,2,3] → [1,2,3,_,_], returns 3
\`\`\`

### Move Zeros to End
\`\`\`cpp
void moveZeros(vector<int>& arr) {
    int slow = 0;  // Position for non-zero elements
    
    for (int fast = 0; fast < arr.size(); fast++) {
        if (arr[fast] != 0) {
            swap(arr[slow], arr[fast]);
            slow++;
        }
    }
}

// Example: [0,1,0,3,12] → [1,3,12,0,0]
\`\`\`

## Pattern 4: Three Sum

\`\`\`cpp
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& arr) {
    vector<vector<int>> result;
    sort(arr.begin(), arr.end());
    
    for (int i = 0; i < arr.size() - 2; i++) {
        // Skip duplicates
        if (i > 0 && arr[i] == arr[i-1]) continue;
        
        int left = i + 1;
        int right = arr.size() - 1;
        int target = -arr[i];
        
        while (left < right) {
            int sum = arr[left] + arr[right];
            
            if (sum == target) {
                result.push_back({arr[i], arr[left], arr[right]});
                
                // Skip duplicates
                while (left < right && arr[left] == arr[left+1]) left++;
                while (left < right && arr[right] == arr[right-1]) right--;
                
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}
\`\`\`

## Container With Most Water

\`\`\`cpp
int maxArea(vector<int>& height) {
    int left = 0;
    int right = height.size() - 1;
    int maxWater = 0;
    
    while (left < right) {
        int width = right - left;
        int h = min(height[left], height[right]);
        int area = width * h;
        
        maxWater = max(maxWater, area);
        
        // Move pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}
\`\`\``,
        notes: `## When to Use Two Pointers

→ Array is sorted
→ Need to find pairs/triplets with specific sum
→ Reverse or rearrange elements
→ Remove duplicates in-place
→ Partition array based on condition

## Pattern Recognition

**Opposite Ends:**
→ Palindrome check
→ Two sum in sorted array
→ Container with most water
→ Trapping rain water

**Same Direction (Fast & Slow):**
→ Remove duplicates
→ Move zeros
→ Partition array
→ In-place modifications

## Time Complexity
→ Usually O(n) - single pass through array
→ Much better than nested loops O(n²)

## Common Mistakes
→ Not handling duplicates in three sum
→ Forgetting to sort array first (when needed)
→ Moving wrong pointer in optimization problems
→ Not checking array bounds`,
        examples: [
            {
                input: 'arr = [1, 2, 3, 4, 5], reverse',
                output: '[5, 4, 3, 2, 1]',
                explanation: 'Swap elements from both ends moving inward'
            },
            {
                input: 'arr = [1, 2, 3, 4], target = 5',
                output: '[1, 3]',
                explanation: 'Two pointers find pair: arr[1] + arr[3] = 2 + 3 = 5'
            }
        ],
        timeComplexity: 'O(n) for most problems, O(n²) for three sum',
        spaceComplexity: 'O(1) - in-place modifications'
    },

    'Sliding Window': {
        content: `# Sliding Window Technique

## What is Sliding Window?
A technique to solve subarray/substring problems by maintaining a window of elements.

## Pattern 1: Fixed Size Window

### Maximum Sum of K Consecutive Elements
\`\`\`cpp
#include <vector>
#include <algorithm>
using namespace std;

int maxSumSubarray(vector<int>& arr, int k) {
    int n = arr.size();
    if (n < k) return -1;
    
    // Calculate sum of first window
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    int maxSum = windowSum;
    
    // Slide the window
    for (int i = k; i < n; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Example: arr = [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4
// Output: 39 (10 + 23 + 3 + 1)
\`\`\`

### First Negative in Every Window of Size K
\`\`\`cpp
#include <vector>
#include <deque>
using namespace std;

vector<int> firstNegative(vector<int>& arr, int k) {
    vector<int> result;
    deque<int> dq;  // Store indices of negative numbers
    
    // Process first window
    for (int i = 0; i < k; i++) {
        if (arr[i] < 0) {
            dq.push_back(i);
        }
    }
    
    // First window result
    if (!dq.empty()) {
        result.push_back(arr[dq.front()]);
    } else {
        result.push_back(0);
    }
    
    // Slide window
    for (int i = k; i < arr.size(); i++) {
        // Remove elements outside window
        while (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        
        // Add new element if negative
        if (arr[i] < 0) {
            dq.push_back(i);
        }
        
        // Add result
        if (!dq.empty()) {
            result.push_back(arr[dq.front()]);
        } else {
            result.push_back(0);
        }
    }
    
    return result;
}
\`\`\`

## Pattern 2: Variable Size Window

### Longest Substring with K Distinct Characters
\`\`\`cpp
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int longestSubstring(string s, int k) {
    unordered_map<char, int> freq;
    int left = 0;
    int maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        // Expand window
        freq[s[right]]++;
        
        // Shrink window if more than k distinct
        while (freq.size() > k) {
            freq[s[left]]--;
            if (freq[s[left]] == 0) {
                freq.erase(s[left]);
            }
            left++;
        }
        
        // Update max length
        maxLen = max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example: s = "aabacbebebe", k = 3
// Output: 7 ("cbebebe")
\`\`\`

### Longest Substring Without Repeating Characters
\`\`\`cpp
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> lastSeen;
    int left = 0;
    int maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char c = s[right];
        
        // If character seen before and in current window
        if (lastSeen.count(c) && lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }
        
        lastSeen[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example: s = "abcabcbb"
// Output: 3 ("abc")
\`\`\`

### Minimum Window Substring
\`\`\`cpp
#include <string>
#include <unordered_map>
#include <climits>
using namespace std;

string minWindow(string s, string t) {
    if (s.empty() || t.empty()) return "";
    
    unordered_map<char, int> required;
    for (char c : t) {
        required[c]++;
    }
    
    int left = 0, right = 0;
    int formed = 0;  // Characters matched
    int required_count = required.size();
    
    unordered_map<char, int> window;
    int minLen = INT_MAX;
    int minLeft = 0;
    
    while (right < s.length()) {
        // Expand window
        char c = s[right];
        window[c]++;
        
        if (required.count(c) && window[c] == required[c]) {
            formed++;
        }
        
        // Shrink window
        while (left <= right && formed == required_count) {
            // Update result
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }
            
            char leftChar = s[left];
            window[leftChar]--;
            if (required.count(leftChar) && window[leftChar] < required[leftChar]) {
                formed--;
            }
            left++;
        }
        
        right++;
    }
    
    return minLen == INT_MAX ? "" : s.substr(minLeft, minLen);
}

// Example: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
\`\`\`

### Maximum of All Subarrays of Size K
\`\`\`cpp
#include <vector>
#include <deque>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& arr, int k) {
    vector<int> result;
    deque<int> dq;  // Store indices in decreasing order of values
    
    for (int i = 0; i < arr.size(); i++) {
        // Remove elements outside window
        while (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        
        // Remove smaller elements (they won't be max)
        while (!dq.empty() && arr[dq.back()] < arr[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // Add to result after first window
        if (i >= k - 1) {
            result.push_back(arr[dq.front()]);
        }
    }
    
    return result;
}

// Example: arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
// Output: [3, 3, 5, 5, 6, 7]
\`\`\``,
        notes: `## Pattern Recognition

**Fixed Size Window:**
→ "Subarray of size K"
→ "Every window of size K"
→ Window size is given

**Variable Size Window:**
→ "Longest substring..."
→ "Minimum window..."
→ "At most K distinct..."
→ Window size needs to be found

## Template for Variable Window

\`\`\`cpp
int left = 0, maxLen = 0;
for (int right = 0; right < n; right++) {
    // Expand window
    add(arr[right]);
    
    // Shrink window if condition violated
    while (condition_violated) {
        remove(arr[left]);
        left++;
    }
    
    // Update result
    maxLen = max(maxLen, right - left + 1);
}
\`\`\`

## Common Mistakes
→ Not removing elements outside window
→ Wrong window size calculation
→ Forgetting to update result before shrinking
→ Not handling edge cases (empty array, k > n)

## Time Complexity
→ Fixed window: O(n)
→ Variable window: O(n) - each element visited at most twice`,
        examples: [
            {
                input: 'arr = [1, 4, 2, 10, 23], k = 3',
                output: '36',
                explanation: 'Maximum sum of 3 consecutive: [10, 23, 3] = 36'
            },
            {
                input: 's = "abcabcbb"',
                output: '3',
                explanation: 'Longest substring without repeating: "abc"'
            }
        ],
        timeComplexity: 'O(n) - each element processed at most twice',
        spaceComplexity: 'O(k) for window storage'
    }
};

// Questions for each subtopic (5 per subtopic)
const subtopicQuestions = {
    'Array Rotation & Reversal': [
        {
            title: 'Find Maximum Element in Array',
            description: `Given an array of integers, find and return the maximum element.
            
**Example 1:**
Input: arr = [3, 1, 4, 1, 5, 9, 2, 6]
Output: 9

**Example 2:**
Input: arr = [-5, -2, -8, -1]
Output: -1

**Constraints:**
→ 1 ≤ arr.length ≤ 10⁵
→ -10⁹ ≤ arr[i] ≤ 10⁹`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    int findMax(vector<int>& arr) {\n        \n    }\n};`,
                python: `class Solution:\n    def findMax(self, arr):\n        `,
                javascript: `class Solution {\n    findMax(arr) {\n        \n    }\n}`
            },
            driverCode: {
                ...LeetCodeUtils.cppVectorDriver('Solution', 'findMax'),
                ...LeetCodeUtils.pythonVectorDriver('findMax'),
                ...LeetCodeUtils.jsVectorDriver('findMax')
            },
            hints: [
                'Initialize max with first element',
                'Compare each element with current max',
                'Update max if current element is larger'
            ],
            solution: {
                approach: 'Linear scan through array, maintaining maximum value seen so far',
                code: `class Solution {\npublic:\n    int findMax(vector<int>& arr) {\n        int maxVal = arr[0];\n        for(int x : arr) {\n            if(x > maxVal) maxVal = x;\n        }\n        return maxVal;\n    }\n};`,
                explanation: 'We iterate through array once, comparing each element with current maximum and updating when we find larger value. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: '[3, 1, 4, 1, 5, 9, 2, 6]', expectedOutput: '9' },
                { input: '[-5, -2, -8, -1]', expectedOutput: '-1' },
                { input: '[42]', expectedOutput: '42' }
            ],
            tags: ['array', 'linear-search', 'basics'],
            companies: ['Google', 'Amazon', 'Microsoft']
        },
        {
            title: 'Reverse an Array',
            description: `Reverse the given array in-place.
            
**Example 1:**
Input: arr = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]

**Example 2:**
Input: arr = [10, 20]
Output: [20, 10]

**Constraints:**
→ 1 ≤ arr.length ≤ 10⁵
→ Solve in-place with O(1) extra space`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    void reverseArray(vector<int>& arr) {\n        \n    }\n};`,
                python: `class Solution:\n    def reverseArray(self, arr):\n        `,
                javascript: `class Solution {\n    reverseArray(arr) {\n        \n    }\n}`
            },
            driverCode: {
                ...LeetCodeUtils.cppVectorDriver('Solution', 'reverseArray', 'void'),
                ...LeetCodeUtils.pythonVectorDriver('reverseArray', 'void'),
                ...LeetCodeUtils.jsVectorDriver('reverseArray', 'void')
            },
            hints: [
                'Use two pointers from both ends',
                'Swap elements and move pointers inward',
                'Stop when pointers meet'
            ],
            solution: {
                approach: 'Two pointers technique - swap elements from both ends moving toward center',
                code: `class Solution {\npublic:\n    void reverseArray(vector<int>& arr) {\n        int left = 0, right = arr.size() - 1;\n        while (left < right) {\n            swap(arr[left++], arr[right--]);\n        }\n    }\n};`,
                explanation: 'Use two pointers starting from both ends, swap elements and move pointers inward until they meet. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: '[1, 2, 3, 4, 5]', expectedOutput: '5 4 3 2 1' },
                { input: '[10, 20]', expectedOutput: '20 10' },
                { input: '[7]', expectedOutput: '7' }
            ],
            tags: ['array', 'two-pointers', 'in-place'],
            companies: ['Amazon', 'Facebook', 'Apple']
        },
        {
            title: 'Search Element in Array',
            description: `Find the index of target element in array. Return -1 if not found.
            
**Example 1:**
Input: arr = [4, 2, 7, 1, 9], target = 7
Output: 2

**Example 2:**
Input: arr = [1, 2, 3], target = 5
Output: -1

**Constraints:**
→ 1 ≤ arr.length ≤ 10⁵
→ -10⁹ ≤ arr[i], target ≤ 10⁹`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    int linearSearch(vector<int>& arr, int target) {\n        \n    }\n};`,
                python: `class Solution:\n    def linearSearch(self, arr, target):\n        `,
                javascript: `class Solution {\n    linearSearch(arr, target) {\n        \n    }\n}`
            },
            driverCode: {
                cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\n// --- USER CODE ---\n\nint main() {\n    int n; if(!(cin >> n)) return 0;\n    vector<int> arr(n); for(int i=0; i<n; i++) cin >> arr[i];\n    int target; cin >> target;\n    Solution sol;\n    cout << sol.linearSearch(arr, target) << endl;\n    return 0;\n}`,
                py: `import sys\n\n# --- USER CODE ---\n\nif __name__ == "__main__":\n    input_data = sys.stdin.read().split()\n    if not input_data: exit()\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:n+1]]\n    target = int(input_data[n+1])\n    sol = Solution()\n    print(sol.linearSearch(arr, target))`,
                js: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nif (!input[0]) process.exit(0);\n\n// --- USER CODE ---\n\nconst n = parseInt(input[0]);\nconst arr = input.slice(1, n + 1).map(Number);\nconst target = parseInt(input[n+1]);\nconst sol = new Solution();\nconsole.log(sol.linearSearch(arr, target));`
            },
            hints: [
                'Check each element sequentially',
                'Return index when element matches target',
                'Return -1 if loop completes without finding'
            ],
            solution: {
                approach: 'Linear search - check each element until target is found',
                code: `class Solution {\npublic:\n    int linearSearch(vector<int>& arr, int target) {\n        for (int i = 0; i < arr.size(); i++) {\n            if (arr[i] == target)\n                return i;\n        }\n        return -1;\n    }\n};`,
                explanation: 'Iterate through array checking each element. Return index when found, -1 if not found. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: 'arr=[4, 2, 7, 1, 9], target=7', expectedOutput: '2' },
                { input: 'arr=[1, 2, 3], target=5', expectedOutput: '-1' },
                { input: 'arr=[10], target=10', expectedOutput: '0' }
            ],
            tags: ['array', 'search', 'linear-search'],
            companies: ['Google', 'Microsoft']
        },
        {
            title: 'Count Even and Odd Numbers',
            description: `Count how many even and odd numbers are in the array.
            
**Example 1:**
Input: arr = [1, 2, 3, 4, 5, 6]
Output: Even: 3, Odd: 3

**Example 2:**
Input: arr = [2, 4, 6, 8]
Output: Even: 4, Odd: 0

**Constraints:**
→ 1 ≤ arr.length ≤ 10⁵
→ 0 ≤ arr[i] ≤ 10⁹`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    pair<int, int> countEvenOdd(vector<int>& arr) {\n        \n    }\n};`,
                python: `class Solution:\n    def countEvenOdd(self, arr):\n        `,
                javascript: `class Solution {\n    countEvenOdd(arr) {\n        \n    }\n}`
            },
            driverCode: {
                cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\n// --- USER CODE ---\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n);\n    for(int i=0; i<n; i++) cin >> arr[i];\n    Solution sol;\n    pair<int, int> res = sol.countEvenOdd(arr);\n    cout << "Even: " << res.first << ", Odd: " << res.second << endl;\n    return 0;\n}`,
                py: `import sys\n\n# --- USER CODE ---\n\nif __name__ == "__main__":\n    data = sys.stdin.read().split()\n    if not data: exit()\n    n = int(data[0])\n    arr = [int(x) for x in data[1:n+1]]\n    sol = Solution()\n    even, odd = sol.countEvenOdd(arr)\n    print(f"Even: {even}, Odd: {odd}")`,
                js: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nif (!input[0]) process.exit(0);\n\n// --- USER CODE ---\n\nconst n = parseInt(input[0]);\nconst arr = input.slice(1, n + 1).map(Number);\nconst sol = new Solution();\nconst res = sol.countEvenOdd(arr);\nconsole.log(\`Even: \${res.even}, Odd: \${res.odd}\`);`
            },
            hints: [
                'Use modulo operator (%) to check if number is even',
                'Maintain two counters',
                'Increment appropriate counter for each element'
            ],
            solution: {
                approach: 'Iterate through array and check each number using modulo operator',
                code: `class Solution {\npublic:\n    pair<int, int> countEvenOdd(vector<int>& arr) {\n        int even = 0, odd = 0;\n        for(int x : arr) {\n            if(x % 2 == 0) even++;\n            else odd++;\n        }\n        return {even, odd};\n    }\n};`,
                explanation: 'Use modulo operator to check if number is divisible by 2. Maintain separate counters. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: '[1, 2, 3, 4, 5, 6]', expectedOutput: 'Even: 3, Odd: 3' },
                { input: '[2, 4, 6, 8]', expectedOutput: 'Even: 4, Odd: 0' },
                { input: '[1, 3, 5]', expectedOutput: 'Even: 0, Odd: 3' }
            ],
            tags: ['array', 'counting', 'basics'],
            companies: ['Amazon']
        },
        {
            title: 'Sum of Array Elements',
            description: `Calculate the sum of all elements in the array.
            
**Example 1:**
Input: arr = [1, 2, 3, 4, 5]
Output: 15

**Example 2:**
Input: arr = [-1, -2, -3]
Output: -6

**Constraints:**
→ 1 ≤ arr.length ≤ 10⁵
→ -10⁹ ≤ arr[i] ≤ 10⁹`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    long long arraySum(vector<int>& arr) {\n        \n    }\n};`,
                python: `class Solution:\n    def arraySum(self, arr):\n        `,
                javascript: `class Solution {\n    arraySum(arr) {\n        \n    }\n}`
            },
            driverCode: {
                ...LeetCodeUtils.cppVectorDriver('Solution', 'arraySum'),
                ...LeetCodeUtils.pythonVectorDriver('arraySum'),
                ...LeetCodeUtils.jsVectorDriver('arraySum')
            },
            hints: [
                'Initialize sum to 0',
                'Add each element to sum',
                'Return final sum'
            ],
            solution: {
                approach: 'Iterate through array and accumulate sum',
                code: `class Solution {\npublic:\n    long long arraySum(vector<int>& arr) {\n        long long sum = 0;\n        for(int x : arr) sum += x;\n        return sum;\n    }\n};`,
                explanation: 'Initialize sum to 0 and add each element. Use long long to avoid overflow. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: '[1, 2, 3, 4, 5]', expectedOutput: '15' },
                { input: '[-1, -2, -3]', expectedOutput: '-6' },
                { input: '[100]', expectedOutput: '100' }
            ],
            tags: ['array', 'sum', 'basics'],
            companies: ['Google', 'Amazon']
        }
    ],

    'Two Pointers': [
        {
            title: 'Two Sum - Sorted Array',
            description: `Given a sorted array and a target, find two numbers that add up to target.
            
**Example 1:**
Input: arr = [1, 2, 3, 4, 6], target = 6
Output: [1, 3] (indices where arr[1] + arr[3] = 2 + 4 = 6)

**Example 2:**
Input: arr = [2, 7, 11, 15], target = 9
Output: [0, 1]

**Constraints:**
→ Array is sorted in ascending order
→ Exactly one solution exists
→ 2 ≤ arr.length ≤ 10⁴`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& arr, int target) {\n        \n    }\n};`,
                python: `class Solution:\n    def twoSum(self, arr: List[int], target: int) -> List[int]:\n        `,
                javascript: `class Solution {\n    twoSum(arr, target) {\n        \n    }\n}`
            },
            driverCode: {
                cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\n// --- USER CODE ---\n\nint main() {\n    int n; if(!(cin >> n)) return 0;\n    vector<int> arr(n); for(int i=0; i<n; i++) cin >> arr[i];\n    int target; cin >> target;\n    Solution sol;\n    vector<int> res = sol.twoSum(arr, target);\n    cout << "[" << res[0] << ", " << res[1] << "]" << endl;\n    return 0;\n}`,
                py: `import sys\nfrom typing import List\n\n# --- USER CODE ---\n\nif __name__ == "__main__":\n    data = sys.stdin.read().split()\n    if not data: exit()\n    n = int(data[0])\n    arr = [int(x) for x in data[1:n+1]]\n    target = int(data[n+1])\n    sol = Solution()\n    res = sol.twoSum(arr, target)\n    print(f"[{res[0]}, {res[1]}]")`,
                js: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nif (!input[0]) process.exit(0);\n\n// --- USER CODE ---\n\nconst n = parseInt(input[0]);\nconst arr = input.slice(1, n + 1).map(Number);\nconst target = parseInt(input[n+1]);\nconst sol = new Solution();\nconst res = sol.twoSum(arr, target);\nconsole.log(\`[\${res[0]}, \${res[1]}]\`);`
            },
            hints: [
                'Use two pointers from both ends',
                'If sum is too small, move left pointer right',
                'If sum is too large, move right pointer left'
            ],
            solution: {
                approach: 'Two pointers from opposite ends, adjust based on sum comparison',
                code: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& arr, int target) {\n        int left = 0, right = arr.size() - 1;\n        while (left < right) {\n            int sum = arr[left] + arr[right];\n            if (sum == target) return {left, right};\n            if (sum < target) left++;\n            else right--;\n        }\n        return {-1, -1};\n    }\n};`,
                explanation: 'Use two pointers from both ends. If sum equals target, return indices. If sum is less, move left pointer right for larger value. If sum is more, move right pointer left for smaller value. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: 'arr=[1,2,3,4,6], target=6', expectedOutput: '[1, 3]' },
                { input: 'arr=[2,7,11,15], target=9', expectedOutput: '[0, 1]' },
                { input: 'arr=[1,3,5,7], target=10', expectedOutput: '[1, 3]' }
            ],
            tags: ['array', 'two-pointers', 'sorted'],
            companies: ['Amazon', 'Facebook', 'Google']
        },
        {
            title: 'Remove Duplicates from Sorted Array',
            description: `Remove duplicates in-place from sorted array. Return new length.
            
**Example 1:**
Input: arr = [1, 1, 2, 2, 3]
Output: 3, arr = [1, 2, 3, _, _]

**Example 2:**
Input: arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: 5, arr = [0, 1, 2, 3, 4, _, _, _, _, _]

**Constraints:**
→ Array is sorted
→ Modify array in-place
→ 1 ≤ arr.length ≤ 3 × 10⁴`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    int removeDuplicates(vector<int>& arr) {\n        \n    }\n};`,
                python: `class Solution:\n    def removeDuplicates(self, arr):\n        `,
                javascript: `class Solution {\n    removeDuplicates(arr) {\n        \n    }\n}`
            },
            driverCode: {
                ...LeetCodeUtils.cppVectorDriver('Solution', 'removeDuplicates'),
                ...LeetCodeUtils.pythonVectorDriver('removeDuplicates'),
                ...LeetCodeUtils.jsVectorDriver('removeDuplicates')
            },
            hints: [
                'Use slow pointer for unique elements position',
                'Use fast pointer to scan array',
                'Copy unique elements to slow pointer position'
            ],
            solution: {
                approach: 'Fast and slow pointers - slow tracks unique position, fast scans array',
                code: `class Solution {\npublic:\n    int removeDuplicates(vector<int>& arr) {\n        if (arr.empty()) return 0;\n        int slow = 0;\n        for (int fast = 1; fast < arr.size(); fast++) {\n            if (arr[fast] != arr[slow]) {\n                arr[++slow] = arr[fast];\n            }\n        }\n        return slow + 1;\n    }\n};`,
                explanation: 'Slow pointer marks position for next unique element. Fast pointer scans array. When different element found, increment slow and copy element. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: '[1, 1, 2, 2, 3]', expectedOutput: '3' },
                { input: '[0, 0, 1, 1, 1, 2]', expectedOutput: '3' },
                { input: '[1, 2, 3]', expectedOutput: '3' }
            ],
            tags: ['array', 'two-pointers', 'in-place'],
            companies: ['Microsoft', 'Amazon', 'Google']
        },
        {
            title: 'Move Zeros to End',
            description: `Move all zeros to the end while maintaining relative order of non-zero elements.
            
**Example 1:**
Input: arr = [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]

**Example 2:**
Input: arr = [0, 0, 1]
Output: [1, 0, 0]

**Constraints:**
→ Modify in-place
→ Maintain relative order
→ 1 ≤ arr.length ≤ 10⁴`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        \n    }\n};`,
                python: `class Solution:\n    def moveZeroes(self, nums):\n        `,
                javascript: `class Solution {\n    moveZeroes(nums) {\n        \n    }\n}`
            },
            driverCode: {
                ...LeetCodeUtils.cppVectorDriver('Solution', 'moveZeroes', 'void'),
                ...LeetCodeUtils.pythonVectorDriver('moveZeroes', 'void'),
                ...LeetCodeUtils.jsVectorDriver('moveZeroes', 'void')
            },
            hints: [
                'Use slow pointer for non-zero position',
                'Swap non-zero elements to front',
                'All zeros automatically move to end'
            ],
            solution: {
                approach: 'Two pointers - slow for non-zero position, fast to scan',
                code: `class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int slow = 0;\n        for (int fast = 0; fast < nums.size(); fast++) {\n            if (nums[fast] != 0) {\n                swap(nums[slow++], nums[fast]);\n            }\n        }\n    }\n};`,
                explanation: 'Slow pointer tracks position for next non-zero element. When non-zero found, swap with slow position and increment slow. This moves all non-zeros to front, zeros to end. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: '[0, 1, 0, 3, 12]', expectedOutput: '1 3 12 0 0' },
                { input: '[0, 0, 1]', expectedOutput: '1 0 0' },
                { input: '[1, 2, 3]', expectedOutput: '1 2 3' }
            ],
            tags: ['array', 'two-pointers', 'in-place'],
            companies: ['Facebook', 'Amazon', 'Apple']
        },
        {
            title: 'Valid Palindrome',
            description: `Check if string is a palindrome, considering only alphanumeric characters and ignoring case.
            
**Example 1:**
Input: s = "A man, a plan, a canal: Panama"
Output: true

**Example 2:**
Input: s = "race a car"
Output: false

**Constraints:**
→ 1 ≤ s.length ≤ 2 × 10⁵
→ Consider only alphanumeric characters
→ Ignore case`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};`,
                python: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        `,
                javascript: `class Solution {\n    isPalindrome(s) {\n        \n    }\n}`
            },
            driverCode: {
                cpp: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\n// --- USER CODE ---\n\nint main() {\n    string s;\n    getline(cin, s);\n    // Remove quotes if present at ends\n    if (s.length() >= 2 && s[0] == '"' && s[s.length()-1] == '"') {\n        s = s.substr(1, s.length()-2);\n    }\n    Solution sol;\n    cout << (sol.isPalindrome(s) ? "true" : "false") << endl;\n    return 0;\n}`,
                py: `import sys\n\n# --- USER CODE ---\n\nif __name__ == "__main__":\n    s = sys.stdin.read().strip()\n    if s.startswith('"') and s.endswith('"'): s = s[1:-1]\n    sol = Solution()\n    print("true" if sol.isPalindrome(s) else "false")`,
                js: `const fs = require('fs');\nlet s = fs.readFileSync(0, 'utf8').trim();\nif (s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1);\n\n// --- USER CODE ---\n\nconst sol = new Solution();\nconsole.log(sol.isPalindrome(s) ? "true" : "false");`
            },
            hints: [
                'Use two pointers from both ends',
                'Skip non-alphanumeric characters',
                'Compare characters in lowercase'
            ],
            solution: {
                approach: 'Two pointers from opposite ends, skip non-alphanumeric, compare lowercase',
                code: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        int left = 0, right = s.length() - 1;\n        while (left < right) {\n            while (left < right && !isalnum(s[left])) left++;\n            while (left < right && !isalnum(s[right])) right--;\n            if (tolower(s[left++]) != tolower(s[right--])) return false;\n        }\n        return true;\n    }\n};`,
                explanation: 'Use two pointers from both ends. Skip non-alphanumeric characters. Compare characters in lowercase. If any mismatch, return false. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' },
                { input: '"race a car"', expectedOutput: 'false' },
                { input: '" "', expectedOutput: 'true' }
            ],
            tags: ['string', 'two-pointers', 'palindrome'],
            companies: ['Facebook', 'Amazon', 'Microsoft']
        },
        {
            title: 'Container With Most Water',
            description: `Find two lines that together with x-axis form container with maximum water.
            
**Example 1:**
Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49

**Example 2:**
Input: height = [1, 1]
Output: 1

**Constraints:**
→ n == height.length
→ 2 ≤ n ≤ 10⁵
→ 0 ≤ height[i] ≤ 10⁴`,
            difficulty: 'MEDIUM',
            starterCode: {
                cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};`,
                python: `class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        `,
                javascript: `class Solution {\n    maxArea(height) {\n        \n    }\n}`
            },
            driverCode: {
                ...LeetCodeUtils.cppVectorDriver('Solution', 'maxArea'),
                ...LeetCodeUtils.pythonVectorDriver('maxArea'),
                ...LeetCodeUtils.jsVectorDriver('maxArea')
            },
            hints: [
                'Area = width × min(height[left], height[right])',
                'Start with maximum width (both ends)',
                'Move pointer with smaller height inward'
            ],
            solution: {
                approach: 'Two pointers from ends, move pointer with smaller height to potentially find larger area',
                code: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int left = 0, right = height.size() - 1;\n        int maxWater = 0;\n        while (left < right) {\n            int w = right - left;\n            int h = min(height[left], height[right]);\n            maxWater = max(maxWater, w * h);\n            if (height[left] < height[right]) left++;\n            else right--;\n        }\n        return maxWater;\n    }\n};`,
                explanation: 'Start with maximum width. Calculate area = width × min(heights). Move pointer with smaller height inward (only way to potentially get larger area). Track maximum. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: '[1, 8, 6, 2, 5, 4, 8, 3, 7]', expectedOutput: '49' },
                { input: '[1, 1]', expectedOutput: '1' },
                { input: '[4, 3, 2, 1, 4]', expectedOutput: '16' }
            ],
            tags: ['array', 'two-pointers', 'greedy'],
            companies: ['Amazon', 'Facebook', 'Google']
        }
    ],

    'Sliding Window': [
        {
            title: 'Maximum Sum Subarray of Size K',
            description: `Find the maximum sum of any contiguous subarray of size k.
            
**Example 1:**
Input: arr = [2, 1, 5, 1, 3, 2], k = 3
Output: 9

**Example 2:**
Input: arr = [2, 3, 4, 1, 5], k = 2
Output: 7

**Constraints:**
→ 1 ≤ arr.length ≤ 10⁵
→ 1 ≤ k ≤ arr.length`,
            difficulty: 'EASY',
            starterCode: {
                cpp: `class Solution {\npublic:\n    int maxSumSubarray(vector<int>& arr, int k) {\n        \n    }\n};`,
                python: `class Solution:\n    def maxSumSubarray(self, arr, k):\n        `,
                javascript: `class Solution {\n    maxSumSubarray(arr, k) {\n        \n    }\n}`
            },
            driverCode: {
                cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// --- USER CODE ---\n\nint main() {\n    int n; cin >> n;\n    vector<int> arr(n); for(int i=0; i<n; i++) cin >> arr[i];\n    int k; cin >> k;\n    Solution sol;\n    cout << sol.maxSumSubarray(arr, k) << endl;\n    return 0;\n}`,
                py: `import sys\n\n# --- USER CODE ---\n\nif __name__ == "__main__":\n    data = sys.stdin.read().split()\n    if not data: exit()\n    n = int(data[0])\n    arr = [int(x) for x in data[1:n+1]]\n    k = int(data[n+1])\n    sol = Solution()\n    print(sol.maxSumSubarray(arr, k))`,
                js: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nif (!input[0]) process.exit(0);\n\n// --- USER CODE ---\n\nconst n = parseInt(input[0]);\nconst arr = input.slice(1, n + 1).map(Number);\nconst k = parseInt(input[n+1]);\nconst sol = new Solution();\nconsole.log(sol.maxSumSubarray(arr, k));`
            },
            hints: [
                'Calculate the sum of the first k elements',
                'Slide the window by adding the next element and removing the first element of the previous window',
                'Keep track of the maximum sum seen so far'
            ],
            solution: {
                approach: 'Sliding window - maintain sum of k elements, slide by one at each step',
                code: `class Solution {\npublic:\n    int maxSumSubarray(vector<int>& arr, int k) {\n        int windowSum = 0, maxSum = 0;\n        for (int i = 0; i < k; i++) windowSum += arr[i];\n        maxSum = windowSum;\n        for (int i = k; i < arr.size(); i++) {\n            windowSum += arr[i] - arr[i-k];\n            maxSum = max(maxSum, windowSum);\n        }\n        return maxSum;\n    }\n};`,
                explanation: 'Calculate first window sum. Then for each new element, add it and subtract the element that is no longer in the window. Time: O(n), Space: O(1)'
            },
            testCases: [
                { input: 'arr=[2, 1, 5, 1, 3, 2], k=3', expectedOutput: '9' },
                { input: 'arr=[2, 3, 4, 1, 5], k=2', expectedOutput: '7' }
            ],
            tags: ['array', 'sliding-window'],
            companies: ['Amazon', 'Google']
        }
    ]
};

async function seedCompleteContent() {
    try {
        await connectDB();
        console.log('\n🚀 Starting COMPLETE content and questions seeding...\n');

        let contentUpdated = 0;
        let questionsCreated = 0;

        // Seed content for all subtopics
        for (const [title, content] of Object.entries(completeSubtopicContent)) {
            const subtopic = await Topic.findOne({
                title: { $regex: new RegExp(`^${title}$`, 'i') },
                isMainCategory: false
            });

            if (subtopic) {
                subtopic.content = content.content;
                subtopic.notes = content.notes;
                subtopic.examples = content.examples || [];
                subtopic.timeComplexity = content.timeComplexity;
                subtopic.spaceComplexity = content.spaceComplexity;
                await subtopic.save();
                contentUpdated++;
                console.log(`✅ Updated content: "${title}"`);
            }
        }

        // Seed questions for each subtopic
        for (const [subtopicTitle, questions] of Object.entries(subtopicQuestions)) {
            const subtopic = await Topic.findOne({
                title: { $regex: new RegExp(`^${subtopicTitle}$`, 'i') },
                isMainCategory: false
            });

            if (subtopic) {
                // Delete existing questions for this subtopic
                await Question.deleteMany({ topic: subtopic._id });

                // Create new questions
                for (const questionData of questions) {
                    await Question.create({
                        ...questionData,
                        topic: subtopic._id
                    });
                    questionsCreated++;
                }

                // Update question count
                subtopic.questionCount = questions.length;
                await subtopic.save();

                console.log(`📝 Added ${questions.length} questions to "${subtopicTitle}"`);
            }
        }

        console.log(`\n✨ Complete seeding finished!`);
        console.log(`   📚 Content updated: ${contentUpdated} subtopics`);
        console.log(`   ❓ Questions created: ${questionsCreated} questions\n`);

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
}

// Auto-run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    seedCompleteContent()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

export default seedCompleteContent;
