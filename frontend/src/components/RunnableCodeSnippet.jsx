import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';
import './RunnableCodeSnippet.css';

const RunnableCodeSnippet = ({ code: initialCode, language, input = '' }) => {
    const { theme } = useTheme();
    const editorRef = useRef(null);
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

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

    return (
        <div className="runnable-snippet-container">
            <div className="runnable-snippet-header">
                <span className="snippet-title">Try Yourself ({language || 'javascript'})</span>
                <button
                    className="btn-run-sm"
                    onClick={handleRunCode}
                    disabled={isRunning}
                >
                    {isRunning ? 'Running...' : '▶ Run Code'}
                </button>
            </div>

            <div className="snippet-editor-wrapper">
                <Editor
                    height="200px" // Fixed height for inline snippets
                    language={language || 'javascript'}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    value={code}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        readOnly: true, // As per prompt, users check the code but cannot change it.
                        wordWrap: 'on'
                    }}
                    onMount={handleEditorDidMount}
                />
            </div>

            {output && (
                <div className="snippet-output-wrapper">
                    <div className="output-header">Output:</div>
                    <pre className="snippet-output">{output}</pre>
                </div>
            )}
        </div>
    );
};

export default RunnableCodeSnippet;
