# 🚀 Monaco Editor Setup - Quick Start Guide

## ✅ What's Been Done

### **1. Files Created:**
- ✅ `client/src/components/CodeEditor.jsx` - Monaco Editor component
- ✅ `client/src/components/CodeEditor.css` - Styling
- ✅ `server/api/code-execution.js` - Backend API (Piston - FREE)
- ✅ Updated `server/api/index.js` - Added route

### **2. Features Included:**
- ✅ **5 Programming Languages**: JavaScript, Python, Java, C++, C
- ✅ **Monaco Editor**: Same editor as VS Code
- ✅ **Code Execution**: Using Piston API (completely free)
- ✅ **Test Cases**: Run against multiple test cases
- ✅ **Submit Solution**: Auto-save progress when all tests pass
- ✅ **Custom Input**: Test with your own inputs
- ✅ **Syntax Highlighting**: Beautiful code display
- ✅ **Dark/Light Theme**: Follows your app theme
- ✅ **Keyboard Shortcuts**: Ctrl+Enter to run code

---

## 📦 Installation

### **Step 1: Install Monaco Editor**
```bash
cd client
npm install @monaco-editor/react
```

### **Step 2: No Backend Setup Needed!**
✅ Piston API is **completely free** and requires **no API key**
✅ Works immediately out of the box
✅ No environment variables needed

---

## 🎯 How to Use

### **Option 1: Add to Existing Question Page**

Update `client/src/pages/QuestionDetail.jsx`:

```javascript
import CodeEditor from '../components/CodeEditor';

// Inside your component
<div className="question-layout">
    {/* Left side - Problem description */}
    <div className="problem-section">
        <h1>{question.title}</h1>
        <p>{question.description}</p>
        {/* ... rest of problem details */}
    </div>

    {/* Right side - Code editor */}
    <div className="editor-section">
        <CodeEditor 
            question={question}
            onSubmit={(result) => {
                console.log('Submission result:', result);
                // Handle successful submission
            }}
        />
    </div>
</div>
```

### **Option 2: Standalone Code Playground**

Create `client/src/pages/CodePlayground.jsx`:

```javascript
import CodeEditor from '../components/CodeEditor';

const CodePlayground = () => {
    return (
        <div className="container">
            <h1>Code Playground</h1>
            <p>Write and test your code in multiple languages</p>
            <CodeEditor />
        </div>
    );
};

export default CodePlayground;
```

---

## 🎨 Styling (Already Done!)

The CSS file is already created with:
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Smooth animations
- ✅ Beautiful test result display
- ✅ Mobile-friendly

---

## 🧪 Testing

### **Test the Code Editor:**

1. **Start your servers** (already running):
   ```bash
   # Client (already running)
   cd client && npm run dev

   # Server (already running)
   cd server && npm run dev
   ```

2. **Navigate to a question page** or create a test page

3. **Try this code**:
   ```javascript
   // JavaScript
   function solution(input) {
       console.log("Hello from Monaco Editor!");
       return input * 2;
   }
   console.log(solution(5));
   ```

4. **Click "Run Code"** - Should output: `Hello from Monaco Editor!` and `10`

---

## 📋 API Endpoints

### **1. Execute Code**
```javascript
POST /api/code/execute
Body: {
    code: "console.log('Hello')",
    language: "javascript",
    input: ""
}
```

### **2. Run Tests**
```javascript
POST /api/code/test
Body: {
    code: "...",
    language: "javascript",
    testCases: [
        { input: "5", output: "10" }
    ]
}
```

### **3. Submit Solution**
```javascript
POST /api/code/submit
Body: {
    code: "...",
    language: "javascript",
    questionId: "..."
}
```

---

## 🎯 Supported Languages

| Language   | Version  | File Extension |
|------------|----------|----------------|
| JavaScript | 18.15.0  | .js            |
| Python     | 3.10.0   | .py            |
| Java       | 15.0.2   | .java          |
| C++        | 10.2.0   | .cpp           |
| C          | 10.2.0   | .c             |

---

## 💡 Usage Examples

### **Example 1: Two Sum Problem**

```javascript
// JavaScript
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

// Test
console.log(twoSum([2,7,11,15], 9)); // [0, 1]
```

### **Example 2: Python**

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # 55
```

### **Example 3: C++**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 10;
    cout << "Hello from C++!" << endl;
    cout << "Number: " << n << endl;
    return 0;
}
```

---

## 🔧 Customization

### **Change Default Language**
```javascript
const [language, setLanguage] = useState('python'); // Change here
```

### **Add More Languages**
Update `PISTON_LANGUAGES` in `code-execution.js`:
```javascript
const PISTON_LANGUAGES = {
    'rust': { language: 'rust', version: '1.68.2' },
    'go': { language: 'go', version: '1.16.2' },
    // ... add more
};
```

### **Customize Editor Theme**
```javascript
<Editor
    theme="vs-dark"  // or "light", "hc-black"
    // ... other options
/>
```

---

## 🚀 Next Steps

1. ✅ **Install Monaco Editor** (run the npm install command above)
2. ✅ **Test the API** - Try executing code via Postman or directly in UI
3. ✅ **Add to Question Pages** - Integrate CodeEditor component
4. ✅ **Add Test Cases** - Ensure your questions have test cases in DB
5. ✅ **Customize Styling** - Adjust colors/layout to match your design

---

## 📊 Performance Notes

### **Piston API Limits:**
- ✅ **Free forever**
- ✅ **No API key required**
- ⚠️ **Rate limited** (reasonable limits for development)
- ⚠️ **Not recommended for very high traffic** (1000+ concurrent users)

### **For Production at Scale:**
- Consider self-hosting Piston
- Or upgrade to Judge0 (paid) when needed
- Current setup is perfect for development and small-medium apps

---

## 🐛 Troubleshooting

### **Issue: Monaco Editor not loading**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm install @monaco-editor/react
```

### **Issue: Code execution fails**
- Check if server is running
- Check browser console for errors
- Verify API endpoint is correct
- Test Piston API directly: https://emkc.org/api/v2/piston/runtimes

### **Issue: Test cases not working**
- Ensure question has `testCases` array in database
- Check output format matches expected format exactly
- Trim whitespace in comparisons (already done)

---

## ✅ Checklist

- [ ] Install Monaco Editor: `npm install @monaco-editor/react`
- [ ] Server is running with code execution route
- [ ] Test code execution with simple console.log
- [ ] Add CodeEditor to a page
- [ ] Test with all 5 languages
- [ ] Add test cases to questions in database
- [ ] Test submit functionality
- [ ] Customize styling if needed

---

## 🎉 You're All Set!

Your Monaco Editor is ready to use with:
- ✅ **Free code execution** (Piston API)
- ✅ **5 programming languages**
- ✅ **Beautiful VS Code-like editor**
- ✅ **Test case validation**
- ✅ **Progress tracking**

**No API keys, no setup, just code!** 🚀
