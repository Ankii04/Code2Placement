import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';
import './CodeEditor.css';

const CodeEditor = ({ question, onSubmit }) => {
    const { theme } = useTheme();
    const editorRef = useRef(null);

    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState(getDefaultCode('javascript'));
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState('testcase');
    const [testResults, setTestResults] = useState([]);
    const [showLangDropdown, setShowLangDropdown] = useState(false);

    // Language configurations
    const languages = [
        { id: 'javascript', name: 'JavaScript', ext: 'js' },
        { id: 'python', name: 'Python', ext: 'py' },
        { id: 'java', name: 'Java', ext: 'java' },
        { id: 'cpp', name: 'C++', ext: 'cpp' },
        { id: 'c', name: 'C', ext: 'c' }
    ];

    // Default code templates
    function getDefaultCode(lang) {
        const templates = {
            javascript: `function solution(input) {\n    // Write your code here\n    \n    return result;\n}\n\n// Test your function\nconsole.log(solution(input));`,
            python: `def solution(input):\n    # Write your code here\n    \n    return result\n\n# Test your function\nprint(solution(input))`,
            java: `public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n        \n    }\n}`,
            cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}`,
            c: `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}`
        };
        return templates[lang] || templates.javascript;
    }

    // Handle language change
    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        setCode(getDefaultCode(newLang));
        setOutput('');
        setTestResults([]);
        setShowLangDropdown(false);
    };

    // Handle fullscreen
    const handleFullscreen = () => {
        const container = document.querySelector('.code-editor-container');
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.log('Fullscreen error:', err);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Handle settings
    const handleSettings = () => {
        // Toggle editor settings like font size, theme, etc.
        const newFontSize = editorRef.current?.getOption('fontSize') === 14 ? 16 : 14;
        editorRef.current?.updateOptions({ fontSize: newFontSize });
    };

    // Handle editor mount
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            handleRunCode();
        });
    };

    // Run code - automatically shows test results
    const handleRunCode = async () => {
        setIsRunning(true);
        setActiveTab('testcase'); // Auto-switch to test results

        // If question has test cases, run them automatically
        if (question?.testCases && question.testCases.length > 0) {
            try {
                const response = await api.post('/code/test', {
                    code,
                    language,
                    testCases: question.testCases.slice(0, 3) // Show first 3 test cases
                });

                if (response.data.success) {
                    setTestResults(response.data.results);
                }
            } catch (error) {
                setOutput(`❌ Error:\n${error.response?.data?.error || error.message}`);
                setActiveTab('result');
            }
        } else {
            // No test cases, just run with custom input
            try {
                const response = await api.post('/code/execute', {
                    code,
                    language,
                    input: input || ''
                });

                if (response.data.success) {
                    setOutput(response.data.output || 'No output');
                } else {
                    setOutput(`❌ Error:\n${response.data.error || 'Unknown error'}`);
                }
                setActiveTab('result');
            } catch (error) {
                setOutput(`❌ Error:\n${error.response?.data?.error || error.message}`);
                setActiveTab('result');
            }
        }

        setIsRunning(false);
    };

    // Submit solution
    const handleSubmit = async () => {
        if (!question) return;

        setIsRunning(true);
        setActiveTab('testcase');

        try {
            const response = await api.post('/code/submit', {
                code,
                language,
                questionId: question._id
            });

            if (response.data.success) {
                setTestResults(response.data.results);

                if (response.data.allPassed) {
                    alert('🎉 Accepted! All test cases passed!');
                    if (onSubmit) onSubmit(response.data);
                }
            }
        } catch (error) {
            setOutput(`❌ Error:\n${error.response?.data?.error || error.message}`);
            setActiveTab('result');
        } finally {
            setIsRunning(false);
        }
    };

    const currentLang = languages.find(l => l.id === language);

    return (
        <div className="code-editor-container">
            {/* Top Bar */}
            <div className="code-editor-topbar">
                {/* Language Dropdown */}
                <div className="language-dropdown">
                    <button
                        className="lang-selector-btn"
                        onClick={() => setShowLangDropdown(!showLangDropdown)}
                    >
                        {currentLang?.name} ▼
                    </button>
                    {showLangDropdown && (
                        <div className="lang-dropdown-menu">
                            {languages.map(lang => (
                                <div
                                    key={lang.id}
                                    className={`lang-option ${language === lang.id ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange(lang.id)}
                                >
                                    {lang.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Editor Controls */}
                <div className="editor-controls">
                    <button className="icon-btn" onClick={handleSettings} title="Settings">⚙️</button>
                    <button className="icon-btn" onClick={handleFullscreen} title="Fullscreen">⛶</button>
                </div>
            </div>

            {/* Monaco Editor - FULL HEIGHT */}
            <div className="monaco-editor-wrapper">
                <Editor
                    height="100%"
                    language={language}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: 'on',
                        formatOnPaste: true,
                        formatOnType: true,
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                        parameterHints: { enabled: true },
                        folding: true,
                        bracketPairColorization: { enabled: true }
                    }}
                />
            </div>

            {/* Bottom Section - Tabs + Results */}
            <div className="code-bottom-section">
                {/* Tabs */}
                <div className="bottom-tabs">
                    <button
                        className={`bottom-tab ${activeTab === 'testcase' ? 'active' : ''}`}
                        onClick={() => setActiveTab('testcase')}
                    >
                        Testcase
                    </button>
                    <button
                        className={`bottom-tab ${activeTab === 'result' ? 'active' : ''}`}
                        onClick={() => setActiveTab('result')}
                    >
                        Test Result
                    </button>
                </div>

                {/* Results Content */}
                <div className="bottom-content">
                    {activeTab === 'testcase' && (
                        <div className="testcase-panel">
                            {testResults.length > 0 ? (
                                <div className="test-results-grid">
                                    {testResults.map((result, index) => (
                                        <div key={index} className={`test-result-item ${result.passed ? 'passed' : 'failed'}`}>
                                            <div className="test-result-header">
                                                <span>Case {index + 1}</span>
                                                <span className={`status-badge ${result.passed ? 'pass' : 'fail'}`}>
                                                    {result.passed ? '✓ Passed' : '✗ Failed'}
                                                </span>
                                            </div>
                                            <div className="test-result-body">
                                                <div className="test-io">
                                                    <strong>Input:</strong>
                                                    <code>{result.input}</code>
                                                </div>
                                                <div className="test-io">
                                                    <strong>Output:</strong>
                                                    <code className={result.passed ? 'correct' : 'incorrect'}>
                                                        {result.output}
                                                    </code>
                                                </div>
                                                <div className="test-io">
                                                    <strong>Expected:</strong>
                                                    <code>{result.expected}</code>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>You must run your code first</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'result' && (
                        <div className="result-panel">
                            <pre className="result-output">{output || 'Run your code to see output'}</pre>
                        </div>
                    )}
                </div>

                {/* Action Buttons - Bottom Right */}
                <div className="action-buttons">
                    <button
                        className="btn-run"
                        onClick={handleRunCode}
                        disabled={isRunning}
                    >
                        {isRunning ? 'Running...' : '▶ Run'}
                    </button>
                    <button
                        className="btn-submit"
                        onClick={handleSubmit}
                        disabled={isRunning || !question}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
