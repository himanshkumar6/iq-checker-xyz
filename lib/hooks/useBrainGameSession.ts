import { useState, useEffect, useCallback, useRef } from 'react';

export interface GameSession {
  score: number;
  accuracy: number;
  timePlayedSeconds: number;
  questionsAnswered?: number;
  correctAnswers?: number;
  level?: number;
}

export interface UseGameSessionOptions {
  onSessionEnd: (session: GameSession) => void;
  autoTrackTime?: boolean;
}

export const useBrainGameSession = (options: UseGameSessionOptions) => {
  const { onSessionEnd, autoTrackTime = true } = options;
  
  const [session, setSession] = useState<GameSession>({
    score: 0,
    accuracy: 0,
    timePlayedSeconds: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    level: 1
  });

  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasEndedRef = useRef<boolean>(false);

  // Update time played
  useEffect(() => {
    if (!autoTrackTime) return;

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setSession(prev => ({ ...prev, timePlayedSeconds: elapsed }));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoTrackTime]);

  // Handle session end
  const endSession = useCallback(() => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const finalSession = {
      ...session,
      timePlayedSeconds: Math.floor((Date.now() - startTimeRef.current) / 1000)
    };

    onSessionEnd(finalSession);
  }, [session, onSessionEnd]);

  // Detect page unload/navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only trigger on actual page unload, not tab switch
      endSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [endSession]);

  // Update session data
  const updateSession = useCallback((updates: Partial<GameSession>) => {
    setSession(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    session,
    updateSession,
    endSession
  };
};
