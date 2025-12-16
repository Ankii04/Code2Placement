import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'seedData.js');
let content = readFileSync(filePath, 'utf8');

// Replace all difficulty values
content = content.replace(/difficulty: "Easy"/g, 'difficulty: "EASY"');
content = content.replace(/difficulty: "Medium"/g, 'difficulty: "MEDIUM"');
content = content.replace(/difficulty: "Hard"/g, 'difficulty: "HARD"');
content = content.replace(/difficulty: "Beginner"/g, 'difficulty: "EASY"');

writeFileSync(filePath, content, 'utf8');
console.log('✓ Fixed all difficulty values to uppercase');
