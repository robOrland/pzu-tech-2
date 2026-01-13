import api from './api';

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'CITIZEN';
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'CITIZEN';
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { data } = await api.post('/auth/login', credentials);
        if (data.token) {
            localStorage.setItem('pzu-token', data.token);
            localStorage.setItem('pzu-user', JSON.stringify(data.user));
        }
        return data;
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post('/auth/register', data);
        const authData = response.data;
        if (authData.token) {
            localStorage.setItem('pzu-token', authData.token);
            localStorage.setItem('pzu-user', JSON.stringify(authData.user));
        }
        return authData;
    },

    logout() {
        localStorage.removeItem('pzu-token');
        localStorage.removeItem('pzu-user');
        window.location.href = '/';
    },

    getCurrentUser(): User | null {
        const user = localStorage.getItem('pzu-user');
        return user ? JSON.parse(user) : null;
    }
};
