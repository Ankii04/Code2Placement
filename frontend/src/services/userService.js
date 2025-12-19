import api from './api';

// Topics
export const getTopics = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/topics?${params}`);
    return response.data;
};

export const getTopicById = async (id) => {
    const response = await api.get(`/topics/${id}`);
    return response.data;
};

// Questions
export const getQuestions = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/questions?${params}`);
    return response.data;
};

export const getQuestionById = async (id) => {
    const response = await api.get(`/questions/${id}`);
    return response.data;
};

// Interview Q&A
export const getInterviewQA = async (type = '') => {
    const params = type ? `?type=${type}` : '';
    const response = await api.get(`/interview-qa${params}`);
    return response.data;
};

// Daily Challenge
export const getDailyChallenge = async () => {
    const response = await api.get(`/daily-challenge`);
    return response.data;
};

export const submitChallenge = async (challengeId, solution) => {
    const response = await api.post(`/daily-challenge/${challengeId}/submit`, { solution });
    return response.data;
};

// Roadmaps
export const getRoadmaps = async () => {
    const response = await api.get(`/misc/roadmaps`);
    return response.data;
};

// Resources
export const getResources = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/misc/resources?${params}`);
    return response.data;
};
