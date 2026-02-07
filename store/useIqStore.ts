
import { create } from 'zustand';

interface UsernameIqState {
  username: string;
  platform: 'twitter' | 'instagram';
  result: {
    score: number;
    category: string;
    color: string;
    ageScore: number;
  } | null;
  isGenerating: boolean;
  setUsername: (username: string) => void;
  setPlatform: (platform: 'twitter' | 'instagram') => void;
  setResult: (result: any) => void;
  setGenerating: (val: boolean) => void;
  reset: () => void;
  clearResult: () => void;
}

export const useIqStore = create<UsernameIqState>((set) => ({
  username: '',
  platform: 'twitter',
  result: null,
  isGenerating: false,
  setUsername: (username) => set({ username }),
  setPlatform: (platform) => set((state) => ({ 
    platform, 
    result: null, 
    isGenerating: false 
  })),
  setResult: (result) => set({ result }),
  setGenerating: (isGenerating) => set({ isGenerating }),
  clearResult: () => set({ result: null }),
  reset: () => set({ username: '', result: null, isGenerating: false }),
}));
