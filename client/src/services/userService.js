import axios from 'axios';

const API_BASE = '/api';

// Topics
export const getTopics = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_BASE}/topics?${params}`);
    return response.data;
};

export const getTopicById = async (id) => {
    const response = await axios.get(`${API_BASE}/topics/${id}`);
    return response.data;
};

// Questions
export const getQuestions = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_BASE}/questions?${params}`);
    return response.data;
};

export const getQuestionById = async (id) => {
    const response = await axios.get(`${API_BASE}/questions/${id}`);
    return response.data;
};

// Interview Q&A
export const getInterviewQA = async (type = '') => {
    const params = type ? `?type=${type}` : '';
    const response = await axios.get(`${API_BASE}/interview-qa${params}`);
    return response.data;
};

// Daily Challenge
export const getDailyChallenge = async () => {
    const response = await axios.get(`${API_BASE}/daily-challenge`);
    return response.data;
};

export const submitChallenge = async (challengeId, solution) => {
    const response = await axios.post(`${API_BASE}/daily-challenge/${challengeId}/submit`, { solution });
    return response.data;
};

// Roadmaps
export const getRoadmaps = async () => {
    const response = await axios.get(`${API_BASE}/misc/roadmaps`);
    return response.data;
};

// Resources
export const getResources = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_BASE}/misc/resources?${params}`);
    return response.data;
};
