export interface Question {
  id: string;
  text: string;
  category: "LOGIC" | "PATTERN" | "MATH" | "VISUAL";
  difficultyLevel: 1 | 2 | 3;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
}

export interface IQResult {
  score: number;
  level: string;
  correct: number;
  wrong: number;
}

export interface ReactionAttempt {
  id: number;
  time: number;
}

export type MentalAgeTrait =
  | "emotional_regulation"
  | "impulsivity"
  | "risk_tolerance"
  | "long_term_thinking"
  | "responsibility"
  | "pressure_reaction"
  | "self_awareness";

export interface MentalAgeQuestion {
  id: string;
  q: string;
  trait: MentalAgeTrait;
  options: string[];
  score: number[]; // Weights representing maturity contribution (0-10 scale)
}

export interface DetailedMentalAgeResult {
  mentalAge: number;
  explanation: string;
  strengths: string[];
  weaknesses: string[];
  insight: string;
  traitScores: Record<MentalAgeTrait, number>;
}
