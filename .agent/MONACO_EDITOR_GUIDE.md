# 🖥️ Monaco Editor + Code Execution - Complete Guide

## 📋 **Overview**

### **What is Monaco Editor?**
Monaco Editor is the **same code editor that powers VS Code**. It provides:
- ✅ Syntax highlighting for 50+ languages
- ✅ IntelliSense (auto-completion)
- ✅ Error detection
- ✅ Multiple themes (VS Dark, Light, High Contrast)
- ✅ Keyboard shortcuts (Ctrl+S, Ctrl+Z, etc.)
- ✅ Line numbers, minimap, bracket matching

### **What is Judge0?**
Judge0 is a **code execution API** that:
- ✅ Runs code in 60+ programming languages
- ✅ Executes code in isolated sandboxes (secure)
- ✅ Returns output, errors, execution time, memory usage
- ✅ Supports custom test cases
- ✅ Has free tier (50 requests/day) and paid plans

---

## 🔄 **How They Work Together**

```
┌─────────────────────────────────────────────────────────────┐
│                    USER WORKFLOW                             │
└─────────────────────────────────────────────────────────────┘

1. User writes code in Monaco Editor
   ↓
2. User clicks "Run Code" button
   ↓
3. Frontend sends code + language + input to YOUR backend
   ↓
4. YOUR backend sends request to Judge0 API
   ↓
5. Judge0 executes code in sandbox
   ↓
6. Judge0 returns: output, errors, time, memory
   ↓
7. YOUR backend processes and sends to frontend
   ↓
8. Frontend displays results below Monaco Editor
```

---

## 🏗️ **Architecture**

### **Component Structure:**

```
QuestionDetail.jsx (Page)
├── ProblemDescription (Left Panel)
│   ├── Title, Difficulty, Tags
│   ├── Problem Statement
│   ├── Examples
│   └── Constraints
│
└── CodeEditor (Right Panel)
    ├── Monaco Editor Component
    │   ├── Language Selector
    │   ├── Theme Toggle
    │   └── Code Input Area
    │
    ├── Control Panel
    │   ├── Run Code Button
    │   ├── Submit Button
    │   └── Reset Button
    │
    └── Results Panel
        ├── Test Cases Tabs
        ├── Output Display
        ├── Error Display
        └── Performance Metrics
```

---

## 💻 **Implementation Details**

### **Frontend (React + Monaco Editor)**

```javascript
// Component: CodeEditor.jsx
import Editor from '@monaco-editor/react';

const CodeEditor = ({ question }) => {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRunCode = async () => {
    setLoading(true);
    try {
      const response = await api.post('/code/execute', {
        code,
        language,
        input: testCases[0].input
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="code-editor">
      {/* Monaco Editor */}
      <Editor
        height="500px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={setCode}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
      
      {/* Controls */}
      <button onClick={handleRunCode}>Run Code</button>
      
      {/* Output */}
      <div className="output">
        {loading ? 'Running...' : output}
      </div>
    </div>
  );
};
```

### **Backend (Node.js + Judge0 API)**

```javascript
// API Route: server/api/code-execution.js
import axios from 'axios';

const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export const executeCode = async (req, res) => {
  const { code, language, input } = req.body;
  
  // Language ID mapping for Judge0
  const languageIds = {
    'javascript': 63,  // Node.js
    'python': 71,      // Python 3
    'java': 62,        // Java
    'cpp': 54,         // C++
    'c': 50            // C
  };

  try {
    // Step 1: Submit code to Judge0
    const submission = await axios.post(
      `${JUDGE0_API}/submissions`,
      {
        source_code: code,
        language_id: languageIds[language],
        stdin: input,
        expected_output: null
      },
      {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    const token = submission.data.token;

    // Step 2: Poll for result (Judge0 is async)
    let result;
    let attempts = 0;
    while (attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await axios.get(
        `${JUDGE0_API}/submissions/${token}`,
        {
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        }
      );

      result = response.data;
      
      if (result.status.id > 2) break; // Completed
      attempts++;
    }

    // Step 3: Return formatted result
    res.json({
      success: true,
      output: result.stdout || result.stderr || 'No output',
      error: result.stderr,
      executionTime: result.time,
      memory: result.memory,
      status: result.status.description
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

---

## 🎯 **Features You Can Implement**

### **1. Basic Code Execution**
```javascript
// User writes code → Click Run → See output
Input: console.log("Hello World");
Output: Hello World
```

### **2. Test Cases Validation**
```javascript
// Run against multiple test cases
Test Case 1: Input: [1,2,3], Expected: 6, Got: 6 ✅
Test Case 2: Input: [4,5,6], Expected: 15, Got: 15 ✅
Test Case 3: Input: [], Expected: 0, Got: 0 ✅
```

### **3. Performance Metrics**
```javascript
// Show execution stats
Execution Time: 0.023s
Memory Used: 12.5 MB
Status: Accepted
```

### **4. Multiple Languages**
```javascript
// Support different languages
Languages: JavaScript, Python, Java, C++, C
// Each with proper syntax highlighting
```

### **5. Code Templates**
```javascript
// Provide starter code for each language
JavaScript Template:
function solution(arr) {
    // Write your code here
    return result;
}

Python Template:
def solution(arr):
    # Write your code here
    return result
```

---

## 🔐 **Judge0 Setup Options**

### **Option 1: RapidAPI (Recommended for Start)**
**Pros:**
- ✅ Easy setup (just API key)
- ✅ Free tier: 50 requests/day
- ✅ Managed infrastructure
- ✅ No server maintenance

**Cons:**
- ❌ Limited free requests
- ❌ Costs money at scale

**Setup:**
1. Go to https://rapidapi.com/judge0-official/api/judge0-ce
2. Subscribe to free plan
3. Get API key
4. Add to `.env`: `RAPIDAPI_KEY=your_key_here`

**Pricing:**
- Free: 50 requests/day
- Basic: $10/month - 1000 requests/day
- Pro: $50/month - 10,000 requests/day

---

### **Option 2: Self-Hosted Judge0 (For Production)**
**Pros:**
- ✅ Unlimited requests
- ✅ Full control
- ✅ No per-request costs
- ✅ Better for scaling

**Cons:**
- ❌ Requires server setup
- ❌ Maintenance needed
- ❌ Infrastructure costs

**Setup:**
```bash
# Using Docker
git clone https://github.com/judge0/judge0.git
cd judge0
docker-compose up -d
```

**Your API endpoint:** `http://localhost:2358`

---

### **Option 3: Alternative APIs**

#### **Piston API (Free Alternative)**
```javascript
// Free, unlimited, open-source
const PISTON_API = 'https://emkc.org/api/v2/piston';

const response = await axios.post(`${PISTON_API}/execute`, {
  language: 'javascript',
  version: '18.15.0',
  files: [{
    content: code
  }],
  stdin: input
});
```

**Pros:**
- ✅ Completely free
- ✅ No API key needed
- ✅ Good for development

**Cons:**
- ❌ Rate limited
- ❌ Less reliable for production

---

## 📦 **Installation Steps**

### **1. Install Dependencies**
```bash
# Frontend
cd client
npm install @monaco-editor/react

# Backend
cd server
npm install axios
```

### **2. Environment Variables**
```env
# .env
RAPIDAPI_KEY=your_rapidapi_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

### **3. Create API Route**
```javascript
// server/api/code-execution.js
// (Code provided above)
```

### **4. Add to Express**
```javascript
// server/api/index.js
import { executeCode } from './code-execution.js';

app.post('/api/code/execute', executeCode);
```

### **5. Create Frontend Component**
```javascript
// client/src/components/CodeEditor.jsx
// (Code provided above)
```

---

## 🎨 **UI Layout Example**

```
┌─────────────────────────────────────────────────────────────┐
│  Problem: Two Sum                          [Easy] [Array]    │
├──────────────────────┬──────────────────────────────────────┤
│                      │  Language: [JavaScript ▼]  Theme: 🌙 │
│  Problem Description │                                       │
│  ──────────────────  │  ┌──────────────────────────────────┐│
│                      │  │ 1  function twoSum(nums, target) {││
│  Given an array...   │  │ 2    // Your code here           ││
│                      │  │ 3    return [];                  ││
│  Example 1:          │  │ 4  }                             ││
│  Input: [2,7,11,15]  │  │ 5                                ││
│  Output: [0,1]       │  │ 6                                ││
│                      │  └──────────────────────────────────┘│
│  Constraints:        │                                       │
│  • 2 <= nums.length  │  [Run Code] [Submit] [Reset]         │
│                      │                                       │
│                      │  ┌──────────────────────────────────┐│
│                      │  │ Output:                          ││
│                      │  │ [0, 1]                           ││
│                      │  │                                  ││
│                      │  │ ✅ Test Case 1: Passed           ││
│                      │  │ ✅ Test Case 2: Passed           ││
│                      │  │                                  ││
│                      │  │ Time: 0.023s | Memory: 12.5 MB  ││
│                      │  └──────────────────────────────────┘│
└──────────────────────┴──────────────────────────────────────┘
```

---

## 🚀 **Advanced Features**

### **1. Code Submission History**
```javascript
// Save each submission
{
  userId: "user123",
  questionId: "q456",
  code: "function twoSum...",
  language: "javascript",
  status: "Accepted",
  executionTime: 0.023,
  submittedAt: "2025-01-15T10:30:00Z"
}
```

### **2. Code Comparison**
```javascript
// Compare user's code with optimal solution
Your Solution: O(n²) - 45ms
Optimal Solution: O(n) - 12ms
Improvement: 73% faster
```

### **3. Real-time Collaboration**
```javascript
// Using Socket.io for pair programming
socket.on('code-change', (newCode) => {
  setCode(newCode);
});
```

### **4. Code Snippets Library**
```javascript
// Save frequently used code
Snippets:
- Two Pointers Template
- Binary Search Template
- DFS Template
```

---

## 📊 **Performance Considerations**

### **Caching Strategy**
```javascript
// Cache results for same code + input
const cacheKey = `${hash(code)}_${language}_${hash(input)}`;
const cached = await redis.get(cacheKey);
if (cached) return cached;
```

### **Rate Limiting**
```javascript
// Limit requests per user
const limit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per 15 minutes
});

app.use('/api/code/execute', limit);
```

### **Queue System**
```javascript
// For high traffic, use queue
import Bull from 'bull';

const codeQueue = new Bull('code-execution');

codeQueue.process(async (job) => {
  return await executeCode(job.data);
});
```

---

## 🔒 **Security Best Practices**

1. **Never execute code directly on your server**
   - Always use Judge0 or similar sandboxed environment

2. **Validate input**
   ```javascript
   if (code.length > 10000) {
     throw new Error('Code too long');
   }
   ```

3. **Set execution limits**
   ```javascript
   {
     cpu_time_limit: 2, // 2 seconds max
     memory_limit: 128000, // 128 MB max
   }
   ```

4. **Sanitize output**
   ```javascript
   const sanitizedOutput = output.replace(/<script>/g, '');
   ```

---

## 📝 **Example: Complete Flow**

### **User Journey:**

1. **User opens problem page**
   - Sees problem description on left
   - Monaco Editor on right with template code

2. **User writes solution**
   ```javascript
   function twoSum(nums, target) {
     const map = new Map();
     for (let i = 0; i < nums.length; i++) {
       const complement = target - nums[i];
       if (map.has(complement)) {
         return [map.get(complement), i];
       }
       map.set(nums[i], i);
     }
     return [];
   }
   ```

3. **User clicks "Run Code"**
   - Frontend sends to backend
   - Backend sends to Judge0
   - Judge0 executes in sandbox
   - Results returned

4. **User sees results**
   ```
   Test Case 1: ✅ Passed
   Input: [2,7,11,15], target: 9
   Expected: [0,1]
   Got: [0,1]
   
   Test Case 2: ✅ Passed
   Input: [3,2,4], target: 6
   Expected: [1,2]
   Got: [1,2]
   
   Execution Time: 0.023s
   Memory: 12.5 MB
   Status: Accepted
   ```

5. **User clicks "Submit"**
   - All test cases run (including hidden ones)
   - Solution saved to database
   - Points awarded
   - Badge unlocked (if applicable)

---

## 💰 **Cost Estimation**

### **RapidAPI Judge0:**
- **Development:** Free tier (50 req/day) = $0
- **Small scale (100 users/day):** Basic plan = $10/month
- **Medium scale (1000 users/day):** Pro plan = $50/month
- **Large scale (10000+ users/day):** Self-host = $50-100/month (server costs)

### **Recommendation:**
- Start with **RapidAPI free tier** for development
- Move to **Basic plan** for initial launch
- **Self-host** when you reach 1000+ daily active users

---

## 🎯 **Next Steps**

1. ✅ Get RapidAPI Judge0 API key
2. ✅ Install Monaco Editor
3. ✅ Create CodeEditor component
4. ✅ Implement backend API route
5. ✅ Test with sample problems
6. ✅ Add test case validation
7. ✅ Implement submission history
8. ✅ Add performance metrics

---

**Ready to implement? I can create the complete working code for you!** 🚀
