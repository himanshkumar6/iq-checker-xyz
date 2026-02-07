
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IQResult, ReactionAttempt } from '../types';

interface AppState {
  lastIqResult: IQResult | null;
  reactionHistory: ReactionAttempt[];
  setIqResult: (result: IQResult) => void;
  addReactionAttempt: (attempt: ReactionAttempt) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      lastIqResult: null,
      reactionHistory: [],
      setIqResult: (result: IQResult) => set({ lastIqResult: result }),
      addReactionAttempt: (attempt: ReactionAttempt) => set((state) => ({ 
        reactionHistory: [attempt, ...state.reactionHistory].slice(0, 10) 
      })),
    }),
    {
      name: 'iq-checker-storage',
    }
  )
);
