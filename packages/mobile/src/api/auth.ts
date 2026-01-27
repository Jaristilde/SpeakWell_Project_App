import { api } from './client';
import { User, OnboardingData } from '../types';

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  fullName?: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/login', data, { skipAuth: true });
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/signup', data, { skipAuth: true });
  },

  forgotPassword: async (email: string): Promise<void> => {
    return api.post('/auth/forgot-password', { email }, { skipAuth: true });
  },

  getMe: async (): Promise<User> => {
    return api.get<User>('/users/me');
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return api.patch<User>('/users/me', data);
  },

  completeOnboarding: async (data: OnboardingData): Promise<User> => {
    return api.patch<User>('/users/me/onboarding', data);
  },
};
