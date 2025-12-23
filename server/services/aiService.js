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
            const response = await this.client.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

            const text = response.text;
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
    async generateInterviewQuestions(type, count = 10) {
        this._checkConfiguration();

        const prompt = `Generate ${count} ${type} interview questions for a software engineering role.

For each question, provide:
1. The question
2. Expected answer points
3. Evaluation criteria

Return in JSON format:
{
  "questions": [
    {
      "question": "<question text>",
      "expectedPoints": [<key points for good answer>],
      "evaluationCriteria": "<what to look for in answer>"
    }
  ]
}`;

        try {
            const response = await this.client.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

            const text = response.text;
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

        const prompt = `Evaluate this interview answer:

Question: ${question}
Answer: ${answer}

Provide evaluation in JSON format:
{
  "score": <number 0-10>,
  "confidence": <number 0-100>,
  "clarity": <number 0-100>,
  "accuracy": <number 0-100>,
  "communication": <number 0-100>,
  "feedback": "<detailed feedback>",
  "improvements": [<specific improvement suggestions>]
}`;

        try {
            const response = await this.client.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

            const text = response.text;
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
            const response = await this.client.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

            const text = response.text;
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
            const response = await this.client.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

            const text = response.text;
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
}

export default new AIService();
