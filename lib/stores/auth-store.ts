import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  plan: "starter" | "professional" | "enterprise";
  avatarUrl?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { email, password });
          set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (name, email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, { name, email, password });
          set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        delete axios.defaults.headers.common["Authorization"];
      },

      refreshUser: async () => {
        const token = get().token;
        if (!token) return;
        try {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ user: data.user });
        } catch {
          get().logout();
        }
      },
    }),
    { name: "auth-store", partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }) }
  )
);
