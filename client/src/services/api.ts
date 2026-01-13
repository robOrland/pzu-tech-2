import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://pzu-tech-2.onrender.com/api',
});

// Adiciona o token em cada requisição se ele existir no localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('pzu-token');

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Tratamento global de erros (ex: redirecionar para login se o token expirar)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('pzu-token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;
