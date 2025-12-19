import api from './api';

// Statistics
export const getAdminStats = async () => {
    const response = await api.get(`/misc/stats`);
    return response.data;
};

// Topics CRUD
export const getAllTopics = async () => {
    const response = await api.get(`/topics`);
    return response.data;
};

export const createTopic = async (topicData) => {
    const response = await api.post(`/topics`, topicData);
    return response.data;
};

export const updateTopic = async (id, topicData) => {
    const response = await api.put(`/topics/${id}`, topicData);
    return response.data;
};

export const deleteTopic = async (id) => {
    const response = await api.delete(`/topics/${id}`);
    return response.data;
};

// Questions CRUD
export const getAllQuestions = async () => {
    const response = await api.get(`/questions`);
    return response.data;
};

export const createQuestion = async (questionData) => {
    const response = await api.post(`/questions`, questionData);
    return response.data;
};

export const updateQuestion = async (id, questionData) => {
    const response = await api.put(`/questions/${id}`, questionData);
    return response.data;
};

export const deleteQuestion = async (id) => {
    const response = await api.delete(`/questions/${id}`);
    return response.data;
};

// Users
export const getAllUsers = async () => {
    const response = await api.get(`/misc/users`);
    return response.data;
};

export const updateUserRole = async (userId, role) => {
    const response = await api.put(`/misc/users/${userId}/role`, { role });
    return response.data;
};
