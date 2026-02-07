
/**
 * Deterministic hash function for username
 */
const hashUsername = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

/**
 * Estimates account age based on username patterns.
 * Returns score 1 (new) to 10 (old).
 */
const estimateAccountAge = (username: string): number => {
  let age = 5;
  const lower = username.toLowerCase();
  const digits = (lower.match(/\d/g) || []).length;
  
  // Rule 1: Short usernames = older
  if (lower.length <= 5) age += 3;
  
  // Rule 2 & 3: Numbers check
  if (digits === 0) {
    age += 2;
  } else if (digits >= 4) {
    age -= 3;
  } else {
    age -= 2;
  }

  // Rule 4: Underscores
  if (lower.includes('_')) age -= 1;

  // Rule 5: Random patterns (e.g., high consonant density or random looking character jumps)
  const isRandomPattern = /[^aeiouy]{4,}/.test(lower) || lower.length > 12;
  if (isRandomPattern) age -= 2;

  // Clamp 1-10
  return Math.min(Math.max(age, 1), 10);
};

/**
 * Generates an IQ score based on simulated account age and deterministic hashing.
 */
export const generateIqFromUsername = (username: string) => {
  const normalized = username.toLowerCase().trim().replace(/^@/, '');
  if (!normalized) return null;

  const ageScore = estimateAccountAge(normalized);
  const hash = hashUsername(normalized);
  
  // IQ Formula: 80 base + (age * 5) + hash modifier (0-15)
  // Max potential: 80 + 50 + 15 = 145
  const hashModifier = (hash % 16);
  const score = 80 + (ageScore * 5) + hashModifier;
  
  let category = 'Average';
  let color = 'text-blue-500';
  
  if (score >= 136) {
    category = 'Genius';
    color = 'text-purple-500';
  } else if (score >= 121) {
    category = 'High';
    color = 'text-indigo-500';
  } else if (score >= 106) {
    category = 'Smart';
    color = 'text-emerald-500';
  } else if (score >= 90) {
    category = 'Average';
    color = 'text-blue-500';
  } else {
    category = 'Low';
    color = 'text-slate-500';
  }

  return { score, category, color, ageScore };
};
