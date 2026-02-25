// Load environment variables first
import '../config/env.js';
import { GoogleGenAI } from "@google/genai";

class AIService {
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            console.warn('⚠️  GEMINI_API_KEY not configured. AI features will not work.');
            this.client = null;
            this.isConfigured = false;
        } else {
            console.log('✓ GEMINI_API_KEY configured. AI features enabled.');
            this.client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            this.isConfigured = true;
        }
    }

    _checkConfiguration() {
        if (!this.isConfigured) {
            throw new Error('AI service not configured. Please add GEMINI_API_KEY to your environment variables.');
        }
    }

    // Helper: call Gemini and return raw text
    async _generate(prompt) {
        const response = await this.client.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });
        return response.text;
    }

    // Resume Analysis
    async analyzeResume(resumeText) {
        this._checkConfiguration();

        const prompt = `Analyze this resume and provide a detailed evaluation in JSON format:

Resume Content:
${resumeText}

Provide the following in valid JSON format:
{
  "overallScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "sections": {
    "grammar": <number 0-100>,
    "structure": <number 0-100>,
    "content": <number 0-100>,
    "formatting": <number 0-100>
  },
  "skillsMissing": [<array of missing technical skills>],
  "keywords": [<array of important ATS keywords to add>],
  "strengths": [<array of strong points>],
  "weaknesses": [<array of weak points>],
  "improvements": [
    {"category": "<category>", "suggestion": "<specific suggestion>"}
  ]
}

Be specific and actionable in your suggestions.`;

        try {
            const text = await this._generate(prompt);
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Failed to parse AI response. The response may not be in the expected format.');
        } catch (error) {
            console.error('Resume analysis error:', error);
            throw error;
        }
    }

    // Mock Interview Question Generation
    async generateInterviewQuestions(type, count = 6) {
        this._checkConfiguration();

        const prompt = `Generate ${count} ${type} interview questions for a software engineering role.
Return ONLY a JSON object with this structure:
{
  "questions": [
    {
      "question": "<question text>",
      "expectedPoints": ["point 1", "point 2"],
      "evaluationCriteria": "criteria"
    }
  ]
}`;

        try {
            const text = await this._generate(prompt);
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Failed to parse AI response');
        } catch (error) {
            console.error('Question generation error:', error);
            throw error;
        }
    }

    // Evaluate Interview Answer
    async evaluateAnswer(question, answer) {
        this._checkConfiguration();

        const prompt = `Evaluate this interview answer concisely:

Question: ${question}
Answer: ${answer}

Provide exactly this JSON format:
{
  "score": <number 0-10>,
  "confidence": <number 0-100>,
  "clarity": <number 0-100>,
  "accuracy": <number 0-100>,
  "communication": <number 0-100>,
  "feedback": "<concise feedback>",
  "improvements": [<1-2 specific points>]
}`;

        try {
            const text = await this._generate(prompt);
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Failed to parse AI response');
        } catch (error) {
            console.error('Answer evaluation error:', error);
            throw error;
        }
    }

    // Generate Personalized Challenge
    async generatePersonalizedChallenge(weakTopics, difficulty = 'MEDIUM') {
        this._checkConfiguration();

        const prompt = `Generate a DSA coding problem for a student weak in: ${weakTopics.join(', ')}

Difficulty: ${difficulty}

Provide in JSON format:
{
  "title": "<problem title>",
  "description": "<detailed problem description>",
  "examples": [
    {"input": "<input>", "output": "<output>", "explanation": "<why>"}
  ],
  "constraints": [<array of constraints>],
  "hints": [<array of hints>],
  "topics": [<relevant topics>],
  "difficulty": "${difficulty}"
}`;

        try {
            const text = await this._generate(prompt);
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Failed to parse AI response');
        } catch (error) {
            console.error('Challenge generation error:', error);
            throw error;
        }
    }

    // Evaluate Challenge Solution
    async evaluateSolution(problem, solution) {
        this._checkConfiguration();

        const prompt = `Evaluate this coding solution:

Problem: ${problem}
Solution: ${solution}

Provide evaluation in JSON format:
{
  "isCorrect": <boolean>,
  "score": <number 0-100>,
  "feedback": "<detailed feedback>",
  "timeComplexity": "<analyzed time complexity>",
  "spaceComplexity": "<analyzed space complexity>",
  "improvements": [<suggestions for optimization>]
}`;

        try {
            const text = await this._generate(prompt);
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Failed to parse AI response');
        } catch (error) {
            console.error('Solution evaluation error:', error);
            throw error;
        }
    }

    // Generate Platform-wide Daily Challenge
    async generateDailyChallenge() {
        this._checkConfiguration();

        const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Recursion', 'Sorting', 'Searching'];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const difficulties = ['Easy', 'Medium', 'Hard'];
        const randomDiff = difficulties[Math.floor(Math.random() * difficulties.length)];

        const prompt = `Generate a daily DSA coding challenge on the topic of ${randomTopic} with ${randomDiff} difficulty.
Return EXACTLY this JSON format:
{
  "title": "<title>",
  "description": "<detailed problem description>",
  "difficulty": "${randomDiff}",
  "hints": ["hint 1", "hint 2"],
  "solution": "<optimized javascript solution code>",
  "explanation": "<explain the solution>",
  "testCases": [
    {"input": "input 1", "expectedOutput": "output 1"},
    {"input": "input 2", "expectedOutput": "output 2"}
  ]
}`;

        try {
            const text = await this._generate(prompt);
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Failed to parse AI response');
        } catch (error) {
            console.error('Daily challenge generation error:', error);
            throw error;
        }
    }
}

export default new AIService();
