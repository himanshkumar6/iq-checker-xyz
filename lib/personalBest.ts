/**
 * Personal Best Storage Utilities
 * 
 * Manages local storage of personal best scores for games.
 * Supports both "higher is better" and "lower is better" scoring systems.
 */

export interface PersonalBest {
  score: number;
  timestamp: number;
  gameName: string;
}

// Storage key prefix
const PB_PREFIX = 'pb_';

// Game identifiers
export type GameIdentifier = 
  | 'reaction_test'
  | 'pattern_recognition'
  | 'speed_math'
  | 'memory_grid';

/**
 * Get stored personal best for a game
 * @param gameName - Unique identifier for the game
 * @returns The best score, or null if no record exists
 */
export const getPersonalBest = (gameName: GameIdentifier): number | null => {
  try {
    const stored = localStorage.getItem(`${PB_PREFIX}${gameName}`);
    if (!stored) return null;
    
    const data: PersonalBest = JSON.parse(stored);
    return data.score;
  } catch (error) {
    console.error('Error reading personal best:', error);
    return null;
  }
};

/**
 * Check if current score is a new personal best
 * @param gameName - Unique identifier for the game
 * @param currentScore - The score to check
 * @param lowerIsBetter - True for reaction time (lower is better), false for points (higher is better)
 * @returns True if this is a new personal best
 */
export const isNewPersonalBest = (
  gameName: GameIdentifier,
  currentScore: number,
  lowerIsBetter: boolean = false
): boolean => {
  const previousBest = getPersonalBest(gameName);
  
  // If no previous best exists, any score is a new best
  if (previousBest === null) return true;
  
  // Compare based on scoring system
  if (lowerIsBetter) {
    return currentScore < previousBest;
  } else {
    return currentScore > previousBest;
  }
};

/**
 * Save new personal best
 * @param gameName - Unique identifier for the game
 * @param score - The new best score
 */
export const savePersonalBest = (gameName: GameIdentifier, score: number): void => {
  try {
    const data: PersonalBest = {
      score,
      timestamp: Date.now(),
      gameName
    };
    
    localStorage.setItem(`${PB_PREFIX}${gameName}`, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving personal best:', error);
  }
};

/**
 * Get all personal bests (for stats display)
 * @returns Record of all stored personal bests
 */
export const getAllPersonalBests = (): Record<string, PersonalBest> => {
  const allBests: Record<string, PersonalBest> = {};
  
  try {
    const games: GameIdentifier[] = [
      'reaction_test',
      'pattern_recognition',
      'speed_math',
      'memory_grid'
    ];
    
    games.forEach(gameName => {
      const stored = localStorage.getItem(`${PB_PREFIX}${gameName}`);
      if (stored) {
        allBests[gameName] = JSON.parse(stored);
      }
    });
  } catch (error) {
    console.error('Error reading all personal bests:', error);
  }
  
  return allBests;
};

/**
 * Clear personal best for a specific game (for testing/reset)
 * @param gameName - Unique identifier for the game
 */
export const clearPersonalBest = (gameName: GameIdentifier): void => {
  try {
    localStorage.removeItem(`${PB_PREFIX}${gameName}`);
  } catch (error) {
    console.error('Error clearing personal best:', error);
  }
};

/**
 * Clear all personal bests (for testing/reset)
 */
export const clearAllPersonalBests = (): void => {
  try {
    const games: GameIdentifier[] = [
      'reaction_test',
      'pattern_recognition',
      'speed_math',
      'memory_grid'
    ];
    
    games.forEach(gameName => {
      localStorage.removeItem(`${PB_PREFIX}${gameName}`);
    });
  } catch (error) {
    console.error('Error clearing all personal bests:', error);
  }
};
