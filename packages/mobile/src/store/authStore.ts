import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { User, AuthState } from '../types';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
}

const TOKEN_KEY = 'auth_token';

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  setToken: async (token) => {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
    set({ token });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  loadStoredAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        set({ token, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
