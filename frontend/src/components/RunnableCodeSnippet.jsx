import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import api from '../services/api';
import { CodeXml, Play, Eraser, RotateCcw } from 'lucide-react';
import './RunnableCodeSnippet.css';

const RunnableCodeSnippet = ({ code: initialCode, language, input = '' }) => {
    const editorRef = useRef(null);
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    // Update code if initialCode changes (e.g., when switching subtopics)
    useEffect(() => {
        setCode(initialCode);
        setOutput('');
    }, [initialCode]);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            handleRunCode();
        });
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput('Running...');

        try {
            const response = await api.post('/code/execute', {
                code,
                language: language || 'javascript',
                input
            });

            if (response.data.success) {
                setOutput(response.data.output || 'No output');
            } else {
                setOutput(`❌ Error:\n${response.data.error || 'Unknown error'}`);
            }
        } catch (error) {
            setOutput(`❌ Error:\n${error.response?.data?.error || error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleClear = () => {
        setCode('');
        setOutput('');
    };

    const handleReset = () => {
        setCode(initialCode);
        setOutput('');
    };

    const displayLanguage = (!language || language === 'javascript') ? 'JavaScript' : language;

    return (
        <div className="runnable-snippet-container">
            <div>
                <div className="snippet-header">
                    <CodeXml size={24} className="snippet-icon" />
                    <span className="snippet-title">Try Yourself - Code Editor</span>
                </div>
                <p className="snippet-description">
                    Write your own {displayLanguage} code below and click "Run Code" to see the output.
                </p>
            </div>

            <div className="snippet-editor-wrapper">
                <Editor
                    height="200px" // Fixed height for inline snippets
                    language={language || 'javascript'}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value)}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        readOnly: false,
                        wordWrap: 'on',
                        padding: { top: 16 }
                    }}
                    onMount={handleEditorDidMount}
                />
            </div>

            <div className="snippet-actions">
                <button
                    className="btn-action btn-run"
                    onClick={handleRunCode}
                    disabled={isRunning}
                >
                    <Play size={16} fill="currentColor" />
                    {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button className="btn-action btn-secondary" onClick={handleClear}>
                    <Eraser size={16} />
                    Clear
                </button>
                <button className="btn-action btn-secondary" onClick={handleReset}>
                    <RotateCcw size={16} />
                    Reset
                </button>
            </div>

            <div className="snippet-output-wrapper">
                {output ? (
                    output
                ) : (
                    <span className="output-placeholder">// Output will appear here ...</span>
                )}
            </div>
        </div>
    );
};

export default RunnableCodeSnippet;
