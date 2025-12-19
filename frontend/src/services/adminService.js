import axios from 'axios';

const API_BASE = '/api';

// Statistics
export const getAdminStats = async () => {
    const response = await axios.get(`${API_BASE}/misc/stats`);
    return response.data;
};

// Topics CRUD
export const getAllTopics = async () => {
    const response = await axios.get(`${API_BASE}/topics`);
    return response.data;
};

export const createTopic = async (topicData) => {
    const response = await axios.post(`${API_BASE}/topics`, topicData);
    return response.data;
};

export const updateTopic = async (id, topicData) => {
    const response = await axios.put(`${API_BASE}/topics/${id}`, topicData);
    return response.data;
};

export const deleteTopic = async (id) => {
    const response = await axios.delete(`${API_BASE}/topics/${id}`);
    return response.data;
};

// Questions CRUD
export const getAllQuestions = async () => {
    const response = await axios.get(`${API_BASE}/questions`);
    return response.data;
};

export const createQuestion = async (questionData) => {
    const response = await axios.post(`${API_BASE}/questions`, questionData);
    return response.data;
};

export const updateQuestion = async (id, questionData) => {
    const response = await axios.put(`${API_BASE}/questions/${id}`, questionData);
    return response.data;
};

export const deleteQuestion = async (id) => {
    const response = await axios.delete(`${API_BASE}/questions/${id}`);
    return response.data;
};

// Users
export const getAllUsers = async () => {
    const response = await axios.get(`${API_BASE}/misc/users`);
    return response.data;
};

export const updateUserRole = async (userId, role) => {
    const response = await axios.put(`${API_BASE}/misc/users/${userId}/role`, { role });
    return response.data;
};
