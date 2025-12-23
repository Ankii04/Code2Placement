import axios from 'axios';

// Direct connection to Render backend API
// Use environment variable or fallback to local development URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

console.log('API Base URL:', API_BASE_URL); // Debug log

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Only redirect if we're not already on a login/register page
            const publicPages = ['/login', '/register', '/'];
            if (!publicPages.includes(window.location.pathname)) {
                // We don't remove token immediately to allow for a second try or refresh handling
                // localStorage.removeItem('token');
                // window.location.href = '/login';
                console.warn('Unauthorized access - potential token expiry');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
