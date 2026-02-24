import Editor from '@monaco-editor/react';
import { Code2 } from 'lucide-react';
import './IDECodeBlock.css';

const IDECodeBlock = ({ code, language = 'javascript', title = 'Code Snippet' }) => {
    // Calculate height based on number of lines
    const lineCount = (code || '').split('\n').length;
    // Base height of 21px per line + 32px padding, min 80px, max 400px
    const editorHeight = Math.min(Math.max(lineCount * 21 + 32, 80), 400);

    return (
        <div className="ide-block-container">
            <div className="ide-block-header">
                <div className="ide-window-controls">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <div className="ide-title-section">
                    <Code2 size={16} className="ide-icon" />
                    <span className="ide-title">{title}</span>
                </div>
            </div>

            <div className="ide-editor-wrapper" style={{ height: editorHeight }}>
                <Editor
                    height="100%"
                    language={language.toLowerCase()}
                    theme="vs-dark"
                    value={code}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 16, bottom: 16 },
                        readOnly: true,
                        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                        scrollbar: {
                            vertical: lineCount > 15 ? 'visible' : 'hidden',
                            horizontal: 'auto'
                        },
                        overviewRulerLanes: 0,
                        hideCursorInOverviewRuler: true,
                        renderLineHighlight: 'none',
                    }}
                />
            </div>
        </div>
    );
};

export default IDECodeBlock;
