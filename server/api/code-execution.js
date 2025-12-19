import express from 'express';
import axios from 'axios';
import Question from '../models/Question.js';
import UserProgress from '../models/UserProgress.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Piston API (Free, No API Key Required)
const PISTON_API = 'https://emkc.org/api/v2/piston';

// Language mapping for Piston
const PISTON_LANGUAGES = {
    'javascript': { language: 'javascript', version: '18.15.0' },
    'python': { language: 'python', version: '3.10.0' },
    'java': { language: 'java', version: '15.0.2' },
    'cpp': { language: 'c++', version: '10.2.0' },
    'c': { language: 'c', version: '10.2.0' }
};

/**
 * Execute code using Piston API (Free)
 */
async function executeCode(code, language, input = '') {
    try {
        const langConfig = PISTON_LANGUAGES[language];
        if (!langConfig) {
            throw new Error(`Unsupported language: ${language}`);
        }

        // Determine file name based on language
        const fileNames = {
            'javascript': 'main.js',
            'python': 'main.py',
            'java': 'Main.java',
            'cpp': 'main.cpp',
            'c': 'main.c'
        };

        const response = await axios.post(`${PISTON_API}/execute`, {
            language: langConfig.language,
            version: langConfig.version,
            files: [{
                name: fileNames[language] || 'main.txt',
                content: code
            }],
            stdin: input,
            args: [],
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1
        });

        const result = response.data;

        // Check for compilation errors
        if (result.compile && result.compile.code !== 0) {
            return {
                success: false,
                error: result.compile.stderr || result.compile.output || 'Compilation error',
                status: 'Compilation Error'
            };
        }

        // Check for runtime errors
        if (result.run && result.run.code !== 0 && result.run.signal) {
            return {
                success: false,
                error: result.run.stderr || result.run.output || 'Runtime error',
                status: 'Runtime Error'
            };
        }

        // Success
        return {
            success: true,
            output: result.run?.stdout || result.run?.output || '',
            error: result.run?.stderr || null,
            status: 'Completed'
        };

    } catch (error) {
        console.error('Code execution error:', error.response?.data || error.message);
        throw new Error('Code execution failed');
    }
}

/**
 * POST /api/code/execute
 * Execute code with custom input
 */
router.post('/execute', async (req, res) => {
    try {
        const { code, language, input } = req.body;

        if (!code || !language) {
            return res.status(400).json({
                success: false,
                error: 'Code and language are required'
            });
        }

        const result = await executeCode(code, language, input);
        res.json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/code/test
 * Run code against test cases
 */
router.post('/test', async (req, res) => {
    try {
        const { code, language, testCases } = req.body;

        if (!code || !language || !testCases) {
            return res.status(400).json({
                success: false,
                error: 'Code, language, and test cases are required'
            });
        }

        const results = [];

        // Run against each test case (limit to 5 for performance)
        for (let i = 0; i < Math.min(testCases.length, 5); i++) {
            const testCase = testCases[i];

            // Format input: If it's a bracketed array string like [1,2,3], convert to space separated "length 1 2 3"
            let formattedInput = testCase.input;
            if (typeof formattedInput === 'string' && formattedInput.trim().startsWith('[') && formattedInput.trim().endsWith(']')) {
                try {
                    const parsed = JSON.parse(formattedInput);
                    if (Array.isArray(parsed)) {
                        formattedInput = `${parsed.length}\n${parsed.join(' ')}`;
                    }
                } catch (e) {
                    console.error('Input parsing failed, using raw input');
                }
            }

            console.log(`Running test case ${i + 1}: Original='${testCase.input}', Formatted='${formattedInput.replace(/\n/g, ' ')}'`);

            const result = await executeCode(code, language, formattedInput);
            console.log(`Result ${i + 1} success:`, result.success);

            if (!result.success) {
                results.push({
                    input: testCase.input,
                    expected: testCase.expectedOutput,
                    output: result.error || 'Unknown error',
                    passed: false,
                    error: true
                });
                console.log(`Case ${i + 1} failed with error`);
                break; // Stop on first error
            }

            const output = (result.output || '').toString().trim();
            const expected = (testCase.expectedOutput || '').toString().trim();
            const passed = output === expected;

            console.log(`Case ${i + 1}: output='${output}', expected='${expected}', passed=${passed}`);

            results.push({
                input: testCase.input,
                expected: testCase.expectedOutput,
                output: result.output || '',
                passed
            });
        }

        res.json({
            success: true,
            results
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/code/submit
 * Submit solution and run all test cases
 */
router.post('/submit', protect, async (req, res) => {
    try {
        const { code, language, questionId } = req.body;
        const userId = req.user?.id;

        if (!code || !language || !questionId) {
            return res.status(400).json({
                success: false,
                error: 'Code, language, and question ID are required'
            });
        }

        // Get question with test cases
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                error: 'Question not found'
            });
        }

        const results = [];
        let allPassed = true;

        // Run against all test cases
        for (const testCase of question.testCases || []) {
            // Format input: If it's a bracketed array string like [1,2,3], convert to space separated "length 1 2 3"
            let formattedInput = testCase.input;
            if (typeof formattedInput === 'string' && formattedInput.trim().startsWith('[') && formattedInput.trim().endsWith(']')) {
                try {
                    const parsed = JSON.parse(formattedInput);
                    if (Array.isArray(parsed)) {
                        formattedInput = `${parsed.length}\n${parsed.join(' ')}`;
                    }
                } catch (e) {
                    // Fallback
                }
            }

            const result = await executeCode(code, language, formattedInput);

            if (!result.success) {
                results.push({
                    input: testCase.input,
                    expected: testCase.expectedOutput,
                    output: result.error,
                    passed: false,
                    error: true
                });
                allPassed = false;
                break;
            }

            const output = (result.output || '').toString().trim();
            const expected = (testCase.expectedOutput || '').toString().trim();
            const passed = output === expected;

            if (!passed) allPassed = false;

            results.push({
                input: testCase.input,
                expected: testCase.expectedOutput,
                output: result.output || '',
                passed
            });
        }

        // Update user progress if authenticated and all passed
        if (userId && allPassed) {
            const progress = await UserProgress.findOne({ user: userId });

            // Check if already solved
            const isAlreadySolved = progress?.solvedQuestions?.some(
                sq => sq.question.toString() === questionId
            );

            if (!isAlreadySolved) {
                const difficultyKey = `${question.difficulty.toLowerCase()}Count`;

                await UserProgress.findOneAndUpdate(
                    { user: userId },
                    {
                        $push: {
                            solvedQuestions: {
                                question: questionId,
                                solvedAt: new Date()
                            }
                        },
                        $inc: {
                            totalSolved: 1,
                            [difficultyKey]: 1
                        }
                    },
                    { upsert: true, new: true }
                );
            }
        }

        res.json({
            success: true,
            allPassed,
            passedCount: results.filter(r => r.passed).length,
            totalCount: results.length,
            results
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
