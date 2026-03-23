import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  loadToken:() => Promise<void>
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading:true,


  setUser: (user) => set({ user, isLoggedIn: true }),


  loadToken: async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('>>> check token load app', token)
      if (token) {
        // Có token → lấy thông tin user
        const userStr = await AsyncStorage.getItem('user');
        console.log('>>> check userStr', userStr)
        if (userStr) {
          const user = JSON.parse(userStr);
          set({ user, isLoggedIn: true });
        }
      }
    } catch (error) {
      console.log('Load token error:', error);
    } finally {
      set({ isLoading: false });
    }
  },


  logout: async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    set({ user: null, isLoggedIn: false });
  },
}));